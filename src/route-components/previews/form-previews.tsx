"use client";

import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Calculator } from "@/components/ui/calculator";
import { DynamicForm, FieldConfig } from "@/components/ui/dynamic-form";
import { Select, SelectTrigger, SelectContent, SelectSearch, SelectList, SelectGroup, SelectItem, SelectEmpty } from "@/components/ui/select";
import { FileUpload, UploadDropzone, UploadPreview, UploadProgress, FileState } from "@/components/ui/file-upload";
import { FormBuilder, SchemaField } from "@/components/ui/form-builder";
import { OTPVerification } from "@/components/ui/otp-verification";
import { OtpInput } from "@/components/ui/otp-input";
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
  Filter,
  Layers
} from "lucide-react";
import { PreviewContainer, DEFAULT_COLORS } from "../preview-engine/PreviewContainer";
import { useTheme } from "@/contexts/ThemeContext";

export const PremiumOtpInputPreview: React.FC = () => {
    const [previewColor, setPreviewColor] = React.useState<any>("default");
    const [previewVariant, setPreviewVariant] = React.useState<any>("solid");
  const { theme } = useTheme();
  const [length, setLength] = useState<number>(6);
  const [size, setSize] = useState<"sm" | "md" | "lg">("md");
  const [otpColor, setOtpColor] = useState<"indigo" | "rose" | "emerald" | "amber" | "sky" | "violet" | "slate">("indigo");

  const colors = [
    { name: "indigo", class: "bg-indigo-500" },
    { name: "rose", class: "bg-rose-500" },
    { name: "emerald", class: "bg-emerald-500" },
    { name: "amber", class: "bg-amber-500" },
    { name: "sky", class: "bg-sky-500" },
    { name: "violet", class: "bg-violet-500" },
    { name: "slate", class: "bg-zinc-500" },
  ] as const;

  return (
    <PreviewContainer
      title="Premium OTP Input"
      description="A highly polished, production-ready OTP Verification Input Component with premium micro-interactions."
      variants={["4-digit", "6-digit", "8-digit"]}
      activeVariant={`${length}-digit`}
      onVariantChange={(v) => setLength(parseInt(v))}
      extraControls={
        <div className="flex flex-col gap-6 w-full">
          <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] md:grid-cols-[150px_1fr] items-start sm:items-center gap-4 w-full">
            <span className="text-[10px] md:text-xs uppercase font-bold tracking-widest text-muted-foreground">Vibe Color</span>
            <div className="flex items-center flex-wrap gap-3 p-2 bg-muted/30 rounded-xl w-full">
              {colors.map((c) => (
                <button 
                  key={c.name} 
                  onClick={() => setOtpColor(c.name)} 
                  className={cn(
                    "w-6 h-6 rounded-full transition-all duration-300 ring-offset-2 ring-offset-background hover:scale-125",
                    c.class,
                    otpColor === c.name ? "ring-2 ring-foreground scale-110 shadow-lg" : "opacity-60"
                  )}
                  title={c.name}
                />
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] md:grid-cols-[150px_1fr] items-start sm:items-center gap-4 w-full">
            <span className="text-[10px] md:text-xs uppercase font-bold tracking-widest text-muted-foreground">Size</span>
            <div className="flex items-center flex-wrap gap-2 p-1.5 bg-muted/30 rounded-xl w-full">
              {(["sm", "md", "lg"] as const).map((s) => (
                <button 
                  key={s} 
                  onClick={() => setSize(s)} 
                  className={cn(
                    "px-4 py-1.5 text-xs font-semibold rounded-lg capitalize transition-all duration-300 whitespace-nowrap", 
                    size === s ? "bg-background shadow-md shadow-black/5 text-foreground ring-1 ring-black/5 dark:ring-white/10" : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
      } colors={DEFAULT_COLORS} activeColor={previewColor} onColorChange={setPreviewColor}
    >
      <div className={cn(
        "flex flex-col items-center justify-center w-full h-full p-8 md:p-12 transition-colors duration-500 rounded-3xl",
        theme === "dark" ? "bg-zinc-950" : "bg-zinc-50"
      )}>
        <div className="w-full max-w-2xl flex flex-col items-center gap-12">
          <div className="text-center space-y-4">
            <Badge variant="outline" className={cn("mb-2 px-3 py-1 border-indigo-500/20 text-indigo-500 animate-pulse", `text-${otpColor}-500 border-${otpColor}-500/20`)}>
              Security Protocol Alpha
            </Badge>
            <h3 className={cn(
              "text-3xl md:text-4xl font-display font-black tracking-tight",
              theme === "dark" ? "text-white" : "text-zinc-900"
            )}>
              Verify Your Identity
            </h3>
            <p className={cn(
              "text-sm md:text-base max-w-md mx-auto leading-relaxed",
              theme === "dark" ? "text-zinc-500" : "text-zinc-600"
            )}>
              We&apos;ve sent a <span className={cn("font-bold", `text-${otpColor}-500`)}>{length}-digit</span> verification code to your registered device.
            </p>
          </div>
          
          <div className="w-full flex justify-center py-4">
            <OtpInput 
              key={`${length}-${theme}-${size}-${otpColor}`}
              length={length} 
              theme={theme}
              
              color={otpColor}
              onVerify={async (code) => {
                await new Promise(resolve => setTimeout(resolve, 2000));
                return code === "1234" || code === "123456" || code === "12345678" || code === "1234567890";
              }} 

            />
          </div>

          <div className="flex flex-col items-center gap-4">
            <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold opacity-40">
              Didn&apos;t receive the code?
            </p>
            <button className={cn("text-xs font-black uppercase tracking-tighter transition-colors underline underline-offset-8 decoration-indigo-500/30", `text-${otpColor}-500 decoration-${otpColor}-500/30 hover:text-${otpColor}-400`)}>
              Resend Verification Code
            </button>
          </div>
        </div>
      </div>
    </PreviewContainer>
  );
};

export const CalendarPreview: React.FC = () => {
    const [previewColor, setPreviewColor] = React.useState<any>("default");
    const [previewVariant, setPreviewVariant] = React.useState<any>("solid");
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <PreviewContainer
      title="Calendar"
      description="A clean, responsive calendar component for date selection." colors={DEFAULT_COLORS} activeColor={previewColor} onColorChange={setPreviewColor} variants={["solid", "outline", "ghost", "link"]} activeVariant={previewVariant} onVariantChange={setPreviewVariant}
    >
      <div className="bg-card border rounded-2xl p-6 shadow-sm">
        <Calendar
          value={date}
          onChange={setDate}
          className="rounded-md" color={previewColor} variant={previewVariant}
        />
      </div>
    </PreviewContainer>
  );
};

export const CalculatorPreview: React.FC = () => {
    const [previewColor, setPreviewColor] = React.useState<any>("default");
    const [previewVariant, setPreviewVariant] = React.useState<any>("solid");
  return (
    <PreviewContainer
      title="Calculator"
      description="A functional, glassmorphic calculator with advanced math operations." colors={DEFAULT_COLORS} activeColor={previewColor} onColorChange={setPreviewColor} variants={["solid", "outline", "ghost", "link"]} activeVariant={previewVariant} onVariantChange={setPreviewVariant}
    >
      <Calculator color={previewColor} variant={previewVariant} />
    </PreviewContainer>
  );
};

export const DynamicFormPreview: React.FC = () => {
    const [previewColor, setPreviewColor] = React.useState<any>("default");
    const [previewVariant, setPreviewVariant] = React.useState<any>("solid");
  const [submittedData, setSubmittedData] = useState<any>(null);
  const [activeDemo, setActiveDemo] = useState("contact");

  const contactFields: FieldConfig[] = [
    {
      name: "fullName",
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
      placeholder: "johndoe@example.com",
      required: true,
      icon: Mail,
      colSpan: 1
    },
    {
      name: "subject",
      type: "select",
      label: "Inquiry Subject",
      placeholder: "Select inquiry type...",
      options: [
        { label: "Technical Support", value: "tech" },
        { label: "Billing / Licensing", value: "billing" },
        { label: "General Feedback", value: "feedback" },
        { label: "Partnership", value: "partnership" }
      ],
      colSpan: 2
    },
    {
      name: "message",
      type: "textarea",
      label: "Your Message",
      placeholder: "How can we help you?",
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
      }} colors={DEFAULT_COLORS} activeColor={previewColor} onColorChange={setPreviewColor}
    >
      <div className="flex flex-col @3xl:flex-row gap-8 items-stretch justify-center w-full max-w-5xl m-auto @container">
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
                  onSubmit={(data) => setSubmittedData(data)}
                />
              </motion.div>
            )}

            {activeDemo === "login" && (
              <motion.div
                key="login"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="w-full"
              >
                <DynamicForm
                  variant="elevated"
                  fields={loginFields}
                  submitButtonText="Log In to Dashboard"
                  onSubmit={(data) => setSubmittedData(data)}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="w-full @3xl:w-80 space-y-4">
          <div className="p-5 rounded-2xl border bg-card shadow-sm sticky top-0">
            <h4 className="font-bold text-sm uppercase tracking-widest text-muted-foreground mb-4">Submission Data</h4>
            {submittedData ? (
              <pre className="text-[11px] font-mono p-4 bg-muted/50 rounded-lg overflow-auto max-h-[400px] border border-border/50">
                <code 
                  dangerouslySetInnerHTML={{ 
                    __html: JSON.stringify(submittedData, null, 2).replace(/"([^"]+)":/g, '<span class="text-indigo-500">"$1"</span>:')
                  }}
                />
              </pre>
            ) : (
              <div className="h-40 flex flex-col items-center justify-center border border-dashed rounded-xl gap-2 text-muted-foreground opacity-40">
                <Sparkles className="w-6 h-6" />
                <span className="text-[10px] font-bold uppercase tracking-tighter">Waiting for Submit...</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </PreviewContainer>
  );
};

export const SelectPreview: React.FC = () => {
    const [previewColor, setPreviewColor] = React.useState<any>("default");
    const [previewVariant, setPreviewVariant] = React.useState<any>("solid");
  const [value, setValue] = useState<string | string[]>("");
  const [multiValue, setMultiValue] = useState<string | string[]>(["apple"]);

  return (
    <PreviewContainer
      title="Advanced Select"
      description="Feature-rich select components with virtualization, multi-select, and search." colors={DEFAULT_COLORS} activeColor={previewColor} onColorChange={setPreviewColor} variants={["solid", "outline", "ghost", "link"]} activeVariant={previewVariant} onVariantChange={setPreviewVariant}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl m-auto">
        <div className="space-y-4">
          <h4 className="text-sm font-bold uppercase tracking-widest text-muted-foreground px-1">Single Selection</h4>
          <Select value={value as string} onValueChange={setValue} color={previewColor} variant={previewVariant}>
            <SelectTrigger placeholder="Pick a fruit..." />
            <SelectContent>
              <SelectSearch placeholder="Search fruits..." />
              <SelectList>
                <SelectGroup>
                  <SelectItem value="apple">Apple</SelectItem>
                  <SelectItem value="banana">Banana</SelectItem>
                  <SelectItem value="blueberry">Blueberry</SelectItem>
                  <SelectItem value="cherry">Cherry</SelectItem>
                </SelectGroup>
              </SelectList>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4">
          <h4 className="text-sm font-bold uppercase tracking-widest text-muted-foreground px-1">Multi-Select + Search</h4>
          <Select multiSelect value={multiValue} onValueChange={setMultiValue} color={previewColor} variant={previewVariant}>
            <SelectTrigger placeholder="Choose multiple..." />
            <SelectContent>
              <SelectSearch placeholder="Filter options..." />
              <SelectList>
                <SelectItem value="apple">Apple</SelectItem>
                <SelectItem value="banana">Banana</SelectItem>
                <SelectItem value="orange">Orange</SelectItem>
                <SelectItem value="strawberry">Strawberry</SelectItem>
                <SelectItem value="watermelon">Watermelon</SelectItem>
              </SelectList>
            </SelectContent>
          </Select>
        </div>
      </div>
    </PreviewContainer>
  );
};

export const FileUploadPreview: React.FC = () => {
    const [previewColor, setPreviewColor] = React.useState<any>("default");
    const [previewVariant, setPreviewVariant] = React.useState<any>("solid");
  const [files, setFiles] = useState<FileState[]>([]);

  return (
    <PreviewContainer
      title="File Upload"
      description="Premium drag-and-drop file upload with progress tracking and previews." colors={DEFAULT_COLORS} activeColor={previewColor} onColorChange={setPreviewColor} variants={["solid", "outline", "ghost", "link"]} activeVariant={previewVariant} onVariantChange={setPreviewVariant}
    >
      <div className="w-full max-w-2xl m-auto space-y-8">
        <FileUpload
          maxFiles={5}
          maxSize={10 * 1024 * 1024}
          onFilesChange={setFiles} color={previewColor} variant={previewVariant}
        >
          <UploadDropzone />
          <div className="mt-8 space-y-4">
            {files.map((fileState) => (
              <div key={fileState.id} className="p-4 border rounded-xl bg-card space-y-2">
                <div className="flex items-center justify-between">
                  <div className="shrink-0 h-10 w-10 bg-muted rounded-lg flex items-center justify-center">
                    <Layers className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="flex-1 px-4 min-w-0">
                    <p className="text-sm font-medium truncate">{fileState.file.name}</p>
                    <p className="text-xs text-muted-foreground">{(fileState.file.size / 1024).toFixed(1)} KB</p>
                  </div>
                  {fileState.status === "uploading" && <div className="text-xs animate-pulse text-primary">Uploading...</div>}
                  {fileState.status === "error" && <AlertCircleIcon className="w-5 h-5 text-destructive" />}
                  {fileState.status === "success" && <CheckIcon className="w-5 h-5 text-emerald-500" />}
                </div>
              </div>
            ))}
          </div>
        </FileUpload>
      </div>
    </PreviewContainer>
  );
};

export const FormBuilderPreview: React.FC = () => {
    const [previewColor, setPreviewColor] = React.useState<any>("default");
    const [previewVariant, setPreviewVariant] = React.useState<any>("solid");
  const [data, setData] = useState<any>(null);

  const schema: SchemaField[] = [
    {
      name: "personalInfo",
      type: "group",
      label: "Personal Information",
      fields: [
        { name: "firstName", type: "text", label: "First Name", required: true, colSpan: 1 },
        { name: "lastName", type: "text", label: "Last Name", required: true, colSpan: 1 },
        { name: "email", type: "email", label: "Email", required: true, colSpan: 2 },
      ]
    },
    {
      name: "experience",
      type: "array",
      label: "Work Experience",
      fields: [
        { name: "company", type: "text", label: "Company", required: true },
        { name: "position", type: "text", label: "Position", required: true },
        { name: "startDate", type: "text", label: "Start Date" },
      ]
    }
  ];

  return (
    <PreviewContainer
      title="Schema Form Builder"
      description="Build complex nested forms with a simple JSON schema." colors={DEFAULT_COLORS} activeColor={previewColor} onColorChange={setPreviewColor} variants={["solid", "outline", "ghost", "link"]} activeVariant={previewVariant} onVariantChange={setPreviewVariant}
    >
      <div className="w-full max-w-4xl m-auto grid grid-cols-1 @2xl:grid-cols-[1fr_300px] gap-8 @container">
        <div className="bg-card border rounded-2xl p-6 shadow-sm">
          <FormBuilder
            schema={schema}
            onSubmit={(val) => setData(val)}
          />
        </div>
        <div className="space-y-4">
          <div className="p-5 rounded-2xl border bg-muted/30">
            <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">Live Result</h4>
            <pre className="text-[10px] font-mono overflow-auto max-h-[400px]">
              {JSON.stringify(data, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    </PreviewContainer>
  );
};

export const OTPVerificationPreview: React.FC = () => {
    const [previewColor, setPreviewColor] = React.useState<any>("default");
    const [previewVariant, setPreviewVariant] = React.useState<any>("solid");
  return (
    <PreviewContainer
      title="OTP Verification"
      description="Animated multi-field OTP input with various verification states." colors={DEFAULT_COLORS} activeColor={previewColor} onColorChange={setPreviewColor} variants={["solid", "outline", "ghost", "link"]} activeVariant={previewVariant} onVariantChange={setPreviewVariant}
    >
      <div className="w-full max-w-md m-auto flex flex-col items-center gap-12">
        <div className="text-center space-y-2">
          <h3 className="text-2xl font-bold">Verify Access</h3>
          <p className="text-sm text-muted-foreground">Enter the 6-digit code sent to your email.</p>
        </div>
        <OTPVerification
          length={6}
          onVerify={async (code) => {
            console.log("OTP Code:", code);
            return new Promise((resolve) => setTimeout(() => resolve(code === "123456"), 1500));
          }}
        />
      </div>
    </PreviewContainer>
  );
};

export const FilterBuilderPreview: React.FC = () => {
    const [previewColor, setPreviewColor] = React.useState<any>("default");
    const [previewVariant, setPreviewVariant] = React.useState<any>("solid");
  const [data, setData] = useState<any>(null);

  return (
    <PreviewContainer
      title="Filter Builder"
      description="Advanced query builder for creating complex filtering logic." colors={DEFAULT_COLORS} activeColor={previewColor} onColorChange={setPreviewColor} variants={["solid", "outline", "ghost", "link"]} activeVariant={previewVariant} onVariantChange={setPreviewVariant}
    >
      <div className="w-full max-w-4xl m-auto space-y-8">
        <FilterBuilder
          initialData={{
            type: "group",
            id: "root",
            logicalOperator: "AND",
            children: []
          }}
          fields={[
            { id: "name", label: "Name", type: "text" },
            { id: "age", label: "Age", type: "number" },
            { id: "status", label: "Status", type: "select", options: [
              { label: "Active", value: "active" },
              { label: "Inactive", value: "inactive" },
              { label: "Pending", value: "pending" }
            ]},
            { id: "date", label: "Date Created", type: "date" }
          ]}
          onChange={setData} color={previewColor} variant={previewVariant}
        />
        <div className="p-5 rounded-2xl border bg-muted/30">
          <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">Query Output</h4>
          <pre className="text-[10px] font-mono overflow-auto max-h-[300px]">
            <code 
              dangerouslySetInnerHTML={{ 
                __html: JSON.stringify(data, null, 2).replace(/"([^"]+)":/g, '<span class="text-indigo-300">"$1"</span>:')
              }}
            />
          </pre>
        </div>
      </div>
    </PreviewContainer>
  );
};
