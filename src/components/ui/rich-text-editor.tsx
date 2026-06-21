/* eslint-disable */
"use client";

/**
 * @registry-slug rich-text-editor
 * @registry-name Rich Text Editor
 * @registry-description A Future UI Rich Text Editor component.
 * @registry-category ui
 * @registry-dependency @tiptap/react
 * @registry-dependency @tiptap/pm
 * @registry-dependency @tiptap/starter-kit
 * @registry-dependency @tiptap/extension-placeholder
 * @registry-dependency @tiptap/extension-link
 * @registry-dependency @tiptap/extension-task-list
 * @registry-dependency @tiptap/extension-task-item
 * @registry-dependency @tiptap/extension-image
 * @registry-dependency @tiptap/extension-table
 * @registry-dependency @tiptap/extension-table-row
 * @registry-dependency @tiptap/extension-table-header
 * @registry-dependency @tiptap/extension-table-cell
 * @registry-dependency @tiptap/suggestion
 * @registry-dependency tippy.js
 * @registry-dependency lucide-react
 * @registry-dependency class-variance-authority
 * @registry-dependency clsx
 * @registry-dependency tailwind-merge
 * @registry-dependency @tailwindcss/typography
 * @registry-dependency @tiptap/extension-text-align
 * @registry-dependency @tiptap/extension-color
 * @registry-dependency @tiptap/extension-text-style
 * @registry-dependency @tiptap/extension-highlight
 * @registry-dependency @tiptap/extension-underline
 */

import React, { createContext, useContext, useEffect, useRef, useState, useCallback, forwardRef, useImperativeHandle } from "react";
import { useEditor, EditorContent as TiptapEditorContent, Editor, ReactRenderer } from "@tiptap/react";
import { BubbleMenu as TiptapBubbleMenu } from "@tiptap/react/menus";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Link from "@tiptap/extension-link";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import Image from "@tiptap/extension-image";
import { Table } from "@tiptap/extension-table";
import { TableRow } from "@tiptap/extension-table-row";
import { TableHeader } from "@tiptap/extension-table-header";
import { TableCell } from "@tiptap/extension-table-cell";
import { TextAlign } from "@tiptap/extension-text-align";
import { Color } from "@tiptap/extension-color";
import { TextStyle } from "@tiptap/extension-text-style";
import { Highlight } from "@tiptap/extension-highlight";
import { Underline } from "@tiptap/extension-underline";
import { Extension } from "@tiptap/core";
import Suggestion from "@tiptap/suggestion";
import tippy, { Instance as TippyInstance } from "tippy.js";
import { Bold, Italic, Strikethrough, Underline as UnderlineIcon, Code, Heading1, Heading2, Heading3, Heading4, Heading5, Heading6, List, ListOrdered, Quote, Minus, Link as LinkIcon, Image as ImageIcon, Table as TableIcon, CheckSquare, MessageSquare, AlignLeft, AlignCenter, AlignRight, AlignJustify, Palette, Highlighter, Type, Brush, Square } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// ==========================================
// TYPES & CONTEXT
// ==========================================

export type RichTextEditorColor = "default" | "blue" | "emerald" | "rose" | "amber" | "violet" | "indigo" | "sky" | "slate" | "orange";
export type RichTextEditorShape = "default" | "square" | "rounded" | "sharp";
export type RichTextEditorSpacing = "default" | "2x" | "4x" | "6x" | "8x";

interface RichTextContextType {
  editor: Editor | null;
  variant: "default" | "minimal" | "writing" | "enterprise" | "glass";
  color: RichTextEditorColor;
  shape: RichTextEditorShape;
  spacing: RichTextEditorSpacing;
}

const RichTextContext = createContext<RichTextContextType | null>(null);

export const useRichText = () => {
  const ctx = useContext(RichTextContext);
  if (!ctx) throw new Error("useRichText must be used within a RichTextEditor");
  return ctx;
};

// ==========================================
// THEMING
// ==========================================

