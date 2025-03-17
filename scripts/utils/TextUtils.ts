/**
 * Split text into smaller size chunk
 * @param string text
 * @param int maxWords
 * @returns string[] chunks
 */
export function splitIntoChunkWordCount(text: string, maxWords:number = 2000) {
  // Split the text into sentences
  const sentences = text.match(/[^\.!\?]+[\.!\?]*/g);
  if (!sentences) return [];

  let paragraphs = [];
  let currentParagraph = "";
  let currentWordCount = 0;

  sentences.forEach((sentence) => {
    const wordCount = sentence.split(/\s+/).length;

    // If adding the current sentence would exceed the word limit
    if (currentWordCount + wordCount > maxWords) {
      // End the current paragraph and start a new one
      paragraphs.push(currentParagraph.trim());
      currentParagraph = "";
      currentWordCount = 0;
    }

    // Add the sentence to the current paragraph
    currentParagraph += (currentParagraph ? " " : "") + sentence.trim();
    currentWordCount += wordCount;
  });

  // Add the last paragraph if there is any content left
  if (currentParagraph.trim()) {
    paragraphs.push(currentParagraph.trim());
  }

  return paragraphs;
}

/**
     * Escape unsafe xml characters
     * @param string unsafe
     * @returns string safe string
     */
export function escapeXml(unsafe: string) {
  return unsafe
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}