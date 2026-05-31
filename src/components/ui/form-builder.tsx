/* eslint-disable */
"use client";

/**
 * @registry-slug form-builder
 * @registry-name FormBuilder
 * @registry-dependency react-hook-form
 * @registry-dependency zod
 * @registry-dependency @hookform/resolvers
 * @registry-dependency framer-motion
 * @registry-dependency lucide-react
 */

import React, { useMemo } from "react";
import { useForm, useFieldArray, Controller, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, ChevronRight, AlertCircle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";

// ==========================================
// TYPES & SCHEMAS
// ==========================================

export type FormVariant = "default" | "minimal" | "enterprise" | "compact";
export type LayoutOption = "single" | "two" | "three" | "auto";

export type FieldType =
  | "text"
  | "email"
  | "password"
  | "number"
  | "textarea"
  | "select"
  | "checkbox"
  | "radio"
  | "group"
  | "array"
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
  custom?: (val: any) => boolean | string;
}

export interface SchemaField {
  name: string;
  type: FieldType;
  label?: string;
  placeholder?: string;
  description?: string;
  required?: boolean;
  requiredMessage?: string;
  defaultValue?: any;
  colSpan?: 1 | 2 | 3 | "full";
  options?: FieldOption[];
  validation?: FieldValidation;
  showIf?: (values: any) => boolean;
  
  // For 'group' and 'array' types
  fields?: SchemaField[];
  
  // Custom Render
  render?: (methods: UseFormReturn<any>, name: string) => React.ReactNode;
}

export interface FormBuilderProps {
  schema: SchemaField[];
  defaultValues?: Record<string, any>;
  onSubmit: (data: any, methods: UseFormReturn<any>) => void | Promise<void>;
  variant?: FormVariant;
  layout?: LayoutOption;
  submitText?: string;
  className?: string;
  isLoading?: boolean;
}

// ==========================================
// DYNAMIC ZOD SCHEMA BUILDER
// ==========================================

const buildZodSchema = (fields: SchemaField[]): z.ZodObject<any, any> => {
  const shape: Record<string, z.ZodTypeAny> = {};

  fields.forEach((field) => {
    let fieldSchema: z.ZodTypeAny = z.any();

    if (field.type === "group" && field.fields) {
      fieldSchema = buildZodSchema(field.fields);
      if (!field.required) fieldSchema = fieldSchema.optional();
    } else if (field.type === "array" && field.fields) {
      const itemSchema = buildZodSchema(field.fields);
      fieldSchema = z.array(itemSchema);
      if (field.validation?.min !== undefined) {
        fieldSchema = (fieldSchema as z.ZodArray<any>).min(field.validation.min, `Requires at least ${field.validation.min} items`);
      }
      if (field.validation?.max !== undefined) {
        fieldSchema = (fieldSchema as z.ZodArray<any>).max(field.validation.max, `Requires at most ${field.validation.max} items`);
      }
      if (!field.required) fieldSchema = fieldSchema.optional();
    } else if (field.type === "checkbox") {
      fieldSchema = z.boolean();
      if (field.required) {
        fieldSchema = (fieldSchema as z.ZodBoolean).refine((v) => v === true, {
          message: field.requiredMessage || "Required",
        });
      } else {
        fieldSchema = fieldSchema.optional();
      }
    } else if (field.type === "number") {
      fieldSchema = z.coerce.number();
      if (field.required) {
        fieldSchema = (fieldSchema as z.ZodNumber).refine((v) => !isNaN(v), {
          message: field.requiredMessage || "Required",
        });
      } else {
        fieldSchema = fieldSchema.optional();
      }
      if (field.validation?.min !== undefined) fieldSchema = (fieldSchema as z.ZodNumber).min(field.validation.min);
      if (field.validation?.max !== undefined) fieldSchema = (fieldSchema as z.ZodNumber).max(field.validation.max);
    } else {
      fieldSchema = z.string();
      if (field.required) {
        fieldSchema = (fieldSchema as z.ZodString).min(1, field.requiredMessage || "Required");
      } else {
        fieldSchema = (fieldSchema as z.ZodString).optional().or(z.literal(""));
      }

      if (field.type === "email") fieldSchema = (fieldSchema as z.ZodString).email("Invalid email");
      if (field.validation?.regex) fieldSchema = (fieldSchema as z.ZodString).regex(new RegExp(field.validation.regex), field.validation.regexMessage || "Invalid format");
      if (field.validation?.min !== undefined) fieldSchema = (fieldSchema as z.ZodString).min(field.validation.min);
      if (field.validation?.max !== undefined) fieldSchema = (fieldSchema as z.ZodString).max(field.validation.max);
    }

    if (field.validation?.custom) {
      fieldSchema = fieldSchema.refine((val) => {
        const res = field.validation!.custom!(val);
        return typeof res === "boolean" ? res : true;
      }, {
        message: "Invalid value",
      });
    }

    shape[field.name] = fieldSchema;
  });

  return z.object(shape);
};

// ==========================================
// STYLES
// ==========================================

