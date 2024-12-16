import CryptoJS from 'crypto-js';
import { textToBinary, binaryToText } from './utils';

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