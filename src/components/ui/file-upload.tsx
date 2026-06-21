"use client";

/**
 * @registry-slug file-upload
 * @registry-name FileUpload
 * @registry-description A Future UI FileUpload component.
 * @registry-category ui
 * @registry-dependency framer-motion
 * @registry-dependency class-variance-authority
 * @registry-dependency lucide-react
 */

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, AnimatePresence } from "framer-motion";
import { UploadCloud, File as FileIcon, X, CheckCircle2, AlertCircle, Image as ImageIcon, Video, FileText } from "lucide-react";

import { cn } from "@/lib/utils";

// --- Types ---

export type FileUploadColor = "default" | "blue" | "emerald" | "rose" | "amber" | "violet" | "indigo" | "sky" | "slate" | "orange";
export type FileUploadShape = "default" | "square" | "rounded" | "sharp";
export type FileUploadSpacing = "default" | "2x" | "4x" | "6x" | "8x";

export type FileStatus = "idle" | "uploading" | "success" | "error";

export interface FileState {
  id: string;
  file: File;
  progress: number;
  status: FileStatus;
  previewUrl?: string;
  error?: string;
}

interface FileUploadContextValue {
  files: FileState[];
  setFiles: React.Dispatch<React.SetStateAction<FileState[]>>;
  isDragging: boolean;
  setIsDragging: (val: boolean) => void;
  maxFiles: number;
  maxSize: number; // in bytes
  accept?: Record<string, string[]>;
  variant: "default" | "compact" | "card" | "glass" | "minimal";
  color: FileUploadColor;
  shape: FileUploadShape;
  spacing: FileUploadSpacing;
  disabled: boolean;
  onUpload?: (files: File[]) => void;
  handleRemoveFile: (id: string) => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
}

const FileUploadContext = React.createContext<FileUploadContextValue | null>(null);

export const useFileUpload = () => {
  const context = React.useContext(FileUploadContext);
  if (!context) {
    throw new Error("FileUpload components must be used within a FileUpload provider");
  }
  return context;
};

// --- Helper Functions ---

const formatBytes = (bytes: number, decimals = 2) => {
  if (!+bytes) return '0 Bytes'
  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
};

const getFileIcon = (type: string) => {
  if (type.startsWith("image/")) return ImageIcon;
  if (type.startsWith("video/")) return Video;
  if (type === "application/pdf") return FileText;
  return FileIcon;
};

const colorMap: Record<FileUploadColor, { border: string; bg: string; text: string; bgActive: string; ring: string }> = {
  default: { border: "border-border/50", bg: "bg-foreground", text: "text-foreground", bgActive: "bg-foreground/5", ring: "focus:ring-ring/20" },
  blue: { border: "border-blue-500", bg: "bg-blue-600", text: "text-blue-600", bgActive: "bg-blue-600/5", ring: "focus:ring-blue-600/20" },
  emerald: { border: "border-emerald-500", bg: "bg-emerald-600", text: "text-emerald-600", bgActive: "bg-emerald-600/5", ring: "focus:ring-emerald-600/20" },
  rose: { border: "border-rose-500", bg: "bg-rose-600", text: "text-rose-600", bgActive: "bg-rose-600/5", ring: "focus:ring-rose-600/20" },
  amber: { border: "border-amber-500", bg: "bg-amber-500", text: "text-amber-600", bgActive: "bg-amber-500/5", ring: "focus:ring-amber-500/20" },
  violet: { border: "border-violet-500", bg: "bg-violet-600", text: "text-violet-600", bgActive: "bg-violet-600/5", ring: "focus:ring-violet-600/20" },
  indigo: { border: "border-indigo-500", bg: "bg-indigo-600", text: "text-indigo-600", bgActive: "bg-indigo-600/5", ring: "focus:ring-indigo-600/20" },
  sky: { border: "border-sky-500", bg: "bg-sky-500", text: "text-sky-600", bgActive: "bg-sky-500/5", ring: "focus:ring-sky-500/20" },
  slate: { border: "border-slate-500", bg: "bg-slate-600", text: "text-slate-600", bgActive: "bg-slate-600/5", ring: "focus:ring-slate-600/20" },
  orange: { border: "border-orange-500", bg: "bg-orange-500", text: "text-orange-600", bgActive: "bg-orange-500/5", ring: "focus:ring-orange-500/20" },
};

const getShapeClass = (shape: FileUploadShape) => {
  switch (shape) {
    case "square": return "rounded-none";
    case "sharp": return "rounded-[2px]";
    case "rounded": return "rounded-2xl";
    case "default": return "rounded-xl";
  }
};

