"use client";

/**
 * @registry-slug premium-upload-button
 * @registry-name Premium Upload Button
 * @registry-description A premium, highly interactive file upload button with various design variants, success states, and robust error handling.
 * @registry-category ui
 * @registry-dependency framer-motion
 * @registry-dependency lucide-react
 */
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, File as FileIcon, Check, AlertCircle, RefreshCw, Sparkles, BrainCircuit, CloudUpload, X } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Props for the PremiumUploadButton component.
 */
export interface PremiumUploadButtonProps {
  /** The visual variant of the button. */
  variant?: "modern" | "minimal" | "futuristic" | "enterprise" | "apple" | "windows" | "clean" | "ai";
  /** Text to show when no file is selected. */
  placeholderText?: string;
  /** Text for the upload action button. */
  buttonLabel?: string;
  /** Accepted file types, e.g., "image/*, .pdf". */
  accept?: string;
  /** Whether multiple files can be selected. */
  multiple?: boolean;
  /** Maximum total file size in bytes. */
  maxSize?: number;
  /** Custom upload handler. Called with the selected files and a progress callback. */
  onUpload?: (files: File[], onProgress: (progress: number) => void) => Promise<void> | void;
  /** URL to automatically post files to via XMLHttpRequest for real progress tracking. */
  uploadUrl?: string;
  /** HTTP method to use when uploadUrl is provided. Defaults to POST. */
  method?: "POST" | "PUT";
  /** Name of the field for the file in the FormData. Defaults to 'file'. */
  name?: string;
  /** Optional headers to attach to the XMLHttpRequest. */
  headers?: Record<string, string>;
  /** Callback fired when an error occurs during selection or upload. */
  onError?: (error: Error) => void;
  /** Callback fired when the upload successfully completes. */
  onSuccess?: () => void;
  /** Controlled progress value from 0 to 100. */
  progress?: number;
  /** Controlled status of the button. */
  status?: "idle" | "selected" | "expanding-margin" | "expanding-width" | "uploading" | "success" | "error";
  /** Fallback simulation mode for UI library previews. Defaults to true if no uploadUrl or onUpload is provided. */
  simulate?: boolean;
  /** Custom class name for the root container. */
  className?: string;
}

const formatFileSize = (bytes: number) => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

/**
 * A highly animated, premium file upload component.
 */
