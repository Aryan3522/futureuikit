/* eslint-disable */
"use client";

/**
 * @registry-slug kanban
 * @registry-name Kanban Board
 * @registry-dependency framer-motion
 * @registry-dependency lucide-react
 * @registry-dependency class-variance-authority
 * @registry-dependency clsx
 * @registry-dependency tailwind-merge
 */

import React, { createContext, useContext, useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GripVertical, MoreHorizontal, MessageSquare, Paperclip, Clock, Plus, Trash2, Edit2, X, Check } from "lucide-react";
import { cn } from "@/lib/utils";

// ==========================================
// TYPES & CONTEXT
// ==========================================

export interface KanbanCardData {
  id: string;
  title: string;
  description?: string;
  priority?: "low" | "medium" | "high" | "urgent";
  dueDate?: string;
  labels?: { text: string; color?: string }[];
  assignees?: { name: string; avatar?: string }[];
  comments?: number;
  attachments?: number;
}

export interface KanbanColumnData {
  id: string;
  title: string;
  cards: KanbanCardData[];
}

type DragType = "card" | "column" | null;

interface KanbanContextType {
  variant: "default" | "compact" | "enterprise" | "minimal";
  activeDragId: string | null;
  activeDragType: DragType | null;
  activeDragColumnId: string | null;
  dropTargetId: string | null;
  dropTargetColumnId: string | null;
  
  handleDragStart: (id: string, type: DragType, columnId?: string) => void;
  handleDragOver: (id: string, type: DragType, columnId?: string) => void;
  handleDrop: () => void;
  handleDragEnd: () => void;

  openModal: (type: "add" | "edit" | "add-column", columnId: string | null, card?: KanbanCardData) => void;
  deleteCard: (columnId: string, cardId: string) => void;
  clearColumn: (columnId: string) => void;
  deleteColumn: (columnId: string) => void;
}

const KanbanContext = createContext<KanbanContextType | null>(null);

export const useKanban = () => {
  const ctx = useContext(KanbanContext);
  if (!ctx) throw new Error("useKanban must be used within a KanbanBoard");
  return ctx;
};

// ==========================================
// BOARD COMPONENT
// ==========================================

export interface KanbanBoardProps {
  initialColumns?: KanbanColumnData[];
  variant?: "default" | "compact" | "enterprise" | "minimal";
  onChange?: (columns: KanbanColumnData[]) => void;
  className?: string;
}

