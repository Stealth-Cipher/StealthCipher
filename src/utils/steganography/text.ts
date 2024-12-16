import CryptoJS from 'crypto-js';
import { textToBinary, binaryToText, embedBinaryInText, extractBinaryFromText } from './utils';

export const hideTextInText = (message: string, cover: string, key: string): string => {
  const encrypted = CryptoJS.AES.encrypt(message, key).toString();
  const binary = textToBinary(encrypted);
  return embedBinaryInText(binary, cover);
};

export const revealTextFromText = (stegoText: string, key: string): string => {
  try {
    const binary = extractBinaryFromText(stegoText);
    const encrypted = binaryToText(binary);
    const decrypted = CryptoJS.AES.decrypt(encrypted, key);
    return decrypted.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    throw new Error('Failed to reveal message. Please check your encryption key.');
  }
};