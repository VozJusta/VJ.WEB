"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  MoreHorizRounded,
  FileDownloadRounded,
  DriveFileRenameOutlineRounded,
  DeleteRounded,
} from "@mui/icons-material";
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
        <MoreHorizRounded fontSize="small" aria-hidden />
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
            <FileDownloadRounded fontSize="small" aria-hidden />
            Baixar
          </button>

          <button
            type="button"
            role="menuitem"
            className={menuItemClass}
            onClick={() => { onRename?.(id); close(); }}
          >
            <DriveFileRenameOutlineRounded fontSize="small" aria-hidden />
            Renomear
          </button>

          <div className={menuDividerClass} role="separator" />

          <button
            type="button"
            role="menuitem"
            className={`${menuItemClass} text-red-400 hover:text-red-300`}
            onClick={() => { onDelete?.(id); close(); }}
          >
            <DeleteRounded fontSize="small" aria-hidden className="text-red-400" />
            Excluir
          </button>
        </div>
      )}
    </div>
  );
}
