import { Github, Linkedin, Twitter, Youtube } from 'lucide-react';
import { SocialLink } from '../types/social';

export const socialLinks: SocialLink[] = [
  {
    icon: Github,
    label: 'GitHub',
    value: '@Stealth-Cipher',
    link: 'https://github.com/Stealth-Cipher'
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'StealthCipher',
    link: 'hhttps://www.linkedin.com/in/stealthcipher-jaffer'
  },
  {
    icon: Twitter,
    label: 'Twitter',
    value: '@Stealth__Cipher',
    link: 'https://x.com/Stealth__Cipher'
  },
  {
    icon: Youtube,
    label: 'YouTube',
    value: 'StealthCipher',
    link: 'https://youtube.com/@StealthCipher'
  }
];