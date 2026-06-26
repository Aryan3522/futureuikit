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
export type FileUploadTheme = "default" | "modern" | "clean" | "futuristic" | "brutal" | "halftone";
export type FileUploadVariant = "solid" | "outline" | "ghost" | "link";
export type FileUploadSize = "default" | "sm" | "md" | "lg" | "xl" | "full";
export type FileUploadLayout = "default" | "compact" | "card" | "minimal";

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
  maxSize: number;
  accept?: Record<string, string[]>;
  layout: FileUploadLayout;
  variant: FileUploadVariant;
  theme: FileUploadTheme;
  color: FileUploadColor;
  shape: FileUploadShape;
  spacing: FileUploadSpacing;
  size: FileUploadSize;
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

const colorMap: Record<FileUploadColor, { border: string; bg: string; text: string; bgActive: string; bgHover: string; ring: string; gradient: string }> = {
  default: { border: "border-foreground/50", bg: "bg-foreground", text: "text-foreground", bgActive: "bg-foreground/5", bgHover: "hover:bg-foreground/5", ring: "focus:ring-ring/20", gradient: "from-foreground/10" },
  blue: { border: "border-blue-500", bg: "bg-blue-600", text: "text-blue-600", bgActive: "bg-blue-600/5", bgHover: "hover:bg-blue-600/5", ring: "focus:ring-blue-600/20", gradient: "from-blue-500/10" },
  emerald: { border: "border-emerald-500", bg: "bg-emerald-600", text: "text-emerald-600", bgActive: "bg-emerald-600/5", bgHover: "hover:bg-emerald-600/5", ring: "focus:ring-emerald-600/20", gradient: "from-emerald-500/10" },
  rose: { border: "border-rose-500", bg: "bg-rose-600", text: "text-rose-600", bgActive: "bg-rose-600/5", bgHover: "hover:bg-rose-600/5", ring: "focus:ring-rose-600/20", gradient: "from-rose-500/10" },
  amber: { border: "border-amber-500", bg: "bg-amber-500", text: "text-amber-600", bgActive: "bg-amber-500/5", bgHover: "hover:bg-amber-500/5", ring: "focus:ring-amber-500/20", gradient: "from-amber-500/10" },
  violet: { border: "border-violet-500", bg: "bg-violet-600", text: "text-violet-600", bgActive: "bg-violet-600/5", bgHover: "hover:bg-violet-600/5", ring: "focus:ring-violet-600/20", gradient: "from-violet-500/10" },
  indigo: { border: "border-indigo-500", bg: "bg-indigo-600", text: "text-indigo-600", bgActive: "bg-indigo-600/5", bgHover: "hover:bg-indigo-600/5", ring: "focus:ring-indigo-600/20", gradient: "from-indigo-500/10" },
  sky: { border: "border-sky-500", bg: "bg-sky-500", text: "text-sky-600", bgActive: "bg-sky-500/5", bgHover: "hover:bg-sky-500/5", ring: "focus:ring-sky-500/20", gradient: "from-sky-500/10" },
  slate: { border: "border-slate-500", bg: "bg-slate-600", text: "text-slate-600", bgActive: "bg-slate-600/5", bgHover: "hover:bg-slate-600/5", ring: "focus:ring-slate-600/20", gradient: "from-slate-500/10" },
  orange: { border: "border-orange-500", bg: "bg-orange-500", text: "text-orange-600", bgActive: "bg-orange-500/5", bgHover: "hover:bg-orange-500/5", ring: "focus:ring-orange-500/20", gradient: "from-orange-500/10" },
};

const getShapeClass = (shape: FileUploadShape) => {
  switch (shape) {
    case "square": return "rounded-none";
    case "sharp": return "rounded-[2px]";
    case "rounded": return "rounded-2xl";
    case "default": return "rounded-xl";
  }
};

