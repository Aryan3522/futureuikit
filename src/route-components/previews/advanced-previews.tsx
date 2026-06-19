"use client";

import React, { useState, useRef } from "react";
import { KanbanBoard } from "@/components/ui/kanban";
import { WorkflowBuilder, WorkflowCanvas, WorkflowToolbar, WorkflowMiniMap } from "@/components/ui/workflow-builder";
import { RichTextEditor } from "@/components/ui/rich-text-editor";
import { AIChat, ChatMessages, ChatPromptSuggestions, ChatInput } from "@/components/ui/ai-chat";
import { AutomotiveCarousel } from "@/components/ui/automotive-carousel";
import { ScifiHelmet } from "@/components/ui/scifi-helmet";
import { BmwM4 } from "@/components/ui/bmw-m4";
import { BrowserWindow } from "@/components/ui/browser-window";
import { Terminal as UITerminal, TerminalVariant } from "@/components/ui/terminal";
import { CursorGlowButton } from "@/components/ui/cursor-glow-button";
import { ScrollTextReveal } from "@/components/ui/scroll-text-reveal";
import { SlideUpReveal, type SlideUpRevealVariant, type SlideUpRevealShape } from "@/components/ui/slide-up-reveal";
import { PreviewContainer } from "../preview-engine/PreviewContainer";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export const KanbanPreview: React.FC = () => {
  const initialColumns = [
    {
      id: "todo",
      title: "To Do",
      cards: [
        { id: "c1", title: "Design new landing page" },
        { id: "c2", title: "Setup project repository" },
        { id: "c3", title: "Research competitors" }
      ]
    },
    {
      id: "in-progress",
      title: "In Progress",
      cards: [
        { id: "c4", title: "Implement Drag & Drop" },
        { id: "c5", title: "Review PRs" }
      ]
    },
    {
      id: "done",
      title: "Done",
      cards: [
        { id: "c6", title: "Write documentation" }
      ]
    }
  ];

  return (
    <PreviewContainer title="Kanban Board" description="A highly interactive, draggable kanban board for project management." isVirtualScreen={true}>
      <div className="w-full h-full min-h-125">
        <KanbanBoard initialColumns={initialColumns} />
      </div>
    </PreviewContainer>
  );
};

export const WorkflowPreview: React.FC = () => {
  return (
    <PreviewContainer title="Workflow Builder" description="A node-based visual workflow builder." isVirtualScreen={true} contentClassName="p-0 border-none">
      <div className="absolute inset-0 w-full h-full">
        <WorkflowBuilder 
          variant="enterprise"
          initialNodes={[
            { id: "1", type: "trigger", position: { x: 100, y: 150 }, data: { label: "Webhook" } },
            { id: "2", type: "agent", position: { x: 400, y: 150 }, data: { label: "AI Processor" } },
            { id: "3", type: "action", position: { x: 700, y: 150 }, data: { label: "Send Email" } }
          ]}
          initialEdges={[
            { id: "e1-2", source: "1", target: "2", animated: true },
            { id: "e2-3", source: "2", target: "3", animated: true }
          ]}
        >
          <WorkflowCanvas />
          <WorkflowToolbar />
          <WorkflowMiniMap />
        </WorkflowBuilder>
      </div>
    </PreviewContainer>
  );
};