export const KanbanBoard = React.memo(function KanbanBoard({
  initialColumns = [],
  variant = "default",
  onChange,
  className
}: KanbanBoardProps) {
  const [columns, setColumns] = useState<KanbanColumnData[]>(initialColumns);
  
  // Drag State
  const [activeDragId, setActiveDragId] = useState<string | null>(null);
  const [activeDragType, setActiveDragType] = useState<DragType>(null);
  const [activeDragColumnId, setActiveDragColumnId] = useState<string | null>(null);
  const [dropTargetId, setDropTargetId] = useState<string | null>(null);
  const [dropTargetColumnId, setDropTargetColumnId] = useState<string | null>(null);

  // Modal State
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    type: "add" | "edit" | "add-column";
    columnId: string | null;
    card: KanbanCardData | null;
  }>({
    isOpen: false,
    type: "add",
    columnId: null,
    card: null
  });

  // Sync back to parent if uncontrolled
  useEffect(() => {
    if (onChange) onChange(columns);
  }, [columns, onChange]);

  const handleDragStart = (id: string, type: DragType, columnId?: string) => {
    setActiveDragId(id);
    setActiveDragType(type);
    if (columnId) setActiveDragColumnId(columnId);
  };

  const handleDragOver = (id: string, type: DragType, columnId?: string) => {
    if (activeDragType === "card" && type === "card") {
      setDropTargetId(id);
      if (columnId) setDropTargetColumnId(columnId);
    } else if (activeDragType === "card" && type === "column") {
      setDropTargetId(null);
      if (columnId) setDropTargetColumnId(columnId);
    } else if (activeDragType === "column" && type === "column") {
      setDropTargetColumnId(id);
    }
  };

  const handleDrop = () => {
    if (!activeDragId) return resetState();

    setColumns((prev) => {
      let newCols = JSON.parse(JSON.stringify(prev)) as KanbanColumnData[];

      // Reorder Columns
      if (activeDragType === "column" && dropTargetColumnId && activeDragId !== dropTargetColumnId) {
        const oldIndex = newCols.findIndex(c => c.id === activeDragId);
        const newIndex = newCols.findIndex(c => c.id === dropTargetColumnId);
        const [moved] = newCols.splice(oldIndex, 1);
        newCols.splice(newIndex, 0, moved);
        return newCols;
      }

      // Move Cards
      if (activeDragType === "card" && activeDragColumnId && dropTargetColumnId) {
        const sourceCol = newCols.find(c => c.id === activeDragColumnId);
        const destCol = newCols.find(c => c.id === dropTargetColumnId);
        if (!sourceCol || !destCol) return prev;

        const cardIndex = sourceCol.cards.findIndex(c => c.id === activeDragId);
        if (cardIndex === -1) return prev;

        const [movedCard] = sourceCol.cards.splice(cardIndex, 1);

        if (!dropTargetId) {
          destCol.cards.push(movedCard);
        } else {
          const targetIndex = destCol.cards.findIndex(c => c.id === dropTargetId);
          if (targetIndex === -1) {
            destCol.cards.push(movedCard);
          } else {
            destCol.cards.splice(targetIndex, 0, movedCard);
          }
        }
        return newCols;
      }

      return prev;
    });

    resetState();
  };

  const handleDragEnd = () => {
    resetState();
  };

  const resetState = () => {
    setActiveDragId(null);
    setActiveDragType(null);
    setActiveDragColumnId(null);
    setDropTargetId(null);
    setDropTargetColumnId(null);
  };

  const openModal = (type: "add" | "edit" | "add-column", columnId: string | null, card?: KanbanCardData) => {
    setModalState({ isOpen: true, type, columnId, card: card || null });
  };

  const closeModal = () => {
    setModalState(prev => ({ ...prev, isOpen: false }));
  };

  const saveModal = (data: Partial<KanbanCardData> & { columnTitle?: string }) => {
    if (modalState.type === "add-column" && data.columnTitle) {
      setColumns(prev => [
        ...prev, 
        { id: `col-${Date.now()}`, title: data.columnTitle!, cards: [] }
      ]);
      closeModal();
      return;
    }

    setColumns(prev => {
      const newCols = [...prev];
      const col = newCols.find(c => c.id === modalState.columnId);
      if (!col) return prev;

      if (modalState.type === "add") {
        col.cards.push({
          id: `card-${Date.now()}`,
          title: data.title || "New Task",
          description: data.description,
          priority: data.priority,
          labels: data.labels,
          dueDate: data.dueDate,
          assignees: data.assignees
        } as KanbanCardData);
      } else if (modalState.type === "edit" && modalState.card) {
        const index = col.cards.findIndex(c => c.id === modalState.card!.id);
        if (index !== -1) {
          col.cards[index] = { ...col.cards[index], ...data };
        }
      }
      return newCols;
    });
    closeModal();
  };

  const deleteCard = (columnId: string, cardId: string) => {
    setColumns(prev => {
      const newCols = [...prev];
      const col = newCols.find(c => c.id === columnId);
      if (col) {
        col.cards = col.cards.filter(c => c.id !== cardId);
      }
      return newCols;
    });
  };

  const clearColumn = (columnId: string) => {
    setColumns(prev => {
      const newCols = [...prev];
      const col = newCols.find(c => c.id === columnId);
      if (col) col.cards = [];
      return newCols;
    });
  };

  const deleteColumn = (columnId: string) => {
    setColumns(prev => prev.filter(c => c.id !== columnId));
  };

  return (
    <KanbanContext.Provider value={{
      variant,
      activeDragId,
      activeDragType,
      activeDragColumnId,
      dropTargetId,
      dropTargetColumnId,
      handleDragStart,
      handleDragOver,
      handleDrop,
      handleDragEnd,
      openModal,
      deleteCard,
      clearColumn,
      deleteColumn
    }}>
      <div 
        className={cn(
          "flex flex-col md:flex-row items-start gap-4 h-full w-full overflow-y-auto md:overflow-y-hidden md:overflow-x-auto md:snap-x md:snap-mandatory pb-4 custom-scrollbar select-none relative",
          className
        )}
      >
        {columns.map((col) => (
          <KanbanColumn key={col.id} id={col.id} title={col.title} count={col.cards.length}>
            {col.cards.map((card) => (
              <KanbanCard key={card.id} columnId={col.id} {...card} />
            ))}
          </KanbanColumn>
        ))}

        <button 
          onClick={() => openModal("add-column", null)}
          className={cn(
            "flex items-center justify-center gap-2 shrink-0 w-full md:w-80 h-16 rounded-xl border-2 border-dashed border-border/50 hover:border-primary/50 text-muted-foreground hover:text-foreground transition-all bg-background/30",
            variant === "minimal" && "border-none bg-transparent hover:bg-muted/30 h-10 w-full md:w-40 justify-start px-2",
            variant === "compact" && "md:w-72"
          )}
        >
          <Plus className="w-5 h-5" />
          <span className="font-medium">Add Column</span>
        </button>
      </div>

      <AnimatePresence>
        {modalState.isOpen && (
          <KanbanModal 
            type={modalState.type} 
            initialData={modalState.card} 
            onClose={closeModal} 
            onSave={saveModal} 
          />
        )}
      </AnimatePresence>
    </KanbanContext.Provider>
  );
});
KanbanBoard.displayName = "KanbanBoard";