const getSpacingClass = (spacing: FileUploadSpacing, layout: FileUploadLayout, size: FileUploadSize) => {
  let basePad = "p-8";
  if (size === "sm") basePad = "p-4";
  if (size === "lg") basePad = "p-12";
  if (size === "xl") basePad = "p-16";
  if (size === "full") basePad = "p-8 min-h-[300px] h-full flex-1";

  if (layout === "compact") {
    switch (spacing) {
      case "2x": return "p-2 gap-2";
      case "4x": return "p-3 gap-3";
      case "6x": return "p-5 gap-5";
      case "8x": return "p-6 gap-6";
      default: return "p-4 gap-4";
    }
  }
  switch (spacing) {
    case "2x": return `${basePad} gap-2`;
    case "4x": return `${basePad} gap-4`;
    case "6x": return `${basePad} gap-6`;
    case "8x": return `${basePad} gap-8`;
    default: return `${basePad} gap-4`;
  }
};

const getThemeClasses = (theme: FileUploadTheme, colorInfo: any) => {
  switch (theme) {
    case "modern": return `backdrop-blur-md bg-muted/30 border border-border/50 shadow-xl ${colorInfo.text}`;
    case "clean": return `bg-transparent border-transparent shadow-none ${colorInfo.text}`;
    case "futuristic": return `bg-black/80 backdrop-blur-md border ${colorInfo.border} shadow-[0_0_15px_rgba(255,255,255,0.05)] text-white`;
    case "brutal": return `bg-background border-4 ${colorInfo.border} shadow-[4px_4px_0px_0px_currentColor] ${colorInfo.text}`;
    case "halftone": return `bg-[radial-gradient(circle,rgba(0,0,0,0.1)_1px,transparent_1px)] dark:bg-[radial-gradient(circle,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:16px_16px] border-2 border-dashed ${colorInfo.border} ${colorInfo.text}`;
    default: return "";
  }
};

const getVariantClasses = (variant: FileUploadVariant, colorInfo: any, theme: string) => {
  switch (variant) {
    case "solid": return `bg-muted/40 hover:bg-muted/60 border-transparent transition-colors`;
    case "outline": return `border-2 border-dashed ${theme === "default" && colorInfo.border === "border-foreground/50" ? "border-border" : colorInfo.border} bg-transparent ${colorInfo.bgHover} transition-colors`;
    case "ghost": return `bg-transparent border-transparent ${colorInfo.bgHover} transition-colors`;
    case "link": return `bg-transparent border-transparent hover:underline underline-offset-4 transition-colors`;
    default: return "";
  }
};

// --- Provider Component ---

export interface FileUploadProps {
  children: React.ReactNode;
  maxFiles?: number;
  maxSize?: number; // bytes
  accept?: Record<string, string[]>;
  layout?: FileUploadLayout;
  variant?: FileUploadVariant;
  theme?: FileUploadTheme;
  color?: FileUploadColor;
  shape?: FileUploadShape;
  spacing?: FileUploadSpacing;
  size?: FileUploadSize;
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
  layout = "default",
  variant = "outline",
  theme = "default",
  color = "default",
  shape = "default",
  spacing = "default",
  size = "default",
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
        layout,
        variant,
        theme,
        color,
        shape,
        spacing,
        size,
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
    isDragging, setIsDragging, disabled, layout, variant, theme, color, shape, spacing, size, inputRef, 
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

    if (files.length + validFiles.length > maxFiles) {
      validFiles = validFiles.slice(0, maxFiles - files.length);
    }

    const newFileStates = validFiles.map((file) => {
      if (file.size > maxSize) {
        return {
          id: Math.random().toString(36).substring(7),
          file,
          progress: 0,
          status: "error" as FileStatus,
          error: `File size exceeds ${formatBytes(maxSize)}`,
        };
      }

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
    if (inputRef.current) inputRef.current.value = "";
  }, [processFiles, inputRef]);

  const handleClick = () => {
    if (!disabled && inputRef.current) {
      inputRef.current.click();
    }
  };

