import React from 'react';
import { socialLinks } from '../../data/social';

const SocialSection = () => {
  return (
    <div>
      <h3 className="text-xl font-semibold text-white mb-4">Connect With Us</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {socialLinks.map((item) => (
          <a
            key={item.label}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-3 p-4 rounded-lg bg-black/30 border border-white/10 hover:bg-black/40 transition-colors"
          >
            <item.icon className="h-5 w-5 text-emerald-500" />
            <div>
              <p className="text-sm text-gray-400">{item.label}</p>
              <p className="text-white">{item.value}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default SocialSection;