const inputVariants = cva(
  "w-full transition-all focus-visible:outline-none placeholder:text-muted-foreground/40",
  {
    variants: {
      variant: {
        default: "bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/10 rounded-lg px-3 py-2 text-sm",
        minimal: "bg-transparent border-b border-border/50 focus:border-primary rounded-none px-0 py-1.5 text-sm",
        enterprise: "bg-muted/30 border border-border/60 focus:border-primary focus:bg-background rounded-md px-3 py-2.5 text-sm shadow-sm",
        compact: "bg-background border border-border focus:border-primary rounded px-2.5 py-1.5 text-xs",
      },
      hasError: {
        true: "border-destructive focus:border-destructive focus:ring-destructive/10",
        false: "",
      }
    },
    defaultVariants: {
      variant: "default",
      hasError: false,
    }
  }
);

const labelVariants = cva(
  "block font-medium mb-1.5",
  {
    variants: {
      variant: {
        default: "text-sm text-foreground",
        minimal: "text-xs font-bold text-muted-foreground uppercase tracking-wider",
        enterprise: "text-[13px] font-semibold text-slate-700 dark:text-slate-300",
        compact: "text-xs text-foreground",
      }
    },
    defaultVariants: {
      variant: "default",
    }
  }
);

// ==========================================
// FIELD COMPONENTS
// ==========================================

interface FieldProps {
  field: SchemaField;
  path: string; // The full dot-notation path (e.g. "users.0.name")
  methods: UseFormReturn<any>;
  variant: FormVariant;
}

