import { MsEdgeTTS, OUTPUT_FORMAT, PITCH, RATE, VOLUME } from 'msedge-tts';

export type TTS_VOICE_OPTION = {
  rate: RATE,
  pitch: PITCH,
  volume: VOLUME
}

const FILE_EXT = {
  WEBM: 'webm',
  MP3: 'mp3',
};

const OPTION_VOICE_DOC_TRUYEN: TTS_VOICE_OPTION = {
  rate: RATE.FAST,
  pitch: PITCH.DEFAULT,
  volume: VOLUME.DEFAULT,
};

export { OUTPUT_FORMAT, PITCH, RATE, VOLUME }
export { FILE_EXT, OPTION_VOICE_DOC_TRUYEN }

export type TTSMetaData = {
  voiceName: string,
  outputFormat: OUTPUT_FORMAT,
  voiceLocale?: string
}

export class TTSClient {
  private tts: MsEdgeTTS;
  private rate: RATE;
  private pitch: PITCH;
  private volume: VOLUME;

  constructor({ metadata }: { metadata: TTSMetaData }) {
    this.tts = new MsEdgeTTS(null, false);

    const { voiceName, outputFormat, voiceLocale } = metadata;
    this.tts.setMetadata(voiceName, outputFormat, voiceLocale);
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

  async convertToSound(input: string, filePath: string) {
    let path = null;

    try {
      path = await this.tts.toFile(
        filePath,
        input,
        OPTION_VOICE_DOC_TRUYEN
      );
    } catch (e) {
      console.error(e);
    }

    return path;
  }

  async convertToStream(input: string) {
    let readable = null;

    try {
      readable = await this.tts.toStream(
        input,
        OPTION_VOICE_DOC_TRUYEN
      );
    } catch (e) {
      console.error(e);
    }

    return readable;
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

export function createTTSClient(options: { metadata: TTSMetaData }) {
  const tts = new TTSClient(options);
  return tts;
}

export function useTTS(voiceName: string, outputFormat: OUTPUT_FORMAT, rate: RATE, pitch: PITCH, volume: VOLUME) {
  const tts = new TTSClient({ metadata: { voiceName, outputFormat } });
  tts.setRate(rate);
  tts.setPitch(pitch);
  tts.setVolume(volume);

  return tts;
}