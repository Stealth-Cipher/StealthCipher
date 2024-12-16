import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

interface PageContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  title?: string;
  icon?: React.ReactNode;
}

const PageContainer: React.FC<PageContainerProps> = ({ 
  children, 
  title, 
  icon,
  className,
  ...props 
}) => {
  return (
    <div className="min-h-[calc(100vh-4rem)] p-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={cn(
            "bg-black/50 backdrop-blur-md rounded-xl p-8 border border-white/10",
            className
          )}
          {...props}
        >
          {(title || icon) && (
            <div className="flex items-center space-x-3 mb-8">
              {icon}
              {title && <h2 className="text-2xl font-bold text-white">{title}</h2>}
            </div>
          )}
          {children}
        </motion.div>
      </div>
    </div>
  );
};

export default PageContainer;