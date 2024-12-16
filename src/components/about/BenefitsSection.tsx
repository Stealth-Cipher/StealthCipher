import React from 'react';
import { Lock, Key } from 'lucide-react';
import { Link } from 'react-router-dom';

const BenefitsSection = () => {
  return (
    <div>
      <h3 className="text-xl font-semibold text-white mb-4">Privacy & Security</h3>
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
  );
};

export default BenefitsSection;