"use client";

import {
  PictureAsPdfRounded,
  ImageRounded,
  FileDownloadRounded,
  VisibilityRounded,
} from "@mui/icons-material";
import { docCardWrapper, docCardIconWrapper, docCardAction } from "./case-doc-card.styles";
import type { CaseDocCardProps } from "./case-doc-card.types";

export function CaseDocCard({
  filename,
  meta,
  mimeType,
  onDownload,
  onPreview,
}: CaseDocCardProps) {
  const isPdf = mimeType === "application/pdf";

  return (
    <article className={docCardWrapper}>
      <span
        className={docCardIconWrapper({ mimeType: isPdf ? "pdf" : "image" })}
        aria-hidden
      >
        {isPdf ? (
          <PictureAsPdfRounded fontSize="small" />
        ) : (
          <ImageRounded fontSize="small" />
        )}
      </span>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-white truncate">{filename}</p>
        <p className="text-xs text-white/40">{meta}</p>
      </div>

      <button
        type="button"
        aria-label={isPdf ? `Baixar ${filename}` : `Visualizar ${filename}`}
        className={docCardAction}
        onClick={() =>
          isPdf ? onDownload?.(filename) : onPreview?.(filename)
        }
      >
        {isPdf ? (
          <FileDownloadRounded fontSize="small" aria-hidden />
        ) : (
          <VisibilityRounded fontSize="small" aria-hidden />
        )}
      </button>
    </article>
  );
}