const getSpacingClass = (spacing: FileUploadSpacing, variant: string) => {
  if (variant === "compact") {
    switch (spacing) {
      case "2x": return "p-2 gap-2";
      case "4x": return "p-3 gap-3";
      case "6x": return "p-5 gap-5";
      case "8x": return "p-6 gap-6";
      default: return "p-4 gap-4";
    }
  }
  switch (spacing) {
    case "2x": return "p-4";
    case "4x": return "p-6";
    case "6x": return "p-10";
    case "8x": return "p-12";
    default: return "p-8";
  }
};

// --- Provider Component ---

export interface FileUploadProps {
  children: React.ReactNode;
  maxFiles?: number;
  maxSize?: number; // bytes
  accept?: Record<string, string[]>;
  variant?: "default" | "compact" | "card" | "glass" | "minimal";
  color?: FileUploadColor;
  shape?: FileUploadShape;
  spacing?: FileUploadSpacing;
  disabled?: boolean;
  onUpload?: (files: File[]) => void;
  onFilesChange?: (files: FileState[]) => void;
  className?: string;
}

export const FileUpload = React.memo(function FileUpload({
  children,
  maxFiles = 10,
  maxSize = 10 * 1024 * 1024, // 10MB default
  accept,
  variant = "default",
  color = "default",
  shape = "default",
  spacing = "default",
  disabled = false,
  onUpload,
  onFilesChange,
  className
}: FileUploadProps) {
  const [files, setFiles] = React.useState<FileState[]>([]);
  const [isDragging, setIsDragging] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (onFilesChange) onFilesChange(files);
  }, [files, onFilesChange]);

  const handleRemoveFile = React.useCallback((id: string) => {
    setFiles((prev) => {
      const fileToRemove = prev.find(f => f.id === id);
      if (fileToRemove?.previewUrl) {
        URL.revokeObjectURL(fileToRemove.previewUrl);
      }
      return prev.filter(f => f.id !== id);
    });
  }, []);

  // Cleanup object URLs on unmount
  React.useEffect(() => {
    return () => {
      files.forEach((f) => {
        if (f.previewUrl) URL.revokeObjectURL(f.previewUrl);
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <FileUploadContext.Provider
      value={{
        files,
        setFiles,
        isDragging,
        setIsDragging,
        maxFiles,
        maxSize,
        accept,
        variant,
        color,
        shape,
        spacing,
        disabled,
        onUpload,
        handleRemoveFile,
        inputRef,
      }}
    >
      <div className={cn("flex flex-col gap-4 w-full", className)}>
        {children}
      </div>
    </FileUploadContext.Provider>
  );
});
FileUpload.displayName = "FileUpload";

// --- Dropzone Component ---

const dropzoneVariants = cva(
  "relative flex flex-col items-center justify-center w-full transition-all duration-200 outline-none cursor-pointer overflow-hidden",
  {
    variants: {
      variant: {
        default: "border-2 border-dashed border-border bg-background hover:bg-muted/50",
        compact: "border border-border bg-muted/30 hover:bg-muted flex-row",
        card: "border border-border shadow-sm bg-card hover:shadow-md",
        glass: "border border-white/20 bg-background/30 backdrop-blur-md hover:bg-background/40 dark:bg-black/20 dark:border-white/10",
        minimal: "border-b-2 border-transparent bg-transparent rounded-none shadow-none py-8",
      },
      isDragging: {
        true: "scale-[0.99]",
        false: "",
      },
      disabled: {
        true: "opacity-50 cursor-not-allowed pointer-events-none",
        false: "",
      }
    },
    defaultVariants: {
      variant: "default",
      isDragging: false,
      disabled: false,
    },
  }
);

export interface UploadDropzoneProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  subtitle?: string;
}

export const UploadDropzone = React.memo(function UploadDropzone({ 
  className, 
  title = "Click or drag files here to upload", 
  subtitle,
  ...props 
}: UploadDropzoneProps) {
  const { 
    isDragging, setIsDragging, disabled, variant, color, shape, spacing, inputRef, 
    setFiles, files, maxFiles, maxSize, accept, onUpload 
  } = useFileUpload();

  const handleDragOver = React.useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) setIsDragging(true);
  }, [disabled, setIsDragging]);

  const handleDragLeave = React.useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, [setIsDragging]);

  const processFiles = React.useCallback((newFiles: File[]) => {
    if (disabled) return;

    let validFiles = newFiles;

    // Check max files limit
    if (files.length + validFiles.length > maxFiles) {
      validFiles = validFiles.slice(0, maxFiles - files.length);
      // In a real app, you might want to toast an error here
    }

    const newFileStates = validFiles.map((file) => {
      // Validate Size
      if (file.size > maxSize) {
        return {
          id: Math.random().toString(36).substring(7),
          file,
          progress: 0,
          status: "error" as FileStatus,
          error: `File size exceeds ${formatBytes(maxSize)}`,
        };
      }

      // Check Accepted Types
      if (accept) {
        let isAccepted = false;
        const acceptKeys = Object.keys(accept);
        for (const mime of acceptKeys) {
          if (mime === "*/*") isAccepted = true;
          else if (mime.endsWith("/*")) {
            const baseMime = mime.split("/")[0];
            if (file.type.startsWith(baseMime)) isAccepted = true;
          } else if (file.type === mime) {
            isAccepted = true;
          } else {
             const extensions = accept[mime];
             if (extensions.some(ext => file.name.toLowerCase().endsWith(ext.toLowerCase()))) {
                isAccepted = true;
             }
          }
        }
        if (!isAccepted) {
          return {
            id: Math.random().toString(36).substring(7),
            file,
            progress: 0,
            status: "error" as FileStatus,
            error: "File type not supported",
          };
        }
      }

      // Generate Preview
      let previewUrl;
      if (file.type.startsWith("image/") || file.type.startsWith("video/")) {
        previewUrl = URL.createObjectURL(file);
      }

      return {
        id: Math.random().toString(36).substring(7),
        file,
        progress: 0,
        status: "idle" as FileStatus,
        previewUrl,
      };
    });

    setFiles((prev) => [...prev, ...newFileStates]);

    const filesToUpload = newFileStates.filter(f => f.status === "idle").map(f => f.file);
    if (filesToUpload.length > 0 && onUpload) {
      onUpload(filesToUpload);
    }
  }, [disabled, files.length, maxFiles, maxSize, accept, setFiles, onUpload]);

  const handleDrop = React.useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(Array.from(e.dataTransfer.files));
    }
  }, [processFiles, setIsDragging]);

  const handleFileInputChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(Array.from(e.target.files));
    }
    // Reset input so the same file can be selected again
    if (inputRef.current) inputRef.current.value = "";
  }, [processFiles, inputRef]);

  const handleClick = () => {
    if (!disabled && inputRef.current) {
      inputRef.current.click();
    }
  };

  // Build accept string for native input
  const acceptString = React.useMemo(() => {
    if (!accept) return undefined;
    const items: string[] = [];
    Object.entries(accept).forEach(([mime, exts]) => {
      items.push(mime);
      exts.forEach(ext => items.push(ext));
    });
    return items.join(",");
  }, [accept]);

  const defaultSubtitle = `Max file size: ${formatBytes(maxSize)} ${maxFiles > 1 ? `| Up to ${maxFiles} files` : ""}`;
  const activeTheme = colorMap[color];

  return (
    <div
      onClick={handleClick}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={cn(
        dropzoneVariants({ variant, isDragging, disabled }), 
        variant !== "minimal" && getShapeClass(shape),
        getSpacingClass(spacing, variant),
        isDragging && activeTheme.border,
        isDragging && activeTheme.bgActive,
        !isDragging && variant === "minimal" && "hover:border-foreground",
        !isDragging && variant !== "minimal" && "hover:border-zinc-300 dark:hover:border-zinc-700",
        className
      )}
      {...props}
    >
      <input
        ref={inputRef}
        type="file"
        multiple={maxFiles > 1}
        accept={acceptString}
        className="hidden"
        onChange={handleFileInputChange}
      />
      
      {variant === 'compact' ? (
        <>
          <div className={cn(
            "p-3 rounded-full transition-transform", 
            activeTheme.bgActive,
            activeTheme.text,
            isDragging && "scale-110"
          )}>
            <UploadCloud className="h-5 w-5" />
          </div>
          <div className="flex flex-col items-start justify-center text-left">
            <p className="text-sm font-medium">{title}</p>
            <p className="text-xs text-muted-foreground">{subtitle || defaultSubtitle}</p>
          </div>
        </>
      ) : (
        <>
          <div className={cn(
            "p-4 rounded-full mb-4 transition-transform duration-300", 
            activeTheme.bgActive,
            activeTheme.text,
            isDragging && "scale-110 shadow-lg"
          )}>
            <UploadCloud className="h-6 w-6 sm:h-8 sm:w-8" />
          </div>
          <div className="flex flex-col items-center justify-center text-center space-y-1">
            <p className="text-sm sm:text-base font-semibold text-foreground">
              {title}
            </p>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-[16rem]">
              {subtitle || defaultSubtitle}
            </p>
          </div>
        </>
      )}

      {/* Interactive Ripple/Glow on Drag */}
      <AnimatePresence>
        {isDragging && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className={cn("absolute inset-0 pointer-events-none rounded-[inherit] bg-gradient-to-tr to-transparent", color === "default" ? "from-foreground/10" : `from-${color}-500/10`)}
          />
        )}
      </AnimatePresence>
    </div>
  );
});
UploadDropzone.displayName = "UploadDropzone";