const colorThemeMap: Record<RichTextEditorColor, { ring: string; activeBg: string; activeText: string; proseClass: string }> = {
  default: { 
    ring: "focus-within:ring-zinc-900/20 dark:focus-within:ring-zinc-100/20", 
    activeBg: "bg-muted", 
    activeText: "text-foreground", 
    proseClass: "prose-a:text-zinc-900 dark:prose-a:text-zinc-100 prose-a:decoration-zinc-900/50 dark:prose-a:decoration-zinc-100/50 hover:prose-a:decoration-zinc-900 dark:hover:prose-a:decoration-zinc-100" 
  },
  blue: { ring: "focus-within:ring-blue-500/20", activeBg: "bg-blue-50 dark:bg-blue-900/20", activeText: "text-blue-600", proseClass: "prose-a:text-blue-600 prose-a:decoration-blue-500/50 hover:prose-a:decoration-blue-600" },
  emerald: { ring: "focus-within:ring-emerald-500/20", activeBg: "bg-emerald-50 dark:bg-emerald-900/20", activeText: "text-emerald-600", proseClass: "prose-a:text-emerald-600 prose-a:decoration-emerald-500/50 hover:prose-a:decoration-emerald-600" },
  rose: { ring: "focus-within:ring-rose-500/20", activeBg: "bg-rose-50 dark:bg-rose-900/20", activeText: "text-rose-600", proseClass: "prose-a:text-rose-600 prose-a:decoration-rose-500/50 hover:prose-a:decoration-rose-600" },
  amber: { ring: "focus-within:ring-amber-500/20", activeBg: "bg-amber-50 dark:bg-amber-900/20", activeText: "text-amber-600", proseClass: "prose-a:text-amber-600 prose-a:decoration-amber-500/50 hover:prose-a:decoration-amber-500" },
  violet: { ring: "focus-within:ring-violet-500/20", activeBg: "bg-violet-50 dark:bg-violet-900/20", activeText: "text-violet-600", proseClass: "prose-a:text-violet-600 prose-a:decoration-violet-500/50 hover:prose-a:decoration-violet-600" },
  indigo: { ring: "focus-within:ring-indigo-500/20", activeBg: "bg-indigo-50 dark:bg-indigo-900/20", activeText: "text-indigo-600", proseClass: "prose-a:text-indigo-600 prose-a:decoration-indigo-500/50 hover:prose-a:decoration-indigo-600" },
  sky: { ring: "focus-within:ring-sky-500/20", activeBg: "bg-sky-50 dark:bg-sky-900/20", activeText: "text-sky-600", proseClass: "prose-a:text-sky-600 prose-a:decoration-sky-500/50 hover:prose-a:decoration-sky-500" },
  slate: { ring: "focus-within:ring-slate-500/20", activeBg: "bg-slate-50 dark:bg-slate-900/20", activeText: "text-slate-600", proseClass: "prose-a:text-slate-600 prose-a:decoration-slate-500/50 hover:prose-a:decoration-slate-600" },
  orange: { ring: "focus-within:ring-orange-500/20", activeBg: "bg-orange-50 dark:bg-orange-900/20", activeText: "text-orange-600", proseClass: "prose-a:text-orange-600 prose-a:decoration-orange-500/50 hover:prose-a:decoration-orange-500" },
};

const getShapeClass = (shape: RichTextEditorShape, element: "container" | "toolbar" | "button" = "container") => {
  switch (shape) {
    case "square": return "rounded-none";
    case "sharp": return "rounded-[2px]";
    case "rounded": return element === "container" ? "rounded-2xl" : "rounded-xl";
    case "default": return element === "container" ? "rounded-xl" : "rounded-md";
  }
};

const getSpacingClass = (spacing: RichTextEditorSpacing, element: "container" | "toolbar" | "button" = "container") => {
  if (element === "button") {
    switch (spacing) {
      case "2x": return "p-1.5";
      case "4x": return "p-2";
      case "6x": return "p-2.5";
      case "8x": return "p-3";
      default: return "p-2";
    }
  }
  if (element === "toolbar") {
    switch (spacing) {
      case "2x": return "p-1.5 gap-0.5";
      case "4x": return "p-2 gap-1";
      case "6x": return "p-3 gap-2";
      case "8x": return "p-4 gap-3";
      default: return "p-2 gap-1";
    }
  }
  switch (spacing) {
    case "2x": return "p-2 sm:p-4";
    case "4x": return "p-4 sm:p-6";
    case "6x": return "p-6 sm:p-8";
    case "8x": return "p-8 sm:p-12";
    default: return "p-4 sm:p-6";
  }
};


// ==========================================
// SLASH COMMANDS EXTENSION
// ==========================================

