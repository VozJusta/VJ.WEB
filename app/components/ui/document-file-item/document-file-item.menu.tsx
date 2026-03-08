"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  menuButtonClass,
  menuDropdownClass,
  menuItemClass,
  menuDividerClass,
} from "./document-file-item.styles";

interface DocumentFileItemMenuProps {
  id: string;
  filename: string;
  onDownload?: (id: string) => void;
  onRename?: (id: string) => void;
  onDelete?: (id: string) => void;
}

function DotsIcon() {
  return (
    <svg
      aria-hidden="true"
      className="w-4 h-4"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <circle cx="5" cy="12" r="2" />
      <circle cx="12" cy="12" r="2" />
      <circle cx="19" cy="12" r="2" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg aria-hidden="true" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7,10 12,15 17,10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

function PencilIcon() {
  return (
    <svg aria-hidden="true" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg aria-hidden="true" className="w-4 h-4 text-red-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3,6 5,6 21,6" />
      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
      <path d="M10 11v6M14 11v6" />
      <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
    </svg>
  );
}

export function DocumentFileItemMenu({
  id,
  filename,
  onDownload,
  onRename,
  onDelete,
}: DocumentFileItemMenuProps) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;

    const handleOutsideClick = (e: MouseEvent) => {
      if (!wrapperRef.current?.contains(e.target as Node)) close();
    };

    const handleEscape = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
        buttonRef.current?.focus();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open, close]);

  return (
    <div ref={wrapperRef} className="relative">
      <button
        ref={buttonRef}
        type="button"
        aria-label={`Opções para ${filename}`}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={(e) => {
          e.stopPropagation();
          setOpen((prev) => !prev);
        }}
        className={menuButtonClass}
      >
        <DotsIcon />
      </button>

      {open && (
        <div
          role="menu"
          aria-label={`Ações para ${filename}`}
          className={menuDropdownClass}
        >
          <button
            type="button"
            role="menuitem"
            className={menuItemClass}
            onClick={() => { onDownload?.(id); close(); }}
          >
            <DownloadIcon />
            Baixar
          </button>

          <button
            type="button"
            role="menuitem"
            className={menuItemClass}
            onClick={() => { onRename?.(id); close(); }}
          >
            <PencilIcon />
            Renomear
          </button>

          <div className={menuDividerClass} role="separator" />

          <button
            type="button"
            role="menuitem"
            className={`${menuItemClass} text-red-400 hover:text-red-300`}
            onClick={() => { onDelete?.(id); close(); }}
          >
            <TrashIcon />
            Excluir
          </button>
        </div>
      )}
    </div>
  );
}