const BaseField: React.FC<FieldProps> = ({ field, path, methods, variant }) => {
  const { register, control, formState: { errors }, watch } = methods;
  
  // Conditional rendering
  const formValues = watch();
  if (field.showIf && !field.showIf(formValues)) return null;

  // Error handling
  const errorObj = path.split('.').reduce((acc, part) => acc?.[part], errors as any);
  const errorMessage = errorObj?.message;

  const colSpanClass = field.colSpan === "full" ? "col-span-full" : 
                       field.colSpan === 2 ? "col-span-1 md:col-span-2" : 
                       field.colSpan === 3 ? "col-span-1 md:col-span-3" : "col-span-1";

  if (field.type === "custom" && field.render) {
    return (
      <div className={cn("w-full", colSpanClass)}>
        {field.render(methods, path)}
        {errorMessage && <p className="text-[11px] text-destructive mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3"/>{errorMessage}</p>}
      </div>
    );
  }

  if (field.type === "group" && field.fields) {
    return (
      <div className={cn("w-full border rounded-xl p-4 bg-muted/5 space-y-4", colSpanClass)}>
        {field.label && <h4 className="font-semibold text-lg">{field.label}</h4>}
        {field.description && <p className="text-sm text-muted-foreground -mt-3">{field.description}</p>}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {field.fields.map((subField) => (
            <BaseField 
              key={subField.name} 
              field={subField} 
              path={`${path}.${subField.name}`} 
              methods={methods} 
              variant={variant} 
            />
          ))}
        </div>
      </div>
    );
  }

  if (field.type === "array" && field.fields) {
    return (
      <ArrayField 
        field={field} 
        path={path} 
        methods={methods} 
        variant={variant} 
        colSpanClass={colSpanClass} 
      />
    );
  }

  // eslint-disable-next-line react-hooks/static-components
  const InputWrapper = ({ children }: { children: React.ReactNode }) => (
    <div className={cn("w-full flex flex-col", colSpanClass)}>
      {field.label && field.type !== 'checkbox' && (
        <label className={labelVariants({ variant })}>
          {field.label} {field.required && <span className="text-destructive">*</span>}
        </label>
      )}
      {field.description && <p className="text-xs text-muted-foreground mb-2">{field.description}</p>}
      {children}
      {errorMessage && (
        <motion.p 
          initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}
          className="text-[11px] text-destructive mt-1.5 flex items-center gap-1 font-medium"
        >
          <AlertCircle className="w-3 h-3"/>{errorMessage}
        </motion.p>
      )}
    </div>
  );

  const inputClass = inputVariants({ variant, hasError: !!errorMessage });

  return (
    <InputWrapper>
      {field.type === "textarea" ? (
        <textarea
          {...register(path)}
          placeholder={field.placeholder}
          rows={4}
          className={inputClass}
        />
      ) : field.type === "select" ? (
        <select {...register(path)} className={cn(inputClass, "appearance-none bg-no-repeat bg-[right_0.75rem_center] bg-[length:16px_12px]")} style={{ backgroundImage: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3E%3C/svg%3E")` }}>
          <option value="" disabled hidden>{field.placeholder || "Select option"}</option>
          {field.options?.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      ) : field.type === "checkbox" ? (
        <div className="flex items-center gap-2 mt-1">
          <input
            type="checkbox"
            {...register(path)}
            id={path}
            className="w-4 h-4 rounded border-border text-primary focus:ring-primary/20 transition-colors"
          />
          <label htmlFor={path} className={cn("text-sm cursor-pointer", errorMessage ? "text-destructive" : "text-foreground")}>
            {field.label} {field.required && <span className="text-destructive">*</span>}
          </label>
        </div>
      ) : field.type === "radio" ? (
        <div className="flex flex-wrap gap-4 mt-1">
          {field.options?.map((opt) => (
            <label key={opt.value} className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="radio"
                value={opt.value}
                {...register(path)}
                className="w-4 h-4 text-primary focus:ring-primary/20"
              />
              {opt.label}
            </label>
          ))}
        </div>
      ) : (
        <input
          type={field.type}
          {...register(path)}
          placeholder={field.placeholder}
          className={inputClass}
        />
      )}
    </InputWrapper>
  );
};

// ==========================================
// ARRAY FIELD COMPONENT (Repeatable)
// ==========================================

const ArrayField: React.FC<FieldProps & { colSpanClass: string }> = ({ field, path, methods, variant, colSpanClass }) => {
  const { control, watch } = methods;
  const { fields, append, remove } = useFieldArray({
    control,
    name: path,
  });

  const formValues = watch();
  if (field.showIf && !field.showIf(formValues)) return null;

  return (
    <div className={cn("w-full border rounded-xl p-4 bg-background shadow-sm space-y-4", colSpanClass)}>
      <div className="flex items-center justify-between">
        <div>
          {field.label && <h4 className="font-semibold text-foreground">{field.label}</h4>}
          {field.description && <p className="text-xs text-muted-foreground mt-0.5">{field.description}</p>}
        </div>
      </div>

      <div className="space-y-4">
        <AnimatePresence initial={false}>
          {fields.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="relative p-4 border rounded-lg bg-muted/20"
            >
              <div className="absolute right-2 top-2 z-10">
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="p-1.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-md transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                {field.fields?.map((subField) => (
                  <BaseField 
                    key={subField.name} 
                    field={subField} 
                    path={`${path}.${index}.${subField.name}`} 
                    methods={methods} 
                    variant={variant} 
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <button
        type="button"
        onClick={() => {
          // Initialize empty object based on fields
          const newItem = field.fields?.reduce((acc, f) => ({ ...acc, [f.name]: f.defaultValue || "" }), {});
          append(newItem);
        }}
        className={cn(
          "flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors mt-2",
          variant === "enterprise" && "bg-primary/10 px-3 py-1.5 rounded-md",
          variant === "minimal" && "underline underline-offset-4"
        )}
      >
        <Plus className="w-4 h-4" /> Add {field.label ? field.label.slice(0, -1) : "Item"}
      </button>
    </div>
  );
};

// ==========================================
// ROOT FORM BUILDER COMPONENT
// ==========================================

export function FormBuilder({
  schema,
  defaultValues,
  onSubmit,
  variant = "default",
  layout = "auto",
  submitText = "Submit",
  className,
  isLoading = false
}: FormBuilderProps) {
  
  const zodSchema = useMemo(() => buildZodSchema(schema), [schema]);
  
  const methods = useForm({
    resolver: zodResolver(zodSchema),
    defaultValues: defaultValues || {},
    mode: "onTouched"
  });

  const { handleSubmit, formState: { isSubmitting } } = methods;

  const handleFormSubmit = async (data: any) => {
    await onSubmit(data, methods);
  };

  const layoutClass = useMemo(() => {
    switch (layout) {
      case "single": return "grid-cols-1";
      case "two": return "grid-cols-1 md:grid-cols-2";
      case "three": return "grid-cols-1 md:grid-cols-3";
      case "auto": return "grid-cols-1 md:grid-cols-2 lg:grid-cols-12";
      default: return "grid-cols-1";
    }
  }, [layout]);

  return (
    <div className={cn("w-full max-w-4xl mx-auto", className)}>
      <form onSubmit={handleSubmit(handleFormSubmit)} className="w-full space-y-6">
        <div className={cn("grid gap-6 items-start", layoutClass)}>
          {schema.map((field) => (
            <div 
              key={field.name} 
              className={cn(
                "w-full", 
                layout === "auto" ? (
                  field.colSpan === "full" ? "lg:col-span-12" :
                  field.colSpan === 3 ? "lg:col-span-9" :
                  field.colSpan === 2 ? "lg:col-span-6" : "lg:col-span-3 md:col-span-1"
                ) : ""
              )}
            >
              <BaseField 
                field={field} 
                path={field.name} 
                methods={methods} 
                variant={variant} 
              />
            </div>
          ))}
        </div>

        <div className="pt-4 flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting || isLoading}
            className={cn(
              "flex items-center justify-center gap-2 font-medium transition-all focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2",
              variant === "default" && "bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg px-6 py-2.5",
              variant === "minimal" && "bg-transparent text-primary hover:bg-primary/10 border border-primary/20 rounded-none px-6 py-2",
              variant === "enterprise" && "bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 rounded-md px-6 py-2 shadow-sm",
              variant === "compact" && "bg-primary text-primary-foreground hover:bg-primary/90 rounded px-4 py-1.5 text-sm",
              (isSubmitting || isLoading) && "opacity-70 cursor-not-allowed"
            )}
          >
            {(isSubmitting || isLoading) ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                {submitText}
                <ChevronRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
