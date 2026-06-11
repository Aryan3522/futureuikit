/* eslint-disable */
/**
 * @registry-slug dynamic-form
 * @registry-name Dynamic Form System
 * @registry-description A Future UI Dynamic Form System component.
 * @registry-category ui
 * @registry-dependency react-hook-form
 * @registry-dependency zod
 * @registry-dependency @hookform/resolvers
 * @registry-dependency framer-motion
 * @registry-dependency lucide-react
 */
"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { useForm, Controller, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  Loader2,
  Eye,
  EyeOff,
  UploadCloud,
  X,
  Check,
  ChevronDown,
  AlertCircle,
  HelpCircle,
  FileCode,
  Calendar,
  Lock,
  Mail,
  User,
  Globe,
  Phone as PhoneIcon,
  Link as LinkIcon
} from "lucide-react";
import { cn } from "@/lib/utils";

// ==========================================
// TYPES & INTERFACES
// ==========================================

export type FormVariant =
  | "minimal"
  | "modern"
  | "glass"
  | "outline"
  | "elevated"
  | "dark"
  | "compact";

export type FieldType =
  | "text"
  | "email"
  | "password"
  | "number"
  | "textarea"
  | "select"
  | "checkbox"
  | "radio"
  | "date"
  | "file"
  | "phone"
  | "url"
  | "multi-select"
  | "switch"
  | "otp"
  | "autocomplete"
  | "hidden"
  | "custom";

export interface FieldOption {
  label: string;
  value: string | number;
}

export interface FieldValidation {
  min?: number;
  max?: number;
  regex?: string;
  regexMessage?: string;
  email?: boolean;
  url?: boolean;
  custom?: (val: any) => boolean | string;
}

export interface FieldConfig {
  name: string;
  type: FieldType;
  label?: string;
  placeholder?: string;
  required?: boolean;
  requiredMessage?: string;
  defaultValue?: any;
  colSpan?: 1 | 2 | 3 | 4 | "full";
  options?: FieldOption[];
  validation?: FieldValidation;
  condition?: (formValues: any) => boolean;
  render?: (methods: UseFormReturn<any>) => React.ReactNode;
  // Specific inputs settings
  otpLength?: number;
  fileAccept?: string;
  fileMaxSizeMB?: number;
  icon?: React.ComponentType<any>;
}

export interface FormStep {
  title: string;
  description?: string;
  fieldNames: string[];
}

export interface FormApiConfig {
  endpoint: string;
  method?: "POST" | "PUT" | "PATCH";
  headers?: Record<string, string>;
}

export interface DynamicFormProps {
  fields: FieldConfig[];
  variant?: FormVariant;
  steps?: FormStep[];
  api?: FormApiConfig;
  defaultValues?: Record<string, any>;
  validationSchema?: z.ZodObject<any>;
  onSubmit?: (data: any, methods: UseFormReturn<any>) => void | Promise<void>;
  beforeSubmit?: (data: any) => any | Promise<any>;
  onSuccess?: (response: any) => void;
  onError?: (error: any) => void;
  floatingLabel?: boolean;
  autoSaveKey?: string;
  autoSaveDebounceMs?: number;
  accentColor?: string; // Custom hex or tailwind class
  showResetButton?: boolean;
  submitButtonText?: string;
}

// ==========================================
// DYNAMIC ZOD SCHEMA BUILDER
// ==========================================

export const buildDynamicSchema = (fields: FieldConfig[]) => {
  const shape: Record<string, any> = {};

  fields.forEach((field) => {
    if (field.type === "hidden") {
      shape[field.name] = z.any().optional();
      return;
    }
    if (field.type === "custom") {
      shape[field.name] = field.required
        ? z.any().refine((v) => v !== undefined && v !== null && v !== "", {
            message: field.requiredMessage || `${field.label || field.name} is required`
          })
        : z.any().optional();
      return;
    }

    let schema: any = z.any();

    if (field.type === "checkbox") {
      schema = z.boolean();
      if (field.required) {
        schema = schema.refine((v: boolean) => v === true, {
          message: field.requiredMessage || `${field.label || field.name} is required`
        });
      }
    } else if (field.type === "switch") {
      schema = z.boolean();
      if (field.required) {
        schema = schema.refine((v: boolean) => v === true, {
          message: field.requiredMessage || `${field.label || field.name} is required`
        });
      }
    } else if (field.type === "multi-select") {
      schema = z.array(z.union([z.string(), z.number()]));
      if (field.required) {
        schema = schema.min(1, field.requiredMessage || `Select at least one ${field.label || field.name}`);
      }
    } else if (field.type === "file") {
      schema = z.any();
      if (field.required) {
        schema = schema.refine((files: any) => {
          if (!files) return false;
          if (files instanceof FileList) return files.length > 0;
          if (Array.isArray(files)) return files.length > 0;
          return true;
        }, field.requiredMessage || `${field.label || field.name} is required`);
      }
      if (field.fileMaxSizeMB) {
        const bytes = field.fileMaxSizeMB * 1024 * 1024;
        schema = schema.refine((files: any) => {
          if (!files) return true;
          const fileList =
            files instanceof FileList
              ? Array.from(files)
              : Array.isArray(files)
              ? files
              : [files];
          return fileList.every((file: any) => !(file instanceof File) || file.size <= bytes);
        }, `File size must be less than ${field.fileMaxSizeMB}MB`);
      }
    } else if (field.type === "number") {
      schema = z.coerce.number();
      if (field.required) {
        schema = schema.refine((val: any) => val !== undefined && val !== null && !isNaN(val), {
          message: field.requiredMessage || `${field.label || field.name} is required`
        });
      }
      if (field.validation?.min !== undefined) {
        schema = schema.min(field.validation.min, `Must be at least ${field.validation.min}`);
      }
      if (field.validation?.max !== undefined) {
        schema = schema.max(field.validation.max, `Must be at most ${field.validation.max}`);
      }
    } else {
      schema = z.string();
      
      if (field.required) {
        schema = schema.min(1, field.requiredMessage || `${field.label || field.name} is required`);
      } else {
        schema = schema.optional().or(z.literal(""));
      }

      if (field.type === "email" || field.validation?.email) {
        schema = schema.email("Invalid email address");
      }
      if (field.type === "url" || field.validation?.url) {
        schema = schema.url("Invalid URL");
      }
      if (field.validation?.regex) {
        schema = schema.regex(new RegExp(field.validation.regex), field.validation.regexMessage || "Invalid format");
      }
      if (field.validation?.min !== undefined) {
        schema = schema.min(field.validation.min, `Must be at least ${field.validation.min} characters`);
      }
      if (field.validation?.max !== undefined) {
        schema = schema.max(field.validation.max, `Must be at most ${field.validation.max} characters`);
      }
    }

    if (field.validation?.custom) {
      schema = schema.refine((val: any) => {
        const res = field.validation!.custom!(val);
        return typeof res === "boolean" ? res : true;
      }, {
        message: "Invalid field value"
      });
    }

    shape[field.name] = schema;
  });

  return z.object(shape);
};

