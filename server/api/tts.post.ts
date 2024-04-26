import createTTSClient, { FILE_EXT, OUTPUT_FORMAT, TTSMetaData } from "~/scripts/services/tts";
import path from 'path'

export default defineEventHandler(async (event) => {
    const { input: txtInp } = await readBody(event);
    let result = null;

    if (txtInp) {
        result = await handleConvert(txtInp);
    }

    return { data: result };
})

async function handleConvert(txtInp: string) {
    let metadata: TTSMetaData = {
        voiceName: "vi-VN-HoaiMyNeural",
        outputFormat: OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3
    }
    let tts = createTTSClient({ metadata })
    let fileExt = FILE_EXT.MP3;
    let fileName = getFileName("sound") + "." + fileExt;
    let filePath = path.join(process.cwd(), 'public/output/tts/' + fileName);

    let outputPath = await tts.convertToSound(txtInp, filePath);
    if (outputPath) {
        outputPath = outputPath.replace('./public', '');
    }

    return outputPath;
}

function getFileName(fileName: string): string {
    // Format the timestamp (YYYYMMDD_HHMMSS)
    const timestamp = getCurrentTimestamp();

    // Append timestamp to the file name
    const namedFile = `${fileName}_${timestamp}`;

    return namedFile;
}

function getCurrentTimestamp() {
    const now = new Date();
    return `${padZero(now.getHours())}${padZero(now.getMinutes())}${padZero(now.getSeconds())}`;
}

// Helper function to pad single digit numbers with a leading zero
function padZero(num: number): string {
    return num.toString().padStart(2, "0");
}