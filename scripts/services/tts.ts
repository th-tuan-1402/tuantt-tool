import { MsEdgeTTS, OUTPUT_FORMAT, PITCH, RATE, VOLUME } from 'msedge-tts';

const FILE_EXT = {
  WEBM: 'webm',
  MP3: 'mp3',
};
const OPTION_VOICE_DOC_TRUYEN = {
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

  constructor({ metadata }: { metadata: TTSMetaData }) {
    this.tts = new MsEdgeTTS();

    const { voiceName, outputFormat, voiceLocale } = metadata;
    this.tts.setMetadata(voiceName, outputFormat, voiceLocale);
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
}

export default function createTTSClient(options: { metadata: TTSMetaData }) {
  const tts = new TTSClient(options);
  return tts;
}