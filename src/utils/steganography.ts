import CryptoJS from 'crypto-js';
import { textToBinary, binaryToText } from './steganographyUtils';

// Text Steganography
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

// Image Steganography
export const hideDataInImage = async (
  message: string,
  imageFile: File,
  key: string
): Promise<string> => {
  const encrypted = CryptoJS.AES.encrypt(message, key).toString();
  const binary = textToBinary(encrypted);
  
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const img = new Image();
        img.src = e.target?.result as string;
        await new Promise(resolve => img.onload = resolve);

        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        
        const ctx = canvas.getContext('2d');
        if (!ctx) throw new Error('Could not get canvas context');

        ctx.drawImage(img, 0, 0);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        // Embed binary data in least significant bits
        for (let i = 0; i < binary.length; i++) {
          const pixelIndex = i * 4;
          if (pixelIndex >= data.length) break;
          data[pixelIndex] = (data[pixelIndex] & 254) | parseInt(binary[i]);
        }

        ctx.putImageData(imageData, 0, 0);
        resolve(canvas.toDataURL());
      } catch (error) {
        reject(error);
      }
    };
    reader.readAsDataURL(imageFile);
  });
};

export const extractDataFromImage = async (
  imageData: string,
  key: string
): Promise<string> => {
  return new Promise((resolve, reject) => {
    try {
      const img = new Image();
      img.src = imageData;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        
        const ctx = canvas.getContext('2d');
        if (!ctx) throw new Error('Could not get canvas context');

        ctx.drawImage(img, 0, 0);
        const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

        // Extract binary data from least significant bits
        let binary = '';
        for (let i = 0; i < data.length; i += 4) {
          binary += (data[i] & 1).toString();
        }

        const encrypted = binaryToText(binary);
        const decrypted = CryptoJS.AES.decrypt(encrypted, key);
        resolve(decrypted.toString(CryptoJS.enc.Utf8));
      };
    } catch (error) {
      reject(new Error('Failed to reveal message. Please check your encryption key.'));
    }
  });
};

// Audio Steganography
export const hideDataInAudio = async (
  message: string,
  audioFile: File,
  key: string
): Promise<ArrayBuffer> => {
  const encrypted = CryptoJS.AES.encrypt(message, key).toString();
  const binary = textToBinary(encrypted);

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const audioContext = new AudioContext();
        const audioBuffer = await audioContext.decodeAudioData(e.target?.result as ArrayBuffer);
        const data = audioBuffer.getChannelData(0);

        // Embed binary data in least significant bits
        for (let i = 0; i < binary.length; i++) {
          if (i >= data.length) break;
          data[i] = Math.floor(data[i] * 10000) / 10000 + (parseInt(binary[i]) * 0.0001);
        }

        const newBuffer = audioContext.createBuffer(
          audioBuffer.numberOfChannels,
          audioBuffer.length,
          audioBuffer.sampleRate
        );
        newBuffer.copyToChannel(data, 0);

        resolve(newBuffer.getChannelData(0).buffer);
      } catch (error) {
        reject(error);
      }
    };
    reader.readAsArrayBuffer(audioFile);
  });
};

export const extractDataFromAudio = async (
  audioFile: File,
  key: string
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const audioContext = new AudioContext();
        const audioBuffer = await audioContext.decodeAudioData(e.target?.result as ArrayBuffer);
        const data = audioBuffer.getChannelData(0);

        // Extract binary data from least significant bits
        let binary = '';
        for (let i = 0; i < data.length; i++) {
          binary += Math.abs(data[i] % 0.0001) > 0.00005 ? '1' : '0';
        }

        const encrypted = binaryToText(binary);
        const decrypted = CryptoJS.AES.decrypt(encrypted, key);
        resolve(decrypted.toString(CryptoJS.enc.Utf8));
      } catch (error) {
        reject(new Error('Failed to extract data from audio. Please check your encryption key.'));
      }
    };
    reader.readAsArrayBuffer(audioFile);
  });
};

// Video Steganography
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

// Helper functions
const embedBinaryInText = (binary: string, cover: string): string => {
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

const extractBinaryFromText = (stegoText: string): string => {
  return stegoText.split('')
    .filter(char => char === '\u200B' || char === '\u200C')
    .map(char => char === '\u200B' ? '1' : '0')
    .join('');
};