const CustomHighlight = Highlight.extend({
  addAttributes() {
    return {
      color: { default: null },
      variant: { default: 'rectangle' }
    };
  },
  renderHTML({ HTMLAttributes }) {
    let style = "";
    if (HTMLAttributes.variant === "marker") {
      style = `background: linear-gradient(to bottom, transparent 40%, ${HTMLAttributes.color || '#bbf7d0'} 40%, ${HTMLAttributes.color || '#bbf7d0'} 90%, transparent 90%); padding: 0 4px; border-radius: 2px;`;
    } else if (HTMLAttributes.variant === "brush") {
      style = `background-color: ${HTMLAttributes.color || '#fbcfe8'}; border-radius: 2px 10px 4px 12px; padding: 2px 6px; box-shadow: inset 0 0 4px rgba(0,0,0,0.1);`;
    } else {
      style = `background-color: ${HTMLAttributes.color || '#fef08a'}; border-radius: 4px; padding: 2px 4px;`;
    }
    return ['mark', { style, 'data-variant': HTMLAttributes.variant }, 0];
  }
});

const COMMAND_ITEMS = [
  { title: "Text", description: "Just start typing with plain text.", icon: MessageSquare, command: ({ editor, range }: any) => editor.chain().focus().deleteRange(range).setParagraph().run() },
  { title: "Heading 1", description: "Big section heading.", icon: Heading1, command: ({ editor, range }: any) => editor.chain().focus().deleteRange(range).setNode("heading", { level: 1 }).run() },
  { title: "Heading 2", description: "Medium section heading.", icon: Heading2, command: ({ editor, range }: any) => editor.chain().focus().deleteRange(range).setNode("heading", { level: 2 }).run() },
  { title: "Heading 3", description: "Small section heading.", icon: Heading3, command: ({ editor, range }: any) => editor.chain().focus().deleteRange(range).setNode("heading", { level: 3 }).run() },
  { title: "Heading 4", description: "Extra small section heading.", icon: Heading4, command: ({ editor, range }: any) => editor.chain().focus().deleteRange(range).setNode("heading", { level: 4 }).run() },
  { title: "Heading 5", description: "Tiny section heading.", icon: Heading5, command: ({ editor, range }: any) => editor.chain().focus().deleteRange(range).setNode("heading", { level: 5 }).run() },
  { title: "Heading 6", description: "Smallest section heading.", icon: Heading6, command: ({ editor, range }: any) => editor.chain().focus().deleteRange(range).setNode("heading", { level: 6 }).run() },
  
  { title: "To-do List", description: "Track tasks with a to-do list.", icon: CheckSquare, command: ({ editor, range }: any) => editor.chain().focus().deleteRange(range).toggleTaskList().run() },
  { title: "Bullet List", description: "Create a simple bulleted list.", icon: List, command: ({ editor, range }: any) => editor.chain().focus().deleteRange(range).toggleBulletList().run() },
  { title: "Numbered List", description: "Create a list with numbering.", icon: ListOrdered, command: ({ editor, range }: any) => editor.chain().focus().deleteRange(range).toggleOrderedList().run() },
  
  { title: "Quote", description: "Capture a quote.", icon: Quote, command: ({ editor, range }: any) => editor.chain().focus().deleteRange(range).toggleBlockquote().run() },
  { title: "Code", description: "Capture a code snippet.", icon: Code, command: ({ editor, range }: any) => editor.chain().focus().deleteRange(range).toggleCodeBlock().run() },
  { title: "Divider", description: "Visually divide blocks.", icon: Minus, command: ({ editor, range }: any) => editor.chain().focus().deleteRange(range).setHorizontalRule().run() },
  
  { title: "Table", description: "Add a simple table.", icon: TableIcon, command: ({ editor, range }: any) => editor.chain().focus().deleteRange(range).insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run() },
  { title: "Image", description: "Insert an image placeholder.", icon: ImageIcon, command: ({ editor, range }: any) => { const url = window.prompt("Image URL:"); if (url) { editor.chain().focus().deleteRange(range).setImage({ src: url }).run(); } else { editor.chain().focus().deleteRange(range).run(); } } },
  
  { title: "Align Left", description: "Align text to the left.", icon: AlignLeft, command: ({ editor, range }: any) => editor.chain().focus().deleteRange(range).setTextAlign('left').run() },
  { title: "Align Center", description: "Align text to the center.", icon: AlignCenter, command: ({ editor, range }: any) => editor.chain().focus().deleteRange(range).setTextAlign('center').run() },
  { title: "Align Right", description: "Align text to the right.", icon: AlignRight, command: ({ editor, range }: any) => editor.chain().focus().deleteRange(range).setTextAlign('right').run() },
  { title: "Align Justify", description: "Justify text.", icon: AlignJustify, command: ({ editor, range }: any) => editor.chain().focus().deleteRange(range).setTextAlign('justify').run() },
  
  { title: "Color Red", description: "Make text red.", icon: Palette, command: ({ editor, range }: any) => editor.chain().focus().deleteRange(range).setColor('#ef4444').run() },
  { title: "Color Blue", description: "Make text blue.", icon: Palette, command: ({ editor, range }: any) => editor.chain().focus().deleteRange(range).setColor('#3b82f6').run() },
  { title: "Color Green", description: "Make text green.", icon: Palette, command: ({ editor, range }: any) => editor.chain().focus().deleteRange(range).setColor('#22c55e').run() },
  
  { title: "Highlight Rectangle", description: "Solid background highlight.", icon: Square, command: ({ editor, range }: any) => editor.chain().focus().deleteRange(range).setHighlight({ color: '#fef08a', variant: 'rectangle' }).run() },
  { title: "Highlight Marker", description: "Realistic marker effect.", icon: Highlighter, command: ({ editor, range }: any) => editor.chain().focus().deleteRange(range).setHighlight({ color: '#bbf7d0', variant: 'marker' }).run() },
  { title: "Highlight Brush", description: "Painted brush stroke effect.", icon: Brush, command: ({ editor, range }: any) => editor.chain().focus().deleteRange(range).setHighlight({ color: '#fbcfe8', variant: 'brush' }).run() },
];

