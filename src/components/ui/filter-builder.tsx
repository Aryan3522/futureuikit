"use client";

/**
 * @registry-slug filter-builder
 * @registry-name Filter Builder
 * @registry-description A Future UI Filter Builder component.
 * @registry-category ui
 * @registry-dependency framer-motion
 * @registry-dependency lucide-react
 * @registry-dependency class-variance-authority
 * @registry-dependency clsx
 * @registry-dependency tailwind-merge
 */

import React, { createContext, useContext, useState, useRef, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X, ChevronDown, GripVertical, Check, Filter } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// ==========================================
// TYPES & CONTEXT
// ==========================================

export type FilterBuilderColor = "default" | "blue" | "emerald" | "rose" | "amber" | "violet" | "indigo" | "sky" | "slate" | "orange";
export type FilterBuilderShape = "default" | "square" | "rounded" | "sharp";
export type FilterBuilderSpacing = "default" | "2x" | "4x" | "6x" | "8x";

export type FieldType = "text" | "number" | "date" | "select" | "multiselect" | "boolean" | "currency" | "percentage" | "user" | "tags";

export interface FieldOption {
  value: string;
  label: string;
}

export interface FilterField {
  id: string;
  label: string;
  type: FieldType;
  options?: FieldOption[];
}

export interface FilterOperator {
  id: string;
  label: string;
  types: FieldType[];
}

export interface FilterRule {
  type: "rule";
  id: string;
  fieldId: string;
  operatorId: string;
  value: any;
}

export interface FilterGroup {
  type: "group";
  id: string;
  logicalOperator: "AND" | "OR";
  children: (FilterRule | FilterGroup)[];
}

export type FilterNode = FilterRule | FilterGroup;

type VariantType = "default" | "minimal" | "enterprise" | "compact" | "glass";

interface FilterBuilderContextType {
  fields: FilterField[];
  operators: FilterOperator[];
  variant: VariantType;
  color: FilterBuilderColor;
  shape: FilterBuilderShape;
  spacing: FilterBuilderSpacing;
  onUpdateNode: (id: string, updates: any) => void;
  onDeleteNode: (id: string) => void;
  onAddRule: (parentId: string) => void;
  onAddGroup: (parentId: string) => void;
  onMoveNode: (draggedId: string, targetId: string, position: "before" | "after" | "inside") => void;
  draggedNodeId: string | null;
  setDraggedNodeId: (id: string | null) => void;
}

const FilterBuilderContext = createContext<FilterBuilderContextType | null>(null);

const useFilterBuilder = () => {
  const ctx = useContext(FilterBuilderContext);
  if (!ctx) throw new Error("useFilterBuilder must be used within FilterBuilder");
  return ctx;
};

// ==========================================
// THEMING
// ==========================================

const colorThemeMap: Record<FilterBuilderColor, { text: string; bgActive: string; ring: string; borderActive: string }> = {
  default: { text: "text-foreground", bgActive: "bg-muted", ring: "focus:ring-ring/20", borderActive: "border-foreground" },
  blue: { text: "text-blue-600", bgActive: "bg-blue-50 dark:bg-blue-900/20", ring: "focus:ring-blue-600/20", borderActive: "border-blue-600" },
  emerald: { text: "text-emerald-600", bgActive: "bg-emerald-50 dark:bg-emerald-900/20", ring: "focus:ring-emerald-600/20", borderActive: "border-emerald-600" },
  rose: { text: "text-rose-600", bgActive: "bg-rose-50 dark:bg-rose-900/20", ring: "focus:ring-rose-600/20", borderActive: "border-rose-600" },
  amber: { text: "text-amber-600", bgActive: "bg-amber-50 dark:bg-amber-900/20", ring: "focus:ring-amber-500/20", borderActive: "border-amber-500" },
  violet: { text: "text-violet-600", bgActive: "bg-violet-50 dark:bg-violet-900/20", ring: "focus:ring-violet-600/20", borderActive: "border-violet-600" },
  indigo: { text: "text-indigo-600", bgActive: "bg-indigo-50 dark:bg-indigo-900/20", ring: "focus:ring-indigo-600/20", borderActive: "border-indigo-600" },
  sky: { text: "text-sky-600", bgActive: "bg-sky-50 dark:bg-sky-900/20", ring: "focus:ring-sky-500/20", borderActive: "border-sky-500" },
  slate: { text: "text-slate-600", bgActive: "bg-slate-50 dark:bg-slate-900/20", ring: "focus:ring-slate-600/20", borderActive: "border-slate-600" },
  orange: { text: "text-orange-600", bgActive: "bg-orange-50 dark:bg-orange-900/20", ring: "focus:ring-orange-500/20", borderActive: "border-orange-500" },
};

