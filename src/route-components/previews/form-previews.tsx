"use client";

import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Calculator } from "@/components/ui/calculator";
import { DynamicForm, FieldConfig } from "@/components/ui/dynamic-form";
import { Select, SelectTrigger, SelectContent, SelectSearch, SelectList, SelectGroup, SelectItem, SelectEmpty } from "@/components/ui/select";
import { FileUpload, UploadDropzone, UploadPreview, UploadProgress, FileState } from "@/components/ui/file-upload";
import { FormBuilder, SchemaField } from "@/components/ui/form-builder";
import { OTPVerification } from "@/components/ui/otp-verification";
import { FilterBuilder, FilterGroup, FilterField, FilterRule } from "@/components/ui/filter-builder";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User, 
  Mail, 
  Lock, 
  Globe, 
  Phone as PhoneIcon, 
  Check as CheckIcon, 
  AlertCircle as AlertCircleIcon, 
  Terminal, 
  Sparkles, 
  Filter 
} from "lucide-react";
import { PreviewContainer } from "../preview-engine/PreviewContainer";

export const CalendarPreview: React.FC = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [highlighted, setHighlighted] = React.useState<Date[]>([]);
  const [variant, setVariant] = React.useState<"modern" | "clean">("modern");

  const toggleHighlight = (targetDate: Date) => {
    setHighlighted((prev) => {
      const exists = prev.some(
        (d) => d.toDateString() === targetDate.toDateString(),
      );
      if (exists) {
        return prev.filter(
          (d) => d.toDateString() !== targetDate.toDateString(),
        );
      }
      return [...prev, targetDate];
    });
  };

  return (
    <PreviewContainer
      title="Calendar"
      description="A beautiful, interactive calendar with selection and highlighting."
      variants={["modern", "clean"]}
      activeVariant={variant}
      onVariantChange={setVariant}
      align="start"
    >
      <div className="flex flex-col items-center justify-start w-full min-h-full p-6 gap-8 py-12">
        <Calendar
          value={date}
          onChange={setDate}
          highlightedDates={highlighted}
          onHighlightToggle={toggleHighlight}
          variant={variant}
        />

        <div className="flex flex-col gap-6 items-center w-full max-w-sm">
          <div className="w-full h-px bg-linear-to-r from-transparent via-border/40 to-transparent" />
          <div className="flex flex-col gap-4 items-center">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setHighlighted([])}
              className="text-[10px] uppercase tracking-widest font-black h-10 px-6 rounded-full border-primary/20 hover:bg-primary/5 hover:text-primary transition-all"
            >
              Clear Highlights
            </Button>
            <p className="text-[10px] text-muted-foreground/40 uppercase tracking-widest font-bold text-center leading-relaxed">
              Interact with the grid to{" "}
              <span className="text-primary/60 italic underline underline-offset-4">
                Toggle Highlighting
              </span>{" "}
              or select dates.
            </p>
          </div>
        </div>
      </div>
    </PreviewContainer>
  );
};

export const CalculatorPreview: React.FC = () => {
  const [variant, setVariant] = React.useState<"glass" | "brutal" | "neon">(
    "glass",
  );

  return (
    <PreviewContainer
      title="Calculator"
      description="A fully functional, styled calculator with various aesthetic variants."
      variants={["glass", "brutal", "neon"]}
      activeVariant={variant}
      onVariantChange={setVariant}
    >
      <div className="flex items-center justify-center w-full flex-1">
        <Calculator variant={variant} />
      </div>
    </PreviewContainer>
  );
};