  const acceptString = React.useMemo(() => {
    if (!accept) return undefined;
    const items: string[] = [];
    Object.entries(accept).forEach(([mime, exts]) => {
      items.push(mime);
      exts.forEach(ext => items.push(ext));
    });
    return items.join(",");
  }, [accept]);

  const defaultSubtitle = `Max size: ${formatBytes(maxSize)} ${maxFiles > 1 ? `| Up to ${maxFiles} files` : ""}`;
  const activeTheme = colorMap[color];
  
  const themeClasses = getThemeClasses(theme, activeTheme);
  const variantClasses = theme === "default" || theme === "halftone" || theme === "clean" ? getVariantClasses(variant, activeTheme, theme) : "";
  
  const layoutClasses = layout === "compact" 
    ? "flex-row gap-4 justify-start" 
    : layout === "card" 
      ? "bg-card shadow-sm hover:shadow-md" 
      : layout === "minimal" 
        ? "border-b-2 border-t-0 border-l-0 border-r-0 rounded-none shadow-none py-8 hover:bg-transparent"
        : "flex-col text-center justify-center gap-4";

  return (
    <div
      onClick={handleClick}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={cn(
        "relative flex items-center w-full transition-all duration-200 outline-none cursor-pointer overflow-hidden group",
        layoutClasses,
        themeClasses,
        variantClasses,
        layout !== "minimal" && getShapeClass(shape),
        getSpacingClass(spacing, layout, size),
        isDragging && activeTheme.border,
        isDragging && activeTheme.bgActive,
        isDragging && "scale-[0.99]",
        disabled && "opacity-50 cursor-not-allowed pointer-events-none",
        !isDragging && layout === "minimal" && "hover:border-foreground",
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
      
      {layout === 'compact' ? (
        <>
          <div className={cn(
            "p-3 rounded-full transition-transform shrink-0", 
            theme === "futuristic" ? "bg-white/10 text-white" : variant === "solid" ? `${activeTheme.bg} text-white` : `${activeTheme.bgActive} ${activeTheme.text}`,
            isDragging && "scale-110"
          )}>
            <UploadCloud className="h-5 w-5" />
          </div>
          <div className="flex flex-col items-start justify-center text-left min-w-0">
            <p className={cn("text-sm font-medium truncate w-full", theme === "futuristic" ? "text-white" : variant === "solid" ? activeTheme.text : "text-foreground")}>{title}</p>
            <p className="text-xs text-muted-foreground truncate w-full">{subtitle || defaultSubtitle}</p>
          </div>
        </>
      ) : (
        <>
          <div className={cn(
            "p-4 rounded-full transition-transform duration-300 flex items-center justify-center", 
            size === "sm" ? "p-3" : size === "lg" ? "p-5" : size === "xl" ? "p-6" : "",
            theme === "futuristic" ? "bg-white/10 text-white" : variant === "solid" ? `${activeTheme.bg} text-white` : `${activeTheme.bgActive} ${activeTheme.text}`,
            isDragging && "scale-110 shadow-lg"
          )}>
            <UploadCloud className={cn("h-6 w-6 sm:h-8 sm:w-8", size === "sm" && "h-5 w-5 sm:h-5 sm:w-5", size === "lg" && "h-8 w-8 sm:h-10 sm:w-10", size === "xl" && "h-10 w-10 sm:h-12 sm:w-12")} />
          </div>
          <div className="flex flex-col items-center justify-center text-center space-y-1 z-10">
            <p className={cn("font-semibold", theme === "futuristic" ? "text-white" : variant === "solid" ? activeTheme.text : "text-foreground", size === "sm" ? "text-xs sm:text-sm" : size === "lg" ? "text-base sm:text-lg" : size === "xl" ? "text-lg sm:text-xl" : "text-sm sm:text-base")}>
              {title}
            </p>
            <p className={cn("max-w-[16rem]", theme === "futuristic" ? "text-white/60" : "text-muted-foreground", size === "sm" ? "text-[10px] sm:text-xs" : size === "lg" ? "text-sm sm:text-base" : size === "xl" ? "text-base sm:text-lg" : "text-xs sm:text-sm")}>
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
            className={cn("absolute inset-0 pointer-events-none rounded-[inherit] bg-gradient-to-tr to-transparent z-0", activeTheme.gradient)}
          />
        )}
      </AnimatePresence>
    </div>
  );
});
UploadDropzone.displayName = "UploadDropzone";

// --- Preview Component ---

export const UploadPreview = React.memo(function UploadPreview({ className }: { className?: string }) {
  const { files, handleRemoveFile, shape, color, theme, variant } = useFileUpload();
  const activeTheme = colorMap[color];

  if (files.length === 0) return null;

  return (
    <div className={cn("grid gap-3 w-full", className)}>
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
                "relative flex items-center gap-4 p-3 overflow-hidden group border w-full",
                getShapeClass(shape),
                theme === "modern" ? "bg-background/20 backdrop-blur-md border-white/10 dark:border-white/10" : theme === "futuristic" ? "bg-black/80 border-white/10 text-white" : theme === "brutal" ? "border-2 border-foreground bg-background shadow-[2px_2px_0px_0px_currentColor]" : "bg-card border-border",
                fileState.status === "error" && "border-destructive/50 bg-destructive/5 text-destructive",
                variant === "ghost" && theme === "default" && "border-transparent bg-transparent hover:bg-muted/30",
                variant === "outline" && theme === "default" && "border-2 border-dashed"
              )}
            >
              <div className={cn("relative shrink-0 h-10 w-10 sm:h-12 sm:w-12 flex items-center justify-center overflow-hidden", theme === "futuristic" ? "bg-white/10" : "bg-muted", shape === "rounded" ? "rounded-xl" : shape === "square" ? "rounded-none" : shape === "sharp" ? "rounded-sm" : "rounded-lg")}>
                {fileState.previewUrl && fileState.file.type.startsWith("image/") ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={fileState.previewUrl} alt={fileState.file.name} className="h-full w-full object-cover" />
                ) : fileState.previewUrl && fileState.file.type.startsWith("video/") ? (
                   <video src={fileState.previewUrl} className="h-full w-full object-cover" />
                ) : (
                  <Icon className={cn("h-5 w-5 sm:h-6 sm:w-6", theme === "futuristic" ? "text-white/70" : activeTheme.text)} />
                )}
                
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

