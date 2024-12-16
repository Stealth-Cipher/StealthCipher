import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Shield, 
  FileText, 
  Image, 
  Video, 
  Music, 
  Network, 
  Lock, 
  Key, 
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

const Landing = () => {
  const features = [
    {
      icon: FileText,
      title: 'Text Steganography',
      description: 'Hide messages within innocent-looking text using zero-width characters and advanced algorithms.',
      path: '/text',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Image,
      title: 'Image Steganography',
      description: 'Embed secret data within images using LSB (Least Significant Bit) technique.',
      path: '/image',
      color: 'from-emerald-500 to-green-500'
    },
    {
      icon: Video,
      title: 'Video Steganography',
      description: 'Conceal messages in video files without noticeable quality loss.',
      path: '/video',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Music,
      title: 'Audio Steganography',
      description: 'Hide data within audio files using advanced signal processing.',
      path: '/audio',
      color: 'from-orange-500 to-red-500'
    }
  ];

  const benefits = [
    'End-to-end encryption for maximum security',
    'Client-side processing - your data never leaves your device',
    'Support for multiple file formats',
    'AI-powered content generation',
    'User-friendly interface',
    'Cross-platform compatibility'
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557264305-7e2764da873b?auto=format&fit=crop&q=80')] opacity-10 bg-center bg-cover" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Shield className="h-20 w-20 text-emerald-500 mx-auto mb-8" />
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Secure Your Messages with
              <span className="bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent">
                {' '}StealthCipher
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12">
              Advanced steganography platform for hiding sensitive information within various media types.
              Protect your communications with military-grade encryption.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/register"
                className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-blue-500 text-white rounded-lg font-medium hover:from-emerald-600 hover:to-blue-600 transition-all duration-200 flex items-center group"
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/about"
                className="px-8 py-4 bg-white/10 text-white rounded-lg font-medium hover:bg-white/20 transition-all duration-200"
              >
                Learn More
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-black/90 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">
              Comprehensive Steganography Solutions
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Choose from multiple steganography methods to hide your sensitive information
              securely within different types of media files.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  to={feature.path}
                  className="block h-full group"
                >
                  <div className="h-full bg-black/50 backdrop-blur-md border border-white/10 rounded-xl p-6 hover:bg-black/60 transition-all duration-300 hover:scale-105 hover:shadow-xl">
                    <div className={`inline-block p-3 rounded-lg bg-gradient-to-br ${feature.color} mb-4 group-hover:scale-110 transition-transform`}>
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

      {/* Benefits Section */}
      <div className="bg-gradient-to-b from-black/90 to-gray-900 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">
                Why Choose StealthCipher?
              </h2>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={benefit}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-start space-x-3"
                  >
                    <CheckCircle2 className="h-6 w-6 text-emerald-500 flex-shrink-0 mt-1" />
                    <p className="text-gray-300">{benefit}</p>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-2xl transform rotate-3" />
              <div className="relative bg-black/90 p-8 rounded-2xl border border-white/10">
                <Lock className="h-12 w-12 text-emerald-500 mb-6" />
                <h3 className="text-2xl font-bold text-white mb-4">
                  Military-Grade Security
                </h3>
                <p className="text-gray-300 mb-6">
                  Our platform uses advanced encryption algorithms and steganography techniques
                  to ensure your messages remain completely hidden and secure.
                </p>
                <Link
                  to="/register"
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-emerald-500 to-blue-500 text-white rounded-lg font-medium hover:from-emerald-600 hover:to-blue-600 transition-all duration-200"
                >
                  Start Securing Messages
                  <Key className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;