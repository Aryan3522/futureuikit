const fs = require('fs');

const path = 'c:\\Coding\\Projects\\future-ui\\src\\route-components\\PreviewRegistry.tsx';
let content = fs.readFileSync(path, 'utf8');

const importsToAdd = `
import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerBody, DrawerFooter, DrawerClose } from "@/components/ui/drawer";
import { Toggle } from "@/components/ui/toggle";
import { Modal, ModalTrigger, ModalContent, ModalHeader, ModalTitle, ModalDescription, ModalBody, ModalFooter, ModalClose } from "@/components/ui/modal";
import { CommandPalette, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem, CommandSeparator, CommandShortcut } from "@/components/ui/command-palette";
`;

content = content.replace('import { Dock, DockItem, DockDivider } from "@/components/ui/dock";', 'import { Dock, DockItem, DockDivider } from "@/components/ui/dock";\n' + importsToAdd);

const componentsToAdd = `
const DrawerPreview: React.FC = () => {
  const [placement, setPlacement] = React.useState<"left" | "right" | "top" | "bottom">("right");
  const [variant, setVariant] = React.useState<"default" | "compact" | "glass" | "elevated" | "floating">("default");
  
  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-4 relative overflow-hidden">
      <div className="flex flex-wrap gap-4 mb-8 z-10 p-4 rounded-xl border border-border/50 bg-background/50 backdrop-blur-sm">
        <div className="flex flex-col gap-2">
          <span className="text-xs font-bold uppercase tracking-widest opacity-50">Placement</span>
          <div className="flex gap-2">
            {(["left", "right", "top", "bottom"] as const).map(p => (
              <Button key={p} variant={placement === p ? "default" : "outline"} size="sm" onClick={() => setPlacement(p)}>{p}</Button>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-xs font-bold uppercase tracking-widest opacity-50">Variant</span>
          <div className="flex flex-wrap gap-2">
            {(["default", "compact", "glass", "elevated", "floating"] as const).map(v => (
              <Button key={v} variant={variant === v ? "default" : "outline"} size="sm" onClick={() => setVariant(v)}>{v}</Button>
            ))}
          </div>
        </div>
      </div>
      
      <Drawer placement={placement} variant={variant}>
        <DrawerTrigger asChild>
          <Button size="lg" className="rounded-full px-8 shadow-lg shadow-primary/20">Open Drawer</Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Premium Drawer</DrawerTitle>
            <DrawerDescription>A native feeling interaction powered by Framer Motion.</DrawerDescription>
          </DrawerHeader>
          <DrawerBody>
            <div className="space-y-4 pt-4">
              <div className="w-full h-32 rounded-xl bg-muted animate-pulse" />
              <div className="w-3/4 h-8 rounded-lg bg-muted animate-pulse" />
              <div className="w-1/2 h-8 rounded-lg bg-muted animate-pulse" />
            </div>
          </DrawerBody>
          <DrawerFooter>
            <Button className="w-full">Confirm Action</Button>
            <DrawerClose asChild>
              <Button variant="outline" className="w-full">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

const TogglePreview: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-12 space-y-12 bg-zinc-50 dark:bg-zinc-950/50">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-12 justify-items-center">
        <div className="flex flex-col items-center gap-4">
          <span className="text-xs uppercase tracking-widest font-bold text-muted-foreground">Default</span>
          <Toggle size="default" variant="default" />
        </div>
        <div className="flex flex-col items-center gap-4">
          <span className="text-xs uppercase tracking-widest font-bold text-muted-foreground">Minimal</span>
          <Toggle size="default" variant="minimal" defaultChecked />
        </div>
        <div className="flex flex-col items-center gap-4">
          <span className="text-xs uppercase tracking-widest font-bold text-muted-foreground">Neumorphic</span>
          <Toggle size="default" variant="neumorphic" />
        </div>
        <div className="flex flex-col items-center gap-4">
          <span className="text-xs uppercase tracking-widest font-bold text-muted-foreground">Neon</span>
          <Toggle size="default" variant="neon" defaultChecked />
        </div>
      </div>
      
      <div className="w-full h-px bg-border/40" />
      
      <div className="flex flex-col items-center gap-4">
        <span className="text-xs uppercase tracking-widest font-bold text-muted-foreground">Sizes</span>
        <div className="flex items-center gap-8">
          <Toggle size="sm" variant="default" />
          <Toggle size="default" variant="default" defaultChecked />
          <Toggle size="lg" variant="default" />
        </div>
      </div>
    </div>
  );
};

const ModalPreview: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const [variant, setVariant] = React.useState<"default" | "floating" | "glass" | "elevated" | "minimal" | "spotlight">("default");
  const [size, setSize] = React.useState<"xs" | "sm" | "md" | "lg" | "xl" | "full-width" | "full-screen">("md");
  const [position, setPosition] = React.useState<"center" | "top-center" | "bottom-sheet" | "left-side" | "right-side">("center");

  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-4 relative z-10">
      <div className="flex flex-col gap-4 mb-8 bg-background/50 backdrop-blur-md p-4 rounded-xl border border-border/50 max-w-4xl w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex flex-col gap-2">
            <span className="text-xs uppercase font-bold tracking-widest opacity-50">Variant</span>
            <div className="flex flex-wrap gap-2">
              {(["default", "floating", "glass", "elevated", "minimal", "spotlight"] as const).map(v => (
                <Button key={v} variant={variant === v ? "default" : "outline"} size="sm" onClick={() => setVariant(v)} className="capitalize">{v}</Button>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-xs uppercase font-bold tracking-widest opacity-50">Size</span>
            <div className="flex flex-wrap gap-2">
              {(["xs", "sm", "md", "lg", "xl", "full-width", "full-screen"] as const).map(s => (
                <Button key={s} variant={size === s ? "default" : "outline"} size="sm" onClick={() => setSize(s)}>{s}</Button>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-xs uppercase font-bold tracking-widest opacity-50">Position</span>
            <div className="flex flex-wrap gap-2">
              {(["center", "top-center", "bottom-sheet", "left-side", "right-side"] as const).map(p => (
                <Button key={p} variant={position === p ? "default" : "outline"} size="sm" onClick={() => setPosition(p)} className="capitalize">{p.replace("-", " ")}</Button>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex items-center justify-center w-full h-64 border border-dashed border-border/50 rounded-2xl relative">
        <Button onClick={() => setOpen(true)} size="lg" className="rounded-full shadow-lg shadow-primary/20 px-8">Open Modal</Button>
      </div>
      
      <Modal open={open} onOpenChange={setOpen} variant={variant} size={size} position={position}>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>Premium Modal Interface</ModalTitle>
            <ModalDescription>Configure variants, sizes, and positions effortlessly.</ModalDescription>
          </ModalHeader>
          <ModalBody>
            <div className="space-y-4 py-2">
              <div className="w-full h-32 rounded-xl bg-muted/50 animate-pulse border border-border/50" />
              <div className="space-y-2">
                <div className="h-4 bg-muted rounded w-5/6 animate-pulse" />
                <div className="h-4 bg-muted rounded w-4/6 animate-pulse" />
                <div className="h-4 bg-muted rounded w-full animate-pulse" />
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={() => setOpen(false)}>Confirm</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

const CommandPalettePreview: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const [variant, setVariant] = React.useState<"default" | "compact" | "floating" | "glass" | "spotlight">("spotlight");

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-4 relative z-10">
      <div className="flex flex-col gap-4 mb-12 bg-background/50 backdrop-blur-md p-4 rounded-xl border border-border/50 w-full max-w-2xl">
        <div className="flex flex-wrap gap-2 items-center justify-center">
          <span className="text-xs uppercase tracking-widest font-bold text-muted-foreground mr-2">Variant</span>
          {(["default", "compact", "floating", "glass", "spotlight"] as const).map((v) => (
            <Button key={v} variant={variant === v ? "default" : "outline"} size="sm" onClick={() => setVariant(v)} className="capitalize">{v}</Button>
          ))}
        </div>
        <p className="text-center text-xs text-muted-foreground mt-2">
          Press <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100"><span className="text-xs">⌘</span>K</kbd> or <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100"><span className="text-xs">Ctrl</span>K</kbd> to open the command palette.
        </p>
      </div>

      <div className="flex items-center justify-center w-full h-64 border border-dashed border-border/50 rounded-2xl">
        <Button onClick={() => setOpen(true)} size="lg" className="rounded-full shadow-lg shadow-primary/20">
          Launch Command Palette
        </Button>
      </div>

      <CommandPalette open={open} onOpenChange={setOpen} variant={variant}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem>
              <Search className="mr-2 h-4 w-4" />
              <span>Search Projects</span>
            </CommandItem>
            <CommandItem>
              <Plus className="mr-2 h-4 w-4" />
              <span>Create New Project</span>
            </CommandItem>
            <CommandItem>
              <Terminal className="mr-2 h-4 w-4" />
              <span>Run Terminal Command</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Settings">
            <CommandItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile Settings</span>
              <CommandShortcut>⌘P</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Preferences</span>
              <CommandShortcut>⌘S</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <Monitor className="mr-2 h-4 w-4" />
              <span>Appearance</span>
              <CommandShortcut>⌘A</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandPalette>
    </div>
  );
};
`;

content = content.replace('  dock: DockPreview,\n};', '  dock: DockPreview,\n  drawer: DrawerPreview,\n  toggle: TogglePreview,\n  modal: ModalPreview,\n  "command-palette": CommandPalettePreview,\n};');
content = content.replace('export const PreviewRegistry: Record<string, React.FC> = {', componentsToAdd + '\nexport const PreviewRegistry: Record<string, React.FC> = {');

fs.writeFileSync(path, content, 'utf8');
console.log('Done rewriting PreviewRegistry.tsx');
