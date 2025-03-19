export default defineEventHandler(async (event) => {
  let tts = useTTS();
  let voiceList = await tts.getVoiceList();
  let genderSelectionList = ['Male', 'Female'];
  let localeList = getUniqueLocalList(voiceList);
  let localeSelectionList = getLocaleSelectionList(voiceList);

  return { voiceList, genderSelectionList, localeList, localeSelectionList };
})

function getUniqueLocalList(voiceList) {
  let localeList = new Set();

  voiceList.forEach(voice => {
    localeList.add(voice.Locale);
  });

  return Array.from(localeList);
}

function getLocaleSelectionList(voiceList) {
  let localeSelectionList = [];
  for (let i = 0; i < voiceList.length; i++) {
    let voice = voiceList[i];
    const isContainLocale = localeSelectionList.some((locale) => locale.value === voice.Locale);

    if (!isContainLocale) {
      let countryIndex = voice.FriendlyName.indexOf('-', voice.FriendlyName) + 1
      let country = voice.FriendlyName.substring(countryIndex).trim();
      let locale = voice.Locale;
      localeSelectionList.push({ text:country, value: locale });
    }
  }

  return localeSelectionList;
}