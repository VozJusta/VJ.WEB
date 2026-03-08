"use client";

import {
  useCallback,
  useRef,
  useState,
  useId,
  type DragEvent,
  type ChangeEvent,
  type KeyboardEvent,
} from "react";
import { cn } from "@/lib/utils";
import type { FileUploadProps, UploadedFile, UploadState } from "./file-upload.types";
import {
  uploadZoneBase,
  uploadZoneVariants,
  uploadTriggerButton,
  progressBarTrack,
  progressBarFill,
  filePreviewItem,
  removeButton,
} from "./file-upload.styles";

function FileIcon({ mimeType }: { mimeType: string }) {
  const isPdf = mimeType === "application/pdf";
  return (
    <svg
      aria-hidden="true"
      className={cn("w-5 h-5 shrink-0", isPdf ? "text-red-400" : "text-blue-400")}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14,2 14,8 20,8" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      aria-hidden="true"
      className="w-6 h-6 text-green-400"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ strokeDasharray: 40, animation: "check-draw 0.4s ease-out forwards" }}
    >
      <polyline points="20,6 9,17 4,12" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg
      aria-hidden="true"
      className="w-6 h-6"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

function CloudUploadIcon({ isDragging }: { isDragging: boolean }) {
  return (
    <svg
      aria-hidden="true"
      className={cn(
        "w-8 h-8 text-[#2585F4] transition-all duration-300",
        isDragging && "animate-[upload-bounce_0.6s_ease-in-out_infinite]"
      )}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="16,16 12,12 8,16" />
      <line x1="12" y1="12" x2="12" y2="21" />
      <path d="M20.39,18.39A5,5,0,0,0,18,9h-1.26A8,8,0,1,0,3,16.3" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg
      aria-hidden="true"
      className="w-3.5 h-3.5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function simulateUpload(
  id: string,
  setFiles: React.Dispatch<React.SetStateAction<UploadedFile[]>>
): void {
  let progress = 0;

  const interval = setInterval(() => {
    progress += Math.random() * 18 + 5;
    const clamped = Math.min(progress, 100);

    setFiles((prev) =>
      prev.map((f) =>
        f.id === id
          ? { ...f, progress: clamped, state: clamped === 100 ? "success" : "uploading" }
          : f
      )
    );

    if (clamped >= 100) clearInterval(interval);
  }, 150);
}

export function FileUpload({
  accept = "application/pdf,image/png,image/jpeg",
  maxSizeMB = 10,
  multiple = true,
  onFilesAccepted,
  onFileRemove,
  className,
  "aria-labelledby": ariaLabelledBy,
}: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploadState, setUploadState] = useState<UploadState>("idle");
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const labelId = useId();
  const descId = useId();

  const validateAndProcess = useCallback(
    (rawFiles: FileList | null) => {
      if (!rawFiles || rawFiles.length === 0) return;

      const maxBytes = maxSizeMB * 1024 * 1024;
      const valid: File[] = [];
      const errors: string[] = [];

      Array.from(rawFiles).forEach((file) => {
        if (file.size > maxBytes) {
          errors.push(`"${file.name}" excede ${maxSizeMB}MB`);
        } else {
          valid.push(file);
        }
      });

      if (errors.length > 0) {
        setErrorMessage(errors.join(". "));
        setUploadState("error");
        setTimeout(() => {
          setUploadState("idle");
          setErrorMessage(null);
        }, 3500);
        return;
      }

      const newEntries: UploadedFile[] = valid.map((file) => ({
        id: `${file.name}-${Date.now()}-${Math.random()}`,
        file,
        progress: 0,
        state: "uploading",
        previewUrl: file.type.startsWith("image/") ? URL.createObjectURL(file) : undefined,
      }));

      setFiles((prev) => (multiple ? [...prev, ...newEntries] : newEntries));
      setUploadState("idle");
      onFilesAccepted?.(valid);

      newEntries.forEach(({ id }) => {
        simulateUpload(id, setFiles);
      });

      if (inputRef.current) inputRef.current.value = "";
    },
    [maxSizeMB, multiple, onFilesAccepted]
  );

  const handleDragEnter = useCallback((e: DragEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setUploadState("dragging");
  }, []);

  const handleDragLeave = useCallback((e: DragEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.currentTarget.contains(e.relatedTarget as Node)) return;
    setUploadState("idle");
  }, []);

  const handleDragOver = useCallback((e: DragEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = "copy";
  }, []);

  const handleDrop = useCallback(
    (e: DragEvent<HTMLElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setUploadState("idle");
      validateAndProcess(e.dataTransfer.files);
    },
    [validateAndProcess]
  );

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      validateAndProcess(e.target.files);
    },
    [validateAndProcess]
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLElement>) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        inputRef.current?.click();
      }
    },
    []
  );

  const handleRemove = useCallback(
    (id: string, previewUrl?: string) => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      setFiles((prev) => prev.filter((f) => f.id !== id));
      onFileRemove?.(id);
    },
    [onFileRemove]
  );

  const zoneState =
    uploadState === "dragging"
      ? "dragging"
      : uploadState === "error"
      ? "error"
      : uploadState === "success"
      ? "success"
      : "idle";

  const isDragging = uploadState === "dragging";

  return (
    <section
      className={cn("flex flex-col gap-4 w-full", className)}
      aria-labelledby={ariaLabelledBy ?? labelId}
    >
      <figure
        role="button"
        tabIndex={0}
        aria-label="Área de upload de documentos. Arraste arquivos ou pressione Enter para selecionar."
        aria-describedby={descId}
        aria-invalid={uploadState === "error"}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onKeyDown={handleKeyDown}
        onClick={() => inputRef.current?.click()}
        className={cn(
          uploadZoneBase,
          uploadZoneVariants[zoneState],
          "group p-8 gap-4"
        )}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          className="sr-only"
          aria-hidden="true"
          tabIndex={-1}
          onChange={handleChange}
        />

        {isDragging ? (
          <CloudUploadIcon isDragging />
        ) : (
          <span
            className={uploadTriggerButton}
            aria-hidden="true"
            style={{ animation: isDragging ? undefined : undefined }}
          >
            <PlusIcon />
          </span>
        )}

        <figcaption
          id={labelId}
          className="flex flex-col items-center gap-1 text-center pointer-events-none"
        >
          <strong className="text-base font-semibold text-white leading-tight">
            {isDragging ? "Solte aqui!" : "Novo Documento"}
          </strong>
          <p id={descId} className="text-sm text-white/45 leading-snug">
            {isDragging
              ? "Libere para enviar os arquivos"
              : "Arraste arquivos ou clique para selecionar"}
          </p>
          <p className="text-xs text-white/30 mt-0.5">
            PDF, PNG ou JPG (máx {maxSizeMB}MB)
          </p>
        </figcaption>

        {uploadState === "error" && errorMessage && (
          <output
            role="alert"
            className="text-xs text-red-400 text-center max-w-xs animate-[file-enter_0.25s_ease-out]"
          >
            {errorMessage}
          </output>
        )}
      </figure>

      {files.length > 0 && (
        <ul
          aria-label="Arquivos em upload"
          className="flex flex-col gap-2"
        >
          {files.map((entry) => (
            <li
              key={entry.id}
              className={cn(
                filePreviewItem,
                "animate-[file-enter_0.25s_ease-out]"
              )}
            >
              {entry.previewUrl ? (
                <figure className="w-8 h-8 rounded-md overflow-hidden shrink-0 bg-white/10">
                  <img
                    src={entry.previewUrl}
                    alt={entry.file.name}
                    className="w-full h-full object-cover"
                  />
                </figure>
              ) : (
                <FileIcon mimeType={entry.file.type} />
              )}

              <div className="flex flex-col gap-1 flex-1 min-w-0">
                <span className="text-xs font-medium text-white/80 truncate leading-none">
                  {entry.file.name}
                </span>
                <span className="text-[10px] text-white/35 leading-none">
                  {formatBytes(entry.file.size)}
                </span>

                {entry.state === "uploading" && (
                  <div
                    className={progressBarTrack}
                    role="progressbar"
                    aria-valuenow={Math.round(entry.progress)}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`Enviando ${entry.file.name}`}
                  >
                    <div
                      className={progressBarFill}
                      style={{ width: `${entry.progress}%` }}
                    />
                  </div>
                )}
              </div>

              {entry.state === "success" ? (
                <CheckIcon />
              ) : (
                <button
                  type="button"
                  aria-label={`Remover ${entry.file.name}`}
                  className={removeButton}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemove(entry.id, entry.previewUrl);
                  }}
                >
                  <XIcon />
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
