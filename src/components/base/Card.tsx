import { ReactNode } from 'react';
import clsx from 'clsx';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export const Card = ({ 
  children, 
  className, 
  hover = false,
  padding = 'md' 
}: CardProps) => {
  const paddingStyles = {
    none: '',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6'
  };

  return (
    <div className={clsx(
      'bg-dark-300 border border-dark-400 rounded-xl',
      hover && 'hover:bg-dark-200 transition-colors duration-200 cursor-pointer',
      paddingStyles[padding],
      className
    )}>
      {children}
    </div>
  );
};