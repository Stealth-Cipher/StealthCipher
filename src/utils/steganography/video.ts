import CryptoJS from 'crypto-js';
import { textToBinary, binaryToText } from './utils';

export const hideDataInVideo = async (
  message: string,
  videoFile: File,
  key: string
): Promise<ArrayBuffer> => {
  const encrypted = CryptoJS.AES.encrypt(message, key).toString();
  const binary = textToBinary(encrypted);

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const videoBuffer = e.target?.result as ArrayBuffer;
        const data = new Uint8Array(videoBuffer);

        // Embed binary data in least significant bits
        for (let i = 0; i < binary.length; i++) {
          if (i >= data.length) break;
          data[i] = (data[i] & 254) | parseInt(binary[i]);
        }

        resolve(data.buffer);
      } catch (error) {
        reject(error);
      }
    };
    reader.readAsArrayBuffer(videoFile);
  });
};

export const extractDataFromVideo = async (
  videoUrl: string,
  key: string
): Promise<string> => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(videoUrl);
      const videoBuffer = await response.arrayBuffer();
      const data = new Uint8Array(videoBuffer);

      // Extract binary data from least significant bits
      let binary = '';
      for (let i = 0; i < data.length; i++) {
        binary += (data[i] & 1).toString();
      }

      const encrypted = binaryToText(binary);
      const decrypted = CryptoJS.AES.decrypt(encrypted, key);
      resolve(decrypted.toString(CryptoJS.enc.Utf8));
    } catch (error) {
      reject(new Error('Failed to reveal message. Please check your encryption key.'));
    }
  });
};