export const DynamicFormPreview: React.FC = () => {
  const [activeDemo, setActiveDemo] = React.useState<"contact" | "wizard" | "login">("contact");
  const [submittedData, setSubmittedData] = React.useState<any>(null);

  const contactFields: FieldConfig[] = [
    {
      name: "name",
      type: "text",
      label: "Full Name",
      placeholder: "e.g. John Doe",
      required: true,
      icon: User,
      colSpan: 1
    },
    {
      name: "email",
      type: "email",
      label: "Email Address",
      placeholder: "e.g. john@company.com",
      required: true,
      icon: Mail,
      colSpan: 1
    },
    {
      name: "subject",
      type: "autocomplete",
      label: "Inquiry Subject",
      placeholder: "Select or search...",
      required: true,
      options: [
        { label: "Product Integration Support", value: "integration" },
        { label: "Enterprise Licensing & Sales", value: "sales" },
        { label: "Partnership Opportunities", value: "partnerships" },
        { label: "Other inquiries", value: "other" }
      ],
      colSpan: 2
    },
    {
      name: "otherSubjectDetails",
      type: "text",
      label: "Inquiry Details",
      placeholder: "Provide more details on other subject",
      required: true,
      condition: (values) => values.subject === "other",
      colSpan: 2
    },
    {
      name: "message",
      type: "textarea",
      label: "Detailed Description",
      placeholder: "How can we help your business succeed?",
      required: true,
      colSpan: 2
    },
    {
      name: "interests",
      type: "multi-select",
      label: "Areas of Interest",
      placeholder: "Choose subjects...",
      options: [
        { label: "Next.js 16 Framework", value: "nextjs" },
        { label: "React 19 Server Components", value: "react19" },
        { label: "Tailwind CSS v4.0", value: "tailwind4" },
        { label: "Framer Motion Physics", value: "framer" }
      ],
      colSpan: 2
    },
    {
      name: "newsletter",
      type: "switch",
      label: "Subscribe to our developer newsletters",
      defaultValue: true,
      colSpan: 2
    }
  ];

  const wizardFields: FieldConfig[] = [
    {
      name: "username",
      type: "text",
      label: "Desired Username",
      placeholder: "e.g. johndoe_dev",
      required: true,
      icon: User,
      colSpan: 2
    },
    {
      name: "companyUrl",
      type: "url",
      label: "Company Website URL",
      placeholder: "e.g. https://google.com",
      required: true,
      icon: Globe,
      colSpan: 2
    },
    {
      name: "wizardEmail",
      type: "email",
      label: "Primary Email",
      placeholder: "e.g. dev@company.com",
      required: true,
      icon: Mail,
      colSpan: 1
    },
    {
      name: "wizardPhone",
      type: "phone",
      label: "Phone Number",
      placeholder: "e.g. +1 555-0199",
      required: true,
      icon: PhoneIcon,
      colSpan: 1
    },
    {
      name: "verificationCode",
      type: "otp",
      label: "Enter 6-digit Verification Code",
      required: true,
      otpLength: 6,
      colSpan: 2
    }
  ];

  const wizardSteps = [
    { title: "Profile Credentials", fieldNames: ["username", "companyUrl"] },
    { title: "Contact Details", fieldNames: ["wizardEmail", "wizardPhone"] },
    { title: "Verification Grid", fieldNames: ["verificationCode"] }
  ];

  const loginFields: FieldConfig[] = [
    {
      name: "loginEmail",
      type: "email",
      label: "Corporate Email Address",
      placeholder: "you@enterprise.com",
      required: true,
      icon: Mail,
      colSpan: 2
    },
    {
      name: "loginPassword",
      type: "password",
      label: "Access Password",
      placeholder: "Enter account password",
      required: true,
      icon: Lock,
      colSpan: 2
    },
    {
      name: "rememberMe",
      type: "checkbox",
      label: "Remember this device for 30 days",
      defaultValue: true,
      colSpan: 2
    }
  ];

  return (
    <PreviewContainer
      title="Dynamic Form"
      description="A highly dynamic, JSON-driven form builder with built-in validation."
      variants={["contact", "wizard", "login"]}
      activeVariant={activeDemo}
      contentClassName="items-start py-8"
      align="start"
      onVariantChange={(v) => {
        setActiveDemo(v);
        setSubmittedData(null);
      }}
    >
      <div className="flex flex-col lg:flex-row gap-8 items-stretch justify-center w-full max-w-5xl m-auto">
        <div className="flex-1 flex flex-col justify-center min-w-0">
          <AnimatePresence mode="wait">
            {activeDemo === "contact" && (
              <motion.div
                key="contact"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="w-full"
              >
                <DynamicForm
                  variant="modern"
                  fields={contactFields}
                  submitButtonText="Send Inquiry"
                  showResetButton={true}
                  onSubmit={(data) => {
                    setSubmittedData(data);
                  }}
                />
              </motion.div>
            )}

            {activeDemo === "wizard" && (
              <motion.div
                key="wizard"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="w-full"
              >
                <DynamicForm
                  variant="glass"
                  fields={wizardFields}
                  steps={wizardSteps}
                  submitButtonText="Verify & Register"
                  showResetButton={false}
                  onSubmit={(data) => {
                    setSubmittedData(data);
                  }}
                />
              </motion.div>
            )}

            {activeDemo === "login" && (
              <motion.div
                key="login"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="w-full max-w-md mx-auto"
              >
                <DynamicForm
                  variant="dark"
                  fields={loginFields}
                  submitButtonText="Authorize Session"
                  showResetButton={true}
                  autoSaveKey="saas_login_autosave"
                  onSubmit={(data) => {
                    setSubmittedData(data);
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="w-full lg:w-80 shrink-0 flex flex-col justify-between p-6 rounded-2xl border border-border/40 bg-muted/10 backdrop-blur-sm">
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-widest font-black text-primary flex items-center gap-1.5 select-none">
              <Terminal className="w-4 h-4" /> Live Engine Output
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Submit any of the live forms to see the processed type-safe JSON payload emitted by the validation resolver in real time.
            </p>
          </div>

          <div className="mt-4 flex-1 flex flex-col justify-center min-h-50 border border-dashed border-border/60 rounded-xl p-4 bg-black/5 dark:bg-black/40 overflow-hidden">
            {submittedData ? (
              <div className="space-y-3 h-full flex flex-col justify-between">
                <div className="text-[10px] font-black uppercase tracking-wider text-emerald-500 flex items-center gap-1">
                  <CheckIcon className="w-3.5 h-3.5" /> Payload Validation Passed
                </div>
                <pre className="text-[11px] font-mono text-foreground/80 overflow-auto max-h-48 custom-scrollbar bg-muted/40 p-2 rounded-lg leading-relaxed flex-1 select-text">
                  {JSON.stringify(submittedData, null, 2)}
                </pre>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setSubmittedData(null)}
                  className="w-full h-8 text-[10px] uppercase font-bold tracking-wider"
                >
                  Clear Output
                </Button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-center p-4 text-muted-foreground/40 space-y-2 select-none h-full">
                <Sparkles className="w-8 h-8 animate-pulse text-muted-foreground/30" />
                <span className="text-[11px] font-bold uppercase tracking-wider">Awaiting Form Submit</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </PreviewContainer>
  );
};

export const SelectPreview: React.FC = () => {
  const [variant, setVariant] = React.useState<"default" | "soft" | "floating" | "glass" | "minimal">("default");
  const [size, setSize] = React.useState<"sm" | "md" | "lg">("md");
  const [isMulti, setIsMulti] = React.useState(false);
  const [searchable, setSearchable] = React.useState(true);
  const [container, setContainer] = React.useState<HTMLDivElement | null>(null);

  const frameworks = [
    { value: "nextjs", label: "Next.js" },
    { value: "sveltekit", label: "SvelteKit" },
    { value: "nuxtjs", label: "Nuxt.js" },
    { value: "remix", label: "Remix" },
    { value: "astro", label: "Astro" },
    { value: "gatsby", label: "Gatsby" },
    { value: "redwood", label: "RedwoodJS" },
    { value: "solidstart", label: "SolidStart" },
  ];

  return (
    <PreviewContainer
      title="Select Input"
      description="A highly customizable select component with search and multi-select capabilities."
      variants={["default", "soft", "floating", "glass", "minimal"]}
      activeVariant={variant}
      onVariantChange={setVariant}
      extraControls={
        <>
          <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] md:grid-cols-[150px_1fr] items-center gap-2 w-full">
            <span className="text-[10px] md:text-xs uppercase font-bold tracking-widest text-muted-foreground">Size</span>
            <div className="flex items-center flex-wrap gap-1.5 p-1 bg-muted/30 rounded-lg">
              {(["sm", "md", "lg"] as const).map((s) => (
                <button key={s} onClick={() => setSize(s)} className={cn("px-3 py-1.5 text-xs font-medium rounded-md capitalize transition-all duration-200 whitespace-nowrap", size === s ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground hover:bg-muted/50")}>{s}</button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] md:grid-cols-[150px_1fr] items-center gap-2 w-full">
            <span className="text-[10px] md:text-xs uppercase font-bold tracking-widest text-muted-foreground">Mode</span>
            <div className="flex items-center flex-wrap gap-1.5 p-1 bg-muted/30 rounded-lg">
              <button onClick={() => setIsMulti(false)} className={cn("px-3 py-1.5 text-xs font-medium rounded-md capitalize transition-all duration-200 whitespace-nowrap", !isMulti ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground hover:bg-muted/50")}>Single</button>
              <button onClick={() => setIsMulti(true)} className={cn("px-3 py-1.5 text-xs font-medium rounded-md capitalize transition-all duration-200 whitespace-nowrap", isMulti ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground hover:bg-muted/50")}>Multi</button>
            </div>
          </div>
        </>
      }
    >
      <div ref={setContainer} className="flex flex-col items-center justify-start w-full h-full p-4 relative z-10 overflow-hidden" style={{ transform: 'translateZ(0)' }}>
        <div className="flex items-start justify-center w-full h-full flex-1 pt-12">
          <Select
            key={isMulti ? "multi" : "single"}
            variant={variant}
            size={size}
            multiSelect={isMulti}
            searchable={searchable}
            container={container}
          >
            <SelectTrigger placeholder={isMulti ? "Select frameworks..." : "Select a framework..."} />
            <SelectContent>
              <SelectSearch placeholder="Search framework..." />
              <SelectList>
                <SelectEmpty>No frameworks found.</SelectEmpty>
                <SelectGroup heading="Popular">
                  {frameworks.slice(0, 4).map((fw) => (
                    <SelectItem key={fw.value} value={fw.value} label={fw.label}>
                      {fw.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
                <SelectGroup heading="Rising">
                  {frameworks.slice(4).map((fw) => (
                    <SelectItem key={fw.value} value={fw.value} label={fw.label}>
                      {fw.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectList>
            </SelectContent>
          </Select>
        </div>
      </div>
    </PreviewContainer>
  );
};

export const FileUploadPreview: React.FC = () => {
  const [variant, setVariant] = React.useState<"default" | "compact" | "card" | "glass" | "minimal">("default");
  const [files, setFiles] = React.useState<FileState[]>([]);

  // Simulate an upload process
  const handleUpload = (filesToUpload: File[]) => {
    // In a real app, this would use XMLHttpRequest or fetch.
    // For the preview, we'll simulate progress per file.
    filesToUpload.forEach((file) => {
      // Small delay before starting
      setTimeout(() => {
        setFiles(prev => prev.map(f => {
          if (f.file === file && f.status === 'idle') return { ...f, status: 'uploading', progress: 0 };
          return f;
        }));

        let progress = 0;
        const interval = setInterval(() => {
          progress += Math.random() * 15 + 5;

          if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            setFiles(prev => prev.map(f => {
              if (f.file === file) return { ...f, status: 'success', progress };
              return f;
            }));
          } else {
            setFiles(prev => prev.map(f => {
              if (f.file === file) return { ...f, progress };
              return f;
            }));
          }
        }, 300);
      }, 500);
    });
  };

  return (
    <PreviewContainer
      title="File Upload"
      description="A drag-and-drop file upload component with real-time progress."
      variants={["default", "compact", "card", "glass", "minimal"]}
      activeVariant={variant}
      onVariantChange={setVariant}
    >
      <div className="flex flex-col items-center justify-center w-full h-full p-4 relative z-10 overflow-hidden" style={{ transform: 'translateZ(0)' }}>
        <div className="flex items-center justify-center w-full max-w-md flex-1 mb-32 pt-12">
          <FileUpload
            variant={variant}
            maxFiles={5}
            maxSize={1024 * 1024 * 10} // 10MB
            accept={{
              "image/*": [".png", ".jpg", ".jpeg", ".gif"],
              "video/*": [".mp4", ".webm"],
              "application/pdf": [".pdf"]
            }}
            onUpload={handleUpload}
            onFilesChange={setFiles}
          >
            <UploadDropzone />
            <UploadPreview />
            <UploadProgress />
          </FileUpload>
        </div>
      </div>
    </PreviewContainer>
  );
};

const sampleSchema: SchemaField[] = [
  {
    name: "personalInfo",
    type: "group",
    label: "Personal Information",
    description: "Please provide your basic details.",
    colSpan: "full",
    fields: [
      { name: "firstName", type: "text", label: "First Name", placeholder: "John", required: true, colSpan: 2 },
      { name: "lastName", type: "text", label: "Last Name", placeholder: "Doe", required: true, colSpan: 2 },
      { name: "email", type: "email", label: "Email Address", placeholder: "john@example.com", required: true, colSpan: "full" },
    ]
  },
  {
    name: "role",
    type: "select",
    label: "Role",
    placeholder: "Select a role",
    required: true,
    colSpan: 2,
    options: [
      { label: "Developer", value: "developer" },
      { label: "Designer", value: "designer" },
      { label: "Manager", value: "manager" },
    ]
  },
  {
    name: "experience",
    type: "number",
    label: "Years of Experience",
    placeholder: "e.g. 5",
    required: true,
    colSpan: 2,
    validation: { min: 0, max: 50 }
  },
  {
    name: "teamMembers",
    type: "array",
    label: "Team Members",
    description: "Add members who will report to you.",
    colSpan: "full",
    showIf: (values) => values.role === "manager",
    fields: [
      { name: "name", type: "text", label: "Member Name", placeholder: "Jane Doe", required: true, colSpan: 2 },
      { name: "title", type: "text", label: "Title", placeholder: "Engineer", required: true, colSpan: 2 },
    ]
  },
  {
    name: "terms",
    type: "checkbox",
    label: "I agree to the terms and conditions",
    required: true,
    colSpan: "full"
  }
];

export const FormBuilderPreview: React.FC = () => {
  const [variant, setVariant] = React.useState<"default" | "minimal" | "enterprise" | "compact">("default");
  const [layout, setLayout] = React.useState<"single" | "two" | "three" | "auto">("auto");
  const [submittedData, setSubmittedData] = React.useState<any>(null);

  return (
    <PreviewContainer
      title="Form Builder"
      description="A schema-driven form builder for rapid layout construction."
      variants={["default", "minimal", "enterprise", "compact"]}
      activeVariant={variant}
      align="start"
      onVariantChange={setVariant}
      extraControls={
        <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] md:grid-cols-[150px_1fr] items-center gap-2 w-full">
          <span className="text-[10px] md:text-xs uppercase font-bold tracking-widest text-muted-foreground">Layout Mode</span>
          <div className="flex items-center flex-wrap gap-1.5 p-1 bg-muted/30 rounded-lg">
            {(["auto", "single", "two", "three"] as const).map((l) => (
              <button key={l} onClick={() => setLayout(l)} className={cn("px-3 py-1.5 text-xs font-medium rounded-md capitalize transition-all duration-200 whitespace-nowrap", layout === l ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground hover:bg-muted/50")}>{l}</button>
            ))}
          </div>
        </div>
      }
    >
      <div className="flex flex-col items-center justify-start w-full min-h-full p-4 md:p-8 relative z-10" style={{ transform: 'translateZ(0)' }}>
        <div className="w-full max-w-4xl flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <FormBuilder
              schema={sampleSchema}
              variant={variant}
              layout={layout}
              onSubmit={(data) => setSubmittedData(data)}
            />
          </div>
          {submittedData && (
            <div className="w-full lg:w-80 shrink-0">
              <div className="p-4 rounded-xl bg-muted/30 border border-border/50">
                <h4 className="text-sm font-semibold mb-2">Submitted Data</h4>
                <pre className="text-xs overflow-auto p-3 rounded-lg bg-background border border-border/50">
                  {JSON.stringify(submittedData, null, 2)}
                </pre>
              </div>
            </div>
          )}
        </div>
      </div>
    </PreviewContainer>
  );
};

export const OTPVerificationPreview: React.FC = () => {
  const [status, setStatus] = useState<string>("Waiting for code...");

  return (
    <PreviewContainer 
      title="OTP Verification" 
      description="A smooth, animated OTP input component with auto-focus and backspace support."
      isVirtualScreen={true}
    >
      <div className="w-full h-full flex flex-col items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-2xl flex flex-col items-center gap-8 md:gap-12">
          <div className="text-center space-y-2 md:space-y-4">
            <h3 className="text-2xl md:text-3xl font-display font-semibold text-foreground">Verification Code</h3>
            <p className="text-sm md:text-base text-muted-foreground">Enter the 6-digit code sent to your device</p>
          </div>
          
          <div className="w-full flex justify-center scale-[0.8] sm:scale-90 md:scale-100 origin-center">
            <OTPVerification 
              length={6} 
              onVerify={async (code) => {
                setStatus("Verifying...");
                await new Promise(resolve => setTimeout(resolve, 1500));
                if (code === "123456") {
                  setStatus("Verification successful!");
                  return true;
                }
                setStatus("Invalid code. Try 123456.");
                return false;
              }} 
            />
          </div>

          <div className="text-sm md:text-base font-medium h-6">
            <span className={status.includes("successful") ? "text-emerald-500" : status.includes("Invalid") ? "text-red-500" : "text-muted-foreground"}>
              {status}
            </span>
          </div>
        </div>
      </div>
    </PreviewContainer>
  );
}

// ==========================================
// FILTER BUILDER HELPER DATA
// ==========================================

const DEMO_TASKS = [
  { id: 1, title: "Implement new dashboard", status: "in_progress", priority: "critical", assignee: "Alice", due_date: "2026-06-15", story_points: 8, is_active: true, tags: ["frontend", "ui"] },
  { id: 2, title: "Fix login bug", status: "todo", priority: "high", assignee: "Bob", due_date: "2026-06-05", story_points: 3, is_active: true, tags: ["bug", "auth"] },
  { id: 3, title: "Update dependencies", status: "done", priority: "low", assignee: "Charlie", due_date: "2026-05-20", story_points: 2, is_active: false, tags: ["chore"] },
  { id: 4, title: "Write API documentation", status: "todo", priority: "medium", assignee: "Alice", due_date: "2026-06-10", story_points: 5, is_active: true, tags: ["docs", "api"] },
  { id: 5, title: "Design landing page", status: "in_progress", priority: "high", assignee: "Bob", due_date: "2026-06-25", story_points: 13, is_active: true, tags: ["design", "marketing"] },
  { id: 6, title: "Setup CI/CD pipeline", status: "done", priority: "critical", assignee: "Diana", due_date: "2026-05-15", story_points: 8, is_active: false, tags: ["devops", "infrastructure"] },
  { id: 7, title: "Optimize database queries", status: "todo", priority: "high", assignee: "Charlie", due_date: "2026-06-30", story_points: 5, is_active: true, tags: ["backend", "performance"] },
  { id: 8, title: "User testing session", status: "in_progress", priority: "medium", assignee: "Diana", due_date: "2026-06-12", story_points: 3, is_active: true, tags: ["research", "qa"] },
  { id: 9, title: "Refactor state management", status: "todo", priority: "medium", assignee: "Alice", due_date: "2026-07-05", story_points: 13, is_active: false, tags: ["frontend", "tech-debt"] },
  { id: 10, title: "Fix payment gateway timeout", status: "in_progress", priority: "critical", assignee: "Charlie", due_date: "2026-06-02", story_points: 8, is_active: true, tags: ["bug", "payments"] },
  { id: 11, title: "Create email templates", status: "done", priority: "low", assignee: "Bob", due_date: "2026-05-28", story_points: 2, is_active: false, tags: ["design", "email"] },
  { id: 12, title: "Audit security policies", status: "todo", priority: "high", assignee: "Diana", due_date: "2026-06-20", story_points: 5, is_active: true, tags: ["security", "compliance"] },
];

const evaluateRule = (task: any, rule: FilterRule) => {
  const taskValue = task[rule.fieldId];
  const filterValue = rule.value;

  if (rule.operatorId === "is_empty") return !taskValue;
  if (rule.operatorId === "is_not_empty") return !!taskValue;

  if (taskValue === undefined) return false;

  const valString = String(taskValue).toLowerCase();
  const filterString = String(filterValue).toLowerCase();

  switch (rule.operatorId) {
    case "eq": return valString === filterString;
    case "neq": return valString !== filterString;
    case "contains": return valString.includes(filterString);
    case "not_contains": return !valString.includes(filterString);
    case "starts_with": return valString.startsWith(filterString);
    case "ends_with": return valString.endsWith(filterString);
    case "gt": return Number(taskValue) > Number(filterValue);
    case "lt": return Number(taskValue) < Number(filterValue);
    default: return false;
  }
};

const evaluateGroup = (task: any, group: FilterGroup): boolean => {
  if (!group.children || group.children.length === 0) return true;

  if (group.logicalOperator === "AND") {
    return group.children.every(child =>
      child.type === "group" ? evaluateGroup(task, child as FilterGroup) : evaluateRule(task, child as FilterRule)
    );
  } else {
    return group.children.some(child =>
      child.type === "group" ? evaluateGroup(task, child as FilterGroup) : evaluateRule(task, child as FilterRule)
    );
  }
};

export const FilterBuilderPreview: React.FC = () => {
  const [variant, setVariant] = useState<"default" | "minimal" | "enterprise" | "compact" | "glass" >("default");

  const fields: FilterField[] = [
    { id: "status", label: "Status", type: "select", options: [
      { value: "todo", label: "To Do" },
      { value: "in_progress", label: "In Progress" },
      { value: "done", label: "Done" }
    ]},
    { id: "priority", label: "Priority", type: "select", options: [
      { value: "low", label: "Low" },
      { value: "medium", label: "Medium" },
      { value: "high", label: "High" },
      { value: "critical", label: "Critical" }
    ]},
    { id: "assignee", label: "Assignee", type: "user" },
    { id: "due_date", label: "Due Date", type: "date" },
    { id: "story_points", label: "Story Points", type: "number" },
    { id: "title", label: "Title", type: "text" },
    { id: "tags", label: "Labels", type: "tags" },
    { id: "is_active", label: "Active", type: "boolean" },
  ];

  const [data, setData] = useState<FilterGroup>(() => {
    // Initial realistic data with hardcoded IDs to prevent SSR hydration mismatch
    const root: FilterGroup = {
      type: "group",
      id: "root-group-1",
      logicalOperator: "AND",
      children: []
    };
    root.children = [
      { type: "rule", id: "r1", fieldId: "status", operatorId: "eq", value: "in_progress" },
      {
        type: "group",
        id: "g1",
        logicalOperator: "OR",
        children: [
          { type: "rule", id: "r2", fieldId: "priority", operatorId: "eq", value: "high" },
          { type: "rule", id: "r3", fieldId: "priority", operatorId: "eq", value: "critical" },
        ]
      }
    ];
    return root;
  });

  return (
    <PreviewContainer
      title="Filter Builder"
      description="Manage and filter your project tasks with advanced query logic."
      variants={["default", "minimal", "enterprise", "compact", "glass"]}
      activeVariant={variant}
      align="start"
      onVariantChange={setVariant as any}
      contentClassName="bg-transparent border-none p-4 md:p-8 shadow-none min-h-0 items-start overflow-y-auto custom-scrollbar"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
        <div className="lg:col-span-2 space-y-6">

          {/* The Component Itself */}
          <div className={cn(
            "rounded-2xl transition-all duration-500",
            variant === "glass" ? "p-6 bg-linear-to-br from-background/40 to-background/10 backdrop-blur-xl border border-white/10 shadow-2xl" : "",
            variant !== "glass" && variant !== "minimal" ? "p-6 bg-background border shadow-sm" : "",
            variant === "minimal" ? "p-2" : ""
          )}>
            <div className="flex items-center gap-2 mb-4 text-sm font-medium text-muted-foreground">
              <Filter className="w-4 h-4" />
              Filter Rules
            </div>
            <FilterBuilder
              initialData={data}
              onChange={setData}
              fields={fields}
              variant={variant}
            />
          </div>

          {/* Active Results Table */}
          <div className="bg-background rounded-2xl border shadow-sm overflow-hidden flex flex-col h-75">
            <div className="grid grid-cols-4 sm:grid-cols-5 gap-4 p-4 border-b bg-muted/30 text-xs font-semibold text-muted-foreground uppercase tracking-wider shrink-0">
              <div className="col-span-2">Task Title</div>
              <div>Status</div>
              <div>Priority</div>
              <div className="hidden sm:block">Assignee</div>
            </div>
            <div className="flex-1 overflow-y-auto p-2 custom-scrollbar">
              <AnimatePresence mode="popLayout">
                {DEMO_TASKS.filter(t => evaluateGroup(t, data)).length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center h-full text-center p-8 opacity-60"
                  >
                    <Filter className="w-8 h-8 text-muted-foreground mb-3" />
                    <h3 className="text-sm font-medium">No tasks found</h3>
                    <p className="text-xs text-muted-foreground mt-1">Try adjusting your filter rules.</p>
                  </motion.div>
                ) : (
                  DEMO_TASKS.filter(t => evaluateGroup(t, data)).map(task => (
                    <motion.div
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      key={task.id}
                      className="grid grid-cols-4 sm:grid-cols-5 gap-4 p-3 rounded-xl hover:bg-muted/50 items-center text-sm transition-colors border border-transparent hover:border-border/50 mb-1"
                    >
                      <div className="col-span-2 font-medium truncate">{task.title}</div>
                      <div className="min-w-0 flex">
                        <Badge variant={task.status === "done" ? "default" : task.status === "in_progress" ? "secondary" : "outline"} className="capitalize max-w-full">
                          <span className="truncate block w-full text-center">{task.status.replace("_", " ")}</span>
                        </Badge>
                      </div>
                      <div>
                        <span className={cn(
                          "text-xs font-medium px-2 py-1 rounded-md capitalize",
                          task.priority === "critical" && "bg-red-500/10 text-red-500",
                          task.priority === "high" && "bg-orange-500/10 text-orange-500",
                          task.priority === "medium" && "bg-blue-500/10 text-blue-500",
                          task.priority === "low" && "bg-slate-500/10 text-slate-500"
                        )}>
                          {task.priority}
                        </span>
                      </div>
                      <div className="hidden sm:flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary shrink-0">
                          {task.assignee.charAt(0)}
                        </div>
                        <span className="text-muted-foreground truncate">{task.assignee}</span>
                      </div>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>

        {/* Output State Viewer */}
        <div className="bg-background rounded-2xl border p-5 overflow-hidden flex flex-col h-125 lg:h-auto shadow-sm relative group">
          <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-blue-500 via-indigo-500 to-purple-500 opacity-20" />
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-indigo-400" />
              <span className="text-xs font-semibold tracking-wider uppercase text-foreground">Output JSON</span>
            </div>
            <div className="px-2 py-1 rounded bg-muted text-[10px] text-muted-foreground font-medium">
              Live State
            </div>
          </div>
          <div className="flex-1 overflow-auto rounded-xl border bg-muted/30 p-4 custom-scrollbar">
            <pre
              className="text-[11px] leading-relaxed text-foreground font-mono whitespace-pre-wrap"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify(data, null, 2).replace(/"([^"]+)":/g, '<span class="text-indigo-300">"$1"</span>:')
              }}
            />
          </div>
        </div>
      </div>
    </PreviewContainer>
  );
}