const getShapeClass = (shape: FilterBuilderShape, element: "container" | "button" | "input" = "container") => {
  switch (shape) {
    case "square": return "rounded-none";
    case "sharp": return "rounded-[2px]";
    case "rounded": return element === "container" ? "rounded-2xl" : "rounded-xl";
    case "default": return element === "container" ? "rounded-xl" : "rounded-lg";
  }
};

const getSpacingClass = (spacing: FilterBuilderSpacing, element: "container" | "button" | "input" = "input") => {
  if (element === "button") {
    switch (spacing) {
      case "2x": return "px-2 py-1 text-xs";
      case "4x": return "px-2.5 py-1.5 text-xs";
      case "6x": return "px-4 py-2 text-sm";
      case "8x": return "px-5 py-2.5 text-base";
      default: return "px-3 py-1 text-xs";
    }
  }
  if (element === "container") {
    switch (spacing) {
      case "2x": return "p-2";
      case "4x": return "p-3";
      case "6x": return "p-5 md:p-8";
      case "8x": return "p-6 md:p-10";
      default: return "p-4 md:p-6";
    }
  }
  switch (spacing) {
    case "2x": return "px-2 py-1 text-xs";
    case "4x": return "px-2.5 py-1.5 text-xs";
    case "6x": return "px-4 py-2 text-sm";
    case "8x": return "px-5 py-2.5 text-base";
    default: return "px-3 py-1.5 text-sm";
  }
};

// ==========================================
// UTILS & DEFAULT OPERATORS
// ==========================================

const generateId = () => Math.random().toString(36).substring(2, 9);

export const DEFAULT_OPERATORS: FilterOperator[] = [
  { id: "eq", label: "Equals", types: ["text", "number", "select", "boolean", "currency", "percentage", "user", "date"] },
  { id: "neq", label: "Not Equals", types: ["text", "number", "select", "boolean", "currency", "percentage", "user", "date"] },
  { id: "contains", label: "Contains", types: ["text", "multiselect", "tags"] },
  { id: "not_contains", label: "Does Not Contain", types: ["text", "multiselect", "tags"] },
  { id: "starts_with", label: "Starts With", types: ["text"] },
  { id: "ends_with", label: "Ends With", types: ["text"] },
  { id: "gt", label: "Greater Than", types: ["number", "currency", "percentage", "date"] },
  { id: "lt", label: "Less Than", types: ["number", "currency", "percentage", "date"] },
  { id: "between", label: "Between", types: ["number", "date", "currency", "percentage"] },
  { id: "is_empty", label: "Is Empty", types: ["text", "number", "select", "multiselect", "date", "user", "tags"] },
  { id: "is_not_empty", label: "Is Not Empty", types: ["text", "number", "select", "multiselect", "date", "user", "tags"] },
];

export const createEmptyRule = (fields: FilterField[]): FilterRule => {
  const fieldId = fields[0]?.id || "";
  return {
    type: "rule",
    id: generateId(),
    fieldId,
    operatorId: "eq",
    value: "",
  };
};

export const createEmptyGroup = (fields: FilterField[]): FilterGroup => ({
  type: "group",
  id: generateId(),
  logicalOperator: "AND",
  children: [createEmptyRule(fields)],
});

// ==========================================
// BUILDER WRAPPER
// ==========================================

export interface FilterBuilderProps {
  initialData: FilterGroup;
  onChange?: (data: FilterGroup) => void;
  fields: FilterField[];
  operators?: FilterOperator[];
  variant?: VariantType;
  color?: FilterBuilderColor;
  shape?: FilterBuilderShape;
  spacing?: FilterBuilderSpacing;
  className?: string;
}

