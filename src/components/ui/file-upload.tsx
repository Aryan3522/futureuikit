"use client";

/**
 * @registry-slug file-upload
 * @registry-name FileUpload
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

// --- Provider Component ---

export interface FileUploadProps {
  children: React.ReactNode;
  maxFiles?: number;
  maxSize?: number; // bytes
  accept?: Record<string, string[]>;
  variant?: "default" | "compact" | "card" | "glass" | "minimal";
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
        default: "border-2 border-dashed border-border rounded-xl bg-background hover:bg-muted/50 hover:border-primary/50",
        compact: "border border-border rounded-lg bg-muted/30 hover:bg-muted p-4 flex-row gap-4",
        card: "border border-border shadow-sm rounded-2xl bg-card hover:shadow-md",
        glass: "border border-white/20 bg-background/30 backdrop-blur-md rounded-2xl hover:bg-background/40 dark:bg-black/20 dark:border-white/10",
        minimal: "border-b-2 border-transparent bg-transparent hover:border-primary rounded-none shadow-none py-8",
      },
      isDragging: {
        true: "border-primary bg-primary/5 scale-[0.99]",
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
    isDragging, setIsDragging, disabled, variant, inputRef, 
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

  return (
    <div
      onClick={handleClick}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={cn(dropzoneVariants({ variant, isDragging, disabled }), variant !== 'compact' && "p-8", className)}
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
            "p-3 rounded-full bg-primary/10 text-primary transition-transform", 
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
            "p-4 rounded-full bg-primary/10 text-primary mb-4 transition-transform duration-300", 
            isDragging && "scale-110 shadow-lg shadow-primary/20"
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
            className="absolute inset-0 pointer-events-none rounded-[inherit] bg-gradient-to-tr from-primary/10 to-transparent"
          />
        )}
      </AnimatePresence>
    </div>
  );
});
UploadDropzone.displayName = "UploadDropzone";

// --- Preview Component ---

export const UploadPreview = React.memo(function UploadPreview({ className }: { className?: string }) {
  const { files, handleRemoveFile, variant } = useFileUpload();

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
                "relative flex items-center gap-4 p-3 rounded-xl overflow-hidden group border",
                variant === "glass" ? "bg-background/20 backdrop-blur-sm border-white/10" : "bg-card border-border",
                fileState.status === "error" && "border-destructive/50 bg-destructive/5"
              )}
            >
              {/* Thumbnail / Icon */}
              <div className="relative shrink-0 h-10 w-10 sm:h-12 sm:w-12 rounded-lg bg-muted flex items-center justify-center overflow-hidden">
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
                    <div className="h-4 w-4 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                  </div>
                )}
                {fileState.status === 'success' && (
                  <div className="absolute inset-0 bg-background/50 flex items-center justify-center backdrop-blur-[1px]">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
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
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-muted opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                <span className="sr-only">Remove file</span>
              </motion.button>

              {/* Progress Bar Overlay for the specific file */}
              {fileState.status === 'uploading' && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-muted/50">
                   <motion.div 
                     className="h-full bg-primary"
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
  const { files } = useFileUpload();

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
          className="h-full bg-primary rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${totalProgress}%` }}
          transition={{ ease: "linear" }}
        />
      </div>
    </div>
  );
});
UploadProgress.displayName = "UploadProgress";