const renderItems = () => {
  let component: ReactRenderer<any>;
  let popup: TippyInstance[];

  return {
    onStart: (props: any) => {
      component = new ReactRenderer(CommandList, {
        props,
        editor: props.editor,
      });

      if (!props.clientRect) {
        return;
      }

      popup = tippy("body", {
        getReferenceClientRect: props.clientRect,
        appendTo: () => document.body,
        content: component.element,
        showOnCreate: true,
        interactive: true,
        trigger: "manual",
        placement: "bottom-start",
      });
    },

    onUpdate(props: any) {
      component.updateProps(props);

      if (!props.clientRect) {
        return;
      }

      popup[0].setProps({
        getReferenceClientRect: props.clientRect,
      });
    },

    onKeyDown(props: any) {
      if (props.event.key === "Escape") {
        popup[0].hide();
        return true;
      }
      return component.ref?.onKeyDown(props);
    },

    onExit() {
      popup[0].destroy();
      component.destroy();
    },
  };
};

const SlashCommandsExtension = Extension.create({
  name: "slash-commands",
  addOptions() {
    return {
      suggestion: {
        char: "/",
        command: ({ editor, range, props }: any) => {
          props.command({ editor, range });
        },
      } as any,
    };
  },
  addProseMirrorPlugins() {
    return [
      Suggestion({
        editor: this.editor,
        ...this.options.suggestion,
      }),
    ];
  },
});

const CommandList = forwardRef((props: any, ref) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Auto-scroll to selected item
  useEffect(() => {
    if (itemRefs.current[selectedIndex]) {
      itemRefs.current[selectedIndex]?.scrollIntoView({
        block: "nearest",
        behavior: "smooth"
      });
    }
  }, [selectedIndex]);

  const selectItem = (index: number) => {
    const item = props.items[index];
    if (item) {
      props.command(item);
    }
  };

  const upHandler = () => {
    setSelectedIndex((selectedIndex + props.items.length - 1) % props.items.length);
  };

  const downHandler = () => {
    setSelectedIndex((selectedIndex + 1) % props.items.length);
  };

  const enterHandler = () => {
    selectItem(selectedIndex);
  };

  useEffect(() => setSelectedIndex(0), [props.items]);

  useImperativeHandle(ref, () => ({
    onKeyDown: ({ event }: any) => {
      if (event.key === "ArrowUp") {
        upHandler();
        return true;
      }
      if (event.key === "ArrowDown") {
        downHandler();
        return true;
      }
      if (event.key === "Enter") {
        enterHandler();
        return true;
      }
      return false;
    },
  }));

  if (!props.items.length) {
    return null;
  }

  return (
    <div className="bg-popover text-popover-foreground rounded-lg shadow-xl border border-border/50 p-2 w-72 flex flex-col gap-1 max-h-[300px] overflow-y-auto z-50">
      <div className="px-2 py-1 text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">Commands</div>
      {props.items.map((item: any, index: number) => {
        const Icon = item.icon;
        return (
          <button
            ref={el => { itemRefs.current[index] = el; }}
            className={cn(
              "flex items-center gap-3 px-2 py-1.5 rounded-md text-sm text-left transition-colors w-full",
              index === selectedIndex ? "bg-accent text-accent-foreground" : "hover:bg-muted/50"
            )}
            key={index}
            onClick={() => selectItem(index)}
          >
            <div className="w-8 h-8 flex items-center justify-center bg-background rounded border shadow-sm shrink-0">
              <Icon className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="flex flex-col flex-1 truncate">
              <span className="font-medium text-sm">{item.title}</span>
              <span className="text-xs text-muted-foreground truncate">{item.description}</span>
            </div>
          </button>
        );
      })}
    </div>
  );
});
CommandList.displayName = "CommandList";

