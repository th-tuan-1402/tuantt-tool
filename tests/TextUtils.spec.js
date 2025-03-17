import { describe, it, expect } from 'vitest'
import { splitIntoChunkWordCount } from '~/scripts/utils/TextUtils'

describe('splitIntoChunkWordCount', () => {
  it('returns empty array for empty text', () => {
    const text = ''
    const result = splitIntoChunkWordCount(text)
    expect(result).toEqual([])
  })

  it('returns single paragraph for text with one sentence without dot', () => {
    const text = 'hello world'
    const result = splitIntoChunkWordCount(text)
    expect(result).toEqual(['hello world'])
  })

  it('returns single paragraph for text with one sentence', () => {
    const text = 'This is a sentence.'
    const result = splitIntoChunkWordCount(text)
    expect(result).toEqual(['This is a sentence.'])
  })

  it('returns multiple paragraphs for text with multiple sentences', () => {
    const text = 'This is a sentence. This is another sentence.'
    const result = splitIntoChunkWordCount(text, 4)
    expect(result).toEqual(['This is a sentence.', 'This is another sentence.'])
  })

  it('splits text into multiple paragraphs when exceeding max words', () => {
    const text = 'This is a very long sentence that exceeds the max words. This is another sentence.'
    const result = splitIntoChunkWordCount(text, 12)
    expect(result).toEqual(['This is a very long sentence that exceeds the max words.', 'This is another sentence.'])
  })

  it('does not split text into multiple paragraphs when not exceeding max words', () => {
    const text = 'This is a short sentence. This is another short sentence.'
    const result = splitIntoChunkWordCount(text, 20)
    expect(result).toEqual(['This is a short sentence. This is another short sentence.'])
  })
})