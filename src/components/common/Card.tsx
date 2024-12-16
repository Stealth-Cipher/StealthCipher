import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  gradient?: boolean;
  hover?: boolean;
}

const Card: React.FC<CardProps> = ({ 
  children, 
  className, 
  gradient = false,
  hover = false,
  ...props 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "bg-black/50 backdrop-blur-md rounded-xl p-6 border border-white/10",
        hover && "hover:bg-black/60 transition-all duration-300 hover:scale-105",
        gradient && "bg-gradient-to-br from-emerald-500/10 to-blue-500/10",
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Card;