// ==========================================
// EDITOR COMPONENT
// ==========================================

export interface RichTextEditorProps {
  content?: string;
  onChange?: (html: string) => void;
  variant?: "default" | "minimal" | "writing" | "enterprise" | "glass";
  color?: RichTextEditorColor;
  shape?: RichTextEditorShape;
  spacing?: RichTextEditorSpacing;
  className?: string;
  placeholder?: string;
  extensions?: Extension[];
  children?: React.ReactNode;
}

export const RichTextEditor = React.memo(function RichTextEditor({ 
  content = "", 
  onChange, 
  variant = "default", 
  color = "default",
  shape = "default",
  spacing = "default",
  className,
  placeholder = "Press '/' for commands, or start typing...",
  extensions = [],
  children 
}: RichTextEditorProps) {
  
  const activeTheme = colorThemeMap[color];

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3, 4, 5, 6] },
        codeBlock: { HTMLAttributes: { class: "bg-muted text-muted-foreground rounded-md p-4 font-mono text-sm my-4 overflow-x-auto" } },
        blockquote: { HTMLAttributes: { class: cn("border-l-4 pl-4 py-1 italic text-muted-foreground my-4", color === "default" ? "border-border" : `border-${color}-500`) } },
      }),
      Underline,
      TextStyle,
      Color,
      CustomHighlight.configure({ multicolor: true }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Placeholder.configure({
        placeholder,
        emptyEditorClass: 'is-editor-empty',
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { class: "underline underline-offset-4 transition-all cursor-pointer" },
      }),
      TaskList.configure({
        HTMLAttributes: { class: "not-prose pl-2 my-4 space-y-1" },
      }),
      TaskItem.configure({
        nested: true,
        HTMLAttributes: { class: "flex items-start gap-2 my-1" },
      }),
      Image.configure({
        HTMLAttributes: { class: "rounded-lg border max-w-full h-auto my-4 shadow-sm" },
      }),
      Table.configure({
        resizable: true,
        HTMLAttributes: { class: "w-full border-collapse border border-border my-4" },
      }),
      TableRow,
      TableHeader.configure({
        HTMLAttributes: { class: "border border-border bg-muted/50 p-2 font-bold text-left" },
      }),
      TableCell.configure({
        HTMLAttributes: { class: "border border-border p-2" },
      }),
      SlashCommandsExtension.configure({
        suggestion: {
          items: ({ query }: any) => {
            return COMMAND_ITEMS.filter((item) => item.title.toLowerCase().includes(query.toLowerCase()));
          },
          render: renderItems,
        },
      }),
      ...extensions
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: cn(
          "prose prose-neutral dark:prose-invert max-w-none focus:outline-none min-h-[150px] w-full h-full",
          "prose-headings:font-bold prose-headings:tracking-tight prose-headings:mt-8 prose-headings:mb-4",
          "prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl prose-h4:text-xl prose-h5:text-lg prose-h6:text-base",
          "prose-p:leading-relaxed prose-p:text-base prose-p:mt-2 prose-p:mb-4",
          "prose-a:no-underline hover:prose-a:underline",
          activeTheme.proseClass,
          "prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:text-sm prose-code:before:content-none prose-code:after:content-none",
          "prose-img:rounded-xl prose-img:shadow-md",
          "prose-hr:border-border",
          "[&_.is-editor-empty:before]:content-[attr(data-placeholder)] [&_.is-editor-empty:before]:text-muted-foreground [&_.is-editor-empty:before]:float-left [&_.is-editor-empty:before]:pointer-events-none"
        ),
      },
    },
  });

  // Provide default subcomponents if no children are passed
  const hasChildren = React.Children.count(children) > 0;

  return (
    <RichTextContext.Provider value={{ editor, variant, color, shape, spacing }}>
      <div className={cn(
        "w-full h-full min-h-[400px] flex flex-col focus-within:ring-2 transition-all",
        getShapeClass(shape, "container"),
        variant === "default" && "bg-background border shadow-sm",
        variant === "minimal" && "bg-transparent border-none",
        variant === "writing" && "bg-background w-full max-w-[900px] mx-auto border-none",
        variant === "enterprise" && "bg-card border border-border shadow-sm",
        variant === "glass" && "bg-background/40 backdrop-blur-xl border border-border/50 shadow-lg",
        variant !== "minimal" && variant !== "writing" && activeTheme.ring,
        className
      )}>
        {hasChildren ? children : (
          <>
            <EditorToolbar />
            <EditorContent />
            <EditorBubbleMenu />
          </>
        )}
      </div>
    </RichTextContext.Provider>
  );
});
RichTextEditor.displayName = "RichTextEditor";

