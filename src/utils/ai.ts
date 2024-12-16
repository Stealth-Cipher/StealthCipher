import OpenAI from 'openai';
import { getOpenAIKey, checkApiKey } from '../config/api';

const getOpenAIClient = (isAdmin: boolean = false) => {
  const apiKey = getOpenAIKey(isAdmin);
  if (!checkApiKey(apiKey)) {
    throw new Error('OpenAI API key not configured. Please add your API key to the .env file.');
  }

  return new OpenAI({
    apiKey,
    dangerouslyAllowBrowser: true
  });
};

export const generateText = async (prompt: string, useAdminKey: boolean = false): Promise<{ text: string; error?: string }> => {
  try {
    const openai = getOpenAIClient(useAdminKey);
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });
    return { text: response.choices[0].message.content || '' };
  } catch (error: any) {
    console.error('Error generating text:', error);
    return { 
      text: '', 
      error: error.message || 'Error generating text. Please check your API key and try again.' 
    };
  }
};

export const generateImage = async (prompt: string, useAdminKey: boolean = false): Promise<{ url: string; error?: string }> => {
  try {
    const openai = getOpenAIClient(useAdminKey);
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt,
      n: 1,
      size: "1024x1024",
    });
    return { url: response.data[0].url || '' };
  } catch (error: any) {
    console.error('Error generating image:', error);
    return { 
      url: '', 
      error: error.message || 'Error generating image. Please check your API key and try again.' 
    };
  }
};

export const generateAudio = async (prompt: string, useAdminKey: boolean = false): Promise<{ url: string; error?: string }> => {
  try {
    const openai = getOpenAIClient(useAdminKey);
    const response = await openai.audio.speech.create({
      model: "tts-1",
      voice: "alloy",
      input: prompt,
    });

    const blob = new Blob([await response.arrayBuffer()], { type: 'audio/mpeg' });
    const url = URL.createObjectURL(blob);
    return { url };
  } catch (error: any) {
    console.error('Error generating audio:', error);
    return {
      url: '',
      error: error.message || 'Error generating audio. Please check your API key and try again.'
    };
  }
};

export const generateVideo = async (prompt: string, useAdminKey: boolean = false): Promise<{ url: string; error?: string }> => {
  // Note: OpenAI doesn't have direct video generation yet
  return {
    url: '',
    error: 'Video generation is not yet available through the OpenAI API'
  };
};