export const RichTextEditorPreview: React.FC = () => {
  const [variant, setVariant] = useState<"default" | "minimal" | "writing" | "enterprise" | "glass">("default");
  return (
    <PreviewContainer
      title="Rich Text Editor"
      description="A powerful Notion-style rich text editor built with Tiptap."
      variants={["default", "minimal", "writing", "enterprise", "glass"]}
      activeVariant={variant}
      onVariantChange={setVariant}
    >
      <div className="w-full max-w-4xl mx-auto min-h-125">
        <RichTextEditor
          variant={variant}
          content={`
            <h1>Welcome to the Rich Text Editor ✨</h1>
            <p>This is a highly customizable, Notion-like editor built with Tiptap. It's fully functional out of the box and supports various modern features.</p>
            <p><strong>Try these interactions:</strong></p>
            <ul data-type="taskList">
              <li data-type="taskItem" data-checked="false">Type <code>/</code> on a new line to open the <strong>Slash Command menu</strong>.</li>
              <li data-type="taskItem" data-checked="false">Select any text to see the floating <strong>Bubble Menu</strong> for quick formatting.</li>
              <li data-type="taskItem" data-checked="false">Write markdown shortcuts like <code># </code> for headings or <code>> </code> for blockquotes.</li>
            </ul>
            <blockquote>"The best tools get out of your way and let you focus on what matters most."</blockquote>
            <pre><code>function test() {\n  console.log('It even has code blocks!');\n}</code></pre>
            <p>You can also insert tables and images seamlessly.</p>
          `}
        />
      </div>
    </PreviewContainer>
  );
};