// ==========================================
// ENTERPRISE ADVANCED FIELD COMPONENTS
// ==========================================

// 1. OTP INPUT COMPONENT
interface OTPInputProps {
  length?: number;
  value?: string;
  onChange: (val: string) => void;
  variant?: FormVariant;
  disabled?: boolean;
}

export const OTPInput: React.FC<OTPInputProps> = React.memo(({
          length = 6,
          value = "",
          onChange,
          variant = "modern",
          disabled = false
        }) => {
          const inputsRef = useRef<HTMLInputElement[]>([]);
          const otpArray = useMemo(() => {
            const arr = Array(length).fill("");
            for (let i = 0; i < length; i++) {
              arr[i] = value[i] || "";
            }
            return arr;
          }, [value, length]);

          const handleChange = (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
            const val = e.target.value;
            if (!/^\d*$/.test(val)) return;

            const newOtp = [...otpArray];
            newOtp[idx] = val.slice(-1);
            const result = newOtp.join("");
            onChange(result);

            if (val && idx < length - 1) {
              inputsRef.current[idx + 1]?.focus();
            }
          };

          const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, idx: number) => {
            if (e.key === "Backspace" && !otpArray[idx] && idx > 0) {
              inputsRef.current[idx - 1]?.focus();
            }
          };

          const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
            e.preventDefault();
            const pasteData = e.clipboardData.getData("text").trim().slice(0, length);
            if (!/^\d+$/.test(pasteData)) return;

            onChange(pasteData);
            const targetIdx = Math.min(pasteData.length, length - 1);
            inputsRef.current[targetIdx]?.focus();
          };

          return (
            <div className="flex gap-2 justify-center my-2" role="group" aria-label="OTP input code">
              {Array(length)
                .fill(0)
                .map((_, idx) => (
                  <input
                    key={idx}
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={1}
                    disabled={disabled}
                    value={otpArray[idx] || ""}
                    ref={(el) => {
                      if (el) inputsRef.current[idx] = el;
                    }}
                    onChange={(e) => handleChange(e, idx)}
                    onKeyDown={(e) => handleKeyDown(e, idx)}
                    onPaste={handlePaste}
                    className={cn(
                      "w-12 h-14 text-center font-bold text-xl rounded-xl transition-all outline-none",
                      variant === "glass" && "bg-white/5 dark:bg-black/20 border border-white/10 dark:border-white/5 text-foreground focus:border-white/40 focus:ring-1 focus:ring-white/10",
                      variant === "minimal" && "bg-transparent border-b-2 border-border focus:border-primary rounded-none",
                      variant === "dark" && "bg-card dark:bg-zinc-900 border border-border dark:border-zinc-800 text-foreground dark:text-zinc-100 focus:border-primary dark:focus:border-zinc-500",
                      variant !== "glass" && variant !== "minimal" && variant !== "dark" && "bg-muted/40 border border-border/80 focus:border-primary focus:ring-2 focus:ring-primary/10"
                    )}
                  />
                ))}
            </div>
          );
        });
OTPInput.displayName = "OTPInput";

// 2. AUTOCOMPLETE COMPONENT
interface AutocompleteProps {
  options: FieldOption[];
  value?: string;
  onChange: (val: string) => void;
  placeholder?: string;
  variant?: FormVariant;
  disabled?: boolean;
}

