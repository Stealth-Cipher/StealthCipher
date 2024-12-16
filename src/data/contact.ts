import { Mail, Phone, MapPin, Globe } from 'lucide-react';
import { ContactInfo } from '../types/contact';

export const contactInfo: ContactInfo[] = [
  {
    icon: Mail,
    label: 'Email',
    value: 'stealth0cipher@gmail.com',
    link: 'mailto:stealth0cipher@gmail.com'
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+91 77088 29894',
    link: 'tel:+917708829894'
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Coimbatore, Tamil Nadu, India',
    link: 'https://www.google.com/maps/place/Coimbatore,+Tamil+Nadu'
  },
  {
    icon: Globe,
    label: 'Website',
    value: 'stealthcipher.app.netlify',
    link: 'https://stealthcipher.app.netlify'
  }
];