import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { auth } from '../../utils/firebase';
import UserProfileMenu from './UserProfileMenu';
import UserAvatar from './UserAvatar';

const UserProfile = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (!currentUser) return null;

  return (
    <div className="relative z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 p-2 rounded-lg hover:bg-white/10 transition-colors"
      >
        <UserAvatar user={currentUser} />
        <span className="hidden md:block text-sm font-medium text-white">
          {currentUser.displayName || 'User'}
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div 
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            <UserProfileMenu 
              currentUser={currentUser}
              onClose={() => setIsOpen(false)}
              onLogout={handleLogout}
              onNavigate={(path) => {
                navigate(path);
                setIsOpen(false);
              }}
            />
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserProfile;