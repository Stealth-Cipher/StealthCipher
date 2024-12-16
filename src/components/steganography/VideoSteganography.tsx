import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Video as VideoIcon, Lock, Eye, EyeOff, Upload, Download, Wand2, AlertCircle } from 'lucide-react';
import { hideDataInVideo, extractDataFromVideo } from '../../utils/steganography';
import { generateVideo } from '../../utils/ai';

const VideoSteganography = () => {
  const [message, setMessage] = useState('');
  const [key, setKey] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [mode, setMode] = useState<'hide' | 'reveal'>('hide');
  const [selectedVideo, setSelectedVideo] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string>('');
  const [generating, setGenerating] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [error, setError] = useState('');
  const [result, setResult] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleVideoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedVideo(file);
      setVideoUrl(URL.createObjectURL(file));
    }
  };

  const handleGenerateVideo = async () => {
    if (!prompt) return;
    setGenerating(true);
    setError('');
    
    try {
      const { url, error: genError } = await generateVideo(prompt);
      if (genError) {
        setError(genError);
        return;
      }
      
      if (url) {
        setVideoUrl(url);
        const response = await fetch(url);
        const blob = await response.blob();
        const file = new File([blob], 'generated-video.mp4', { type: 'video/mp4' });
        setSelectedVideo(file);
      }
    } catch (error: any) {
      setError(error.message || 'Error generating video');
    } finally {
      setGenerating(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      if (mode === 'hide' && selectedVideo) {
        const stegoVideo = await hideDataInVideo(message, selectedVideo, key);
        const blob = new Blob([stegoVideo], { type: selectedVideo.type });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'stego-video.' + selectedVideo.name.split('.').pop();
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      } else if (mode === 'reveal' && selectedVideo) {
        const revealed = await extractDataFromVideo(videoUrl, key);
        setResult(revealed);
      }
    } catch (error: any) {
      setError(error.message || 'Error processing video. Please check your inputs and key.');
    }
  };

  const handleDownload = () => {
    if (result) {
      const blob = new Blob([result], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'revealed-message.txt';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
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
            <VideoIcon className="h-8 w-8 text-emerald-500" />
            <h2 className="text-2xl font-bold text-white">Video Steganography</h2>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-6 p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-2 text-red-500"
            >
              <AlertCircle className="h-5 w-5" />
              <p className="text-sm">{error}</p>
            </motion.div>
          )}

          <div className="mb-6">
            <div className="flex space-x-4">
              {['hide', 'reveal'].map((m) => (
                <button
                  key={m}
                  onClick={() => setMode(m as 'hide' | 'reveal')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    mode === m
                      ? 'bg-emerald-500 text-white'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  {m.charAt(0).toUpperCase() + m.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {mode === 'hide' && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Secret Message
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-2 bg-black/30 border border-white/10 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-white placeholder-gray-500 h-32"
                  placeholder="Enter your secret message"
                  required
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                {mode === 'hide' ? 'Cover Video' : 'Steganographic Video'}
              </label>
              {mode === 'hide' && (
                <div className="mb-4">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      placeholder="Enter a prompt to generate a video..."
                      className="flex-1 px-4 py-2 bg-black/30 border border-white/10 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-white placeholder-gray-500"
                    />
                    <button
                      type="button"
                      onClick={handleGenerateVideo}
                      disabled={generating || !prompt}
                      className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Wand2 className="h-4 w-4" />
                      {generating ? 'Generating...' : 'Generate'}
                    </button>
                  </div>
                </div>
              )}
              <div
                onClick={() => fileInputRef.current?.click()}
                className="w-full h-64 border-2 border-dashed border-gray-600 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-emerald-500 transition-colors"
              >
                {videoUrl ? (
                  <video
                    controls
                    className="max-h-full max-w-full"
                  >
                    <source src={videoUrl} type={selectedVideo?.type || 'video/mp4'} />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <div className="text-center">
                    <Upload className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-400">Click to select a video</p>
                  </div>
                )}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="video/*"
                onChange={handleVideoSelect}
                className="hidden"
                required
              />
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
              {mode === 'hide' ? 'Hide Message' : 'Reveal Message'}
            </button>
          </form>

          {result && mode === 'reveal' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-6"
            >
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-300">
                  Revealed Message
                </label>
                <button
                  onClick={handleDownload}
                  className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
                >
                  <Download className="h-4 w-4" />
                  Download
                </button>
              </div>
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

export default VideoSteganography;