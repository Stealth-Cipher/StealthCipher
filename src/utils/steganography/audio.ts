import CryptoJS from 'crypto-js';
import { textToBinary, binaryToText } from './utils';

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