export function PremiumUploadButton({
  variant = "modern",
  placeholderText = "Choose a file",
  buttonLabel = "Upload",
  accept,
  multiple = false,
  maxSize = 10 * 1024 * 1024 * 1024, 
  onUpload,
  uploadUrl,
  method = "POST",
  name = "file",
  headers,
  onError,
  onSuccess,
  progress: controlledProgress,
  status: controlledStatus,
  simulate,
  className = "",
}: PremiumUploadButtonProps) {
  const [internalStatus, setInternalStatus] = useState<"idle" | "selected" | "expanding-margin" | "expanding-width" | "uploading" | "success" | "error">("idle");
  const [internalProgress, setInternalProgress] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const status = controlledStatus !== undefined ? controlledStatus : internalStatus;
  const progress = controlledProgress !== undefined ? controlledProgress : internalProgress;

  const simulateUpload = simulate !== undefined ? simulate : (!uploadUrl && !onUpload);

  useEffect(() => {
    if (simulateUpload && status === "expanding-margin" && controlledStatus === undefined) {
      const timer = setTimeout(() => {
        setInternalStatus("expanding-width");
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [status, controlledStatus, simulateUpload]);

  useEffect(() => {
    if (simulateUpload && status === "expanding-width" && controlledStatus === undefined) {
      const timer = setTimeout(() => {
        setInternalStatus("uploading");
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [status, controlledStatus, simulateUpload]);

  useEffect(() => {
    if (simulateUpload && controlledStatus === undefined && internalStatus === "uploading") {
      let currentProgress = 0;
      const interval = setInterval(() => {
        currentProgress += Math.random() * 10 + 5; 
        if (currentProgress >= 100) {
          currentProgress = 100;
          setInternalProgress(currentProgress);
          setInternalStatus("success");
          clearInterval(interval);
          if (onSuccess) onSuccess();
        } else {
          setInternalProgress(currentProgress);
        }
      }, 300);
      return () => clearInterval(interval);
    }
  }, [internalStatus, controlledStatus, onSuccess, simulateUpload]);

  useEffect(() => {
    if (status === "success" && controlledStatus === undefined) {
      const timer = setTimeout(() => {
        setInternalStatus("idle");
        setInternalProgress(0);
        setFiles([]);
        if (fileInputRef.current) fileInputRef.current.value = "";
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [status, controlledStatus]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    if (selectedFiles.length > 0) {
      processFiles(selectedFiles);
    }
  };

  const processFiles = (newFiles: File[]) => {
    const validFiles = newFiles.filter((file) => file.size <= maxSize);
    if (validFiles.length !== newFiles.length) {
      const errorMsg = `File too large (Max ${formatFileSize(maxSize)})`;
      setErrorMessage(errorMsg);
      if (onError) onError(new Error(errorMsg));
      if (controlledStatus === undefined) setInternalStatus("error");
      return;
    }
    setErrorMessage("");
    setFiles(multiple ? [...files, ...validFiles] : [validFiles[0]]);
    if (controlledStatus === undefined) setInternalStatus("selected");
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (status === "idle" || status === "selected") {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (status !== "idle" && status !== "selected") return;
    const droppedFiles = Array.from(e.dataTransfer.files);
    if (droppedFiles.length > 0) processFiles(droppedFiles);
  };

  const triggerUpload = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (status === "selected" && files.length > 0) {
      if (controlledStatus === undefined) setInternalStatus("expanding-margin");
      
      if (simulateUpload) {
        return;
      }

      if (uploadUrl) {
        const xhr = new XMLHttpRequest();
        const formData = new FormData();
        
        files.forEach((file) => {
          formData.append(multiple ? `${name}[]` : name, file);
        });

        let hasStartedProgress = false;
        const startTimeout = setTimeout(() => {
          if (!hasStartedProgress) {
            xhr.abort();
            setErrorMessage("Connection timed out");
            if (onError) onError(new Error("Upload did not start within 15 seconds"));
            if (controlledStatus === undefined) setInternalStatus("error");
          }
        }, 15000);

        xhr.upload.onprogress = (event) => {
          hasStartedProgress = true;
          clearTimeout(startTimeout);
          if (event.lengthComputable && controlledProgress === undefined) {
            const percentComplete = (event.loaded / event.total) * 100;
            setInternalProgress(percentComplete);
          }
        };

        xhr.onload = () => {
          clearTimeout(startTimeout);
          if (xhr.status >= 200 && xhr.status < 300) {
            if (controlledProgress === undefined) setInternalProgress(100);
            if (controlledStatus === undefined) setInternalStatus("success");
            if (onSuccess) onSuccess();
          } else {
            setErrorMessage("Upload failed");
            if (onError) onError(new Error(`Upload failed with status ${xhr.status}`));
            if (controlledStatus === undefined) setInternalStatus("error");
          }
        };

        xhr.onerror = () => {
          clearTimeout(startTimeout);
          setErrorMessage("Network error");
          if (onError) onError(new Error("Network error during upload"));
          if (controlledStatus === undefined) setInternalStatus("error");
        };

        xhr.open(method, uploadUrl, true);
        if (headers) {
          Object.entries(headers).forEach(([key, value]) => {
            xhr.setRequestHeader(key, value);
          });
        }
        
        setTimeout(() => {
          if (controlledStatus === undefined) setInternalStatus("expanding-width");
        }, 300);

        setTimeout(() => {
          if (controlledStatus === undefined) setInternalStatus("uploading");
          xhr.send(formData);
        }, 700);

      } else if (onUpload) {
        setTimeout(() => {
          if (controlledStatus === undefined) setInternalStatus("expanding-width");
        }, 300);

        setTimeout(async () => {
          if (controlledStatus === undefined) setInternalStatus("uploading");
          try {
            await onUpload(files, (p) => {
              if (controlledProgress === undefined) setInternalProgress(p);
            });
            if (controlledProgress === undefined) setInternalProgress(100);
            if (controlledStatus === undefined) setInternalStatus("success");
            if (onSuccess) onSuccess();
          } catch (err) {
            setErrorMessage(err instanceof Error ? err.message : "Upload failed");
            if (onError) onError(err instanceof Error ? err : new Error("Upload failed"));
            if (controlledStatus === undefined) setInternalStatus("error");
          }
        }, 700);
      }
    }
  };

  const resetState = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (controlledStatus === undefined) {
      setInternalStatus("idle");
      setFiles([]);
      setErrorMessage("");
      setInternalProgress(0);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const triggerFileSelect = () => {
    if (status === "idle" || status === "selected") {
      fileInputRef.current?.click();
    }
  };

  const variantConfig = {
    modern: {
      container: "bg-white dark:bg-black/40 backdrop-blur-xl border border-zinc-200 dark:border-white/10 shadow-sm dark:shadow-lg overflow-hidden rounded-xl",
      actionBg: "bg-zinc-900 dark:bg-white text-white dark:text-black",
      idleBg: "bg-zinc-50 dark:bg-white/10 hover:bg-zinc-100 dark:hover:bg-white/20 text-zinc-900 dark:text-white",
      iconBg: "bg-zinc-50 dark:bg-white/10",
      progressBg: "bg-green-50 dark:bg-green-500",
      successBg: "bg-green-50 dark:bg-green-500 text-green-900 dark:text-white",
      text: "text-zinc-900 dark:text-zinc-200",
      icon: <Upload size={18} />
    },
    minimal: {
      container: "bg-transparent border border-zinc-200 dark:border-white/20 overflow-hidden rounded-none",
      actionBg: "bg-zinc-900 dark:bg-white text-white dark:text-black",
      idleBg: "bg-zinc-50 dark:bg-white/10 hover:bg-zinc-100 dark:hover:bg-white/20 text-zinc-900 dark:text-white",
      iconBg: "bg-zinc-50 dark:bg-white/10",
      progressBg: "bg-green-50 dark:bg-green-500",
      successBg: "bg-green-50 dark:bg-green-500 text-green-900 dark:text-white",
      text: "text-zinc-900 dark:text-zinc-100",
      icon: <FileIcon size={18} />
    },
    futuristic: {
      container: "bg-white dark:bg-[#0a0a0f] border border-cyan-200 dark:border-cyan-500/30 shadow-sm dark:shadow-[0_0_15px_rgba(6,182,212,0.15)] overflow-hidden rounded-lg",
      actionBg: "bg-cyan-500 text-white dark:text-black shadow-none dark:shadow-[0_0_10px_rgba(6,182,212,0.5)]",
      idleBg: "bg-cyan-50 dark:bg-cyan-950 hover:bg-cyan-100 dark:hover:bg-cyan-900 text-cyan-900 dark:text-cyan-100",
      iconBg: "bg-cyan-50 dark:bg-cyan-950",
      progressBg: "bg-green-50 dark:bg-green-500",
      successBg: "bg-green-50 dark:bg-green-500 text-green-900 dark:text-white",
      text: "text-zinc-900 dark:text-cyan-50",
      icon: <CloudUpload size={18} className="text-cyan-600 dark:text-cyan-400" />
    },
    enterprise: {
      container: "bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden rounded-md",
      actionBg: "bg-blue-600 text-white",
      idleBg: "bg-zinc-50 dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white",
      iconBg: "bg-zinc-50 dark:bg-zinc-800",
      progressBg: "bg-green-50 dark:bg-green-500",
      successBg: "bg-green-50 dark:bg-green-500 text-green-900 dark:text-white",
      text: "text-zinc-900 dark:text-white",
      icon: <Upload size={18} />
    },
    apple: {
      container: "bg-white/70 dark:bg-[#1c1c1e]/70 backdrop-blur-3xl border border-black/[0.04] dark:border-white/[0.04] shadow-[0_8px_30px_rgb(0,0,0,0.08)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.3)] rounded-2xl",
      actionBg: "bg-[#007AFF] text-white shadow-sm",
      idleBg: "bg-[#F2F2F7] dark:bg-[#2C2C2E] hover:bg-[#E5E5EA] dark:hover:bg-[#3A3A3C] text-black dark:text-white",
      iconBg: "bg-[#F2F2F7] dark:bg-[#2C2C2E]",
      progressBg: "bg-[#E5F3E8] dark:bg-[#34C759]",
      successBg: "bg-[#E5F3E8] dark:bg-[#34C759] text-[#1E5D2B] dark:text-white",
      text: "text-black dark:text-white",
      icon: <Upload size={18} className="text-[#007AFF]" />
    },
    windows: {
      container: "bg-white/80 dark:bg-black/60 backdrop-blur-2xl border border-zinc-200 dark:border-white/20 shadow-sm rounded-xl",
      actionBg: "bg-[#005FB8] text-white",
      idleBg: "bg-zinc-100 dark:bg-white/10 hover:bg-zinc-200 dark:hover:bg-white/20 text-zinc-900 dark:text-white",
      iconBg: "bg-zinc-100 dark:bg-white/10",
      progressBg: "bg-green-50 dark:bg-green-500",
      successBg: "bg-green-50 dark:bg-green-500 text-green-900 dark:text-white",
      text: "text-zinc-900 dark:text-white",
      icon: <FileIcon size={18} className="text-[#005FB8]" />
    },
    clean: {
      container: "bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-sm rounded-2xl",
      actionBg: "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-black",
      idleBg: "bg-zinc-50 dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-800",
      iconBg: "bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800",
      progressBg: "bg-green-50 dark:bg-green-500",
      successBg: "bg-green-50 dark:bg-green-500 text-green-900 dark:text-white",
      text: "text-zinc-900 dark:text-white",
      icon: <Upload size={18} />
    },
    ai: {
      container: "bg-white dark:bg-background border border-zinc-200 dark:border-fuchsia-500/30 shadow-sm dark:shadow-[0_0_30px_rgba(217,70,239,0.1)] overflow-hidden rounded-2xl",
      actionBg: "bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-md",
      idleBg: "bg-fuchsia-50/50 dark:bg-fuchsia-500/10 hover:bg-fuchsia-100/50 dark:hover:bg-fuchsia-500/20 text-zinc-900 dark:text-fuchsia-100 border border-fuchsia-100 dark:border-transparent",
      iconBg: "bg-fuchsia-50/50 dark:bg-fuchsia-500/10 border border-fuchsia-100 dark:border-transparent",
      progressBg: "bg-green-50 dark:bg-green-500",
      successBg: "bg-green-50 dark:bg-green-500 text-green-900 dark:text-white",
      text: "text-zinc-900 dark:text-fuchsia-50",
      icon: <BrainCircuit size={18} className="text-fuchsia-600 dark:text-fuchsia-400" />
    }
  };

  const config = variantConfig[variant];
  const isApple = variant === "apple";
  
  const isMarginExpanded = status === "expanding-margin" || status === "expanding-width" || status === "uploading" || status === "success";
  const isWidthExpanded = status === "expanding-width" || status === "uploading" || status === "success";

  return (
    <div className={cn("relative w-full max-w-md mx-auto group perspective-1000", className)}>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        accept={accept}
        multiple={multiple}
        className="hidden"
      />

      <motion.div
        layout
        onClick={triggerFileSelect}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        initial={false}
        animate={{
          scale: isDragging ? 1.02 : 1,
          x: status === "error" ? [-5, 5, -5, 5, 0] : 0,
          boxShadow: status === "error" ? "0 0 20px rgba(239, 68, 68, 0.4)" : undefined,
          borderColor: status === "error" ? "rgba(239, 68, 68, 0.5)" : undefined,
        }}
        transition={{
          x: status === "error" ? { duration: 0.4 } : { type: "spring", stiffness: 400, damping: 30 },
          boxShadow: { duration: 0.3 }
        }}
        className={cn(
          "relative cursor-pointer w-full flex items-center justify-between overflow-hidden",
          config.container,
          isDragging && "ring-2 ring-primary"
        )}
        style={{ minHeight: "64px" }}
      >
        <div className={cn(
          "relative z-10 flex items-center justify-between w-full h-full min-h-[64px]"
        )}>
          
          <div className="flex-1 flex items-center h-full overflow-hidden pl-4 py-2">
            <AnimatePresence mode="popLayout">
              {status === "idle" && (
                <motion.div
                  key="idle-content"
                  initial={{ opacity: 0, x: -20, filter: "blur(8px)" }}
                  animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, x: -20, filter: "blur(8px)" }}
                  transition={{ duration: 0.3, type: "spring", bounce: 0 }}
                  className={cn("flex items-center gap-4 w-full", config.text)}
                >
                  <div className={cn(
                    "w-10 h-10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300",
                    isApple ? "rounded-full" : "rounded-lg",
                    config.iconBg
                  )}>
                    {config.icon}
                  </div>
                  <span className={cn("font-medium", isApple ? "text-[15px]" : "text-sm")}>
                    {isDragging ? "Drop files here" : placeholderText}
                  </span>
                </motion.div>
              )}

              {status === "selected" && files.length > 0 && (
                <motion.div
                  key="selected-content"
                  initial={{ opacity: 0, x: 20, filter: "blur(8px)" }}
                  animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, x: -20, filter: "blur(8px)" }}
                  transition={{ duration: 0.4, type: "spring", bounce: 0, staggerChildren: 0.1 }}
                  className={cn("flex items-center gap-3 w-full pr-4", config.text)}
                >
                  <motion.div 
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", bounce: 0.4 }}
                    className={cn(
                      "w-10 h-10 flex items-center justify-center shrink-0",
                      isApple ? "rounded-full" : "rounded-lg",
                      config.iconBg
                    )}
                  >
                    <FileIcon size={18} />
                  </motion.div>
                  <motion.div 
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex flex-col truncate"
                  >
                    <span className="font-medium text-sm truncate">
                      {multiple ? `${files.length} files selected` : files[0].name}
                    </span>
                    <span className="text-xs text-muted-foreground opacity-70">
                      {multiple 
                        ? formatFileSize(files.reduce((acc, f) => acc + f.size, 0))
                        : formatFileSize(files[0].size)
                      } 
                      {!multiple && files[0].name.includes('.') ? ` • ${files[0].name.split('.').pop()?.toUpperCase()}` : ''}
                    </span>
                  </motion.div>
                </motion.div>
              )}

              {status === "error" && (
                <motion.div
                  key="error-content"
                  initial={{ opacity: 0, x: 20, filter: "blur(4px)" }}
                  animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  className="flex items-center gap-3 text-red-500 w-full"
                >
                  <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center shrink-0">
                    <AlertCircle size={18} />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium text-sm">Upload Failed</span>
                    <span className="text-xs opacity-70">{errorMessage || "Please try again"}</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <AnimatePresence mode="wait">
            {status !== "error" && (
              <motion.button
                key="action-btn"
                layout
                onClick={status === "selected" ? triggerUpload : undefined}
                initial={false}
                animate={{ 
                  borderRadius: isMarginExpanded ? 0 : (isApple ? 12 : 8),
                  boxShadow: status === "selected" ? "0 0 15px rgba(0,0,0,0.1)" : "0 0 0px rgba(0,0,0,0)",
                }}
                transition={{ layout: { type: "spring", bounce: 0, duration: 0.6 } }}
                className={cn(
                  "flex items-center justify-center font-semibold transition-colors z-20 outline-none overflow-hidden",
                  status === "idle" ? config.idleBg : config.actionBg,
                  isWidthExpanded ? "absolute inset-0 z-50 text-base" : "relative shrink-0",
                  !isWidthExpanded && (
                    isMarginExpanded 
                      ? "h-[64px] min-w-[120px] px-8 mr-0 text-sm" 
                      : "h-[48px] min-w-[120px] px-6 mr-2 my-2 text-sm"
                  )
                )}
              >
                <AnimatePresence mode="popLayout">
                  {(status === "idle" || status === "selected") && (
                    <motion.span 
                      key="text-idle" 
                      initial={{ opacity: 0, filter: "blur(4px)", y: 10 }} 
                      animate={{ opacity: 1, filter: "blur(0px)", y: 0 }} 
                      exit={{ opacity: 0, filter: "blur(4px)", y: -10 }}
                      transition={{ duration: 0.2 }}
                      className={cn(status === "selected" && "animate-pulse")}
                    >
                      {status === "selected" ? buttonLabel : "Browse"}
                    </motion.span>
                  )}
                  
                  {(status === "expanding-margin" || status === "expanding-width") && (
                    <motion.div 
                      key="text-expanding" 
                      initial={{ opacity: 0, filter: "blur(4px)", y: 10 }} 
                      animate={{ opacity: 1, filter: "blur(0px)", y: 0 }} 
                      exit={{ opacity: 0, filter: "blur(4px)", y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center justify-center w-full"
                    >
                      <span className="flex items-center gap-2">
                        {variant === 'ai' ? (
                          <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }}>
                            <Sparkles size={14} />
                          </motion.div>
                        ) : (
                          <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }}>
                            <RefreshCw size={14} />
                          </motion.div>
                        )}
                        Starting...
                      </span>
                    </motion.div>
                  )}

                  {status === "uploading" && (
                    <motion.div 
                      key="text-uploading" 
                      initial={{ opacity: 0, filter: "blur(4px)", y: 10 }} 
                      animate={{ opacity: 1, filter: "blur(0px)", y: 0 }} 
                      exit={{ opacity: 0, filter: "blur(4px)", y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="flex justify-center items-center w-full absolute inset-0 h-full"
                    >
                      <span className="font-mono text-4xl font-bold tracking-tighter">
                        {Math.round(progress)}%
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>

                <AnimatePresence>
                  {(status === "uploading" || status === "success") && (
                    <motion.div
                      layout
                      initial={{ height: "4px", width: "0%", bottom: 0, opacity: 0 }}
                      animate={{ 
                        width: status === "success" ? "100%" : `${progress}%`,
                        height: status === "success" ? "100%" : "4px",
                        opacity: 1 
                      }}
                      exit={{ opacity: 0 }}
                      transition={{ 
                        width: { ease: "linear", duration: 0.2 }, 
                        height: { duration: 0.6, ease: [0.4, 0, 0.2, 1], delay: status === "success" ? 0.4 : 0 }
                      }}
                      className={cn(
                        "absolute left-0 bottom-0 z-30 flex items-center justify-center overflow-hidden", 
                        status === "success" ? config.successBg : config.progressBg
                      )}
                    >
                      <AnimatePresence>
                        {status === "success" && (
                          <motion.div
                            initial={{ opacity: 0, y: -20, filter: "blur(4px)" }}
                            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                            transition={{ delay: 1.0, type: "spring", bounce: 0.5 }}
                            className="flex items-center gap-2 whitespace-nowrap"
                          >
                            <motion.div initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1.1, duration: 0.5, ease: "easeOut" }}>
                              <Check size={24} strokeWidth={3} />
                            </motion.div>
                            <span className="font-bold tracking-wide text-lg">Completed</span>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  )}
                </AnimatePresence>

              </motion.button>
            )}

            {status === "error" && (
              <motion.div
                key="retry-btn"
                initial={{ opacity: 0, scale: 0.9, filter: "blur(4px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                className={cn(
                  "shrink-0 bg-red-500 text-white flex items-center overflow-hidden z-20",
                  isApple ? "h-12 rounded-xl" : "h-[64px]"
                )}
              >
                {files.length > 0 ? (
                  <>
                    <button
                      onClick={triggerUpload}
                      className="flex items-center justify-center gap-2 h-full px-6 hover:bg-red-600 transition-colors font-semibold text-sm"
                    >
                      <RefreshCw size={16} /> Retry
                    </button>
                    <div className="w-[1px] h-full bg-white/20" />
                    <button 
                      onClick={resetState}
                      className="flex items-center justify-center h-full px-4 hover:bg-red-600 transition-colors"
                      aria-label="Cancel"
                    >
                       <X size={16} />
                    </button>
                  </>
                ) : (
                  <button
                    onClick={resetState}
                    className="flex items-center justify-center gap-2 h-full px-6 hover:bg-red-600 transition-colors font-semibold text-sm"
                  >
                    Dismiss
                  </button>
                )}
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </motion.div>
    </div>
  );
}
