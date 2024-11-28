import { MsEdgeTTS, OUTPUT_FORMAT, PITCH, RATE, VOLUME } from 'msedge-tts';

export type TTS_VOICE_OPTION = {
  rate: RATE,
  pitch: PITCH,
  volume: VOLUME
}

export type TTS_VOICE_PROFILE = {
  voiceName: string,
  outputFormat: OUTPUT_FORMAT
  voiceLocale?: string
}

export const DEFAULT_VOICE_PROFILE: TTS_VOICE_PROFILE = {
  voiceName: "vi-VN-HoaiMyNeural",
  outputFormat: OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3,
  voiceLocale: "vi-VN"
}

export const DEFAULT_VOICE_OPTION: TTS_VOICE_OPTION = {
  rate: RATE.DEFAULT,
  pitch: PITCH.DEFAULT,
  volume: VOLUME.DEFAULT,
};

export const FILE_EXT = {
  WEBM: 'webm',
  MP3: 'mp3',
};

export const OPTION_VOICE_DOC_TRUYEN: TTS_VOICE_OPTION = {
  rate: RATE.FAST,
  pitch: PITCH.DEFAULT,
  volume: VOLUME.DEFAULT,
};

export { OUTPUT_FORMAT, PITCH, RATE, VOLUME }

export class TTSClient {
  private tts: MsEdgeTTS;
  private rate: RATE;
  private pitch: PITCH;
  private volume: VOLUME;

  constructor(profile: TTS_VOICE_PROFILE, option?: TTS_VOICE_OPTION) {
    this.tts = new MsEdgeTTS(null, false);
    this.setVoiceProfile(profile);
    this.setVoiceOption(option ?? DEFAULT_VOICE_OPTION);
  }

  getOption(): TTS_VOICE_OPTION {
    return {
      rate: this.rate,
      pitch: this.pitch,
      volume: this.volume
    }
  }

  setRate(rate: RATE) {
    this.rate = rate;
  }

  setPitch(pitch: PITCH) {
    this.pitch = pitch;
  }

  setVolume(volume: VOLUME) {
    this.volume = volume;
  }

  setVoiceOption(option: TTS_VOICE_OPTION) {
    this.rate = option.rate;
    this.pitch = option.pitch;
    this.volume = option.volume;
  }

  setVoiceProfile(profile: TTS_VOICE_PROFILE) {
    this.tts.setMetadata(profile.voiceName, profile.outputFormat, profile.voiceLocale);
  }

  async getSoundAsStream(input: string) {
    let readable = null;
    let option: TTS_VOICE_OPTION = this.getOption();

    try {
      readable = await this.tts.toStream(input, option);
    } catch (e) {
      console.error(e);
    }

    return readable;
  }

  async getSoundAsFile(input: string, filePath: string) {
    let path = null;
    let option: TTS_VOICE_OPTION = this.getOption();

    try {
      path = await this.tts.toFile(filePath, input, option);
    } catch (e) {
      console.error(e);
    }

    return path;
  }
}

export function useTTS(profile: TTS_VOICE_PROFILE, option: TTS_VOICE_OPTION) {
  return new TTSClient(profile, option);
}