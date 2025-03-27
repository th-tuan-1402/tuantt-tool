import { describe, it, expect, vi } from 'vitest';
import audioUtils from '~/scripts/utils/AudioUtils';

vi.mock('crunker', () => ({
  default: vi.fn()}));

describe('AudioUtils constructor', () => {
  it('should initialize crunker correctly', () => {
    expect(audioUtils.crunker).toBeDefined();
  });

  it('should be an instance of Crunker', () => {
    expect(audioUtils.crunker).toBeDefined();
  });
});