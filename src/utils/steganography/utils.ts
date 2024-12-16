// Text to binary conversion
export const textToBinary = (text: string): string => {
  return text.split('').map(char => 
    char.charCodeAt(0).toString(2).padStart(8, '0')
  ).join('');
};

// Binary to text conversion
export const binaryToText = (binary: string): string => {
  const chunks = binary.match(/.{1,8}/g) || [];
  return chunks.map(chunk => 
    String.fromCharCode(parseInt(chunk, 2))
  ).join('');
};

// Zero-width character embedding
export const embedBinaryInText = (binary: string, cover: string): string => {
  let binaryIndex = 0;
  return cover.split('').map(char => {
    if (binaryIndex >= binary.length) return char;
    if (char === ' ' || char === '\n') {
      const bit = binary[binaryIndex++];
      return char + (bit === '1' ? '\u200B' : '\u200C');
    }
    return char;
  }).join('');
};

// Zero-width character extraction
export const extractBinaryFromText = (stegoText: string): string => {
  return stegoText.split('')
    .filter(char => char === '\u200B' || char === '\u200C')
    .map(char => char === '\u200B' ? '1' : '0')
    .join('');
};