// --- Preview Component ---

export const UploadPreview = React.memo(function UploadPreview({ className }: { className?: string }) {
  const { files, handleRemoveFile, variant, shape, color } = useFileUpload();
  const activeTheme = colorMap[color];

  if (files.length === 0) return null;

  return (
    <div className={cn("grid gap-3", className)}>
      <AnimatePresence mode="popLayout">
        {files.map((fileState) => {
          const Icon = getFileIcon(fileState.file.type);
          
          return (
            <motion.div
              layout
              key={fileState.id}
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, x: -10, scale: 0.98 }}
              className={cn(
                "relative flex items-center gap-4 p-3 overflow-hidden group border",
                getShapeClass(shape),
                variant === "glass" ? "bg-background/20 backdrop-blur-sm border-white/10" : "bg-card border-border",
                fileState.status === "error" && "border-destructive/50 bg-destructive/5"
              )}
            >
              {/* Thumbnail / Icon */}
              <div className={cn("relative shrink-0 h-10 w-10 sm:h-12 sm:w-12 bg-muted flex items-center justify-center overflow-hidden", shape === "rounded" ? "rounded-xl" : shape === "square" ? "rounded-none" : shape === "sharp" ? "rounded-sm" : "rounded-lg")}>
                {fileState.previewUrl && fileState.file.type.startsWith("image/") ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={fileState.previewUrl} alt={fileState.file.name} className="h-full w-full object-cover" />
                ) : fileState.previewUrl && fileState.file.type.startsWith("video/") ? (
                   <video src={fileState.previewUrl} className="h-full w-full object-cover" />
                ) : (
                  <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-muted-foreground" />
                )}
                
                {/* Status Overlay */}
                {fileState.status === 'uploading' && (
                  <div className="absolute inset-0 bg-background/50 flex items-center justify-center backdrop-blur-[1px]">
                    <div className={cn("h-4 w-4 rounded-full border-2 border-t-transparent animate-spin", activeTheme.border)} />
                  </div>
                )}
                {fileState.status === 'success' && (
                  <div className="absolute inset-0 bg-background/50 flex items-center justify-center backdrop-blur-[1px]">
                    <CheckCircle2 className={cn("h-4 w-4", activeTheme.text)} />
                  </div>
                )}
              </div>

              {/* File Details */}
              <div className="flex flex-col flex-1 min-w-0">
                <p className="text-sm font-medium truncate pr-6 text-foreground">
                  {fileState.file.name}
                </p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>{formatBytes(fileState.file.size)}</span>
                  {fileState.status === "error" && (
                    <>
                      <span>•</span>
                      <span className="text-destructive font-medium flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" /> {fileState.error || "Upload failed"}
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Remove Button */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                type="button"
                onClick={() => handleRemoveFile(fileState.id)}
                className={cn("absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-muted opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity focus:outline-none focus:ring-2", activeTheme.ring)}
              >
                <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                <span className="sr-only">Remove file</span>
              </motion.button>

              {/* Progress Bar Overlay for the specific file */}
              {fileState.status === 'uploading' && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-muted/50">
                   <motion.div 
                     className={cn("h-full", activeTheme.bg)}
                     initial={{ width: 0 }}
                     animate={{ width: `${fileState.progress}%` }}
                     transition={{ ease: "linear" }}
                   />
                </div>
              )}
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
});
UploadPreview.displayName = "UploadPreview";

// --- Overall Progress Component ---

export const UploadProgress = React.memo(function UploadProgress({ className }: { className?: string }) {
  const { files, color } = useFileUpload();
  const activeTheme = colorMap[color];

  const uploadingFiles = files.filter(f => f.status === "uploading");
  if (uploadingFiles.length === 0) return null;

  const totalProgress = uploadingFiles.reduce((acc, f) => acc + f.progress, 0) / uploadingFiles.length;

  return (
    <div className={cn("w-full flex flex-col gap-2", className)}>
      <div className="flex justify-between text-xs text-muted-foreground font-medium">
        <span>Uploading {uploadingFiles.length} file{uploadingFiles.length > 1 ? 's' : ''}...</span>
        <span>{Math.round(totalProgress)}%</span>
      </div>
      <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
        <motion.div
          className={cn("h-full rounded-full", activeTheme.bg)}
          initial={{ width: 0 }}
          animate={{ width: `${totalProgress}%` }}
          transition={{ ease: "linear" }}
        />
      </div>
    </div>
  );
});
UploadProgress.displayName = "UploadProgress";