export const AIChatPreview: React.FC = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [layout, setLayout] = useState<"chatgpt" | "claude" | "perplexity" | "compact" | "enterprise" | "minimal">("chatgpt");
  const [inputVariant, setInputVariant] = useState<"standard" | "floating" | "command" | "multiline" | "workspace">("standard");

  // ---- Response Data ----

  const GREETINGS = [
    // English
    "hi", "hello", "hey", "hey there", "hi there", "howdy", "greetings", "what's up", "sup", "yo",
    // Spanish
    "hola", "buenos dias", "buenas tardes", "buenas noches",
    // French
    "bonjour", "bonsoir", "salut",
    // German
    "hallo", "guten tag", "guten morgen", "guten abend",
    // Italian
    "ciao", "salve", "buongiorno",
    // Portuguese
    "olá", "oi", "bom dia",
    // Japanese (romaji)
    "konnichiwa", "ohayo", "konbanwa",
    // Hindi (romaji)
    "namaste", "namaskar",
    // Arabic (romaji)
    "marhaba", "ahlan",
    // Chinese (romaji)
    "ni hao",
    // Korean (romaji)
    "annyeong", "annyeonghaseyo",
    // Russian (romaji)
    "privet", "zdravstvuyte",
    // Dutch
    "hoi", "dag", "goedendag",
    // Swedish
    "hej", "god dag",
  ];

  const GREETING_RESPONSES = [
    "Hello! 👋 How can I help you today? Try asking me for a poem, some code, or just chat!",
    "Hey there! Great to see you. What are we building today?",
    "Hi! I'm your AI assistant. Ask me for code, poems, or anything else!",
    "Greetings! I'm fully wired up and ready to help. What's on your mind?",
    "Hello! I'm a demo AI interface. Type 'poem' for a poem or 'react code' for a React component!",
    "Hey! 🚀 I'm ready. Ask me for code in any language, a poem, or just say something fun!",
    "Howdy! What can I do for you today?",
    "Bonjour! (Hello!) I'm your multilingual AI assistant. How can I help?",
    "¡Hola! I speak all languages — ask me anything!",
    "Ciao! Your AI is ready. What do you need?",
  ];

  const POEMS = [
    {
      title: "The Road Not Taken (excerpt) – Robert Frost",
      text: "Two roads diverged in a yellow wood,\nAnd sorry I could not travel both\nAnd be one traveler, long I stood\nAnd looked down one as far as I could\nTo where it bent in the undergrowth.",
    },
    {
      title: "If — Rudyard Kipling (excerpt)",
      text: "If you can keep your head when all about you\n    Are losing theirs and blaming it on you,\nIf you can trust yourself when all men doubt you,\n    But make allowance for their doubting too;",
    },
    {
      title: "Still I Rise – Maya Angelou (excerpt)",
      text: "You may write me down in history\nWith your bitter, twisted lies,\nYou may trod me in the very dirt\nBut still, like dust, I'll rise.",
    },
    {
      title: "Shall I compare thee – Shakespeare (Sonnet 18)",
      text: "Shall I compare thee to a summer's day?\nThou art more lovely and more temperate.\nRough winds do shake the darling buds of May,\nAnd summer's lease hath all too short a date.",
    },
    {
      title: "Ozymandias – Percy Bysshe Shelley",
      text: "I met a traveller from an antique land,\nWho said — 'Two vast and trunkless legs of stone\nStand in the desert. Near them, on the sand,\nHalf sunk, a shattered visage lies.'",
    },
    {
      title: "Hope is the Thing with Feathers – Emily Dickinson",
      text: "Hope is the thing with feathers\nThat perches in the soul,\nAnd sings the tune without the words,\nAnd never stops at all.",
    },
    {
      title: "Do Not Go Gentle – Dylan Thomas (excerpt)",
      text: "Do not go gentle into that good night,\nOld age should burn and rave at close of day;\nRage, rage against the dying of the light.",
    },
    {
      title: "Invictus – William Ernest Henley (excerpt)",
      text: "Out of the night that covers me,\n      Black as the pit from pole to pole,\nI thank whatever gods may be\n      For my unconquerable soul.",
    },
  ];

  const CODE_SNIPPETS = [
    {
      lang: "tsx",
      label: "React Counter Component",
      code: `import { useState } from "react";\n\nexport default function Counter() {\n  const [count, setCount] = useState(0);\n  return (\n    <div className="flex flex-col items-center gap-4 p-8">\n      <h1 className="text-4xl font-bold">{count}</h1>\n      <div className="flex gap-2">\n        <button onClick={() => setCount(c => c - 1)} className="px-4 py-2 bg-red-500 text-white rounded-lg">-</button>\n        <button onClick={() => setCount(c => c + 1)} className="px-4 py-2 bg-green-500 text-white rounded-lg">+</button>\n      </div>\n    </div>\n  );\n}`,
    },
    {
      lang: "tsx",
      label: "React Todo List",
      code: `import { useState } from "react";\n\nexport default function TodoApp() {\n  const [todos, setTodos] = useState<string[]>([]);\n  const [input, setInput] = useState("");\n\n  const add = () => {\n    if (!input.trim()) return;\n    setTodos(prev => [...prev, input]);\n    setInput("");\n  };\n\n  return (\n    <div className="p-6 max-w-sm mx-auto">\n      <div className="flex gap-2 mb-4">\n        <input value={input} onChange={e => setInput(e.target.value)}\n          className="flex-1 border rounded px-3 py-1 text-sm" placeholder="Add a task..." />\n        <button onClick={add} className="px-3 py-1 bg-blue-500 text-white rounded text-sm">Add</button>\n      </div>\n      <ul className="space-y-1">\n        {todos.map((t, i) => <li key={i} className="text-sm px-3 py-1 bg-muted rounded">{t}</li>)}\n      </ul>\n    </div>\n  );\n}`,
    },
    {
      lang: "typescript",
      label: "TypeScript Generic Stack",
      code: `class Stack<T> {\n  private items: T[] = [];\n\n  push(item: T): void {\n    this.items.push(item);\n  }\n\n  pop(): T | undefined {\n    return this.items.pop();\n  }\n\n  peek(): T | undefined {\n    return this.items[this.items.length - 1];\n  }\n\n  get size(): number {\n    return this.items.length;\n  }\n\n  isEmpty(): boolean {\n    return this.items.length === 0;\n  }\n}\n\nconst stack = new Stack<number>();\nstack.push(1);\nstack.push(2);\nconsole.log(stack.peek()); // 2\nconsole.log(stack.pop());  // 2`,
    },
    {
      lang: "python",
      label: "Python Fibonacci",
      code: `def fibonacci(n: int) -> list[int]:\n    """Generate Fibonacci sequence up to n terms."""\n    if n <= 0:\n        return []\n    if n == 1:\n        return [0]\n\n    seq = [0, 1]\n    while len(seq) < n:\n        seq.append(seq[-1] + seq[-2])\n    return seq\n\nresult = fibonacci(10)\nprint(result)  # [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]`,
    },
    {
      lang: "python",
      label: "Python Decorator",
      code: `import time\nfrom functools import wraps\n\ndef timer(func):\n    """A decorator that prints execution time."""\n    @wraps(func)\n    def wrapper(*args, **kwargs):\n        start = time.perf_counter()\n        result = func(*args, **kwargs)\n        end = time.perf_counter()\n        print(f"{func.__name__} took {end - start:.4f}s")\n        return result\n    return wrapper\n\n@timer\ndef slow_sum(n):\n    return sum(range(n))\n\nslow_sum(1_000_000)`,
    },
    {
      lang: "javascript",
      label: "JavaScript Debounce",
      code: `function debounce(fn, delay) {\n  let timer;\n  return function (...args) {\n    clearTimeout(timer);\n    timer = setTimeout(() => fn.apply(this, args), delay);\n  };\n}\n\nconst handleSearch = debounce((query) => {\n  console.log("Searching for:", query);\n  // fetch("/api/search?q=" + query)\n}, 300);\n\n// Usage\ndocument.getElementById("search").addEventListener("input", e => {\n  handleSearch(e.target.value);\n});`,
    },
    {
      lang: "java",
      label: "Java Binary Search",
      code: `public class BinarySearch {\n    public static int search(int[] arr, int target) {\n        int left = 0, right = arr.length - 1;\n\n        while (left <= right) {\n            int mid = left + (right - left) / 2;\n\n            if (arr[mid] == target) return mid;\n            else if (arr[mid] < target) left = mid + 1;\n            else right = mid - 1;\n        }\n        return -1;\n    }\n\n    public static void main(String[] args) {\n        int[] arr = {1, 3, 5, 7, 9, 11, 13};\n        System.out.println(search(arr, 7)); // 3\n        System.out.println(search(arr, 4)); // -1\n    }\n}`,
    },
    {
      lang: "cpp",
      label: "C++ Linked List",
      code: `#include <iostream>\nusing namespace std;\n\nstruct Node {\n    int data;\n    Node* next;\n    Node(int d) : data(d), next(nullptr) {}\n};\n\nclass LinkedList {\n    Node* head = nullptr;\npublic:\n    void push(int val) {\n        Node* n = new Node(val);\n        n->next = head;\n        head = n;\n    }\n    void print() {\n        for (Node* cur = head; cur; cur = cur->next)\n            cout << cur->data << " -> ";\n        cout << "null" << endl;\n    }\n};\n\nint main() {\n    LinkedList list;\n    list.push(3); list.push(2); list.push(1);\n    list.print(); // 1 -> 2 -> 3 -> null\n}`,
    },
    {
      lang: "rust",
      label: "Rust Ownership Example",
      code: `fn main() {\n    let s1 = String::from("Hello, Rust!");\n    let s2 = s1.clone(); // Deep copy\n\n    println!("s1 = {}", s1);\n    println!("s2 = {}", s2);\n\n    let len = calculate_length(&s1); // Borrow\n    println!("Length of '{}' is {}", s1, len);\n}\n\nfn calculate_length(s: &String) -> usize {\n    s.len()\n}`,
    },
    {
      lang: "go",
      label: "Go Goroutine",
      code: `package main\n\nimport (\n    "fmt"\n    "sync"\n)\n\nfunc worker(id int, wg *sync.WaitGroup) {\n    defer wg.Done()\n    fmt.Printf("Worker %d starting\\\\n", id)\n    // Simulate work\n    fmt.Printf("Worker %d done\\\\n", id)\n}\n\nfunc main() {\n    var wg sync.WaitGroup\n\n    for i := 1; i <= 5; i++ {\n        wg.Add(1)\n        go worker(i, &wg)\n    }\n\n    wg.Wait()\n    fmt.Println("All workers done!")\n}`,
    },
    {
      lang: "swift",
      label: "Swift Protocol",
      code: `protocol Drawable {\n    func draw() -> String\n}\n\nstruct Circle: Drawable {\n    var radius: Double\n    func draw() -> String {\n        return "Drawing a circle with radius \\\\(radius)"\n    }\n}\n\nstruct Rectangle: Drawable {\n    var width: Double\n    var height: Double\n    func draw() {\n        return "Drawing a \\\\(width)x\\\\(height) rectangle"\n    }\n}\n\nlet shapes: [Drawable] = [Circle(radius: 5), Rectangle(width: 10, height: 4)]\nshapes.forEach { print($0.draw()) }`,
    },
    {
      lang: "kotlin",
      label: "Kotlin Data Class",
      code: `data class User(\n    val id: Int,\n    val name: String,\n    val email: String\n)\n\nfun main() {\n    val user1 = User(1, "Alice", "alice@example.com")\n    val user2 = user1.copy(name = "Bob", email = "bob@example.com")\n\n    println(user1) // User(id=1, name=Alice, email=alice@example.com)\n    println(user2) // User(id=1, name=Bob, email=bob@example.com)\n    println(user1 == user2) // false\n}`,
    },
    {
      lang: "css",
      label: "CSS Glassmorphism Card",
      code: `.glass-card {\n  background: rgba(255, 255, 255, 0.1);\n  backdrop-filter: blur(12px);\n  -webkit-backdrop-filter: blur(12px);\n  border: 1px solid rgba(255, 255, 255, 0.2);\n  border-radius: 1rem;\n  padding: 2rem;\n  box-shadow:\n    0 8px 32px rgba(0, 0, 0, 0.1),\n    inset 0 1px 0 rgba(255, 255, 255, 0.3);\n  color: white;\n  transition: transform 0.3s ease, box-shadow 0.3s ease;\n}\n\n.glass-card:hover {\n  transform: translateY(-4px);\n  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.2);\n}`,
    },
    {
      lang: "sql",
      label: "SQL Window Function",
      code: `-- Rank employees by salary within each department\nSELECT\n    name,\n    department,\n    salary,\n    RANK() OVER (\n        PARTITION BY department\n        ORDER BY salary DESC\n    ) AS salary_rank,\n    AVG(salary) OVER (\n        PARTITION BY department\n    ) AS dept_avg_salary\nFROM employees\nORDER BY department, salary_rank;`,
    },
  ];

  const getResponse = (userText: string): string => {
    const t = userText.toLowerCase().trim();

    // Greetings check
    const isGreeting = GREETINGS.some(g => t === g || t.startsWith(g + " ") || t.endsWith(" " + g) || t.includes(" " + g + " ") || t === g);
    if (isGreeting) {
      return GREETING_RESPONSES[Math.floor(Math.random() * GREETING_RESPONSES.length)];
    }

    // Poem
    if (t.includes("poem") || t.includes("poetry") || t.includes("verse") || t.includes("rhyme")) {
      const p = POEMS[Math.floor(Math.random() * POEMS.length)];
      return `Here's a poem for you:\n\n**${p.title}**\n\n${p.text}`;
    }

    // Code — language-specific matches first, then generic "code" keyword
    const langMatches: { keywords: string[]; lang: string }[] = [
      { keywords: ["react", "jsx", "tsx", "component"], lang: "tsx" },
      { keywords: ["typescript", "ts"], lang: "typescript" },
      { keywords: ["javascript", "js", "node"], lang: "javascript" },
      { keywords: ["python", "py"], lang: "python" },
      { keywords: ["java"], lang: "java" },
      { keywords: ["c++", "cpp"], lang: "cpp" },
      { keywords: ["rust"], lang: "rust" },
      { keywords: ["go", "golang"], lang: "go" },
      { keywords: ["swift"], lang: "swift" },
      { keywords: ["kotlin"], lang: "kotlin" },
      { keywords: ["css", "style", "glassmorphism"], lang: "css" },
      { keywords: ["sql", "database", "query"], lang: "sql" },
    ];

    let matchedLang: string | null = null;
    for (const { keywords, lang } of langMatches) {
      if (keywords.some(k => t.includes(k))) {
        matchedLang = lang;
        break;
      }
    }

    if (matchedLang || t.includes("code") || t.includes("example") || t.includes("snippet") || t.includes("write") || t.includes("show")) {
      const pool = matchedLang
        ? CODE_SNIPPETS.filter(s => s.lang === matchedLang)
        : CODE_SNIPPETS;
      const snippet = pool.length > 0
        ? pool[Math.floor(Math.random() * pool.length)]
        : CODE_SNIPPETS[Math.floor(Math.random() * CODE_SNIPPETS.length)];
      return `Here's a **${snippet.label}** for you:\n\n\`\`\`${snippet.lang}\n${snippet.code}\n\`\`\`\n\nYou can copy this using the copy button at the top-right of the code block!`;
    }

    // Default
    return "I'm a fully interactive demo AI interface. I can respond to greetings in any language, write poems, and generate code in React, TypeScript, Python, Java, C++, Rust, Go, Swift, Kotlin, CSS, SQL, and more!\n\nTry asking:\n- **\"hi\"** (or any greeting)\n- **\"write a poem\"**\n- **\"show me some Python code\"**\n- **\"give me a React component\"**";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userText = input.trim();
    const newMsg = { id: Date.now().toString(), role: "user", content: userText };
    setMessages((prev) => [...prev, newMsg]);
    setInput("");
    setIsLoading(true);

    setTimeout(() => {
      const assistantId = (Date.now() + 1).toString();
      setMessages((prev) => [...prev, { id: assistantId, role: "assistant", content: "", isStreaming: true }]);

      const responseText = getResponse(userText);
      let currentText = "";
      let i = 0;

      const interval = setInterval(() => {
        currentText += responseText[i];
        setMessages((prev) => prev.map(m => m.id === assistantId ? { ...m, content: currentText } : m));
        i++;
        if (i >= responseText.length) {
          clearInterval(interval);
          setMessages((prev) => prev.map(m => m.id === assistantId ? { ...m, isStreaming: false } : m));
          setIsLoading(false);
        }
      }, 12);
    }, 300);
  };

  const SUGGESTIONS = [
    "Hi", "Hola", "Bonjour", "Namaste", "Ni hao",
    "Write a poem", "Give me React code", "Show me Python code",
    "Write a SQL query", "Give me a Go example",
  ];

  return (
    <PreviewContainer
      title="AI Chat"
      description="A highly customizable AI chat interface with markdown and code support."
      variants={["chatgpt", "claude", "perplexity", "compact", "enterprise", "minimal"]}
      activeVariant={layout}
      align="start"
      onVariantChange={setLayout}
      contentClassName="p-0 overflow-hidden"
      extraControls={
        <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] md:grid-cols-[150px_1fr] items-start sm:items-center gap-4 w-full">
          <span className="text-[10px] md:text-xs uppercase font-bold tracking-widest text-muted-foreground">Input Variant</span>
          <div className="flex items-center flex-wrap gap-2 p-1.5 bg-muted/30 rounded-xl w-full">
            {(["standard", "floating", "command", "multiline", "workspace"] as const).map((v) => (
              <button key={v} onClick={() => setInputVariant(v)} className={cn("px-4 py-1.5 text-xs font-semibold rounded-lg capitalize transition-all duration-300 whitespace-nowrap", inputVariant === v ? "bg-background shadow-md shadow-black/5 text-foreground ring-1 ring-black/5 dark:ring-white/10" : "text-muted-foreground hover:text-foreground hover:bg-muted/40")}>{v}</button>
            ))}
          </div>
        </div>
      }
    >
      <div className="flex w-full h-full min-h-125">
        <div className="flex-1 min-h-125 overflow-hidden relative">
          <AIChat
            messages={messages}
            input={input}
            setInput={setInput}
            onSubmit={handleSubmit}
            isLoading={isLoading}
            onStop={() => setIsLoading(false)}
            layout={layout}
            inputVariant={inputVariant}
          >
            <ChatMessages />
            <ChatPromptSuggestions suggestions={SUGGESTIONS} />
            <ChatInput />
          </AIChat>
        </div>
      </div>
    </PreviewContainer>
  );
};

