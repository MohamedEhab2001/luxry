'use client';

import { ReactNode } from 'react';
import clsx from 'clsx';

export function Modal({ open, onClose, children }: { open: boolean; onClose: () => void; children: ReactNode }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4" onClick={onClose}>
      <div
        className={clsx('card-surface max-w-lg w-full', 'relative')}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="absolute right-3 top-3 text-zinc-500 hover:text-gold-400" onClick={onClose}>
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}
