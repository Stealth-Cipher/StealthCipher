import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FileText, Image, Video, Music, Network, Key } from 'lucide-react';

const features = [
  {
    icon: FileText,
    title: 'Text Steganography',
    description: 'Hide messages within innocent-looking text using advanced algorithms.',
    path: '/text',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Image,
    title: 'Image Steganography',
    description: 'Conceal data within images without visible changes.',
    path: '/image',
    color: 'from-emerald-500 to-green-500',
  },
  {
    icon: Video,
    title: 'Video Steganography',
    description: 'Embed secret messages in video files securely.',
    path: '/video',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: Music,
    title: 'Audio Steganography',
    description: 'Hide data within audio files imperceptibly.',
    path: '/audio',
    color: 'from-orange-500 to-red-500',
  },
  {
    icon: Network,
    title: 'Network Steganography',
    description: 'Conceal data within network protocols and traffic.',
    path: '/network',
    color: 'from-yellow-500 to-orange-500',
  },
  {
    icon: Key,
    title: 'Reveal Hidden Data',
    description: 'Extract and decrypt hidden messages from various media.',
    path: '/reveal',
    color: 'from-indigo-500 to-purple-500',
  },
];

const Dashboard = () => {
  return (
    <div className="min-h-[calc(100vh-4rem)] p-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent mb-4">
            Welcome to StealthCipher
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Your comprehensive platform for secure data hiding across multiple media types.
            Choose your preferred steganography method below.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link
                to={feature.path}
                className="block h-full"
              >
                <div className="h-full bg-black/50 backdrop-blur-md border border-white/10 rounded-xl p-6 hover:bg-black/60 transition-all duration-300 hover:scale-105 hover:shadow-xl">
                  <div className={`inline-block p-3 rounded-lg bg-gradient-to-br ${feature.color} mb-4`}>
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;