export const AutomotiveCarouselPreview: React.FC = () => {
  const [variant, setVariant] = useState<"bike" | "car" | "chair" | "m4">("m4");
  const slides = [
    {
      id: 1,
      title: "THE VISION",
      description: "A masterclass in automotive engineering.",
      annotations: []
    },
    {
      id: 2,
      title: "",
      description: "",
      annotations: [
        { id: "dash-1", position: [0.17, 0.75, 0.65] as [number, number, number], label: "M-Sport Steering Handle" },
        { id: "dash-2", position: [-0.4, 0.95, 0.65] as [number, number, number], label: "14.9-inch Curved Screen" },
        { id: "dash-3", position: [-0.3, 0.65, 0.5] as [number, number, number], label: "Carbon Fiber Gear" },
        { id: "dash-4", position: [-0.9, 0.88, 0.65] as [number, number, number], label: "Carbon Trim Dashboard" }
      ]
    },
    {
      id: 3,
      title: "",
      description: "",
      annotations: [
        { id: "seat-1", position: [0.35, 0.65, -0.15] as [number, number, number], label: "Ergonomic Driver Seat" },
        { id: "seat-2", position: [-0.35, 0.65, -0.15] as [number, number, number], label: "Ventilated Passenger Seat" }
      ]
    },
    {
      id: 4,
      title: "Aerodynamic Perfection",
      description: "Aggressive rear stance featuring the signature LED Taillight Matrix, active aero spoiler, and performance-tuned sport exhaust.",
      annotations: []
    }
  ];
  return (
    <PreviewContainer title="Automotive Carousel" isVirtualScreen={true} className="overflow-hidden pb-4">
      <div className="relative w-full h-full overflow-hidden rounded-xl border border-border/50">
        <AutomotiveCarousel slides={slides} objectVariant={variant} />
      </div>
    </PreviewContainer>
  );
};