// ==========================================
// TOOLBAR
// ==========================================

export const EditorToolbar = React.memo(function EditorToolbar() {
  const { editor, variant, shape, spacing } = useRichText();

  const setLink = useCallback(() => {
    if (!editor) return;
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);

    if (url === null) {
      return;
    }

    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);

  if (!editor) return null;

  if (variant === "writing") return null; // No fixed toolbar in writing mode

  return (
    <div className={cn(
      "flex flex-wrap items-center border-b",
      getSpacingClass(spacing, "toolbar"),
      variant === "minimal" && "border-none px-0 pb-4",
      variant === "glass" && "border-border/30 bg-background/20 backdrop-blur-md",
      variant === "enterprise" && "bg-muted/50 border-border"
    )}>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBold().run()}
        isActive={editor.isActive("bold")}
        icon={<Bold className="w-4 h-4" />}
        title="Bold"
      />
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleItalic().run()}
        isActive={editor.isActive("italic")}
        icon={<Italic className="w-4 h-4" />}
        title="Italic"
      />
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        isActive={editor.isActive("underline")}
        icon={<UnderlineIcon className="w-4 h-4" />}
        title="Underline"
      />
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleStrike().run()}
        isActive={editor.isActive("strike")}
        icon={<Strikethrough className="w-4 h-4" />}
        title="Strikethrough"
      />
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleCode().run()}
        isActive={editor.isActive("code")}
        icon={<Code className="w-4 h-4" />}
        title="Code"
      />
      <ToolbarButton
        onClick={setLink}
        isActive={editor.isActive("link")}
        icon={<LinkIcon className="w-4 h-4" />}
        title="Link"
      />
      
      <div className="w-px h-4 bg-border mx-1" />
      
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        isActive={editor.isActive("heading", { level: 1 })}
        icon={<Heading1 className="w-4 h-4" />}
        title="Heading 1"
      />
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        isActive={editor.isActive("heading", { level: 2 })}
        icon={<Heading2 className="w-4 h-4" />}
        title="Heading 2"
      />
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        isActive={editor.isActive("heading", { level: 3 })}
        icon={<Heading3 className="w-4 h-4" />}
        title="Heading 3"
      />
      
      <div className="w-px h-4 bg-border mx-1" />

      <ToolbarButton
        onClick={() => editor.chain().focus().setTextAlign('left').run()}
        isActive={editor.isActive({ textAlign: 'left' })}
        icon={<AlignLeft className="w-4 h-4" />}
        title="Align Left"
      />
      <ToolbarButton
        onClick={() => editor.chain().focus().setTextAlign('center').run()}
        isActive={editor.isActive({ textAlign: 'center' })}
        icon={<AlignCenter className="w-4 h-4" />}
        title="Align Center"
      />
      <ToolbarButton
        onClick={() => editor.chain().focus().setTextAlign('right').run()}
        isActive={editor.isActive({ textAlign: 'right' })}
        icon={<AlignRight className="w-4 h-4" />}
        title="Align Right"
      />
      <ToolbarButton
        onClick={() => editor.chain().focus().setTextAlign('justify').run()}
        isActive={editor.isActive({ textAlign: 'justify' })}
        icon={<AlignJustify className="w-4 h-4" />}
        title="Align Justify"
      />
      
      <div className="w-px h-4 bg-border mx-1" />
      
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        isActive={editor.isActive("bulletList")}
        icon={<List className="w-4 h-4" />}
        title="Bullet List"
      />
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        isActive={editor.isActive("orderedList")}
        icon={<ListOrdered className="w-4 h-4" />}
        title="Ordered List"
      />
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleTaskList().run()}
        isActive={editor.isActive("taskList")}
        icon={<CheckSquare className="w-4 h-4" />}
        title="Task List"
      />
      
      <div className="w-px h-4 bg-border mx-1" />
      
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        isActive={editor.isActive("blockquote")}
        icon={<Quote className="w-4 h-4" />}
        title="Quote"
      />
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        isActive={editor.isActive("codeBlock")}
        icon={<Code className="w-4 h-4" />}
        title="Code Block"
      />
    </div>
  );
});
EditorToolbar.displayName = "EditorToolbar";

