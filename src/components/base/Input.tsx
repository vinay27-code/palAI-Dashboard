import { InputHTMLAttributes, ReactNode, forwardRef } from 'react';
import clsx from 'clsx';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: ReactNode;
  hint?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({
  label,
  error,
  icon,
  hint,
  className,
  ...props
}, ref) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-300 mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <div className="text-gray-400 text-sm">
              {icon}
            </div>
          </div>
        )}
        <input
          ref={ref}
          className={clsx(
            'w-full px-3 py-2 bg-dark-400 border border-dark-300 rounded-lg text-white placeholder-gray-400',
            'focus:ring-2 focus:ring-accent-100/50 focus:border-accent-100',
            'transition-all duration-200',
            icon && 'pl-10',
            error && 'border-red-500 focus:border-red-500 focus:ring-red-500/50',
            className
          )}
          {...props}
        />
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
      {hint && !error && (
        <p className="mt-1 text-sm text-gray-400">{hint}</p>
      )}
    </div>
  );
});