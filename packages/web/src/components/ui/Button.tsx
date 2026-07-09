'use client';

import { forwardRef, ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  icon?: ReactNode;
  children: ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', loading, icon, children, disabled, ...props }, ref) => {
    const variants = {
      primary:
        'bg-medical-500 text-white hover:bg-medical-600 active:bg-medical-700 shadow-lg shadow-medical-500/20 hover:shadow-medical-500/30',
      secondary:
        'bg-gray-100 dark:bg-surface-dark-elevated text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700',
      ghost:
        'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800',
      danger:
        'bg-red-500 text-white hover:bg-red-600 active:bg-red-700 shadow-lg shadow-red-500/20',
      outline:
        'border-2 border-medical-500 text-medical-500 hover:bg-medical-50 dark:hover:bg-medical-900/20',
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-sm rounded-xl',
      md: 'px-5 py-2.5 text-sm rounded-2xl',
      lg: 'px-7 py-3.5 text-base rounded-2xl',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          'inline-flex items-center justify-center gap-2 font-medium transition-all duration-200',
          'active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100',
          variants[variant],
          sizes[size],
          className,
        )}
        {...props}
      >
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : icon}
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';
export default Button;
