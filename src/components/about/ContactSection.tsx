import React from 'react';
import { ContactInfo } from '../../types/contact';
import ContactCard from './ContactCard';
import { contactInfo } from '../../data/contact';

const ContactSection = () => {
  return (
    <div>
      <h3 className="text-xl font-semibold text-white mb-4">Contact Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {contactInfo.map((contact) => (
          <ContactCard key={contact.label} contact={contact} />
        ))}
      </div>
    </div>
  );
};

export default ContactSection;