"use client";

/**
 * @registry-slug workflow-builder
 * @registry-name Workflow Builder
 * @registry-dependency framer-motion
 * @registry-dependency lucide-react
 * @registry-dependency class-variance-authority
 * @registry-dependency clsx
 * @registry-dependency tailwind-merge
 */

import React, { createContext, useContext, useState, useRef, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, Maximize, MousePointer2, Grip, Trash2, Copy, Play, Settings2, X, Edit2 } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// ==========================================
// TYPES & CONTEXT
// ==========================================

export type XYPosition = { x: number; y: number };

export interface WorkflowNodeData {
  id: string;
  type: string;
  position: XYPosition;
  data: any;
  selected?: boolean;
}

export interface WorkflowEdgeData {
  id: string;
  source: string;
  target: string;
  sourceHandle?: string;
  targetHandle?: string;
  selected?: boolean;
  animated?: boolean;
  lineStyle?: "solid" | "dashed" | "dotted";
}

interface ViewportState {
  x: number;
  y: number;
  zoom: number;
}

interface WorkflowContextType {
  nodes: WorkflowNodeData[];
  edges: WorkflowEdgeData[];
  setNodes: React.Dispatch<React.SetStateAction<WorkflowNodeData[]>>;
  setEdges: React.Dispatch<React.SetStateAction<WorkflowEdgeData[]>>;
  viewport: ViewportState;
  setViewport: React.Dispatch<React.SetStateAction<ViewportState>>;
  
  // Connection State
  isConnecting: boolean;
  connectionStart: { nodeId: string; handleId: string; type: "source" | "target"; position: XYPosition } | null;
  connectionEnd: XYPosition | null;
  startConnection: (nodeId: string, handleId: string, type: "source" | "target", e: React.PointerEvent) => void;
  updateConnection: (e: React.PointerEvent) => void;
  endConnection: (targetNodeId?: string, targetHandleId?: string, targetType?: "source" | "target", screenPos?: XYPosition) => void;
  cancelConnection: () => void;
  hoveredHandle: { nodeId: string; handleId: string; type: "source" | "target" } | null;
  setHoveredHandle: React.Dispatch<React.SetStateAction<{ nodeId: string; handleId: string; type: "source" | "target" } | null>>;

  editingNode: { node: WorkflowNodeData; isNew: boolean } | null;
  setEditingNode: React.Dispatch<React.SetStateAction<{ node: WorkflowNodeData; isNew: boolean } | null>>;

  // Selection
  selectedNodes: string[];
  selectedEdges: string[];
  selectNode: (id: string, multi?: boolean) => void;
  selectEdge: (id: string, multi?: boolean) => void;
  clearSelection: () => void;

  // Theme
  variant: "default" | "enterprise" | "minimal" | "glass" | "compact";
  
  // Custom Node Types Registry
  nodeTypes: Record<string, React.ComponentType<any>>;
}

const WorkflowContext = createContext<WorkflowContextType | null>(null);

export const useWorkflow = () => {
  const ctx = useContext(WorkflowContext);
  if (!ctx) throw new Error("useWorkflow must be used within a WorkflowBuilder");
  return ctx;
};

// ==========================================
// BUILDER WRAPPER
// ==========================================

export interface WorkflowBuilderProps {
  initialNodes?: WorkflowNodeData[];
  initialEdges?: WorkflowEdgeData[];
  nodeTypes?: Record<string, React.ComponentType<any>>;
  variant?: "default" | "enterprise" | "minimal" | "glass" | "compact";
  className?: string;
  children?: React.ReactNode;
  onNodesChange?: (nodes: WorkflowNodeData[]) => void;
  onEdgesChange?: (edges: WorkflowEdgeData[]) => void;
}

