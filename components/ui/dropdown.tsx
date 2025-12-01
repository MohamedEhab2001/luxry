'use client';

import { useState } from 'react';
import clsx from 'clsx';

export function Dropdown({ label, options, onChange }: { label: string; options: string[]; onChange: (value: string) => void }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(options[0]);
  return (
    <div className="relative inline-block">
      <button
        className="w-48 rounded-lg border border-zinc-800 bg-surface px-3 py-2 text-sm text-left"
        onClick={() => setOpen(!open)}
      >
        <div className="text-[11px] uppercase tracking-[0.2em] text-zinc-500">{label}</div>
        <div>{value}</div>
      </button>
      {open && (
        <div className="absolute mt-2 w-full rounded-lg border border-zinc-800 bg-surface shadow-lg">
          {options.map((opt) => (
            <button
              key={opt}
              className={clsx(
                'w-full px-3 py-2 text-left text-sm hover:bg-zinc-800',
                opt === value && 'text-gold-400'
              )}
              onClick={() => {
                setValue(opt);
                onChange(opt);
                setOpen(false);
              }}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