function ToolbarButton({ onClick, isActive, icon, title }: { onClick: () => void; isActive: boolean; icon: React.ReactNode; title: string }) {
  const { variant, color, shape, spacing } = useRichText();
  const activeTheme = colorThemeMap[color];
  
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={cn(
        "transition-colors flex items-center justify-center outline-none",
        getShapeClass(shape, "button"),
        getSpacingClass(spacing, "button"),
        isActive 
          ? cn(activeTheme.activeBg, activeTheme.activeText)
          : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
      )}
    >
      {icon}
    </button>
  );
}

// ==========================================
// EDITOR CONTENT WRAPPER
// ==========================================

export const EditorContent = React.memo(function EditorContent() {
  const { editor, variant, spacing } = useRichText();
  
  return (
    <div className={cn(
      "flex-1 overflow-y-auto w-full flex flex-col",
      getSpacingClass(spacing, "container"),
      variant === "minimal" && "py-4",
      variant === "writing" && "py-12 px-4 sm:px-8 text-lg w-full max-w-[800px] mx-auto",
      variant === "enterprise" && "bg-card"
    )}>
      <TiptapEditorContent editor={editor} className="flex-1 w-full" />
    </div>
  );
});
EditorContent.displayName = "EditorContent";

// ==========================================
// BUBBLE MENU
// ==========================================

export const EditorBubbleMenu = React.memo(function EditorBubbleMenu() {
  const { editor, shape } = useRichText();

  if (!editor) return null;

  return (
    <TiptapBubbleMenu editor={editor} className={cn("flex overflow-hidden items-center bg-popover text-popover-foreground border shadow-xl z-50", getShapeClass(shape, "container"))}>
      <BubbleButton
        onClick={() => editor.chain().focus().toggleBold().run()}
        isActive={editor.isActive("bold")}
        icon={<Bold className="w-3.5 h-3.5" />}
      />
      <BubbleButton
        onClick={() => editor.chain().focus().toggleItalic().run()}
        isActive={editor.isActive("italic")}
        icon={<Italic className="w-3.5 h-3.5" />}
      />
      <BubbleButton
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        isActive={editor.isActive("underline")}
        icon={<UnderlineIcon className="w-3.5 h-3.5" />}
      />
      <BubbleButton
        onClick={() => editor.chain().focus().toggleStrike().run()}
        isActive={editor.isActive("strike")}
        icon={<Strikethrough className="w-3.5 h-3.5" />}
      />
      <BubbleButton
        onClick={() => editor.chain().focus().toggleCode().run()}
        isActive={editor.isActive("code")}
        icon={<Code className="w-3.5 h-3.5" />}
      />
    </TiptapBubbleMenu>
  );
});
EditorBubbleMenu.displayName = "EditorBubbleMenu";

function BubbleButton({ onClick, isActive, icon }: { onClick: () => void; isActive: boolean; icon: React.ReactNode }) {
  const { color } = useRichText();
  const activeTheme = colorThemeMap[color];
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "p-2.5 transition-colors flex items-center justify-center outline-none",
        isActive 
          ? activeTheme.activeBg + " " + activeTheme.activeText
          : "text-muted-foreground hover:bg-muted hover:text-foreground"
      )}
    >
      {icon}
    </button>
  );
}
