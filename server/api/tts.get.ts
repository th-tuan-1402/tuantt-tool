export default defineEventHandler(async (event) => {
  let tts = useTTS();
  let voiceList = await tts.getVoiceList();

  return { voiceList };
})