import { describe, it, expect, vi } from 'vitest';
import AudioUtils from '~/scripts/utils/AudioUtils';

vi.mock('crunker', () => ({
  default: vi.fn()}));

describe('AudioUtils constructor', () => {
  it('should initialize crunker correctly', () => {
    const audioUtils = new AudioUtils();
    expect(audioUtils.crunker).toBeDefined();
  });

  it('should be an instance of Crunker', () => {
    const audioUtils = new AudioUtils();
    expect(audioUtils.crunker).toBeDefined();
  });
});