import React from 'react';
import { ContactInfo } from '../../types/contact';
import Card from '../common/Card';

interface ContactCardProps {
  contact: ContactInfo;
}

const ContactCard: React.FC<ContactCardProps> = ({ contact }) => {
  return (
    <Card
      hover
      as="a"
      href={contact.link}
      className="flex items-center space-x-3"
    >
      <contact.icon className="h-5 w-5 text-emerald-500" />
      <div>
        <p className="text-sm text-gray-400">{contact.label}</p>
        <p className="text-white">{contact.value}</p>
      </div>
    </Card>
  );
};

export default ContactCard;