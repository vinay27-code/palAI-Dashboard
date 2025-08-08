import { ButtonHTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  children: ReactNode;
}

export const Button = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  className,
  children,
  disabled,
  ...props
}: ButtonProps) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 whitespace-nowrap cursor-pointer';
  
  const variants = {
    primary: 'bg-accent-100 hover:bg-accent-100/90 text-white focus:ring-accent-100/50',
    secondary: 'bg-dark-400 hover:bg-dark-300 text-white focus:ring-dark-400/50',
    outline: 'border border-dark-400 text-gray-300 hover:bg-dark-400 hover:text-white focus:ring-dark-400/50',
    ghost: 'text-gray-300 hover:bg-dark-400 hover:text-white focus:ring-dark-400/50',
    danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500/50'
  };
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base'
  };

  return (
    <button
      className={clsx(
        baseStyles,
        variants[variant],
        sizes[size],
        (disabled || loading) && 'opacity-50 cursor-not-allowed',
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <i className="ri-loader-4-line animate-spin mr-2" />
      )}
      {children}
    </button>
  );
};