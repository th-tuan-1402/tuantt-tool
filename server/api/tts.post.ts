export default defineEventHandler(async (event) => {
    const { input: txtInp } = await readBody(event);
    let result = null;

    if (txtInp) {
        result = await convert(txtInp);
    }

    return result;
})

async function convert(txtInp: string) {
    let metadata: TTSMetaData = {
        voiceName: "vi-VN-HoaiMyNeural",
        outputFormat: OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3
    }
    let tts = createTTSClient({ metadata })
    let output = await tts.convertToStream(txtInp);

    return output;
}