export const AutocompleteInput: React.FC<AutocompleteProps> = React.memo(({
          options,
          value = "",
          onChange,
          placeholder,
          variant,
          disabled
        }) => {
          const [isOpen, setIsOpen] = useState(false);
          const [searchTerm, setSearchTerm] = useState("");
          const [focusedIdx, setFocusedIdx] = useState(-1);
          const dropdownRef = useRef<HTMLDivElement>(null);
          const inputRef = useRef<HTMLInputElement>(null);

          const filtered = useMemo(() => {
            if (!searchTerm) return options;
            return options.filter((opt) =>
              opt.label.toLowerCase().includes(searchTerm.toLowerCase())
            );
          }, [searchTerm, options]);

          useEffect(() => {
            const matched = options.find((opt) => opt.value === value);
            setSearchTerm(matched ? matched.label : value);
          }, [value, options]);

          useEffect(() => {
            const handleOutsideClick = (e: MouseEvent) => {
              if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setIsOpen(false);
              }
            };
            document.addEventListener("mousedown", handleOutsideClick);
            return () => document.removeEventListener("mousedown", handleOutsideClick);
          }, []);

          const handleSelect = (opt: FieldOption) => {
            onChange(String(opt.value));
            setSearchTerm(opt.label);
            setIsOpen(false);
          };

          const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (!isOpen) {
              if (e.key === "ArrowDown" || e.key === "Enter") {
                setIsOpen(true);
              }
              return;
            }

            if (e.key === "ArrowDown") {
              e.preventDefault();
              setFocusedIdx((prev) => (prev < filtered.length - 1 ? prev + 1 : 0));
            } else if (e.key === "ArrowUp") {
              e.preventDefault();
              setFocusedIdx((prev) => (prev > 0 ? prev - 1 : filtered.length - 1));
            } else if (e.key === "Enter") {
              e.preventDefault();
              if (focusedIdx >= 0 && filtered[focusedIdx]) {
                handleSelect(filtered[focusedIdx]);
              }
            } else if (e.key === "Escape") {
              setIsOpen(false);
            }
          };

          return (
            <div className="relative w-full" ref={dropdownRef}>
              <input
                ref={inputRef}
                type="text"
                disabled={disabled}
                placeholder={placeholder}
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  onChange(e.target.value);
                  setIsOpen(true);
                }}
                onFocus={() => setIsOpen(true)}
                onKeyDown={handleKeyDown}
                className={cn(
                  "w-full text-sm",
                  variant === "glass" && "bg-white/5 dark:bg-black/20 border border-white/10 dark:border-white/5 focus:border-white/30 rounded-2xl px-4 py-3 placeholder:text-muted-foreground/30",
                  variant === "minimal" && "bg-transparent border-b border-border/50 focus:border-primary rounded-none py-1 px-0 focus:ring-0",
                  variant === "dark" && "bg-card dark:bg-zinc-900 border border-border dark:border-zinc-800 text-foreground dark:text-zinc-100 rounded-xl px-3.5 py-2.5",
                  variant !== "glass" && variant !== "minimal" && variant !== "dark" && "bg-muted/40 border border-border/50 rounded-xl px-3.5 py-2.5 focus:border-primary focus:ring-1 focus:ring-primary/20"
                )}
              />
              {isOpen && filtered.length > 0 && (
                <div className="absolute z-50 w-full mt-2 rounded-xl overflow-hidden border border-border/50 bg-background/95 backdrop-blur-xl shadow-lg max-h-56 overflow-y-auto custom-scrollbar">
                  {filtered.map((opt, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSelect(opt)}
                      className={cn(
                        "w-full text-left px-4 py-2.5 text-sm transition-colors flex items-center justify-between",
                        idx === focusedIdx ? "bg-primary/10 text-primary font-medium" : "hover:bg-muted/60 text-foreground/80",
                        value === String(opt.value) && "bg-primary/5 text-primary"
                      )}
                    >
                      <span>{opt.label}</span>
                      {value === String(opt.value) && <Check className="w-4 h-4 text-primary" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        });
AutocompleteInput.displayName = "AutocompleteInput";

// 3. MULTI-SELECT PILLED COMPONENT
interface MultiSelectProps {
  options: FieldOption[];
  value?: (string | number)[];
  onChange: (val: (string | number)[]) => void;
  placeholder?: string;
  variant?: FormVariant;
  disabled?: boolean;
}

export const MultiSelectInput: React.FC<MultiSelectProps> = React.memo(({
          options,
          value = [],
          onChange,
          placeholder = "Select options",
          variant,
          disabled
        }) => {
          const [isOpen, setIsOpen] = useState(false);
          const dropdownRef = useRef<HTMLDivElement>(null);

          useEffect(() => {
            const handleOutsideClick = (e: MouseEvent) => {
              if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setIsOpen(false);
              }
            };
            document.addEventListener("mousedown", handleOutsideClick);
            return () => document.removeEventListener("mousedown", handleOutsideClick);
          }, []);

          const toggleOption = (val: string | number) => {
            if (value.includes(val)) {
              onChange(value.filter((v) => v !== val));
            } else {
              onChange([...value, val]);
            }
          };

          const selectedOptions = useMemo(() => {
            return options.filter((o) => value.includes(o.value));
          }, [options, value]);

          return (
            <div className="relative w-full" ref={dropdownRef}>
              <button
                type="button"
                disabled={disabled}
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                  "w-full text-sm text-left flex items-center justify-between min-h-[42px] transition-all",
                  variant === "glass" && "bg-white/5 dark:bg-black/20 border border-white/10 dark:border-white/5 rounded-2xl px-4 py-2",
                  variant === "minimal" && "bg-transparent border-b border-border/50 rounded-none py-1.5 px-0",
                  variant === "dark" && "bg-card dark:bg-zinc-900 border border-border dark:border-zinc-800 text-foreground dark:text-zinc-100 rounded-xl px-3.5 py-2",
                  variant !== "glass" && variant !== "minimal" && variant !== "dark" && "bg-muted/40 border border-border/50 rounded-xl px-3.5 py-2 focus:border-primary focus:ring-1 focus:ring-primary/20"
                )}
              >
                <div className="flex flex-wrap gap-1.5 items-center max-w-[90%]">
                  {selectedOptions.length === 0 ? (
                    <span className="text-muted-foreground/50">{placeholder}</span>
                  ) : (
                    selectedOptions.map((opt) => (
                      <span
                        key={opt.value}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleOption(opt.value);
                        }}
                        className="inline-flex items-center gap-1 bg-primary/10 hover:bg-primary/20 text-primary rounded-full px-2.5 py-0.5 text-xs font-semibold select-none cursor-pointer border border-primary/20 transition-colors"
                      >
                        <span>{opt.label}</span>
                        <X className="w-3 h-3 hover:text-primary/70 shrink-0" />
                      </span>
                    ))
                  )}
                </div>
                <ChevronDown className={cn("w-4 h-4 text-muted-foreground shrink-0 transition-transform", isOpen && "rotate-180")} />
              </button>
              {isOpen && (
                <div className="absolute z-50 w-full mt-2 rounded-xl border border-border/50 bg-background/95 backdrop-blur-xl shadow-lg max-h-56 overflow-y-auto custom-scrollbar">
                  {options.map((opt) => {
                    const isSelected = value.includes(opt.value);
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => toggleOption(opt.value)}
                        className={cn(
                          "w-full text-left px-4 py-2.5 text-sm transition-colors flex items-center justify-between",
                          isSelected ? "bg-primary/10 text-primary font-semibold" : "hover:bg-muted/60 text-foreground/80"
                        )}
                      >
                        <span>{opt.label}</span>
                        {isSelected && <Check className="w-4 h-4 text-primary" />}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        });
MultiSelectInput.displayName = "MultiSelectInput";

// 4. RICH FILE UPLOAD COMPONENT
interface FileUploadProps {
  onChange: (val: File[] | null) => void;
  accept?: string;
  maxSizeMB?: number;
  variant?: FormVariant;
  disabled?: boolean;
}

export const FileUploadInput: React.FC<FileUploadProps> = React.memo(({
          onChange,
          accept,
          maxSizeMB = 5,
          variant,
          disabled
        }) => {
          const [dragActive, setDragActive] = useState(false);
          const [files, setFiles] = useState<File[]>([]);
          const fileInputRef = useRef<HTMLInputElement>(null);

          const processFiles = (uploaded: FileList | null) => {
            if (!uploaded) return;
            const array = Array.from(uploaded);
            const validFiles: File[] = [];

            array.forEach((file) => {
              if (file.size <= maxSizeMB * 1024 * 1024) {
                validFiles.push(file);
              }
            });

            const updated = [...files, ...validFiles];
            setFiles(updated);
            onChange(updated.length > 0 ? updated : null);
          };

          const handleDrag = (e: React.DragEvent) => {
            e.preventDefault();
            e.stopPropagation();
            if (e.type === "dragenter" || e.type === "dragover") {
              setDragActive(true);
            } else if (e.type === "dragleave") {
              setDragActive(false);
            }
          };

          const handleDrop = (e: React.DragEvent) => {
            e.preventDefault();
            e.stopPropagation();
            setDragActive(false);
            if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
              processFiles(e.dataTransfer.files);
            }
          };

          const removeFile = (idx: number) => {
            const updated = files.filter((_, i) => i !== idx);
            setFiles(updated);
            onChange(updated.length > 0 ? updated : null);
          };

          return (
            <div className="w-full space-y-2">
              <div
                onDragEnter={handleDrag}
                onDragOver={handleDrag}
                onDragLeave={handleDrag}
                onDrop={handleDrop}
                onClick={() => !disabled && fileInputRef.current?.click()}
                className={cn(
                  "w-full rounded-2xl border-2 border-dashed flex flex-col items-center justify-center p-6 text-center cursor-pointer transition-all min-h-[140px]",
                  dragActive ? "border-primary bg-primary/5" : "border-border/60 bg-muted/20 hover:bg-muted/30",
                  variant === "glass" && "border-white/10 dark:border-white/5 hover:bg-white/5 dark:hover:bg-black/20 bg-transparent",
                  variant === "dark" && "border-border dark:border-zinc-800 bg-card dark:bg-zinc-900/30 hover:bg-muted dark:hover:bg-zinc-900/50",
                  disabled && "opacity-50 cursor-not-allowed"
                )}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept={accept}
                  disabled={disabled}
                  multiple
                  onChange={(e) => processFiles(e.target.files)}
                  className="hidden"
                />
                <UploadCloud className="w-8 h-8 text-muted-foreground/60 mb-2" />
                <p className="text-sm font-semibold text-foreground/90">
                  Drag & Drop or <span className="text-primary hover:underline">Browse Files</span>
                </p>
                <p className="text-xs text-muted-foreground/50 mt-1">
                  Max size {maxSizeMB}MB per file
                </p>
              </div>

              {files.length > 0 && (
                <div className="space-y-1.5 mt-2">
                  {files.map((file, idx) => (
                    <div
                      key={idx}
                      className={cn(
                        "flex items-center justify-between p-2.5 rounded-xl border border-border/40 text-xs bg-muted/40",
                        variant === "glass" && "border-white/5 bg-white/5 text-white/80"
                      )}
                    >
                      <div className="flex items-center gap-2 max-w-[80%]">
                        <FileCode className="w-4 h-4 text-primary shrink-0" />
                        <span className="truncate font-medium">{file.name}</span>
                        <span className="text-muted-foreground/60 shrink-0 select-none">
                          ({(file.size / (1024 * 1024)).toFixed(2)} MB)
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeFile(idx);
                        }}
                        className="p-1 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        });
FileUploadInput.displayName = "FileUploadInput";

// ==========================================
// FORM FIELD WRAPPER (Visual Frameworks)
// ==========================================

const labelVariants = {
  minimal: "text-xs font-bold tracking-wider text-muted-foreground uppercase mb-1",
  modern: "text-sm font-semibold tracking-tight text-foreground/90 mb-1.5",
  glass: "text-xs font-semibold tracking-wider text-white/70 uppercase mb-1",
  outline: "text-sm font-medium text-foreground mb-1.5",
  elevated: "text-sm font-semibold text-foreground/95 mb-1.5",
  dark: "text-xs font-bold tracking-wider text-muted-foreground dark:text-zinc-400 uppercase mb-1.5",
  compact: "text-[11px] font-bold text-muted-foreground uppercase tracking-tight mb-1"
};

const inputStyles = {
  minimal: "bg-transparent border-b border-border/50 focus:border-primary rounded-none px-0 py-1.5 focus:ring-0 focus-visible:outline-none transition-colors",
  modern: "bg-muted/40 border border-border/50 focus:border-primary focus:ring-1 focus:ring-primary/20 rounded-xl px-3.5 py-2.5 transition-all duration-200 focus-visible:outline-none",
  glass: "bg-white/5 dark:bg-black/20 border border-white/10 dark:border-white/5 focus:border-white/30 focus:ring-1 focus:ring-white/10 rounded-2xl px-4 py-3 text-sm backdrop-blur-md placeholder:text-muted-foreground/30 transition-all duration-300 focus-visible:outline-none",
  outline: "bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/10 rounded-lg px-3 py-2 transition-all focus-visible:outline-none",
  elevated: "bg-background border border-border/10 shadow-[0_2px_4px_rgba(0,0,0,0.02)] focus:border-primary focus:ring-2 focus:ring-primary/10 rounded-xl px-3.5 py-2.5 transition-all focus-visible:outline-none",
  dark: "bg-card dark:bg-zinc-900 border border-border dark:border-zinc-800 focus:border-primary dark:focus:border-zinc-500 focus:ring-1 focus:ring-primary/20 dark:focus:ring-zinc-700 rounded-xl px-3.5 py-2.5 text-foreground dark:text-zinc-100 placeholder:text-muted-foreground dark:placeholder:text-zinc-600 transition-all focus-visible:outline-none",
  compact: "bg-muted/20 border border-border/40 focus:border-primary rounded-lg px-2.5 py-1.5 text-xs transition-all focus-visible:outline-none"
};

const colSpans = {
  1: "col-span-1",
  2: "col-span-1 @md:col-span-2",
  3: "col-span-1 @md:col-span-3",
  4: "col-span-1 @md:col-span-4",
  full: "col-span-full"
};

interface FieldWrapperProps {
  field: FieldConfig;
  variant?: FormVariant;
  methods: UseFormReturn<any>;
  floatingLabel?: boolean;
}

export const FieldWrapper: React.FC<FieldWrapperProps> = React.memo(({
          field,
          variant = "modern",
          methods,
          floatingLabel = false
        }) => {
          const {
            register,
            control,
            formState: { errors }
          } = methods;
          
          const [showPassword, setShowPassword] = useState(false);
          const error = errors[field.name];
          const errorMessage = error?.message as string | undefined;

          const inputClass = cn(
            "w-full text-sm placeholder:text-muted-foreground/40 transition-all focus-visible:outline-none",
            inputStyles[variant],
            field.icon && "pl-10",
            errorMessage && "border-destructive focus:border-destructive focus:ring-destructive/10 focus:ring-2"
          );

          const IconComp = field.icon;

          const renderInnerInput = () => {
            switch (field.type) {
              case "textarea":
                return (
                  <textarea
                    id={field.name}
                    placeholder={floatingLabel ? "" : field.placeholder}
                    {...register(field.name)}
                    rows={4}
                    className={inputClass}
                  />
                );

              case "password":
                return (
                  <div className="relative">
                    <input
                      id={field.name}
                      type={showPassword ? "text" : "password"}
                      placeholder={floatingLabel ? "" : field.placeholder}
                      {...register(field.name)}
                      className={inputClass}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground/60 hover:text-foreground transition-colors p-1"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                );

              case "select":
                return (
                  <select id={field.name} {...register(field.name)} className={inputClass}>
                    {field.placeholder && <option value="">{field.placeholder}</option>}
                    {field.options?.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                );

              case "checkbox":
                return (
                  <div className="flex items-center gap-2 py-1 select-none">
                    <input
                      id={field.name}
                      type="checkbox"
                      {...register(field.name)}
                      className="w-4 h-4 rounded border-border/80 text-primary focus:ring-primary focus:ring-offset-background"
                    />
                    <label htmlFor={field.name} className="text-sm font-medium text-foreground/80 cursor-pointer">
                      {field.label}
                    </label>
                  </div>
                );

              case "switch":
                return (
                  <Controller
                    name={field.name}
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <div className="flex items-center gap-3 py-1 select-none">
                        <button
                          type="button"
                          id={field.name}
                          onClick={() => onChange(!value)}
                          className={cn(
                            "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary/20",
                            value ? "bg-primary" : "bg-muted-foreground/30"
                          )}
                        >
                          <span
                            className={cn(
                              "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-background shadow ring-0 transition duration-200 ease-in-out",
                              value ? "translate-x-5" : "translate-x-0"
                            )}
                          />
                        </button>
                        <label htmlFor={field.name} className="text-sm font-medium text-foreground/80 cursor-pointer">
                          {field.label}
                        </label>
                      </div>
                    )}
                  />
                );

              case "radio":
                return (
                  <div className="flex flex-col gap-2 mt-1 py-1">
                    {field.options?.map((opt) => (
                      <div key={opt.value} className="flex items-center gap-2.5">
                        <input
                          type="radio"
                          id={`${field.name}-${opt.value}`}
                          value={opt.value}
                          {...register(field.name)}
                          className="w-4 h-4 border-border/80 text-primary focus:ring-primary focus:ring-offset-background"
                        />
                        <label
                          htmlFor={`${field.name}-${opt.value}`}
                          className="text-sm font-medium text-foreground/80 cursor-pointer"
                        >
                          {opt.label}
                        </label>
                      </div>
                    ))}
                  </div>
                );

              case "otp":
                return (
                  <Controller
                    name={field.name}
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <OTPInput
                        length={field.otpLength}
                        value={value}
                        onChange={onChange}
                        variant={variant}
                      />
                    )}
                  />
                );

              case "autocomplete":
                return (
                  <Controller
                    name={field.name}
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <AutocompleteInput
                        options={field.options || []}
                        value={value}
                        onChange={onChange}
                        placeholder={field.placeholder}
                        variant={variant}
                      />
                    )}
                  />
                );

              case "multi-select":
                return (
                  <Controller
                    name={field.name}
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <MultiSelectInput
                        options={field.options || []}
                        value={value}
                        onChange={onChange}
                        placeholder={field.placeholder}
                        variant={variant}
                      />
                    )}
                  />
                );

              case "file":
                return (
                  <Controller
                    name={field.name}
                    control={control}
                    render={({ field: { onChange } }) => (
                      <FileUploadInput
                        onChange={onChange}
                        accept={field.fileAccept}
                        maxSizeMB={field.fileMaxSizeMB}
                        variant={variant}
                      />
                    )}
                  />
                );

              case "custom":
                return field.render ? field.render(methods) : null;

              case "hidden":
                return <input type="hidden" {...register(field.name)} />;

              default:
                return (
                  <input
                    id={field.name}
                    type={field.type}
                    placeholder={floatingLabel ? "" : field.placeholder}
                    {...register(field.name)}
                    className={inputClass}
                  />
                );
            }
          };

          const isBooleanToggle = field.type === "checkbox" || field.type === "switch";
          if (field.type === "hidden") return <div className="hidden">{renderInnerInput()}</div>;

          return (
            <div
              className={cn(
                "flex flex-col w-full relative",
                colSpans[field.colSpan || 1],
                "animate-in fade-in duration-300"
              )}
            >
              {/* Label and Input Wrapping */}
              {!isBooleanToggle && (
                <div className="relative w-full flex flex-col">
                  {/* Default Label */}
                  {!floatingLabel && field.label && (
                    <label htmlFor={field.name} className={labelVariants[variant]}>
                      {field.label}
                      {field.required && <span className="text-destructive ml-0.5">*</span>}
                    </label>
                  )}

                  {/* Input with potential icon overlay */}
                  <div className="relative w-full">
                    {IconComp && (
                      <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground/60 pointer-events-none">
                        <IconComp className="w-4 h-4" />
                      </div>
                    )}
                    {renderInnerInput()}

                    {/* Floating Label overlay */}
                    {floatingLabel && field.label && (
                      <label
                        htmlFor={field.name}
                        className={cn(
                          "absolute pointer-events-none transition-all duration-300 font-medium",
                          // Placement when input is filled or focused
                          "peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:left-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-muted-foreground/60",
                          "peer-focus:top-1.5 peer-focus:left-4 peer-focus:text-[10px] peer-focus:text-primary peer-focus:scale-95",
                          // If standard modern style or similar
                          "top-1.5 left-4 text-[10px] text-muted-foreground/50 scale-95"
                        )}
                      >
                        {field.label}
                        {field.required && <span className="text-destructive ml-0.5">*</span>}
                      </label>
                    )}
                  </div>
                </div>
              )}

              {/* Boolean Toggles direct render */}
              {isBooleanToggle && renderInnerInput()}

              {/* Interactive Error Renderer */}
              <AnimatePresence mode="wait">
                {errorMessage && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    className="text-xs text-destructive font-medium mt-1 flex items-center gap-1 leading-none select-none"
                  >
                    <AlertCircle className="w-3 h-3 shrink-0" />
                    <span>{errorMessage}</span>
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          );
        });
FieldWrapper.displayName = "FieldWrapper";

// ==========================================
// MULTI-STEP / WIZARD STEPPER INDICATOR
// ==========================================

interface FormStepWizardProps {
  steps: FormStep[];
  currentStep: number;
  variant?: FormVariant;
}

export const FormStepWizard: React.FC<FormStepWizardProps> = React.memo(({
          steps,
          currentStep,
          variant = "modern"
        }) => {
          return (
            <div className="w-full flex flex-col items-center gap-2 mb-6">
              {/* Label tracker */}
              <div className="flex justify-between w-full text-xs font-semibold text-muted-foreground/60 select-none px-1">
                <span className="uppercase tracking-widest text-[10px] font-black text-primary">
                  Step {currentStep + 1} of {steps.length}
                </span>
                <span className="truncate max-w-[200px]">{steps[currentStep].title}</span>
              </div>

              {/* Visual bars indicator */}
              <div className="flex gap-1.5 w-full">
                {steps.map((step, idx) => (
                  <div
                    key={idx}
                    className="relative flex-1 h-1.5 rounded-full overflow-hidden bg-muted border border-border/5"
                  >
                    <motion.div
                      initial={false}
                      animate={{
                        width: idx <= currentStep ? "100%" : "0%",
                        backgroundColor: idx === currentStep ? "var(--primary)" : "rgba(var(--primary), 0.4)"
                      }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="absolute left-0 top-0 h-full bg-primary"
                    />
                  </div>
                ))}
              </div>
            </div>
          );
        });
FormStepWizard.displayName = "FormStepWizard";

// ==========================================
// MAIN DYNAMIC FORM COMPONENT
// ==========================================

const containerVariants = {
  minimal: "bg-transparent p-0 border-none space-y-4",
  modern: "bg-card/40 border border-border/40 rounded-2xl p-6 shadow-sm backdrop-blur-md space-y-5",
  glass: "bg-card/25 backdrop-blur-xl border border-white/10 dark:border-white/5 rounded-3xl p-8 shadow-[0_8px_32px_0_rgba(0,0,0,0.08)] space-y-6",
  outline: "bg-background border-2 border-border/80 rounded-xl p-6 space-y-4",
  elevated: "bg-card border border-border/20 rounded-2xl p-6 shadow-[0_10px_30px_rgba(0,0,0,0.04)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.2)] space-y-5",
  dark: "bg-zinc-950 border border-zinc-800 rounded-2xl p-8 text-zinc-100 space-y-6",
  compact: "bg-card/50 border border-border/30 rounded-xl p-4 space-y-3"
};

export const DynamicForm: React.FC<DynamicFormProps> = React.memo(({
          fields,
          variant = "modern",
          steps,
          api,
          defaultValues = {},
          validationSchema,
          onSubmit,
          beforeSubmit,
          onSuccess,
          onError,
          floatingLabel = false,
          autoSaveKey,
          autoSaveDebounceMs = 1000,
          accentColor,
          showResetButton = false,
          submitButtonText = "Submit"
        }) => {
          const [currentStepIdx, setCurrentStepIdx] = useState(0);
          const [submissionState, setSubmissionState] = useState<{
            isLoading: boolean;
            isSuccess: boolean;
            isError: boolean;
            message?: string;
          }>({
            isLoading: false,
            isSuccess: false,
            isError: false
          });

          const methods = useForm({
            resolver: async (data, context, options) => {
              const activeFields = fields.filter((f) => !f.condition || f.condition(data));
              const schema = validationSchema || buildDynamicSchema(activeFields);
              return zodResolver(schema)(data, context, options);
            },
            defaultValues
          });

          const {
            handleSubmit,
            reset,
            watch,
            trigger,
            formState: { isDirty }
          } = methods;

          // eslint-disable-next-line react-hooks/incompatible-library
          const currentValues = watch();

          // Conditional rendering visibility checks
          const visibleFields = useMemo(() => {
            return fields.filter((field) => {
              if (field.condition) {
                return field.condition(currentValues);
              }
              return true;
            });
          }, [fields, currentValues]);

          // Local Autosave triggers
          useEffect(() => {
            if (!autoSaveKey || !isDirty) return;

            const timer = setTimeout(() => {
              localStorage.setItem(autoSaveKey, JSON.stringify(currentValues));
            }, autoSaveDebounceMs);

            return () => clearTimeout(timer);
          }, [currentValues, isDirty, autoSaveKey, autoSaveDebounceMs]);

          // Load Autosaved state
          useEffect(() => {
            if (!autoSaveKey) return;
            const saved = localStorage.getItem(autoSaveKey);
            if (saved) {
              try {
                reset(JSON.parse(saved));
              } catch (err) {
                console.error("Autosave load failed", err);
              }
            }
          }, [autoSaveKey, reset]);

          // Wizard navigation validations
          const isStepWizard = steps && steps.length > 0;
          
          const currentStepFields = useMemo(() => {
            if (!isStepWizard || !steps) return [];
            return steps[currentStepIdx].fieldNames;
          }, [steps, currentStepIdx, isStepWizard]);

          const handleNextStep = async () => {
            if (!steps) return;
            const stepFieldNames = steps[currentStepIdx].fieldNames;
            
            // Trigger validation specifically for current step fields
            const isStepValid = await trigger(stepFieldNames as any[]);
            if (isStepValid) {
              setCurrentStepIdx((prev) => Math.min(prev + 1, steps.length - 1));
            }
          };

          const handlePrevStep = () => {
            setCurrentStepIdx((prev) => Math.max(prev - 1, 0));
          };

          const handleFormReset = () => {
            reset(defaultValues);
            if (autoSaveKey) {
              localStorage.removeItem(autoSaveKey);
            }
            setCurrentStepIdx(0);
            setSubmissionState({
              isLoading: false,
              isSuccess: false,
              isError: false
            });
          };

          // Submit Handler
          const handleFormSubmit = async (data: any) => {
            setSubmissionState({ isLoading: true, isSuccess: false, isError: false });

            try {
              // Modify payload if hook provided
              let payload = data;
              if (beforeSubmit) {
                payload = await beforeSubmit(data);
              }

              // Check custom submit prop
              if (onSubmit) {
                await onSubmit(payload, methods);
              }

              // Handle direct API integration if configured
              if (api) {
                const response = await fetch(api.endpoint, {
                  method: api.method || "POST",
                  headers: {
                    "Content-Type": "application/json",
                    ...api.headers
                  },
                  body: JSON.stringify(payload)
                });

                if (!response.ok) {
                  throw new Error(`API submission failed with status: ${response.status}`);
                }

                const resData = await response.json();
                setSubmissionState({
                  isLoading: false,
                  isSuccess: true,
                  isError: false,
                  message: "Form submitted successfully!"
                });
                if (onSuccess) onSuccess(resData);
                
                // Remove autosave
                if (autoSaveKey) localStorage.removeItem(autoSaveKey);
              } else {
                // Successful submit without direct endpoint configured
                setSubmissionState({
                  isLoading: false,
                  isSuccess: true,
                  isError: false,
                  message: "Form processed successfully!"
                });
                if (onSuccess) onSuccess(payload);
                if (autoSaveKey) localStorage.removeItem(autoSaveKey);
              }
            } catch (err: any) {
              console.error(err);
              setSubmissionState({
                isLoading: false,
                isSuccess: false,
                isError: true,
                message: err.message || "An unexpected error occurred during submission."
              });
              if (onError) onError(err);
            }
          };

          // Fields to display on current screen
          const fieldsToRender = useMemo(() => {
            if (isStepWizard) {
              return visibleFields.filter((f) => currentStepFields.includes(f.name));
            }
            return visibleFields;
          }, [visibleFields, isStepWizard, currentStepFields]);

          return (
            <form
              onSubmit={handleSubmit(handleFormSubmit)}
              className={cn(
                "w-full text-foreground transition-all duration-300 relative",
                containerVariants[variant]
              )}
              style={accentColor ? ({ "--primary": accentColor } as React.CSSProperties) : undefined}
            >
              {/* Decorative glass orbs */}
              {variant === "glass" && (
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
              )}

              {/* Stepper indicators */}
              {isStepWizard && steps && (
                <FormStepWizard steps={steps} currentStep={currentStepIdx} variant={variant} />
              )}

              {/* Submission Success Banner */}
              {submissionState.isSuccess && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-sm font-semibold flex items-center gap-2 my-2 select-none"
                >
                  <Check className="w-5 h-5 shrink-0" />
                  <span>{submissionState.message || "Submission complete!"}</span>
                </motion.div>
              )}

              {/* Submission Error Banner */}
              {submissionState.isError && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm font-semibold flex items-center gap-2 my-2 select-none"
                >
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <span>{submissionState.message}</span>
                </motion.div>
              )}

              {/* Form Fields Responsive Grid */}
              <div className="grid grid-cols-1 @md:grid-cols-2 gap-4 @container w-full">
                {fieldsToRender.map((field) => (
                  <FieldWrapper
                    key={field.name}
                    field={field}
                    variant={variant}
                    methods={methods}
                    floatingLabel={floatingLabel}
                  />
                ))}
              </div>

              {/* Actions Stepper / Submit Controls */}
              <div className="flex gap-3 justify-end items-center mt-6 pt-4 border-t border-border/10">
                {/* Reset Buttons */}
                {showResetButton && !submissionState.isLoading && (
                  <button
                    type="button"
                    onClick={handleFormReset}
                    className={cn(
                      "px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors border border-border bg-background/50 hover:bg-muted text-muted-foreground hover:text-foreground",
                      variant === "glass" && "border-white/10 hover:bg-white/10 hover:text-white text-white/80 bg-transparent",
                      variant === "dark" && "border-zinc-800 bg-zinc-950 hover:bg-zinc-900 text-zinc-400 hover:text-zinc-100",
                      variant === "compact" && "py-1.5 px-3 text-xs"
                    )}
                  >
                    Reset
                  </button>
                )}

                {/* Wizard previous */}
                {isStepWizard && currentStepIdx > 0 && !submissionState.isLoading && (
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className={cn(
                      "px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors border border-border bg-background hover:bg-muted text-foreground",
                      variant === "glass" && "border-white/10 hover:bg-white/10 text-white/80 bg-transparent",
                      variant === "dark" && "border-zinc-800 hover:bg-zinc-900 text-zinc-300",
                      variant === "compact" && "py-1.5 px-3 text-xs"
                    )}
                  >
                    Back
                  </button>
                )}

                {/* Wizard next or submit */}
                {isStepWizard && steps && currentStepIdx < steps.length - 1 ? (
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className={cn(
                      "px-6 py-2.5 rounded-xl text-sm font-bold text-primary-foreground transition-all flex items-center gap-2",
                      "bg-primary hover:bg-primary/95 hover:shadow-lg hover:shadow-primary/10 select-none",
                      variant === "glass" && "bg-white text-black hover:bg-white/90 shadow-none border border-white/20",
                      variant === "dark" && "bg-zinc-100 text-black hover:bg-zinc-200",
                      variant === "compact" && "py-1.5 px-3 text-xs"
                    )}
                  >
                    Next Step
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={submissionState.isLoading}
                    className={cn(
                      "px-6 py-2.5 rounded-xl text-sm font-bold text-primary-foreground transition-all flex items-center gap-2 justify-center",
                      "bg-primary hover:bg-primary/95 hover:shadow-lg hover:shadow-primary/10 select-none disabled:opacity-50 disabled:cursor-not-allowed min-w-[120px]",
                      variant === "glass" && "bg-white text-black hover:bg-white/90 shadow-none border border-white/20",
                      variant === "dark" && "bg-zinc-100 text-black hover:bg-zinc-200",
                      variant === "compact" && "py-1.5 px-3 text-xs"
                    )}
                  >
                    {submissionState.isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin shrink-0" />
                        <span>Loading...</span>
                      </>
                    ) : (
                      <span>{submitButtonText}</span>
                    )}
                  </button>
                )}
              </div>
            </form>
          );
        });
DynamicForm.displayName = "DynamicForm";