export function WorkflowBuilder({
  initialNodes = [],
  initialEdges = [],
  nodeTypes = {},
  variant = "default",
  className,
  children,
  onNodesChange,
  onEdgesChange
}: WorkflowBuilderProps) {
  const [nodes, setNodes] = useState<WorkflowNodeData[]>(initialNodes);
  const [edges, setEdges] = useState<WorkflowEdgeData[]>(initialEdges);
  const [viewport, setViewport] = useState<ViewportState>({ x: 0, y: 0, zoom: 1 });
  
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionStart, setConnectionStart] = useState<WorkflowContextType["connectionStart"]>(null);
  const [connectionEnd, setConnectionEnd] = useState<XYPosition | null>(null);
  const [hoveredHandle, setHoveredHandle] = useState<{ nodeId: string; handleId: string; type: "source" | "target" } | null>(null);
  const [pendingEdge, setPendingEdge] = useState<{ edge: WorkflowEdgeData; screenPos: XYPosition } | null>(null);
  const [editingNode, setEditingNode] = useState<{ node: WorkflowNodeData; isNew: boolean } | null>(null);

  const [selectedNodes, setSelectedNodes] = useState<string[]>([]);
  const [selectedEdges, setSelectedEdges] = useState<string[]>([]);

  useEffect(() => {
    if (onNodesChange) onNodesChange(nodes);
  }, [nodes, onNodesChange]);

  useEffect(() => {
    if (onEdgesChange) onEdgesChange(edges);
  }, [edges, onEdgesChange]);

  const selectNode = (id: string, multi = false) => {
    setSelectedNodes(prev => multi ? (prev.includes(id) ? prev.filter(n => n !== id) : [...prev, id]) : [id]);
    if (!multi) setSelectedEdges([]);
  };

  const selectEdge = (id: string, multi = false) => {
    setSelectedEdges(prev => multi ? (prev.includes(id) ? prev.filter(e => e !== id) : [...prev, id]) : [id]);
    if (!multi) setSelectedNodes([]);
  };

  const clearSelection = () => {
    setSelectedNodes([]);
    setSelectedEdges([]);
  };

  const cancelConnection = useCallback(() => {
    setIsConnecting(false);
    setConnectionStart(null);
    setConnectionEnd(null);
    setHoveredHandle(null);
  }, []);

  // Keep connection rendering in sync with mouse
  const updateConnection = useCallback((e: React.PointerEvent) => {
    // Legacy inside container tracking, handled globally now
  }, []);

  const endConnection = useCallback((targetNodeId?: string, targetHandleId?: string, targetType?: "source" | "target", screenPos?: XYPosition) => {
    if (isConnecting && connectionStart && targetNodeId && targetNodeId !== connectionStart.nodeId) {
      const isTargetValid = targetType ? connectionStart.type !== targetType : connectionStart.type !== hoveredHandle?.type;
      if (isTargetValid) {
        const newEdge: WorkflowEdgeData = {
          id: `e-${connectionStart.nodeId}-${targetNodeId}-${Date.now()}`,
          source: connectionStart.type === "source" ? connectionStart.nodeId : targetNodeId,
          target: connectionStart.type === "source" ? targetNodeId : connectionStart.nodeId,
          sourceHandle: connectionStart.type === "source" ? connectionStart.handleId : targetHandleId,
          targetHandle: connectionStart.type === "source" ? targetHandleId : connectionStart.handleId,
          lineStyle: "solid"
        };
        
        const exists = edges.some(e => e.source === newEdge.source && e.target === newEdge.target);
        if (!exists) {
          const screenX = screenPos ? screenPos.x : (connectionEnd ? connectionEnd.x * viewport.zoom + viewport.x : 0);
          const screenY = screenPos ? screenPos.y : (connectionEnd ? connectionEnd.y * viewport.zoom + viewport.y : 0);
          setPendingEdge({ edge: newEdge, screenPos: { x: screenX, y: screenY } });
        }
      }
    }
    cancelConnection();
  }, [isConnecting, connectionStart, hoveredHandle, edges, connectionEnd, viewport, cancelConnection]);

  const startConnection = useCallback((nodeId: string, handleId: string, type: "source" | "target", e: React.PointerEvent) => {
    e.stopPropagation();

    if (isConnecting && connectionStart) {
      if (connectionStart.nodeId !== nodeId && connectionStart.type !== type) {
        // Complete the connection
        const canvasEl = document.querySelector(".workflow-canvas-container");
        let screenX = e.clientX;
        let screenY = e.clientY;
        if (canvasEl) {
          const rect = canvasEl.getBoundingClientRect();
          screenX = e.clientX - rect.left;
          screenY = e.clientY - rect.top;
        }
        endConnection(nodeId, handleId, type, { x: screenX, y: screenY });
        return;
      } else if (connectionStart.nodeId === nodeId && connectionStart.handleId === handleId) {
        cancelConnection();
        return;
      }
      // If invalid connection type (e.g. source to source), start a new one from here instead
    }

    setIsConnecting(true);
    setConnectionStart({ nodeId, handleId, type, position: { x: e.clientX, y: e.clientY } });
    
    const canvasEl = document.querySelector(".workflow-canvas-container");
    if (canvasEl) {
      const rect = canvasEl.getBoundingClientRect();
      const x = (e.clientX - rect.left - viewport.x) / viewport.zoom;
      const y = (e.clientY - rect.top - viewport.y) / viewport.zoom;
      setConnectionEnd({ x, y });
    }
  }, [isConnecting, connectionStart, endConnection, cancelConnection, viewport]);

  // Global pointer move listeners when connecting (click-to-connect mode)
  useEffect(() => {
    if (!isConnecting) return;

    const handleGlobalPointerMove = (e: PointerEvent) => {
      const canvasEl = document.querySelector(".workflow-canvas-container");
      if (canvasEl) {
        const rect = canvasEl.getBoundingClientRect();
        const x = (e.clientX - rect.left - viewport.x) / viewport.zoom;
        const y = (e.clientY - rect.top - viewport.y) / viewport.zoom;
        setConnectionEnd({ x, y });
      }
    };

    window.addEventListener("pointermove", handleGlobalPointerMove);

    return () => {
      window.removeEventListener("pointermove", handleGlobalPointerMove);
    };
  }, [isConnecting, viewport]);

  return (
    <WorkflowContext.Provider value={{
      nodes, setNodes, edges, setEdges,
      viewport, setViewport,
      isConnecting, connectionStart, connectionEnd,
      startConnection, updateConnection, endConnection, cancelConnection,
      hoveredHandle, setHoveredHandle,
      editingNode, setEditingNode,
      selectedNodes, selectedEdges, selectNode, selectEdge, clearSelection,
      variant, nodeTypes
    }}>
      <div 
        className={cn("relative w-full h-full overflow-hidden bg-background rounded-xl border border-border/50 select-none workflow-canvas-container", className)}
        onKeyDown={(e) => {
          if ((e.target as HTMLElement).tagName === "INPUT" || (e.target as HTMLElement).tagName === "TEXTAREA") return;
          if (e.key === "Delete" || e.key === "Backspace") {
            setNodes(prev => prev.filter(n => !selectedNodes.includes(n.id)));
            setEdges(prev => prev.filter(e => !selectedEdges.includes(e.id)));
            clearSelection();
          }
        }}
        tabIndex={0}
      >
        {children}

        <AnimatePresence>
          {editingNode && <WorkflowNodeEditor key="editor" />}
          {pendingEdge && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="absolute z-[100] bg-popover/90 backdrop-blur-md border shadow-xl rounded-xl p-3 flex flex-col gap-2 min-w-[160px]"
              style={{ left: Math.min(pendingEdge.screenPos.x, typeof window !== 'undefined' ? window.innerWidth - 200 : pendingEdge.screenPos.x), top: Math.min(pendingEdge.screenPos.y, typeof window !== 'undefined' ? window.innerHeight - 200 : pendingEdge.screenPos.y) }}
            >
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1 px-1">Line Style</span>
              <div className="flex flex-col gap-1">
                <button 
                  onClick={() => { setEdges(p => [...p, { ...pendingEdge.edge, lineStyle: "solid" }]); setPendingEdge(null); }}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-muted text-sm font-medium transition-colors text-left"
                >
                  <div className="w-4 h-0.5 bg-foreground" /> Solid
                </button>
                <button 
                  onClick={() => { setEdges(p => [...p, { ...pendingEdge.edge, lineStyle: "dashed" }]); setPendingEdge(null); }}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-muted text-sm font-medium transition-colors text-left"
                >
                  <div className="w-4 border-b-2 border-dashed border-foreground" /> Dashed
                </button>
                <button 
                  onClick={() => { setEdges(p => [...p, { ...pendingEdge.edge, lineStyle: "dotted" }]); setPendingEdge(null); }}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-muted text-sm font-medium transition-colors text-left"
                >
                  <div className="w-4 border-b-2 border-dotted border-foreground" /> Dotted
                </button>
              </div>
              <button 
                onClick={() => setPendingEdge(null)} 
                className="mt-2 text-xs text-muted-foreground hover:text-foreground text-center"
              >
                Cancel
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </WorkflowContext.Provider>
  );
}