export const ScifiHelmetPreview: React.FC = () => {
  return (
    <PreviewContainer
      title="Sci-Fi Helmet"
      description="A premium 3D Sci-Fi Helmet with interactive orbit controls."
      canvasClassName="bg-[#050505] p-0 overflow-hidden"
    >
      <ScifiHelmet className="w-full h-full" />
    </PreviewContainer>
  );
};

export const BmwM4Preview: React.FC = () => {
  return (
    <PreviewContainer
      title="BMW M4"
      description="A premium 3D M4 Car component with interactive orbit controls."
      canvasClassName="bg-[#050505] p-0 overflow-hidden"
    >
      <BmwM4 className="w-full h-full" />
    </PreviewContainer>
  );
};

export const BrowserWindowPreview: React.FC = () => {
  return (
    <PreviewContainer
      title="Browser Window"
      description="A clean, responsive mock browser window for displaying UI components or screenshots."
      isVirtualScreen={false}
    >
      <div className="flex flex-col items-center justify-center w-full h-full p-0 relative z-10 overflow-hidden">
        <BrowserWindow className="w-full h-full">
          <div className="flex flex-col items-center justify-center w-full h-full bg-muted/10 text-muted-foreground p-8 text-center space-y-4">
            <h3 className="text-xl font-medium text-foreground">Welcome to Future UI</h3>
            <p className="max-w-md text-sm">The modern component library for ambitious engineering teams.</p>
          </div>
        </BrowserWindow>
      </div>
    </PreviewContainer>
  );
};

