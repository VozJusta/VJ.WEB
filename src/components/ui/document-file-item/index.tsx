import { PictureAsPdfRounded, ImageRounded } from "@mui/icons-material";
import { cn } from "@/src/lib/utils";
import type { DocumentFileItemProps } from "./document-file-item.types";
import {
  itemWrapper,
  fileIconWrapper,
  filenameClass,
  metaClass,
  statusConfig,
} from "./document-file-item.styles";
import { DocumentFileItemMenu } from "./document-file-item.menu";

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
        {mimeType === "application/pdf"
          ? <PictureAsPdfRounded fontSize="small" />
          : <ImageRounded fontSize="small" />}
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