// ==========================================
// CANVAS & RENDERER
// ==========================================

export function WorkflowCanvas() {
  const { 
    nodes, edges, viewport, setViewport, 
    clearSelection, isConnecting, connectionStart, connectionEnd, endConnection,
    cancelConnection, variant, nodeTypes
  } = useWorkflow();

  const canvasRef = useRef<HTMLDivElement>(null);
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState<XYPosition>({ x: 0, y: 0 });

  // Grid Background Pattern
  const bgPattern = useMemo(() => {
    if (variant === "minimal") return null;
    return (
      <svg width="100%" height="100%" className="absolute inset-0 pointer-events-none opacity-[0.15]">
        <pattern id="wf-grid" width="24" height="24" patternUnits="userSpaceOnUse" patternTransform={`translate(${viewport.x}, ${viewport.y}) scale(${viewport.zoom})`}>
          <circle cx="1" cy="1" r="1" fill="currentColor" className="text-muted-foreground" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#wf-grid)" />
      </svg>
    );
  }, [viewport, variant]);

  // Handle Zoom
  const handleWheel = useCallback((e: React.WheelEvent) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      const zoomSensitivity = 0.001;
      const delta = -e.deltaY * zoomSensitivity;
      setViewport(prev => {
        const newZoom = Math.min(Math.max(0.1, prev.zoom + delta), 2);
        
        // Zoom to mouse pointer logic
        if (canvasRef.current) {
          const rect = canvasRef.current.getBoundingClientRect();
          const mouseX = e.clientX - rect.left;
          const mouseY = e.clientY - rect.top;
          
          const scaleChange = newZoom - prev.zoom;
          const newX = prev.x - (mouseX - prev.x) * (scaleChange / prev.zoom);
          const newY = prev.y - (mouseY - prev.y) * (scaleChange / prev.zoom);
          
          return { x: newX, y: newY, zoom: newZoom };
        }
        return { ...prev, zoom: newZoom };
      });
    } else {
      // Pan
      setViewport(prev => ({
        ...prev,
        x: prev.x - e.deltaX,
        y: prev.y - e.deltaY
      }));
    }
  }, [setViewport]);

  // Handle Pan
  const handlePointerDown = (e: React.PointerEvent) => {
    if (e.button === 1 || e.button === 0) {
      if (isConnecting) {
        cancelConnection();
      }
      setIsPanning(true);
      setPanStart({ x: e.clientX - viewport.x, y: e.clientY - viewport.y });
      clearSelection();
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (isPanning) {
      setViewport(prev => ({
        ...prev,
        x: e.clientX - panStart.x,
        y: e.clientY - panStart.y
      }));
    }
  };

  const handlePointerUp = () => {
    setIsPanning(false);
  };

  // Helper to get actual standard handle coordinates on canvas
  const getHandlePosition = useCallback((nodeId: string, handleType: "source" | "target") => {
    const node = nodes.find(n => n.id === nodeId);
    if (!node) return { x: 0, y: 0 };
    const nodeWidth = 240;
    const nodeHeight = variant === "compact" ? 48 : 72;
    if (handleType === "source") {
      return { x: node.position.x + nodeWidth, y: node.position.y + nodeHeight / 2 };
    } else {
      return { x: node.position.x, y: node.position.y + nodeHeight / 2 };
    }
  }, [nodes, variant]);

  return (
    <div 
      ref={canvasRef}
      className={cn(
        "absolute inset-0 w-full h-full overflow-hidden outline-none touch-none",
        isPanning ? "cursor-grabbing" : "cursor-grab"
      )}
      onWheel={handleWheel}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      {bgPattern}

      <div 
        className="absolute top-0 left-0 origin-top-left w-full h-full pointer-events-none"
        style={{ transform: `translate(${viewport.x}px, ${viewport.y}px) scale(${viewport.zoom})` }}
      >
        {/* EDGES LAYER */}
        <svg className="absolute inset-0 w-full h-full overflow-visible pointer-events-none z-0">
          {edges.map(edge => {
            const start = getHandlePosition(edge.source, "source");
            const end = getHandlePosition(edge.target, "target");

            const cX = start.x + Math.abs(end.x - start.x) * 0.5;
            const d = `M${start.x},${start.y} C${cX},${start.y} ${cX},${end.y} ${end.x},${end.y}`;

            return (
              <WorkflowEdgeRenderer 
                key={edge.id} 
                id={edge.id} 
                d={d} 
                animated={edge.animated} 
                lineStyle={edge.lineStyle}
                start={start}
                end={end}
                cX={cX}
              />
            );
          })}

          {/* Active Connection Line (Bezier to mouse) */}
          {isConnecting && connectionStart && connectionEnd && (
            (() => {
              const start = getHandlePosition(connectionStart.nodeId, connectionStart.type);
              const cX = start.x + Math.abs(connectionEnd.x - start.x) * 0.5;
              const d = `M${start.x},${start.y} C${cX},${start.y} ${cX},${connectionEnd.y} ${connectionEnd.x},${connectionEnd.y}`;
              return (
                <path 
                  d={d}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  className="text-primary/70"
                  strokeDasharray="4 4"
                />
              );
            })()
          )}
        </svg>

        {/* NODES LAYER */}
        <div className="absolute inset-0 pointer-events-none z-10">
          {nodes.map(node => {
            const CustomNode = nodeTypes[node.type];
            return (
              <WorkflowNodeWrapper key={node.id} node={node}>
                {CustomNode ? <CustomNode id={node.id} data={node.data} /> : <DefaultNode id={node.id} data={node.data} type={node.type} />}
              </WorkflowNodeWrapper>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ==========================================
// EDGE RENDERER
// ==========================================

function WorkflowEdgeRenderer({ 
  id, 
  d, 
  animated,
  lineStyle = "solid",
  start,
  end,
  cX
}: { 
  id: string; 
  d: string; 
  animated?: boolean;
  lineStyle?: "solid" | "dashed" | "dotted";
  start: XYPosition;
  end: XYPosition;
  cX: number;
}) {
  const { selectedEdges, selectEdge, setEdges } = useWorkflow();
  const isSelected = selectedEdges.includes(id);

  // Calculate cubic bezier midpoint at t=0.5
  const midX = 0.125 * start.x + 0.75 * cX + 0.125 * end.x;
  const midY = 0.5 * start.y + 0.5 * end.y;

  const handleDelete = (e: React.PointerEvent | React.MouseEvent) => {
    e.stopPropagation();
    setEdges(prev => prev.filter(edge => edge.id !== id));
  };

  return (
    <g className="pointer-events-auto cursor-pointer" onPointerDown={(e) => { e.stopPropagation(); selectEdge(id); }}>
      {/* Hit area */}
      <path d={d} fill="none" stroke="transparent" strokeWidth={24} />
      
      {/* Selection outer glow */}
      {isSelected && (
        <path d={d} fill="none" stroke="currentColor" strokeWidth={6} className="text-primary/20" />
      )}

      {/* Visible Path */}
      <path 
        d={d} 
        fill="none" 
        className={cn(
          "transition-colors duration-200",
          isSelected ? "stroke-primary" : "stroke-border hover:stroke-primary/50"
        )} 
        strokeWidth={isSelected ? 3 : 2} 
        strokeDasharray={
          animated ? "5 5" : 
          lineStyle === "dashed" ? "8 6" : 
          lineStyle === "dotted" ? "2 4" : 
          "none"
        }
        strokeLinecap={lineStyle === "dotted" ? "round" : "butt"}
      >
        {animated && (
          <animate attributeName="stroke-dashoffset" from="10" to="0" dur="0.5s" repeatCount="indefinite" />
        )}
      </path>

      {/* SVG Interactive Edge Delete Button */}
      {isSelected && (
        <g transform={`translate(${midX - 10}, ${midY - 10})`} onPointerDown={handleDelete} className="pointer-events-auto cursor-pointer z-50">
          <circle r={10} cx={10} cy={10} className="fill-destructive stroke-destructive-foreground stroke-1 shadow-sm hover:fill-destructive/90 transition-colors" />
          <path d="M7,7 L13,13 M13,7 L7,13" fill="none" stroke="white" strokeWidth={1.5} strokeLinecap="round" />
        </g>
      )}
    </g>
  );
}

// ==========================================
// NODE ENGINE
// ==========================================

function WorkflowNodeWrapper({ node, children }: { node: WorkflowNodeData, children: React.ReactNode }) {
  const { setNodes, setEdges, selectNode, selectedNodes, variant, setEditingNode } = useWorkflow();
  const isSelected = selectedNodes.includes(node.id);
  const [isHovered, setIsHovered] = useState(false);

  const handleDragEnd = (e: any, info: any) => {
    setNodes(prev => prev.map(n => {
      if (n.id === node.id) {
        return { ...n, position: { x: n.position.x + info.offset.x, y: n.position.y + info.offset.y } };
      }
      return n;
    }));
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setNodes(prev => prev.filter(n => n.id !== node.id));
    setEdges(prev => prev.filter(edge => edge.source !== node.id && edge.target !== node.id));
  };

  return (
    <motion.div
      drag
      dragMomentum={false}
      onDragEnd={handleDragEnd}
      onPointerDown={(e) => { e.stopPropagation(); selectNode(node.id); }}
      onDoubleClick={(e) => { e.stopPropagation(); setEditingNode({ isNew: false, node }); }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "absolute pointer-events-auto rounded-xl transition-shadow",
        isSelected && "ring-2 ring-primary ring-offset-2 ring-offset-background z-20",
        !isSelected && "z-10 hover:z-20"
      )}
      style={{
        x: node.position.x,
        y: node.position.y,
        width: 240, // standard fixed width for simple hit boxes
      }}
      whileDrag={{ scale: 1.02, cursor: "grabbing" }}
    >
      {children}

      {/* Action buttons shown on hover or when selected */}
      <AnimatePresence>
        {(isHovered || isSelected) && (
          <>
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={handleDelete}
              className="absolute -top-2.5 -right-2.5 w-6 h-6 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center shadow-md hover:bg-destructive/90 transition-colors z-40 pointer-events-auto cursor-pointer"
              title="Delete Node"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </motion.button>
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={(e) => { e.stopPropagation(); setEditingNode({ isNew: false, node }); }}
              className="absolute -top-2.5 right-5 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-md hover:bg-primary/90 transition-colors z-40 pointer-events-auto cursor-pointer"
              title="Edit Node"
            >
              <Edit2 className="w-3.5 h-3.5" />
            </motion.button>
          </>
        )}
      </AnimatePresence>

      {/* Handles */}
      <WorkflowHandle type="target" position="left" nodeId={node.id} />
      <WorkflowHandle type="source" position="right" nodeId={node.id} />
    </motion.div>
  );
}

export function WorkflowHandle({ type, position, nodeId, id = "default" }: { type: "source" | "target", position: "left" | "right" | "top" | "bottom", nodeId: string, id?: string }) {
  const { startConnection, isConnecting, hoveredHandle, setHoveredHandle } = useWorkflow();

  const handlePointerDown = (e: React.PointerEvent) => {
    e.stopPropagation();
    startConnection(nodeId, id, type, e);
  };

  const handlePointerEnter = () => {
    if (isConnecting) {
      setHoveredHandle({ nodeId, handleId: id, type });
    }
  };

  const handlePointerLeave = () => {
    if (isConnecting) {
      setHoveredHandle(null);
    }
  };

  const isHovered = hoveredHandle?.nodeId === nodeId && hoveredHandle?.handleId === id && hoveredHandle?.type === type;

  return (
    <div 
      className={cn(
        "absolute w-4 h-4 bg-background border-2 border-primary rounded-full cursor-crosshair transition-all z-30",
        isHovered ? "scale-150 bg-primary shadow-lg ring-4 ring-primary/20" : "hover:scale-125",
        position === "left" && "-left-2 top-1/2 -translate-y-1/2",
        position === "right" && "-right-2 top-1/2 -translate-y-1/2",
        position === "top" && "-top-2 left-1/2 -translate-x-1/2",
        position === "bottom" && "-bottom-2 left-1/2 -translate-x-1/2",
      )}
      onPointerDown={handlePointerDown}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
    />
  );
}

// ==========================================
// DEFAULT NODE TYPES
// ==========================================

function DefaultNode({ id, data, type }: { id: string, data: any, type: string }) {
  const { variant } = useWorkflow();
  
  const iconMap: any = {
    trigger: Play,
    action: Settings2,
    condition: Grip,
    agent: MousePointer2
  };
  
  const Icon = iconMap[type] || Settings2;

  return (
    <div className={cn(
      "w-full p-4 flex flex-col gap-2 rounded-xl backdrop-blur-sm border shadow-sm",
      variant === "default" && "bg-card border-border",
      variant === "enterprise" && "bg-card border-border/50 shadow-md rounded-md",
      variant === "minimal" && "bg-transparent border-border rounded-none border-l-4 border-l-primary",
      variant === "glass" && "bg-background/40 border-border/50 shadow-lg",
      variant === "compact" && "p-2 gap-1 bg-card"
    )}>
      <div className="flex items-center gap-3">
        <div className={cn(
          "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
          type === "trigger" && "bg-emerald-500/20 text-emerald-500",
          type === "action" && "bg-blue-500/20 text-blue-500",
          type === "condition" && "bg-amber-500/20 text-amber-500",
          type === "agent" && "bg-purple-500/20 text-purple-500",
          !["trigger", "action", "condition", "agent"].includes(type) && "bg-primary/20 text-primary"
        )}>
          <Icon className="w-4 h-4" />
        </div>
        <div className="flex flex-col">
          <span className={cn(
            "font-semibold tracking-tight leading-none text-foreground",
            variant === "compact" && "text-sm"
          )}>{data?.label || type}</span>
          {data?.description && variant !== "compact" && (
            <span className="text-xs text-muted-foreground mt-1 line-clamp-1">{data.description}</span>
          )}
        </div>
      </div>
    </div>
  );
}

// ==========================================
// NODE EDITOR MODAL
// ==========================================

function WorkflowNodeEditor() {
  const { editingNode, setEditingNode, setNodes } = useWorkflow();

  if (!editingNode) return null;

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const label = formData.get("label") as string;
    const description = formData.get("description") as string;
    const type = formData.get("type") as string;

    const updatedNode = {
      ...editingNode.node,
      type,
      data: { ...editingNode.node.data, label, description }
    };

    if (editingNode.isNew) {
      setNodes(prev => [...prev, updatedNode]);
    } else {
      setNodes(prev => prev.map(n => n.id === updatedNode.id ? updatedNode : n));
    }
    setEditingNode(null);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-[200] bg-background/80 backdrop-blur-sm flex items-center justify-center p-4 pointer-events-auto"
    >
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        className="bg-card text-card-foreground border border-border/50 shadow-2xl rounded-2xl w-full max-w-md overflow-hidden flex flex-col"
      >
        <div className="px-6 py-4 border-b flex items-center justify-between bg-muted/30">
          <h3 className="font-semibold text-lg">{editingNode.isNew ? "Add New Node" : "Edit Node"}</h3>
          <button onClick={() => setEditingNode(null)} className="p-1.5 rounded-full text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
             <X className="w-4 h-4" />
          </button>
        </div>
        <form onSubmit={handleSave} className="p-6 flex flex-col gap-5">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Node Type</label>
            <select name="type" defaultValue={editingNode.node.type} className="w-full bg-background border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow">
              <option value="trigger">Trigger (Start)</option>
              <option value="action">Action (Task)</option>
              <option value="condition">Condition (Branch)</option>
              <option value="agent">Agent (AI)</option>
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Label</label>
            <input name="label" required defaultValue={editingNode.node.data.label} className="w-full bg-background border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow" placeholder="e.g. Fetch User Data" />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Description</label>
            <textarea name="description" defaultValue={editingNode.node.data.description} className="w-full bg-background border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow resize-none" rows={3} placeholder="Describe what this node does..." />
          </div>
          
          <div className="flex items-center justify-end gap-3 mt-2">
            <button type="button" onClick={() => setEditingNode(null)} className="px-4 py-2 text-sm font-medium hover:bg-muted rounded-lg transition-colors">Cancel</button>
            <button type="submit" className="px-6 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-lg shadow-sm hover:bg-primary/90 transition-colors">Save</button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}

// ==========================================
// CONTROLS & UTILS
// ==========================================

export function WorkflowToolbar() {
  const { setViewport, setNodes, setEdges, variant, setEditingNode, viewport } = useWorkflow();

  const handleZoomIn = () => setViewport(p => ({ ...p, zoom: Math.min(2, p.zoom + 0.2) }));
  const handleZoomOut = () => setViewport(p => ({ ...p, zoom: Math.max(0.1, p.zoom - 0.2) }));
  const handleFit = () => setViewport({ x: 0, y: 0, zoom: 1 });

  const handleAddNode = () => {
    const canvasEl = document.querySelector(".workflow-canvas-container");
    const rect = canvasEl?.getBoundingClientRect();
    const centerX = rect ? (rect.width / 2 - viewport.x) / viewport.zoom - 120 : 400;
    const centerY = rect ? (rect.height / 2 - viewport.y) / viewport.zoom - 40 : 200;

    setEditingNode({
      isNew: true,
      node: {
        id: `node-${Date.now()}`,
        type: "action",
        position: { x: centerX, y: centerY },
        data: { label: "New Action", description: "" }
      }
    });
  };

  return (
    <div className={cn(
      "absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-1 p-1.5 rounded-full border shadow-sm backdrop-blur-md z-50",
      variant === "glass" ? "bg-background/20 border-border/30" : "bg-background border-border",
      variant === "enterprise" && "rounded-lg"
    )}>
      <button onClick={handleAddNode} className="p-2 hover:bg-muted rounded-full transition-colors group relative" title="Add Node">
        <Plus className="w-4 h-4" />
      </button>
      <div className="w-px h-4 bg-border/50 mx-1" />
      <button onClick={handleZoomOut} className="p-2 hover:bg-muted rounded-full transition-colors" title="Zoom Out">
        <Minus className="w-4 h-4" />
      </button>
      <button onClick={handleFit} className="p-2 hover:bg-muted rounded-full transition-colors" title="Fit View">
        <Maximize className="w-4 h-4" />
      </button>
      <button onClick={handleZoomIn} className="p-2 hover:bg-muted rounded-full transition-colors" title="Zoom In">
        <Plus className="w-4 h-4" />
      </button>
    </div>
  );
}

export function WorkflowMiniMap() {
  const { nodes, viewport, variant } = useWorkflow();
  
  if (variant === "compact") return null;

  return (
    <div className={cn(
      "absolute bottom-6 right-6 w-48 h-32 bg-background border rounded-xl shadow-sm overflow-hidden z-50 opacity-80 hover:opacity-100 transition-opacity",
      variant === "glass" && "bg-background/20 backdrop-blur-md",
      variant === "enterprise" && "rounded-md border-slate-200 dark:border-slate-800"
    )}>
      <div className="relative w-full h-full transform scale-[-1] hidden" /> {/* Future impl for true minimap scaling */}
      {/* <div className="absolute inset-0 flex items-center justify-center flex-col text-muted-foreground/30 font-bold text-xs">
        <Grip className="w-8 h-8 mb-2 opacity-50" />
        MINIMAP OVERVIEW
      </div> */}
      {/* Mock rendering of nodes in minimap */}
      <div className="absolute inset-0 pointer-events-none">
        {nodes.map(n => (
          <div 
            key={`mini-${n.id}`} 
            className="absolute bg-primary/50 rounded-sm"
            style={{
              left: `${(n.position.x / 2000) * 100 + 50}%`,
              top: `${(n.position.y / 1500) * 100 + 50}%`,
              width: 8, height: 4
            }}
          />
        ))}
      </div>
    </div>
  );
}
