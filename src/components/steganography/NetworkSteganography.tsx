import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Network, Lock, Eye, EyeOff, AlertCircle, Download } from 'lucide-react';
import { hideDataInPacket, extractDataFromPacket } from '../../utils/networkSteganography';

const NetworkSteganography = () => {
  const [message, setMessage] = useState('');
  const [key, setKey] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [mode, setMode] = useState<'hide' | 'reveal'>('hide');
  const [result, setResult] = useState<string>('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      if (mode === 'hide') {
        const packet = hideDataInPacket(message, key);
        const packetString = Array.from(packet).join(',');
        setResult(packetString);
      } else {
        const packet = new Uint8Array(result.split(',').map(Number));
        const revealed = extractDataFromPacket(packet, key);
        setResult(revealed);
      }
    } catch (error: any) {
      setError(error.message || 'Error processing network data. Please check your inputs and key.');
    }
  };

  const handleDownload = () => {
    if (result) {
      const blob = new Blob([result], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = mode === 'hide' ? 'network-packet.txt' : 'revealed-message.txt';
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
            <Network className="h-8 w-8 text-emerald-500" />
            <h2 className="text-2xl font-bold text-white">Network Steganography</h2>
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
                  onClick={() => {
                    setMode(m as 'hide' | 'reveal');
                    setResult('');
                  }}
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
            {mode === 'hide' ? (
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
            ) : (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Network Packet Data
                </label>
                <textarea
                  value={result}
                  onChange={(e) => setResult(e.target.value)}
                  className="w-full px-4 py-2 bg-black/30 border border-white/10 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-white placeholder-gray-500 h-32"
                  placeholder="Enter the network packet data"
                  required
                />
              </div>
            )}

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

          {result && mode === 'hide' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-6"
            >
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-300">
                  Network Packet Data
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

export default NetworkSteganography;