import { cn } from "@/lib/utils";
import type { DocumentFileItemProps } from "./document-file-item.types";
import {
  itemWrapper,
  fileIconWrapper,
  filenameClass,
  metaClass,
  statusConfig,
} from "./document-file-item.styles";
import { DocumentFileItemMenu } from "./document-file-item.menu";

function PdfFileIcon() {
  return (
    <svg
      aria-hidden="true"
      className="w-5 h-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14,2 14,8 20,8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10,9 9,9 8,9" />
    </svg>
  );
}

function ImageFileIcon() {
  return (
    <svg
      aria-hidden="true"
      className="w-5 h-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <polyline points="21,15 16,10 5,21" />
    </svg>
  );
}

export function DocumentFileItem({
  id,
  filename,
  sizeLabel,
  dateLabel,
  mimeType,
  status,
  onDownload,
  onDelete,
  onRename,
}: DocumentFileItemProps) {
  const { label, bg, text, dot } = statusConfig[status];

  return (
    <article className={itemWrapper} aria-label={`Documento: ${filename}`}>
      <figure className={fileIconWrapper} aria-hidden="true">
        {mimeType === "application/pdf" ? <PdfFileIcon /> : <ImageFileIcon />}
      </figure>

      <div className="flex-1 min-w-0 flex flex-col gap-0.5">
        <h3 className={filenameClass}>{filename}</h3>
        <p className={metaClass}>
          <time dateTime={dateLabel}>{sizeLabel} • {dateLabel}</time>
        </p>
      </div>

      <span
        role="status"
        aria-label={`Status: ${label}`}
        className={cn(
          "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase select-none",
          bg,
          text
        )}
      >
        {dot && (
          <span
            className={cn("w-1.5 h-1.5 rounded-full shrink-0", dot, "animate-[analyzing-pulse_1.4s_ease-in-out_infinite]")}
            aria-hidden="true"
          />
        )}
        {label}
      </span>

      <DocumentFileItemMenu
        id={id}
        filename={filename}
        onDownload={onDownload}
        onRename={onRename}
        onDelete={onDelete}
      />
    </article>
  );
}
