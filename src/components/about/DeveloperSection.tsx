import React from 'react';
import { Developer } from '../../types/developer';
import DeveloperCard from './DeveloperCard';

interface DeveloperSectionProps {
  developers: Developer[];
}

const DeveloperSection: React.FC<DeveloperSectionProps> = ({ developers }) => {
  return (
    <div>
      <h3 className="text-xl font-semibold text-white mb-6">Meet Our Team</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {developers.map((dev, index) => (
          <DeveloperCard
            key={dev.name}
            developer={dev}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default DeveloperSection;