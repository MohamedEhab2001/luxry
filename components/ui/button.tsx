import { ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  fullWidth?: boolean;
}

export function Button({ variant = 'primary', fullWidth, className, ...props }: ButtonProps) {
  const base =
    'inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed';
  const styles = {
    primary: 'bg-gold-500 text-black hover:bg-gold-400',
    secondary: 'bg-surface text-zinc-100 border border-zinc-800 hover:border-gold-500',
    ghost: 'text-zinc-200 hover:text-gold-400',
  } as const;

  return (
    <button
      className={clsx(base, styles[variant], fullWidth && 'w-full', className)}
      {...props}
    />
  );
}
