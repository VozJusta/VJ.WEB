'use client';

import type { PersonalityOptionProps } from './personality-option.types';

export function PersonalityOption({
  id,
  label,
  description,
  icon,
  color,
  selected,
  onSelect,
}: PersonalityOptionProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(id)}
      className={`
        group relative w-full rounded-lg border-2 p-4 text-left transition-all
        ${
          selected
            ? 'border-blue-500 bg-blue-500/10'
            : 'border-gray-700 bg-gray-800/50 hover:border-gray-600 hover:bg-gray-800'
        }
      `}
      aria-pressed={selected}
      aria-label={`${label}: ${description}`}
    >
      <div className="flex items-start gap-3">
        <div
          className={`
            flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-transform
            group-hover:scale-110
            ${color}
          `}
        >
          {icon}
        </div>

        <div className="flex-1">
          <h3 className="mb-1 text-sm font-semibold text-white">{label}</h3>
          <p className="text-xs leading-relaxed text-gray-400">{description}</p>
        </div>
      </div>
    </button>
  );
}