export const FilterBuilder = React.memo(function FilterBuilder({
  initialData,
  onChange,
  fields,
  operators = DEFAULT_OPERATORS,
  variant = "default",
  color = "default",
  shape = "default",
  spacing = "default",
  className,
}: FilterBuilderProps) {
  const [data, setData] = useState<FilterGroup>(initialData);
  const [draggedNodeId, setDraggedNodeId] = useState<string | null>(null);

  // Helper to deep clone and modify the tree
  const modifyTree = useCallback((
    tree: FilterGroup,
    modifier: (node: FilterGroup, parent: FilterGroup | null) => FilterGroup | null
  ): FilterGroup => {
    const processNode = (node: FilterGroup, parent: FilterGroup | null): FilterGroup | null => {
      const modifiedNode = modifier({ ...node }, parent);
      if (!modifiedNode) return null;
      modifiedNode.children = modifiedNode.children
        .map(child => child.type === "group" ? processNode(child, modifiedNode) : child)
        .filter(Boolean) as (FilterRule | FilterGroup)[];
      return modifiedNode;
    };
    return processNode(tree, null) || tree;
  }, []);

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    onChange?.(data);
  }, [data, onChange]);

  const onUpdateNode = useCallback((id: string, updates: any) => {
    setData(prev => {
      const updateFn = (node: any): any => {
        if (node.id === id) return { ...node, ...updates };
        if (node.type === "group") return { ...node, children: node.children.map(updateFn) };
        return node;
      };
      return updateFn(prev);
    });
  }, []);

  const onDeleteNode = useCallback((id: string) => {
    setData(prev => {
      if (prev.id === id) return prev; // Cannot delete root
      const deleteFn = (node: FilterGroup): FilterGroup => {
        return {
          ...node,
          children: node.children.filter(c => c.id !== id).map(c => c.type === "group" ? deleteFn(c) : c)
        };
      };
      return deleteFn(prev);
    });
  }, []);

  const onAddRule = useCallback((parentId: string) => {
    setData(prev => {
      const addFn = (node: FilterGroup): FilterGroup => {
        if (node.id === parentId) {
          return { ...node, children: [...node.children, createEmptyRule(fields)] };
        }
        return { ...node, children: node.children.map(c => c.type === "group" ? addFn(c) : c) };
      };
      return addFn(prev);
    });
  }, [fields]);

  const onAddGroup = useCallback((parentId: string) => {
    setData(prev => {
      const addFn = (node: FilterGroup): FilterGroup => {
        if (node.id === parentId) {
          return { ...node, children: [...node.children, createEmptyGroup(fields)] };
        }
        return { ...node, children: node.children.map(c => c.type === "group" ? addFn(c) : c) };
      };
      return addFn(prev);
    });
  }, [fields]);

  const onMoveNode = useCallback((draggedId: string, targetId: string, position: "before" | "after" | "inside") => {
    if (draggedId === targetId) return;

    setData(prev => {
      // 1. Find and extract the dragged node
      let extractedNode: FilterNode | null = null;
      
      const extractFn = (node: FilterGroup): FilterGroup => {
        const childIdx = node.children.findIndex(c => c.id === draggedId);
        if (childIdx > -1) {
          extractedNode = node.children[childIdx];
          const newChildren = [...node.children];
          newChildren.splice(childIdx, 1);
          return { ...node, children: newChildren.map(c => c.type === "group" ? extractFn(c) : c) };
        }
        return { ...node, children: node.children.map(c => c.type === "group" ? extractFn(c) : c) };
      };
      
      let treeWithoutDragged = extractFn(prev);
      if (!extractedNode) return prev; // Node not found

      // 2. Insert the node at target
      const insertFn = (node: FilterGroup): FilterGroup => {
        if (position === "inside" && node.id === targetId) {
          return { ...node, children: [...node.children, extractedNode!] };
        }
        
        const targetIdx = node.children.findIndex(c => c.id === targetId);
        if (targetIdx > -1 && position !== "inside") {
          const newChildren = [...node.children];
          newChildren.splice(position === "after" ? targetIdx + 1 : targetIdx, 0, extractedNode!);
          return { ...node, children: newChildren };
        }
        
        return { ...node, children: node.children.map(c => c.type === "group" ? insertFn(c) : c) };
      };

      return insertFn(treeWithoutDragged);
    });
  }, []);

  return (
    <FilterBuilderContext.Provider value={{
      fields, operators, variant, color, shape, spacing,
      onUpdateNode, onDeleteNode, onAddRule, onAddGroup, onMoveNode,
      draggedNodeId, setDraggedNodeId
    }}>
      <div className={cn(
        "flex flex-col w-full transition-colors duration-300",
        getShapeClass(shape, "container"),
        variant === "default" && "bg-background border border-border/60 shadow-sm",
        variant === "enterprise" && "bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800",
        variant === "glass" && "bg-background/40 backdrop-blur-md border border-border/40 shadow-lg",
        variant === "minimal" && "bg-transparent",
        variant === "compact" && "bg-background border border-border/60 text-sm",
        className
      )}>
        <FilterGroupComponent group={data} isRoot={true} />
      </div>
    </FilterBuilderContext.Provider>
  );
});
FilterBuilder.displayName = "FilterBuilder";