// ==========================================
// COLUMN COMPONENT
// ==========================================

export interface KanbanColumnProps {
  id: string;
  title: string;
  count?: number;
  children: React.ReactNode;
  className?: string;
}

export const KanbanColumn = React.memo(function KanbanColumn({ id, title, count, children, className }: KanbanColumnProps) {
  const { 
    variant, 
    handleDragStart, 
    handleDragOver, 
    handleDrop, 
    handleDragEnd,
    activeDragType,
    dropTargetColumnId,
    activeDragId,
    openModal,
    clearColumn,
    deleteColumn
  } = useKanban();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isDropTarget = activeDragType === "card" && dropTargetColumnId === id;
  const isDraggedCol = activeDragType === "column" && activeDragId === id;

  const onDragStart = (e: React.DragEvent) => {
    if (e.target !== e.currentTarget) return;
    e.dataTransfer.effectAllowed = "move";
    handleDragStart(id, "column");
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    handleDragOver(id, "column", id);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    handleDrop();
  };

  return (
    <div
      draggable
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDrop={onDrop}
      onDragEnd={handleDragEnd}
      className={cn(
        "flex flex-col shrink-0 w-full md:w-80 max-w-full h-full max-h-full rounded-xl transition-all duration-200 md:snap-center",
        variant === "default" && "bg-muted/40 border border-border/50",
        variant === "compact" && "md:w-72 bg-muted/20 border-border/30",
        variant === "enterprise" && "bg-muted/30 border border-border shadow-sm",
        variant === "minimal" && "bg-transparent border-transparent",
        isDraggedCol && "opacity-30 scale-95",
        className
      )}
    >
      <div className={cn(
        "flex items-center justify-between p-3 cursor-grab active:cursor-grabbing",
        variant === "minimal" && "px-1 border-b border-border/50 mb-3"
      )}>
        <div className="flex items-center gap-2">
          <GripVertical className="w-4 h-4 text-muted-foreground/50 hidden md:block" />
          <h3 className={cn(
            "font-semibold tracking-tight",
            variant === "enterprise" && "text-foreground text-sm",
            variant === "compact" && "text-sm",
            variant === "minimal" && "text-xs uppercase tracking-wider text-muted-foreground font-bold"
          )}>{title}</h3>
          {count !== undefined && (
            <span className={cn(
              "text-xs px-2 py-0.5 rounded-full font-medium",
              variant === "enterprise" && "bg-muted text-muted-foreground",
              variant !== "enterprise" && "bg-muted text-muted-foreground"
            )}>
              {count}
            </span>
          )}
        </div>
        
        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="p-1 hover:bg-muted rounded-md text-muted-foreground transition-colors"
          >
            <MoreHorizontal className="w-4 h-4" />
          </button>

          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: -5 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -5 }}
                transition={{ duration: 0.1 }}
                className="absolute right-0 top-full mt-1 w-36 bg-background border border-border rounded-md shadow-lg overflow-hidden flex flex-col z-50"
              >
                <button 
                  onClick={() => { setIsDropdownOpen(false); openModal("add", id); }}
                  className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-muted transition-colors text-left"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Card
                </button>
                <button 
                  onClick={() => { setIsDropdownOpen(false); clearColumn(id); }}
                  className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-muted transition-colors text-left"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear Cards
                </button>
                <button 
                  onClick={() => { setIsDropdownOpen(false); deleteColumn(id); }}
                  className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-destructive/10 text-destructive transition-colors text-left"
                >
                  <X className="w-3.5 h-3.5" /> Delete Column
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      
      <div className={cn(
        "flex-1 overflow-y-auto overflow-x-hidden p-3 pt-0 flex flex-col gap-2 custom-scrollbar",
        variant === "minimal" && "px-0",
        isDropTarget && "bg-primary/5 rounded-b-xl"
      )}>
        {children}
        
        {isDropTarget && (
          <div className="h-20 border-2 border-dashed border-primary/40 rounded-lg bg-primary/5" />
        )}

        <button 
          onClick={() => openModal("add", id)}
          className={cn(
            "flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2 mt-1",
            variant === "minimal" && "px-1"
          )}
        >
          <Plus className="w-4 h-4" />
          Add Card
        </button>
      </div>
    </div>
  );
});
KanbanColumn.displayName = "KanbanColumn";

