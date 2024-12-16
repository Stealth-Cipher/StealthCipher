import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../navigation/Navbar';
import ParticlesBackground from './ParticlesBackground';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white relative overflow-hidden">
      <ParticlesBackground />
      <div className="relative z-10">
        <Navbar />
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="pt-16"
        >
          {children}
        </motion.main>
      </div>
    </div>
  );
};

export default MainLayout;