// ==========================================
// GROUP RENDERER
// ==========================================

function FilterGroupComponent({ group, isRoot }: { group: FilterGroup; isRoot?: boolean }) {
  const { variant, color, shape, spacing, onUpdateNode, onAddRule, onAddGroup, onDeleteNode, onMoveNode, draggedNodeId, setDraggedNodeId } = useFilterBuilder();

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (draggedNodeId && draggedNodeId !== group.id) {
      e.dataTransfer.dropEffect = "move";
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (draggedNodeId && draggedNodeId !== group.id) {
      // If dropped on the group header/body, append inside
      onMoveNode(draggedNodeId, group.id, "inside");
    }
    setDraggedNodeId(null);
  };

  const activeTheme = colorThemeMap[color];

  return (
    <div 
      className={cn(
        "flex flex-col relative transition-all duration-300",
        !isRoot && "ml-4 md:ml-6 mt-3 pl-4 md:pl-6 border-l-2",
        !isRoot && variant === "default" && "border-border/50",
        !isRoot && variant === "enterprise" && "border-slate-300 dark:border-slate-700",
        !isRoot && variant === "minimal" && "border-muted",
        !isRoot && variant === "glass" && "border-primary/20",
        !isRoot && variant === "compact" && "ml-3 pl-3 mt-2",
        isRoot && getSpacingClass(spacing, "container"),
        isRoot && variant === "compact" && "p-3"
      )}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {/* Group Header */}
      <div className="flex flex-wrap items-center gap-2 mb-3 z-10 relative">
        <div className={cn(
          "flex items-center border overflow-hidden p-0.5",
          getShapeClass(shape, "button"),
          variant === "default" && "bg-muted/50 border-border/50",
          variant === "enterprise" && "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm",
          variant === "minimal" && "bg-transparent border-transparent",
          variant === "glass" && "bg-background/50 border-border/30",
          variant === "compact" && "bg-muted/50 border-border/50"
        )}>
          <button
            onClick={() => onUpdateNode(group.id, { logicalOperator: "AND" })}
            className={cn(
              "transition-all",
              getSpacingClass(spacing, "button"),
              getShapeClass(shape, "button"),
              group.logicalOperator === "AND" 
                ? cn("bg-background shadow-sm font-bold", activeTheme.text) 
                : "text-muted-foreground hover:text-foreground font-semibold"
            )}
          >
            AND
          </button>
          <button
            onClick={() => onUpdateNode(group.id, { logicalOperator: "OR" })}
            className={cn(
              "transition-all",
              getSpacingClass(spacing, "button"),
              getShapeClass(shape, "button"),
              group.logicalOperator === "OR" 
                ? cn("bg-background shadow-sm font-bold", activeTheme.text) 
                : "text-muted-foreground hover:text-foreground font-semibold"
            )}
          >
            OR
          </button>
        </div>

        <div className="flex-1" />

        <div className="flex items-center gap-1.5 opacity-0 hover:opacity-100 transition-opacity focus-within:opacity-100 sm:opacity-100">
          <button
            onClick={() => onAddRule(group.id)}
            className={cn("flex items-center gap-1 font-medium text-muted-foreground transition-colors", getSpacingClass(spacing, "button"), getShapeClass(shape, "button"), `hover:${activeTheme.bgActive} hover:${activeTheme.text}`)}
          >
            <Plus className="w-3.5 h-3.5" /> Rule
          </button>
          <button
            onClick={() => onAddGroup(group.id)}
            className={cn("flex items-center gap-1 font-medium text-muted-foreground transition-colors", getSpacingClass(spacing, "button"), getShapeClass(shape, "button"), `hover:${activeTheme.bgActive} hover:${activeTheme.text}`)}
          >
            <Filter className="w-3.5 h-3.5" /> Group
          </button>
          {!isRoot && (
            <button
              onClick={() => onDeleteNode(group.id)}
              className={cn("p-1.5 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors ml-1")}
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Children */}
      <div className="flex flex-col gap-2 relative">
        <AnimatePresence initial={false}>
          {group.children.length === 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="text-sm text-muted-foreground italic py-4 px-2"
            >
              No rules in this group.
            </motion.div>
          )}
          {group.children.map((child) => (
            <motion.div
              key={child.id}
              layout
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            >
              {child.type === "group" ? (
                <FilterGroupComponent group={child} />
              ) : (
                <FilterRuleComponent rule={child} />
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ==========================================
// RULE RENDERER
// ==========================================

function FilterRuleComponent({ rule }: { rule: FilterRule }) {
  const { fields, operators, variant, shape, onUpdateNode, onDeleteNode, onMoveNode, setDraggedNodeId, draggedNodeId } = useFilterBuilder();
  const [isDragOver, setIsDragOver] = useState<"top" | "bottom" | null>(null);

  const selectedField = fields.find(f => f.id === rule.fieldId);
  const availableOperators = operators.filter(o => selectedField && o.types.includes(selectedField.type));
  
  // Ensure valid operator is selected when field changes
  useEffect(() => {
    if (selectedField && !availableOperators.find(o => o.id === rule.operatorId)) {
      if (availableOperators.length > 0) {
        onUpdateNode(rule.id, { operatorId: availableOperators[0].id });
      }
    }
  }, [rule.fieldId, selectedField, availableOperators, rule.operatorId, rule.id, onUpdateNode]);

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData("text/plain", rule.id);
    e.dataTransfer.effectAllowed = "move";
    setDraggedNodeId(rule.id);
    // Hide ghost image
    const ghost = document.createElement("div");
    e.dataTransfer.setDragImage(ghost, 0, 0);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!draggedNodeId || draggedNodeId === rule.id) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const y = e.clientY - rect.top;
    if (y < rect.height / 2) {
      setIsDragOver("top");
    } else {
      setIsDragOver("bottom");
    }
    e.dataTransfer.dropEffect = "move";
  };

  const handleDragLeave = () => {
    setIsDragOver(null);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!draggedNodeId || draggedNodeId === rule.id) {
      setIsDragOver(null);
      return;
    }
    
    onMoveNode(draggedNodeId, rule.id, isDragOver === "top" ? "before" : "after");
    setIsDragOver(null);
    setDraggedNodeId(null);
  };

  return (
    <div 
      className={cn(
        "relative flex flex-col sm:flex-row sm:items-center gap-2 group transition-all",
        isDragOver === "top" && "pt-6 border-t-2 border-primary",
        isDragOver === "bottom" && "pb-6 border-b-2 border-primary",
        draggedNodeId === rule.id && "opacity-50"
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div 
        draggable
        onDragStart={handleDragStart}
        onDragEnd={() => setDraggedNodeId(null)}
        className="cursor-grab active:cursor-grabbing p-1.5 text-muted-foreground/30 hover:text-muted-foreground transition-colors absolute -left-7 top-1/2 -translate-y-1/2 hidden md:block"
      >
        <GripVertical className="w-4 h-4" />
      </div>

      <div className={cn(
        "flex flex-wrap items-center gap-2 flex-1 p-1.5 transition-colors",
        getShapeClass(shape, "container"),
        variant === "default" && "bg-muted/30 hover:bg-muted/50 border border-border/50",
        variant === "enterprise" && "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm",
        variant === "minimal" && "hover:bg-muted/40 -mx-2 px-2 border border-transparent hover:border-border/50",
        variant === "glass" && "bg-background/20 hover:bg-background/40 border border-border/20",
        variant === "compact" && "bg-muted/30 border border-border/50 p-1"
      )}>
        
        {/* Field Select */}
        <CustomSelect 
          value={rule.fieldId} 
          onChange={(v) => onUpdateNode(rule.id, { fieldId: v, value: "" })}
          options={fields.map(f => ({ value: f.id, label: f.label }))}
          placeholder="Select Field"
        />

        {/* Operator Select */}
        {selectedField && availableOperators.length > 0 && (
          <CustomSelect 
            value={rule.operatorId} 
            onChange={(v) => onUpdateNode(rule.id, { operatorId: v })}
            options={availableOperators.map(o => ({ value: o.id, label: o.label }))}
            placeholder="Operator"
          />
        )}

        {/* Value Input */}
        {selectedField && !["is_empty", "is_not_empty"].includes(rule.operatorId) && (
          <div className="flex-1 min-w-[120px]">
            <ValueRenderer rule={rule} field={selectedField} onUpdate={(v) => onUpdateNode(rule.id, { value: v })} />
          </div>
        )}
      </div>

      <button
        onClick={() => onDeleteNode(rule.id)}
        className="absolute right-3 top-1/2 -translate-y-1/2 sm:static sm:translate-y-0 p-2 rounded-lg text-muted-foreground/40 hover:text-destructive hover:bg-destructive/10 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

// ==========================================
// VALUE RENDERER
// ==========================================

function ValueRenderer({ rule, field, onUpdate }: { rule: FilterRule, field: FilterField, onUpdate: (val: any) => void }) {
  const { variant, color, shape, spacing } = useFilterBuilder();
  const activeTheme = colorThemeMap[color];

  const baseInputClass = cn(
    "w-full focus:outline-none transition-shadow",
    getShapeClass(shape, "input"),
    getSpacingClass(spacing, "input"),
    variant === "default" && cn("bg-background border border-border/60 focus:border-primary/50 focus:ring-2", activeTheme.ring),
    variant === "enterprise" && cn("bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 focus:ring-2", activeTheme.ring),
    variant === "minimal" && "bg-transparent border-b border-border hover:border-foreground/50 focus:border-primary rounded-none px-0 py-1",
    variant === "glass" && cn("bg-background/50 border border-border/40 focus:ring-2", activeTheme.ring),
    variant === "compact" && "bg-background border border-border/60"
  );

  if (field.type === "select" || field.type === "boolean") {
    const options = field.type === "boolean" 
      ? [{ value: "true", label: "True" }, { value: "false", label: "False" }]
      : field.options || [];
      
    return (
      <CustomSelect 
        value={rule.value} 
        onChange={onUpdate}
        options={options}
        placeholder="Select value..."
        fullWidth
      />
    );
  }

  if (field.type === "number" || field.type === "currency" || field.type === "percentage") {
    return (
      <input 
        type="number" 
        value={rule.value} 
        onChange={(e) => onUpdate(e.target.value)} 
        placeholder="0.00"
        className={baseInputClass}
      />
    );
  }

  if (field.type === "date") {
    return (
      <input 
        type="date" 
        value={rule.value} 
        onChange={(e) => onUpdate(e.target.value)} 
        className={baseInputClass}
      />
    );
  }

  return (
    <input 
      type="text" 
      value={rule.value} 
      onChange={(e) => onUpdate(e.target.value)} 
      placeholder="Enter value..."
      className={baseInputClass}
    />
  );
}

// ==========================================
// CUSTOM SELECT
// ==========================================

function CustomSelect({ 
  value, 
  onChange, 
  options, 
  placeholder, 
  fullWidth 
}: { 
  value: string; 
  onChange: (val: string) => void; 
  options: { value: string, label: string }[]; 
  placeholder?: string;
  fullWidth?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { variant, color, shape, spacing } = useFilterBuilder();
  const activeTheme = colorThemeMap[color];

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const selectedOption = options.find(o => o.value === value);

  return (
    <div className={cn("relative", fullWidth ? "w-full" : "w-full sm:w-[160px]")} ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-full flex items-center justify-between transition-all focus:outline-none focus:ring-2",
          getShapeClass(shape, "input"),
          getSpacingClass(spacing, "input"),
          activeTheme.ring,
          variant === "default" && "bg-background border border-border/60 hover:bg-muted/50",
          variant === "enterprise" && "bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-900 shadow-sm",
          variant === "minimal" && "bg-transparent border-b border-border hover:border-foreground/50 rounded-none px-0 py-1",
          variant === "glass" && "bg-background/50 border border-border/40 hover:bg-background/80",
          variant === "compact" && "bg-background border border-border/60"
        )}
      >
        <span className="truncate pr-2">{selectedOption ? selectedOption.label : <span className="text-muted-foreground">{placeholder}</span>}</span>
        <ChevronDown className="w-3.5 h-3.5 opacity-50 shrink-0" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 4, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.98 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className={cn(
              "absolute z-50 mt-1 w-full min-w-[160px] rounded-xl border bg-popover text-popover-foreground shadow-lg overflow-hidden py-1 max-h-[280px] overflow-y-auto",
              variant === "glass" && "backdrop-blur-xl bg-background/80",
              variant === "enterprise" && "shadow-xl border-slate-200 dark:border-slate-800"
            )}
          >
            {options.map((opt) => (
              <button
                key={opt.value}
                onClick={() => {
                  onChange(opt.value);
                  setIsOpen(false);
                }}
                className="w-full flex items-center justify-between px-3 py-2 text-sm hover:bg-muted transition-colors text-left"
              >
                <span className="truncate">{opt.label}</span>
                {value === opt.value && <Check className={cn("w-3.5 h-3.5 shrink-0", activeTheme.text)} />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
