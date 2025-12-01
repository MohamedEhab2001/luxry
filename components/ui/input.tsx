import { InputHTMLAttributes } from 'react';
import clsx from 'clsx';

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={clsx(
        'w-full rounded-lg border border-zinc-800 bg-surface px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-500 focus:border-gold-500 focus:outline-none',
        className,
      )}
      {...props}
    />
  );
}
