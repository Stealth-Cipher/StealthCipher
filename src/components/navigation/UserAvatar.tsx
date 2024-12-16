import React from 'react';
import { User as UserIcon } from 'lucide-react';
import { User } from 'firebase/auth';

interface UserAvatarProps {
  user: User;
  size?: 'sm' | 'md' | 'lg';
}

const UserAvatar: React.FC<UserAvatarProps> = ({ user, size = 'sm' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  const iconSizes = {
    sm: 'w-5 h-5',
    md: 'w-7 h-7',
    lg: 'w-9 h-9'
  };

  if (user.photoURL) {
    return (
      <img
        src={user.photoURL}
        alt={user.displayName || 'User'}
        className={`${sizeClasses[size]} rounded-full border-2 border-emerald-500 object-cover`}
      />
    );
  }

  return (
    <div className={`${sizeClasses[size]} rounded-full bg-emerald-500 flex items-center justify-center`}>
      <UserIcon className={`${iconSizes[size]} text-white`} />
    </div>
  );
};

export default UserAvatar;