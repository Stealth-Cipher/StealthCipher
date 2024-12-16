import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings as SettingsIcon, User, Lock } from 'lucide-react';
import ProfileSettings from './ProfileSettings';
import ChangePassword from './ChangePassword';

const Settings = () => {
  const [activeTab, setActiveTab] = useState<'profile' | 'security'>('profile');

  return (
    <div className="min-h-[calc(100vh-4rem)] p-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center space-x-3 mb-8">
            <SettingsIcon className="h-8 w-8 text-emerald-500" />
            <h2 className="text-2xl font-bold text-white">Settings</h2>
          </div>

          <div className="mb-8">
            <div className="flex space-x-4">
              <button
                onClick={() => setActiveTab('profile')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'profile'
                    ? 'bg-emerald-500 text-white'
                    : 'bg-black/30 text-gray-300 hover:bg-black/50'
                }`}
              >
                <User className="h-5 w-5" />
                <span>Profile</span>
              </button>
              <button
                onClick={() => setActiveTab('security')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'security'
                    ? 'bg-emerald-500 text-white'
                    : 'bg-black/30 text-gray-300 hover:bg-black/50'
                }`}
              >
                <Lock className="h-5 w-5" />
                <span>Security</span>
              </button>
            </div>
          </div>

          {activeTab === 'profile' ? <ProfileSettings /> : <ChangePassword />}
        </motion.div>
      </div>
    </div>
  );
};

export default Settings;