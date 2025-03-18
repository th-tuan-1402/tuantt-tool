import { useTTS, DEFAULT_VOICE_OPTION, DEFAULT_VOICE_PROFILE } from "~/server/utils/tts";

/**
 * Extracts parameters from the request.
 *
 * @param H3Event<EvenHandlerRequest> event
 * @returns {Promise<{
 *   input: string,
 *   profile: TTS_VOICE_PROFILE,
 *   option: TTS_VOICE_OPTION
 * }>} Resolves with the parameters.
 */
async function getParam(event) {
  const { input, rate, pitch, volume, voiceName, outputFormat } = await readBody(event);

  return {
    input: input,
    profile: {
      voiceName: voiceName || DEFAULT_VOICE_PROFILE.voiceName,
      outputFormat: outputFormat || DEFAULT_VOICE_PROFILE.outputFormat
    },
    option: {
      rate: rate || DEFAULT_VOICE_OPTION.rate,
      pitch: pitch || DEFAULT_VOICE_OPTION.pitch,
      volume: volume || DEFAULT_VOICE_OPTION.volume
    }
  }
}

/**
 * Checks if the given parameters are valid.
 *
 * @param {{input: string, profile: TTS_VOICE_PROFILE, option: TTS_VOICE_OPTION}} param
 * @returns {boolean} Resolves with true if the parameters are valid.
 */
function isValidParams(param): boolean {
  // Todo: Add more validation
  return true;
}

export default defineEventHandler(async (event) => {
  let param = await getParam(event);

  // Check if params are valid
  if (isValidParams(param) === false) {
    // Invalid params
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid params'
    })
  }

  // Convert text to audio
  let result = null;
  try {
    let tts = useTTS();
    tts.setVoiceProfile(param.profile);
    tts.setVoiceOption(param.option ?? DEFAULT_VOICE_OPTION);

    result = await tts.getSoundAsStream(param.input);

  } catch (e) {
    console.error(e);
  }

  return result;
})