import { TTS_VOICE_OPTION } from "../utils/tts";

function isValidParams(event): boolean {
  return true;
}

export default defineEventHandler(async (event) => {
  const { input: txtInp, rate, pitch, volume, voiceName, outputFormat } = await readBody(event);

  if (isValidParams(event) === false) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid params'
    })
  }

  let result = null;
  try {
    let metadata: TTSMetaData = {
      voiceName: voiceName || "vi-VN-HoaiMyNeural",
      outputFormat: outputFormat || OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3
    }

    let tts = createTTSClient({ metadata })

    let option: TTS_VOICE_OPTION = {
      rate: rate || RATE.DEFAULT,
      pitch: pitch || PITCH.DEFAULT,
      volume: volume || VOLUME.DEFAULT
    }
    result = await tts.getSoundAsFile(txtInp, './public/output.mp3', option);

  } catch (e) {
    console.error(e);
  }

  return result;
})