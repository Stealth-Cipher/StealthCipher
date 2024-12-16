import React from 'react';
import { Github, Linkedin, Twitter, MapPin } from 'lucide-react';
import { Developer } from '../../types/developer';
import Card from '../common/Card';
import IconButton from '../common/IconButton';

interface DeveloperCardProps {
  developer: Developer;
  index: number;
}

const DeveloperCard: React.FC<DeveloperCardProps> = ({ developer, index }) => {
  return (
    <Card
      hover
      className="flex flex-col items-center text-center"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <img
        src={developer.image}
        alt={developer.name}
        className="w-24 h-24 rounded-full mb-4 border-2 border-emerald-500"
      />
      <h4 className="text-lg font-semibold text-white mb-1">{developer.name}</h4>
      <p className="text-emerald-500 text-sm mb-2">{developer.role}</p>
      <div className="flex items-center text-gray-400 text-sm mb-3">
        <MapPin className="h-4 w-4 mr-1" />
        {developer.location}
      </div>
      <p className="text-gray-300 text-sm mb-4">{developer.bio}</p>
      <div className="flex space-x-3">
        <IconButton
          icon={<Github className="h-5 w-5" />}
          onClick={() => window.open(developer.social.github, '_blank')}
          className="text-gray-400 hover:text-white"
          aria-label="GitHub Profile"
        />
        <IconButton
          icon={<Linkedin className="h-5 w-5" />}
          onClick={() => window.open(developer.social.linkedin, '_blank')}
          className="text-gray-400 hover:text-white"
          aria-label="LinkedIn Profile"
        />
        <IconButton
          icon={<Twitter className="h-5 w-5" />}
          onClick={() => window.open(developer.social.twitter, '_blank')}
          className="text-gray-400 hover:text-white"
          aria-label="Twitter Profile"
        />
      </div>
    </Card>
  );
};

export default DeveloperCard;