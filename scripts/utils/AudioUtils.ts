import Crunker from "crunker";

class AudioUtils {
  private crunker: Crunker;
  private audioList: AudioBuffer[] = [];

  constructor() {
    this.crunker = new Crunker();
  }
  async fetchAudio(...audioSources: string[]) {
    this.audioList = await this.crunker.fetchAudio(...audioSources);
  }
  async concat(audioSources: string[]) {
    await this.fetchAudio(...audioSources)
    return this.crunker.concatAudio(this.audioList);
  }
  async export(audioBuffer: AudioBuffer, mimeType: string = "audio/wav") {
    return this.crunker.export(audioBuffer, mimeType);
  }
}

export default AudioUtils;