export const TerminalPreview: React.FC = () => {
  const [activeVariant, setActiveVariant] = useState<TerminalVariant>("macos");

  const handleCommand = async (cmd: string) => {
    // Artificial delay to simulate network/processing
    await new Promise(resolve => setTimeout(resolve, 800));
    return [
      `Preview mode: Command execution is disabled.`,
      `Download the component to define custom logic for: ${cmd}`
    ];
  };

  const variants: TerminalVariant[] = [
    "macos", "windows", "ubuntu", "powershell", "cmd", "bash", "linux", "zsh"
  ];

  return (
    <PreviewContainer 
      title="Terminal Window" 
      description="Authentic, animated terminal components for multiple OS variants."
      variants={variants}
      activeVariant={activeVariant}
      onVariantChange={setActiveVariant}
      isVirtualScreen={true}
      canvasClassName="bg-zinc-100 dark:bg-zinc-900/50"
    >
      <div className="w-full h-full flex items-center justify-center p-4 sm:p-8 md:p-12">
        <UITerminal 
          key={activeVariant} // Force remount on variant change to reset history
          variant={activeVariant}
          className="w-full max-w-3xl aspect-4/5 sm:aspect-video shadow-2xl"
          interactive={true}
          onCommand={handleCommand}
          commands={[`Welcome to the ${activeVariant} terminal preview!`, "Type any command and press Enter."]}
          output={[]}
        />
      </div>
    </PreviewContainer>
  );
};

