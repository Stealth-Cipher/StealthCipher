import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Settings, LogOut } from 'lucide-react';
import { User } from 'firebase/auth';
import UserAvatar from './UserAvatar';

interface UserProfileMenuProps {
  currentUser: User;
  onClose: () => void;
  onLogout: () => void;
  onNavigate: (path: string) => void;
}

const UserProfileMenu: React.FC<UserProfileMenuProps> = ({
  currentUser,
  onClose,
  onLogout,
  onNavigate
}) => {
  const menuItems = [
    {
      icon: Shield,
      label: 'Dashboard',
      path: '/dashboard',
      color: 'text-emerald-500'
    },
    {
      icon: Settings,
      label: 'Settings',
      path: '/settings',
      color: 'text-emerald-500'
    },
    {
      icon: LogOut,
      label: 'Logout',
      action: onLogout,
      color: 'text-red-500'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className="absolute right-0 mt-2 w-64 bg-black/90 backdrop-blur-md border border-white/10 rounded-lg shadow-lg overflow-hidden z-50"
    >
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center space-x-3">
          <UserAvatar user={currentUser} size="md" />
          <div>
            <p className="text-white font-medium">
              {currentUser.displayName || 'User'}
            </p>
            <p className="text-sm text-gray-400">{currentUser.email}</p>
          </div>
        </div>
      </div>

      <div className="p-2">
        {menuItems.map((item) => (
          <button
            key={item.label}
            onClick={() => {
              if (item.action) {
                item.action();
              } else if (item.path) {
                onNavigate(item.path);
              }
              onClose();
            }}
            className="w-full flex items-center space-x-3 p-2 rounded-lg hover:bg-white/10 transition-colors text-left"
          >
            <item.icon className={`w-5 h-5 ${item.color}`} />
            <span className={item.label === 'Logout' ? 'text-red-500' : 'text-white'}>
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </motion.div>
  );
};

export default UserProfileMenu;