import React from 'react';
import { cn } from '../../utils/cn';

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  label?: string;
}

const IconButton: React.FC<IconButtonProps> = ({ 
  icon, 
  label, 
  className, 
  ...props 
}) => {
  return (
    <button
      className={cn(
        "p-2 rounded-lg hover:bg-white/10 transition-colors",
        "flex items-center space-x-2",
        className
      )}
      {...props}
    >
      {icon}
      {label && <span className="text-sm">{label}</span>}
    </button>
  );
};

export default IconButton;