export const CursorGlowButtonPreview: React.FC = () => {
  return (
    <PreviewContainer title="Cursor Glow Button" description="Buttons with a reactive glowing effect following the cursor.">
      <div className="w-full flex items-center justify-center p-4 md:p-12 min-h-75">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-3xl justify-items-center">
          <CursorGlowButton variant="default">Primary</CursorGlowButton>
          <CursorGlowButton variant="secondary">Secondary</CursorGlowButton>
          <CursorGlowButton variant="outline">Outline</CursorGlowButton>
          <CursorGlowButton variant="destructive" glowColor="rgba(239, 68, 68, 0.8)">Destructive</CursorGlowButton>
          <CursorGlowButton variant="ghost">Ghost</CursorGlowButton>
          <CursorGlowButton variant="link">Link</CursorGlowButton>
        </div>
      </div>
    </PreviewContainer>
  );
};

export const ScrollTextRevealPreview: React.FC = () => {
  const scrollContainer = useRef<HTMLDivElement>(null);

  return (
    <PreviewContainer
      title="Scroll Text Reveal"
      description="Text that reveals itself as you scroll down the screen."
      scrollRef={scrollContainer}
      canvasClassName="block p-0 sm:p-0 md:p-0"
    >
      <div className="w-full h-full">
        
        {/* Section 1 */}
        <section className="w-full h-full flex flex-col items-center justify-center shrink-0">
          <span className="text-sm font-medium tracking-[0.25em] uppercase text-muted-foreground/50 select-none">
            Scroll Down To Reveal
          </span>
        </section>
        
        {/* Section 2 */}
        <section className="w-full h-full flex flex-col items-center justify-center shrink-0 px-6 md:px-12">
          <h2 className="text-3xl md:text-5xl lg:text-7xl font-bold tracking-tight text-center leading-[1.2] max-w-5xl">
            <ScrollTextReveal container={scrollContainer}>
              The future of UI design is here. Experience seamless, highly optimized animations that elevate your application&apos;s feel.
            </ScrollTextReveal>
          </h2>
        </section>
        
        {/* Section 3 */}
        <section className="w-full h-full flex flex-col items-center justify-center shrink-0">
          <span className="text-sm font-medium tracking-[0.25em] uppercase text-muted-foreground/50 select-none">
            Scroll Up To Reverse
          </span>
        </section>

      </div>
    </PreviewContainer>
  );
};

const SHAPE_VARIANTS: SlideUpRevealShape[] = ["rectangle", "rounded", "squircle", "arc", "wave", "curtain", "silk", "holographic"];

export const SlideUpRevealPreview: React.FC = () => {
  const [shape, setShape] = useState<SlideUpRevealShape>("squircle");

  const shapeToTheme: Record<SlideUpRevealShape, SlideUpRevealVariant> = {
    rectangle: "default",
    rounded: "aurora",
    squircle: "space",
    arc: "cyberpunk",
    wave: "neon",
    curtain: "default",
    silk: "aurora",
    holographic: "cyberpunk",
  };

  return (
    <PreviewContainer 
      title="Slide Up Reveal" 
      description="A futuristic lockscreen cloth simulator. Drag from the bottom to reveal the energy core and underlying OS." 
      isVirtualScreen={false} 
      variants={SHAPE_VARIANTS}
      activeVariant={shape}
      onVariantChange={(v) => setShape(v as SlideUpRevealShape)}
      contentClassName="p-0 border-none"
    >
      <div className="w-full h-[800px] max-h-[85vh] relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
        <SlideUpReveal shape={shape} variant={shapeToTheme[shape]} key={shape} />
      </div>
    </PreviewContainer>
  );
};
