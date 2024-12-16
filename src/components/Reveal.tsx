import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Key, Lock, Eye, EyeOff, Upload } from 'lucide-react';
import { 
  revealTextFromText, 
  extractDataFromImage,
  extractDataFromVideo,
  extractDataFromAudio
} from '../utils/steganography';

const Reveal = () => {
  const [stegoData, setStegoData] = useState('');
  const [key, setKey] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [result, setResult] = useState('');
  const [type, setType] = useState<'text' | 'image' | 'video' | 'audio' | 'network'>('text');
  const [file, setFile] = useState<File | null>(null);
  const [mediaUrl, setMediaUrl] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setMediaUrl(URL.createObjectURL(selectedFile));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let revealed = '';
      switch (type) {
        case 'text':
          revealed = revealTextFromText(stegoData, key);
          break;
        case 'image':
          if (!mediaUrl) throw new Error('Please select an image');
          revealed = await extractDataFromImage(mediaUrl, key);
          break;
        case 'video':
          if (!mediaUrl) throw new Error('Please select a video');
          revealed = await extractDataFromVideo(mediaUrl, key);
          break;
        case 'audio':
          if (!file) throw new Error('Please select an audio file');
          revealed = await extractDataFromAudio(file, key);
          break;
      }
      setResult(revealed);
    } catch (error: any) {
      setResult('Error revealing data: ' + error.message);
    }
  };

  const renderMediaInput = () => {
    if (type === 'text') {
      return (
        <textarea
          value={stegoData}
          onChange={(e) => setStegoData(e.target.value)}
          className="w-full px-4 py-2 bg-black/30 border border-white/10 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-white placeholder-gray-500 h-32"
          placeholder="Enter steganographic data"
          required
        />
      );
    }

    return (
      <div>
        <div
          onClick={() => fileInputRef.current?.click()}
          className="w-full h-64 border-2 border-dashed border-gray-600 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-emerald-500 transition-colors"
        >
          {mediaUrl ? (
            type === 'image' ? (
              <img
                src={mediaUrl}
                alt="Selected media"
                className="max-h-full max-w-full object-contain"
              />
            ) : type === 'video' ? (
              <video controls className="max-h-full max-w-full">
                <source src={mediaUrl} type={file?.type} />
                Your browser does not support the video tag.
              </video>
            ) : (
              <audio controls className="w-full">
                <source src={mediaUrl} type={file?.type} />
                Your browser does not support the audio element.
              </audio>
            )
          ) : (
            <div className="text-center">
              <Upload className="h-12 w-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-400">Click to select a {type} file</p>
            </div>
          )}
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept={
            type === 'image' 
              ? 'image/*' 
              : type === 'video' 
                ? 'video/*' 
                : 'audio/*'
          }
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>
    );
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] p-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-black/50 backdrop-blur-md rounded-xl p-8 border border-white/10"
        >
          <div className="flex items-center space-x-3 mb-8">
            <Key className="h-8 w-8 text-emerald-500" />
            <h2 className="text-2xl font-bold text-white">Reveal Hidden Data</h2>
          </div>

          <div className="mb-6">
            <div className="flex space-x-4">
              {['text', 'image', 'video', 'audio'].map((t) => (
                <button
                  key={t}
                  onClick={() => {
                    setType(t as typeof type);
                    setFile(null);
                    setMediaUrl('');
                    setStegoData('');
                    setResult('');
                  }}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    type === t
                      ? 'bg-emerald-500 text-white'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Steganographic {type.charAt(0).toUpperCase() + type.slice(1)}
              </label>
              {renderMediaInput()}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Encryption Key
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type={showKey ? 'text' : 'password'}
                  value={key}
                  onChange={(e) => setKey(e.target.value)}
                  className="w-full pl-10 pr-12 py-2 bg-black/30 border border-white/10 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-white placeholder-gray-500"
                  placeholder="Enter encryption key"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowKey(!showKey)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showKey ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-gradient-to-r from-emerald-500 to-blue-500 text-white rounded-lg hover:from-emerald-600 hover:to-blue-600 transition-all duration-200 font-medium focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
            >
              Reveal Hidden Data
            </button>
          </form>

          {result && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-6"
            >
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Revealed Data
              </label>
              <textarea
                value={result}
                readOnly
                className="w-full px-4 py-2 bg-black/30 border border-white/10 rounded-lg text-white h-32"
              />
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Reveal;