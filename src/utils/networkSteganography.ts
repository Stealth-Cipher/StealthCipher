import CryptoJS from 'crypto-js';
import { textToBinary, binaryToText } from './steganographyUtils';

export const hideDataInPacket = (message: string, key: string): Uint8Array => {
  const encrypted = CryptoJS.AES.encrypt(message, key).toString();
  const binary = textToBinary(encrypted);
  
  // Simulate network packet
  const packet = new Uint8Array(1500); // Standard MTU size
  
  // Add binary data to packet timing intervals
  for (let i = 0; i < binary.length; i++) {
    packet[i] = parseInt(binary[i]) === 1 ? 255 : 0;
  }
  
  return packet;
};

export const extractDataFromPacket = (packet: Uint8Array, key: string): string => {
  try {
    // Extract binary data from packet timing intervals
    let binary = '';
    for (let i = 0; i < packet.length; i++) {
      binary += packet[i] === 255 ? '1' : '0';
    }

    const encrypted = binaryToText(binary);
    const decrypted = CryptoJS.AES.decrypt(encrypted, key);
    return decrypted.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    throw new Error('Failed to extract data from packet. Please check your encryption key.');
  }
};