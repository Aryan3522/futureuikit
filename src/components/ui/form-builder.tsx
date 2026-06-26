/* eslint-disable */
"use client";

/**
 * @registry-slug form-builder
 * @registry-name FormBuilder
 * @registry-description A Future UI FormBuilder component.
 * @registry-category ui
 * @registry-dependency react-hook-form
 * @registry-dependency zod
 * @registry-dependency @hookform/resolvers
 * @registry-dependency framer-motion
 * @registry-dependency lucide-react
 */

import React, { useMemo } from "react";
import { useForm, useFieldArray, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, ChevronRight, AlertCircle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

// ==========================================
// TYPES & SCHEMAS
// ==========================================

export type FormBuilderColor = "default" | "blue" | "emerald" | "rose" | "amber" | "violet" | "indigo" | "sky" | "slate" | "orange";
export type FormBuilderShape = "default" | "square" | "rounded" | "sharp";
export type FormBuilderSpacing = "default" | "2x" | "4x" | "6x" | "8x";

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
  color?: FormBuilderColor;
  shape?: FormBuilderShape;
  spacing?: FormBuilderSpacing;
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

const colorThemeMap: Record<FormBuilderColor, { button: string; ring: string; text: string; bg: string }> = {
  default: { button: "bg-foreground text-background hover:bg-foreground/90", ring: "focus:ring-ring/20 focus:border-foreground", text: "text-foreground", bg: "bg-muted text-foreground" },
  blue: { button: "bg-blue-600 text-white hover:bg-blue-700", ring: "focus:ring-blue-600/20 focus:border-blue-600", text: "text-blue-600", bg: "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400" },
  emerald: { button: "bg-emerald-600 text-white hover:bg-emerald-700", ring: "focus:ring-emerald-600/20 focus:border-emerald-600", text: "text-emerald-600", bg: "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400" },
  rose: { button: "bg-rose-600 text-white hover:bg-rose-700", ring: "focus:ring-rose-600/20 focus:border-rose-600", text: "text-rose-600", bg: "bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400" },
  amber: { button: "bg-amber-500 text-zinc-950 hover:bg-amber-600", ring: "focus:ring-amber-500/20 focus:border-amber-500", text: "text-amber-600", bg: "bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400" },
  violet: { button: "bg-violet-600 text-white hover:bg-violet-700", ring: "focus:ring-violet-600/20 focus:border-violet-600", text: "text-violet-600", bg: "bg-violet-50 dark:bg-violet-900/20 text-violet-600 dark:text-violet-400" },
  indigo: { button: "bg-indigo-600 text-white hover:bg-indigo-700", ring: "focus:ring-indigo-600/20 focus:border-indigo-600", text: "text-indigo-600", bg: "bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400" },
  sky: { button: "bg-sky-500 text-zinc-950 hover:bg-sky-600", ring: "focus:ring-sky-500/20 focus:border-sky-500", text: "text-sky-600", bg: "bg-sky-50 dark:bg-sky-900/20 text-sky-600 dark:text-sky-400" },
  slate: { button: "bg-slate-600 text-white hover:bg-slate-700", ring: "focus:ring-slate-600/20 focus:border-slate-600", text: "text-slate-600", bg: "bg-slate-50 dark:bg-slate-900/20 text-slate-600 dark:text-slate-400" },
  orange: { button: "bg-orange-500 text-white hover:bg-orange-600", ring: "focus:ring-orange-500/20 focus:border-orange-500", text: "text-orange-600", bg: "bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400" },
};

const getShapeClass = (shape: FormBuilderShape, element: "input" | "button" | "container" = "input") => {
  switch (shape) {
    case "square": return "rounded-none";
    case "sharp": return "rounded-[2px]";
    case "rounded": 
      return element === "container" ? "rounded-2xl" : element === "button" ? "rounded-xl" : "rounded-lg";
    case "default": 
      return element === "container" ? "rounded-xl" : element === "button" ? "rounded-md" : "rounded-md";
  }
};

const getSpacingStyles = (spacing: FormBuilderSpacing, element: "input" | "button" | "label" = "input") => {
  if (element === "button") {
    switch (spacing) {
      case "2x": return "px-3 py-1 text-xs";
      case "4x": return "px-4 py-1.5 text-sm";
      case "6x": return "px-8 py-3 text-base";
      case "8x": return "px-10 py-4 text-lg";
      default: return "px-6 py-2.5 text-sm";
    }
  }
  if (element === "label") {
    switch (spacing) {
      case "2x": return "mb-1 text-xs";
      case "4x": return "mb-1 text-sm";
      case "6x": return "mb-2 text-base";
      case "8x": return "mb-2 text-lg";
      default: return "mb-1.5 text-sm";
    }
  }
  // input
  switch (spacing) {
    case "2x": return "px-2.5 py-1.5 text-xs";
    case "4x": return "px-3 py-2 text-sm";
    case "6x": return "px-4 py-3 text-base";
    case "8x": return "px-5 py-4 text-lg";
    default: return "px-3 py-2 text-sm";
  }
};

// ==========================================
// FIELD COMPONENTS
// ==========================================

interface FieldProps {
  field: SchemaField;
  path: string; 
  methods: UseFormReturn<any>;
  color: FormBuilderColor;
  shape: FormBuilderShape;
  spacing: FormBuilderSpacing;
}

const BaseField: React.FC<FieldProps> = ({ field, path, methods, color, shape, spacing }) => {
  const { register, formState: { errors }, watch } = methods;
  
  const formValues = watch();
  if (field.showIf && !field.showIf(formValues)) return null;

  const errorObj = path.split('.').reduce((acc, part) => acc?.[part], errors as any);
  const errorMessage = errorObj?.message as string | undefined;

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

  const activeTheme = colorThemeMap[color];

  if (field.type === "group" && field.fields) {
    return (
      <div className={cn("w-full border p-3 md:p-4 space-y-3 md:space-y-4", getShapeClass(shape, "container"), colSpanClass, "bg-muted/5 border-border/40")}>
        {field.label && <h4 className="font-semibold text-lg">{field.label}</h4>}
        {field.description && <p className="text-sm text-muted-foreground -mt-3">{field.description}</p>}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {field.fields.map((subField) => (
            <BaseField 
              key={subField.name} 
              field={subField} 
              path={`${path}.${subField.name}`} 
              methods={methods} 
              color={color} 
              shape={shape} 
              spacing={spacing} 
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
        color={color} 
        shape={shape} 
        spacing={spacing} 
        colSpanClass={colSpanClass} 
      />
    );
  }

  const InputWrapper = ({ children }: { children: React.ReactNode }) => (
    <div className={cn("w-full flex flex-col", colSpanClass)}>
      {field.label && field.type !== 'checkbox' && (
        <label className={cn("block font-medium text-foreground", getSpacingStyles(spacing, "label"))}>
          {field.label} {field.required && <span className={activeTheme.text}>*</span>}
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

  const inputClass = cn(
    "w-full transition-all focus-visible:outline-none placeholder:text-muted-foreground/40 bg-background border",
    getShapeClass(shape, "input"),
    getSpacingStyles(spacing, "input"),
    errorMessage ? "border-destructive focus:border-destructive focus:ring-destructive/10 focus:ring-2" : `border-border focus:ring-2 ${activeTheme.ring}`
  );

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
            className={cn("w-4 h-4 rounded border-border transition-colors", activeTheme.text, activeTheme.ring)}
          />
          <label htmlFor={path} className={cn("text-sm cursor-pointer", errorMessage ? "text-destructive" : "text-foreground")}>
            {field.label} {field.required && <span className={activeTheme.text}>*</span>}
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
                className={cn("w-4 h-4 border-border/80 transition-colors", activeTheme.text, activeTheme.ring)}
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

const ArrayField: React.FC<FieldProps & { colSpanClass: string }> = ({ field, path, methods, color, shape, spacing, colSpanClass }) => {
  const { control, watch } = methods;
  const { fields, append, remove } = useFieldArray({
    control,
    name: path,
  });

  const formValues = watch();
  if (field.showIf && !field.showIf(formValues)) return null;

  const activeTheme = colorThemeMap[color];

  return (
    <div className={cn("w-full border p-3 md:p-4 shadow-sm space-y-3 md:space-y-4", getShapeClass(shape, "container"), colSpanClass, "bg-background border-border")}>
      <div className="flex items-center justify-between">
        <div>
          {field.label && <h4 className="font-semibold text-foreground">{field.label}</h4>}
          {field.description && <p className="text-xs text-muted-foreground mt-0.5">{field.description}</p>}
        </div>
      </div>

      <div className="space-y-3 md:space-y-4">
        <AnimatePresence initial={false}>
          {fields.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className={cn("relative p-3 md:p-4 border bg-muted/20 hover:bg-muted/30 transition-colors", getShapeClass(shape, "container"))}
            >
              <div className="absolute right-2 top-2 z-10">
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="p-1.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-md transition-colors"
                  aria-label={`Remove item ${index + 1}`}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mt-2">
                {field.fields?.map((subField) => (
                  <BaseField 
                    key={subField.name} 
                    field={subField} 
                    path={`${path}.${index}.${subField.name}`} 
                    methods={methods} 
                    color={color} 
                    shape={shape} 
                    spacing={spacing} 
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
          const newItem = field.fields?.reduce((acc, f) => ({ ...acc, [f.name]: f.defaultValue || "" }), {});
          append(newItem);
        }}
        className={cn(
          "w-full sm:w-auto flex items-center justify-center gap-1.5 text-sm font-medium transition-colors mt-2 px-3 py-2",
          getShapeClass(shape, "button"),
          activeTheme.text,
          activeTheme.bg
        )}
      >
        <Plus className="w-4 h-4 shrink-0" /> Add {field.label ? field.label.slice(0, -1) : "Item"}
      </button>
    </div>
  );
};

// ==========================================
// ROOT FORM BUILDER COMPONENT
// ==========================================

export const FormBuilder = React.memo(function FormBuilder({
  schema,
  defaultValues,
  onSubmit,
  color = "default",
  shape = "default",
  spacing = "default",
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

  const activeTheme = colorThemeMap[color];

  return (
    <div className={cn("w-full", className)}>
      <form onSubmit={handleSubmit(handleFormSubmit)} className="w-full space-y-4 md:space-y-6">
        <div className={cn("grid gap-4 md:gap-6 items-start", layoutClass)}>
          {schema.map((field) => (
            <div 
              key={field.name} 
              className={cn(
                "w-full", 
                layout === "auto" ? (
                  field.colSpan === "full" ? "md:col-span-2 lg:col-span-12" :
                  field.colSpan === 3 ? "md:col-span-2 lg:col-span-9" :
                  field.colSpan === 2 ? "md:col-span-2 lg:col-span-6" : "md:col-span-1 lg:col-span-3"
                ) : ""
              )}
            >
              <BaseField 
                field={field} 
                path={field.name} 
                methods={methods} 
                color={color} 
                shape={shape} 
                spacing={spacing} 
              />
            </div>
          ))}
        </div>

        <div className="pt-4 flex sm:justify-end">
          <button
            type="submit"
            disabled={isSubmitting || isLoading}
            className={cn(
              "w-full sm:w-auto flex items-center justify-center gap-2 font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2",
              activeTheme.button,
              activeTheme.ring,
              getShapeClass(shape, "button"),
              getSpacingStyles(spacing, "button"),
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
});
FormBuilder.displayName = "FormBuilder";
