const fs = require('fs');

let data = fs.readFileSync('src/data/component-library-data.ts', 'utf8');
const newObj = `  {
    id: 42,
    title: 'Workflow Builder',
    type: 'Board',
    slug: 'workflow-builder',
    category: 'data-display',
    description: 'A fully reusable, highly customizable, production-ready Workflow Builder component inspired by n8n, Zapier, and Langflow. Features infinite canvas, zoom/pan, custom nodes, bezier edge rendering, and full drag-and-drop support out of the box with zero heavy third-party canvas dependencies.',
    details: [
      'Bespoke Infinite Canvas with native Zoom and Pan controls via CSS transforms.',
      'SVG-based edge rendering using smooth bezier curves.',
      'Framer Motion powered node dragging and interaction.',
      'Integrated MiniMap and Toolbar components.',
      'Out-of-the-box state management for adding nodes and connecting edges.',
      'Support for custom node types via the nodeTypes prop.',
      'Keyboard accessibility (Delete/Backspace to remove selected nodes/edges).',
      'Multiple visual variants: Default, Enterprise, Minimal, Glass, Compact.'
    ],
    codes: {
      next: 'import { WorkflowBuilder } from "@/components/ui/workflow-builder";\\n\\nexport default function Example() {\\n  return (\\n    <div className="w-full h-[600px]">\\n      <WorkflowBuilder \\n        variant="enterprise" \\n        initialNodes={[\\n          { id: "1", type: "trigger", position: { x: 100, y: 200 }, data: { label: "Webhook" } },\\n          { id: "2", type: "agent", position: { x: 500, y: 200 }, data: { label: "AI Processor" } }\\n        ]}\\n        initialEdges={[\\n          { id: "e1-2", source: "1", target: "2", animated: true }\\n        ]}\\n      />\\n    </div>\\n  );\\n}'
    },
    usage: [
      'Installation: Run npx futureuikit add workflow-builder',
      'Context: Wrap your custom nodes inside the builder. It automatically provides the Context for Zooming and Panning.',
      'Custom Nodes: Pass an object mapping string types to React components via the nodeTypes prop.',
      'Variants: Toggle between enterprise, minimal, glass, etc., via the variant prop.'
    ]
  },`;

const insertionIndex = data.lastIndexOf('];');
if (insertionIndex !== -1) {
  data = data.slice(0, insertionIndex) + newObj + '\n' + data.slice(insertionIndex);
  fs.writeFileSync('src/data/component-library-data.ts', data);
  console.log('Successfully updated component library data.');
} else {
  console.error('Could not find end of array');
}
