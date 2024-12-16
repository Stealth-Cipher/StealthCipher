import React from 'react';
import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';
import { developers } from '../data/team';
import ContactSection from './about/ContactSection';
import SocialSection from './about/SocialSection';
import DeveloperSection from './about/DeveloperSection';
import MissionSection from './about/MissionSection';
import BenefitsSection from './about/BenefitsSection';
import PageContainer from './common/PageContainer';

const About = () => {
  return (
    <PageContainer>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-black/50 backdrop-blur-md rounded-xl p-8 border border-white/10"
      >
        <div className="flex items-center space-x-3 mb-8">
          <Shield className="h-8 w-8 text-emerald-500" />
          <h2 className="text-2xl font-bold text-white">About StealthCipher</h2>
        </div>

        <div className="space-y-12">
          <MissionSection />
          <DeveloperSection developers={developers} />
          <ContactSection />
          <SocialSection />
          <BenefitsSection />
        </div>
      </motion.div>
    </PageContainer>
  );
};

export default About;