              <div className="flex flex-col flex-1 min-w-0 z-10">
                <p className="text-sm font-medium truncate pr-6">
                  {fileState.file.name}
                </p>
                <div className={cn("flex items-center gap-2 text-xs", theme === "futuristic" ? "text-white/60" : "text-muted-foreground")}>
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

              <motion.button
                whileTap={{ scale: 0.9 }}
                type="button"
                onClick={() => handleRemoveFile(fileState.id)}
                className={cn("absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity focus:outline-none focus:ring-2 z-20", theme === "futuristic" ? "hover:bg-white/10" : "hover:bg-muted", activeTheme.ring)}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Remove file</span>
              </motion.button>

              {fileState.status === 'uploading' && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-muted/50 z-0">
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
  const { files, color, theme } = useFileUpload();
  const activeTheme = colorMap[color];

  const uploadingFiles = files.filter(f => f.status === "uploading");
  if (uploadingFiles.length === 0) return null;

  const totalProgress = uploadingFiles.reduce((acc, f) => acc + f.progress, 0) / uploadingFiles.length;

  return (
    <div className={cn("w-full flex flex-col gap-2", className)}>
      <div className={cn("flex justify-between text-xs font-medium", theme === "futuristic" ? "text-white/70" : "text-muted-foreground")}>
        <span>Uploading {uploadingFiles.length} file{uploadingFiles.length > 1 ? 's' : ''}...</span>
        <span>{Math.round(totalProgress)}%</span>
      </div>
      <div className={cn("h-2 w-full rounded-full overflow-hidden", theme === "futuristic" ? "bg-white/10" : "bg-muted")}>
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