// ==========================================
// CARD COMPONENT
// ==========================================

export interface KanbanCardProps extends KanbanCardData {
  columnId: string;
  className?: string;
}

export const KanbanCard = React.memo(function KanbanCard(props: KanbanCardProps) {
  const { 
    id, columnId, title, description, labels, assignees, 
    comments, attachments, dueDate, priority, className 
  } = props;
  
  const { 
    variant, 
    handleDragStart, 
    handleDragOver, 
    handleDrop, 
    handleDragEnd,
    activeDragId,
    dropTargetId,
    openModal,
    deleteCard
  } = useKanban();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isDragging = activeDragId === id;
  const isDropTarget = dropTargetId === id;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const onDragStart = (e: React.DragEvent) => {
    e.stopPropagation();
    e.dataTransfer.effectAllowed = "move";
    handleDragStart(id, "card", columnId);
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = "move";
    handleDragOver(id, "card", columnId);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    handleDrop();
  };

  const priorityColors = {
    low: "bg-blue-500/10 text-blue-500",
    medium: "bg-yellow-500/10 text-yellow-500",
    high: "bg-orange-500/10 text-orange-500",
    urgent: "bg-red-500/10 text-red-500",
  };

  return (
    <>
      {isDropTarget && (
        <div className="h-1 bg-primary rounded-full my-1 shadow-[0_0_8px_rgba(var(--primary),0.5)]" />
      )}
      <div
        draggable
        onDragStart={onDragStart}
        onDragOver={onDragOver}
        onDrop={onDrop}
        onDragEnd={handleDragEnd}
        onClick={() => openModal("edit", columnId, props)}
        className={cn(
          "group relative cursor-grab active:cursor-grabbing rounded-lg p-3 flex flex-col gap-2.5 transition-all",
          variant === "default" && "bg-background border border-border shadow-sm hover:shadow-md",
          variant === "compact" && "bg-background border border-border/50 p-2 text-sm",
          variant === "enterprise" && "bg-card border border-border/50 shadow-[0_1px_2px_rgba(0,0,0,0.05)] hover:border-primary/30",
          variant === "minimal" && "bg-background border-l-2 border-l-border border-y border-y-transparent border-r border-r-transparent hover:border-l-primary hover:bg-muted/30 rounded-none rounded-r-lg",
          isDragging && "opacity-40 scale-95 shadow-xl rotate-1 z-50",
          className
        )}
      >
        {/* Dropdown Menu */}
        <div className="absolute top-2 right-2 z-10" ref={dropdownRef}>
          <button 
            type="button"
            onClick={(e) => { e.stopPropagation(); setIsDropdownOpen(!isDropdownOpen); }}
            className="p-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-muted text-muted-foreground"
          >
            <MoreHorizontal className="w-4 h-4" />
          </button>
          
          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: -5 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -5 }}
                transition={{ duration: 0.1 }}
                className="absolute right-0 top-full mt-1 w-32 bg-background border border-border rounded-md shadow-lg overflow-hidden flex flex-col z-50"
              >
                <button 
                  onClick={(e) => { e.stopPropagation(); setIsDropdownOpen(false); openModal("edit", columnId, props); }}
                  className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-muted transition-colors text-left"
                >
                  <Edit2 className="w-3.5 h-3.5" /> Edit
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); setIsDropdownOpen(false); deleteCard(columnId, id); }}
                  className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-destructive/10 text-destructive transition-colors text-left"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Delete
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Labels & Priority */}
        {(labels?.length || priority) && (
          <div className="flex flex-wrap items-center gap-1.5 pr-6">
            {priority && (
              <span className={cn("truncate max-w-full inline-block text-[10px] uppercase font-bold px-1.5 py-0.5 rounded-sm tracking-wider", priorityColors[priority])}>
                {priority}
              </span>
            )}
            {labels?.map((label, i) => (
              <span key={i} className="truncate max-w-full inline-block text-[10px] font-medium px-1.5 py-0.5 rounded-sm bg-muted text-muted-foreground" style={label.color ? { backgroundColor: `${label.color}20`, color: label.color } : {}}>
                {label.text}
              </span>
            ))}
          </div>
        )}

        {/* Title & Desc */}
        <div className="pr-4">
          <h4 className={cn(
            "font-medium leading-tight text-foreground",
            variant === "compact" && "text-sm",
            variant === "minimal" && "font-semibold text-sm"
          )}>
            {title}
          </h4>
          {description && variant !== "compact" && (
            <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
              {description}
            </p>
          )}
        </div>

        {/* Meta / Footer */}
        {(dueDate || comments || attachments || assignees?.length) && (
          <div className="flex items-center justify-between mt-1 pt-2 border-t border-border/50">
            <div className="flex items-center gap-3 text-muted-foreground">
              {dueDate && (
                <div className="flex items-center gap-1 text-[11px] font-medium">
                  <Clock className="w-3 h-3" />
                  <span>{dueDate}</span>
                </div>
              )}
              {comments !== undefined && comments > 0 && (
                <div className="flex items-center gap-1 text-[11px] font-medium">
                  <MessageSquare className="w-3 h-3" />
                  <span>{comments}</span>
                </div>
              )}
              {attachments !== undefined && attachments > 0 && (
                <div className="flex items-center gap-1 text-[11px] font-medium">
                  <Paperclip className="w-3 h-3" />
                  <span>{attachments}</span>
                </div>
              )}
            </div>

            {assignees && assignees.length > 0 && (
              <div className="flex items-center -space-x-1.5">
                {assignees.map((user, i) => (
                  <div key={i} className="w-5 h-5 rounded-full bg-primary/20 border-2 border-background flex items-center justify-center overflow-hidden">
                    {user.avatar ? (
                      <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-[8px] font-bold text-primary">{user.name.charAt(0)}</span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
});
KanbanCard.displayName = "KanbanCard";

// ==========================================
// MODAL COMPONENT (Built-in)
// ==========================================

function KanbanModal({ 
  type, 
  initialData, 
  onClose, 
  onSave 
}: { 
  type: "add" | "edit" | "add-column"; 
  initialData: KanbanCardData | null; 
  onClose: () => void;
  onSave: (data: Partial<KanbanCardData> & { columnTitle?: string }) => void;
}) {
  const [formData, setFormData] = useState<Partial<KanbanCardData> & { columnTitle?: string }>(
    initialData || { title: "", description: "", priority: "low", columnTitle: "" }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (type === "add-column") {
      if (!formData.columnTitle?.trim()) return;
      onSave({ columnTitle: formData.columnTitle });
    } else {
      if (!formData.title?.trim()) return;
      onSave(formData);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }} 
        onClick={onClose}
        className="absolute inset-0 bg-background/80 backdrop-blur-sm" 
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-lg bg-background border border-border shadow-2xl rounded-2xl p-6 flex flex-col gap-6"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold tracking-tight">
            {type === "add" ? "Create New Card" : type === "edit" ? "Edit Card" : "Create New Column"}
          </h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-muted text-muted-foreground transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          
          {type === "add-column" ? (
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Column Title</label>
              <input 
                autoFocus
                type="text" 
                value={formData.columnTitle || ""}
                onChange={e => setFormData({ ...formData, columnTitle: e.target.value })}
                placeholder="e.g. Backlog, Review, Done"
                className="w-full px-3 py-2 bg-transparent border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                required
              />
            </div>
          ) : (
            <>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Title</label>
                <input 
                  autoFocus
                  type="text" 
                  value={formData.title || ""}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Design homepage hero section"
                  className="w-full px-3 py-2 bg-transparent border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                  required
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Description</label>
                <textarea 
                  value={formData.description || ""}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Add more details to this task..."
                  className="w-full px-3 py-2 bg-transparent border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm min-h-[100px] resize-y"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Priority</label>
                <select 
                  value={formData.priority || "low"}
                  onChange={e => setFormData({ ...formData, priority: e.target.value as any })}
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm appearance-none"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>
            </>
          )}

          <div className="flex justify-end gap-3 mt-4">
            <button 
              type="button" 
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-sm font-medium hover:bg-muted transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="px-4 py-2 rounded-lg text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-sm"
            >
              {type === "add" ? "Create Card" : type === "edit" ? "Save Changes" : "Create Column"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
