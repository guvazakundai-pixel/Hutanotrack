'use client';

import { cn } from '@/lib/utils';
import { getInitials } from '@/lib/utils';

interface AvatarProps {
  firstName?: string;
  lastName?: string;
  src?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  status?: 'online' | 'offline' | 'away';
  className?: string;
}

const sizes = {
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-12 h-12 text-base',
  xl: 'w-16 h-16 text-xl',
};

const statusSizes = {
  sm: 'w-2.5 h-2.5',
  md: 'w-3 h-3',
  lg: 'w-3.5 h-3.5',
  xl: 'w-4 h-4',
};

export function Avatar({ firstName = 'U', lastName = '', src, size = 'md', status, className }: AvatarProps) {
  return (
    <div className={cn('relative inline-flex shrink-0', className)}>
      {src ? (
        <img
          src={src}
          alt={`${firstName} ${lastName}`}
          className={cn('rounded-full object-cover', sizes[size])}
        />
      ) : (
        <div
          className={cn(
            'rounded-full bg-medical-500 text-white font-medium flex items-center justify-center',
            sizes[size],
          )}
        >
          {getInitials(firstName, lastName)}
        </div>
      )}
      {status && (
        <span
          className={cn(
            'absolute bottom-0 right-0 rounded-full border-2 border-white dark:border-surface-dark',
            statusSizes[size],
            status === 'online' && 'bg-healthcare-500',
            status === 'away' && 'bg-amber-500',
            status === 'offline' && 'bg-gray-400',
          )}
        />
      )}
    </div>
  );
}
