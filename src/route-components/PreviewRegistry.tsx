"use client";

import React from "react";
import { PrimaryButton } from "@/components/ui/primary-button";
import { GlowyButton } from "@/components/ui/glowy-button";
import { BasicCard } from "@/components/ui/basic-card";
import { BoxyRotateLoader } from "@/components/ui/boxy-rotate-loader";
import { BoxyBounceLoader } from "@/components/ui/boxy-bounce-loader";
import { BoxyShiftLoader } from "@/components/ui/boxy-shift-loader";
import { BasicLoader } from "@/components/ui/basic-loader";
import { DotBackground } from "@/components/ui/dot-background";
import { CarouselSlider } from "@/components/ui/carousel-slider";
import { NavMenu } from "@/components/ui/nav-menu";
import { ErrorPage } from "@/components/ui/error-page";
import { CinematicError } from "@/components/ui/cinematic-error";
import { ExpandingFlexCard } from "@/components/ui/expanding-flex-card";
import { NexusCard } from "@/components/ui/nexus-card";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SidebarButton } from "@/components/ui/sidebar-button";
import { Particles } from "@/components/ui/particles";
import { PerspectiveGrid } from "@/components/ui/perspective-grid";
import { SearchInput } from "@/components/ui/search-input";
import { GithubIcon } from "@/components/ui/github-icon";
import { LinkedinIcon } from "@/components/ui/linkedin-icon";
import { PointCursor } from "@/components/ui/PointCursor";
import { Accordion } from "@/components/ui/accordion";
import { Calendar } from "@/components/ui/calendar";
import { Calculator } from "@/components/ui/calculator";
import { DynamicForm, FieldConfig } from "@/components/ui/dynamic-form";
import { Sparkles, Terminal, Mail, Lock, User, Globe, Phone as PhoneIcon, Check as CheckIcon, X as XIcon, AlertCircle as AlertCircleIcon } from "lucide-react";
import { ScrollTextReveal } from "@/components/ui/scroll-text-reveal";
import { CursorGlowButton } from "@/components/ui/cursor-glow-button";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

// Typography helper components for the preview
const headingVariants = cva("font-bold tracking-tight text-foreground", {
  variants: {
    variant: {
      h1: "scroll-m-20 text-4xl font-extrabold lg:text-5xl",
      h2: "scroll-m-20 border-b pb-2 text-3xl font-semibold first:mt-0",
      h3: "scroll-m-20 text-2xl font-semibold",
      h4: "scroll-m-20 text-xl font-semibold",
      h5: "text-lg font-semibold",
      h6: "text-base font-semibold",
    },
  },
  defaultVariants: { variant: "h1" },
});

const textVariants = cva("text-foreground", {
  variants: {
    variant: {
      default: "leading-7 [&:not(:first-child)]:mt-6",
      lead: "text-xl text-muted-foreground",
      large: "text-lg font-semibold",
      small: "text-sm font-medium leading-none",
      muted: "text-sm text-muted-foreground",
      blockquote: "mt-6 border-l-2 pl-6 italic",
    },
  },
  defaultVariants: { variant: "default" },
});

const Heading: React.FC<{
  className?: string;
  variant?: any;
  as?: any;
  children: React.ReactNode;
}> = ({ className, variant, as: Tag = "h1", ...props }) => (
  <Tag className={cn(headingVariants({ variant, className }))} {...props} />
);

const Text: React.FC<{
  className?: string;
  variant?: any;
  as?: any;
  children: React.ReactNode;
}> = ({ className, variant, as: Tag = "p", ...props }) => (
  <Tag className={cn(textVariants({ variant, className }))} {...props} />
);

const Label: React.FC<{
  className?: string;
  as?: any;
  children: React.ReactNode;
}> = ({ className, as: Tag = "label", ...props }) => (
  <Tag
    className={cn(
      "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
      className,
    )}
    {...props}
  />
);

const Code: React.FC<{ className?: string; children: React.ReactNode }> = ({
  className,
  ...props
}) => (
  <code
    className={cn(
      "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
      className,
    )}
    {...props}
  />
);

const ToastPreview: React.FC = () => {
  const { toast } = useToast();
  const [position, setPosition] = React.useState<
    "top-right" | "top-left" | "bottom-right" | "bottom-left"
  >("bottom-right");

  return (
    <div className="flex flex-col gap-8 items-center justify-center w-full h-full p-4">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 w-full max-w-md justify-items-stretch">
        {(
          ["top-left", "top-right", "bottom-left", "bottom-right"] as const
        ).map((pos) => (
          <Button
            key={pos}
            variant={position === pos ? "default" : "outline"}
            size="sm"
            onClick={() => setPosition(pos)}
            className="capitalize w-full"
          >
            {pos.replace("-", " ")}
          </Button>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-4 w-full justify-center items-center">
        <Button
          variant="outline"
          className="w-full sm:w-auto"
          onClick={() => {
            toast({
              title: "Success",
              description: "Toast integrated successfully!",
              position,
            });
          }}
        >
          Show Success Toast
        </Button>

        <Button
          variant="destructive"
          className="w-full sm:w-auto"
          onClick={() => {
            toast({
              variant: "destructive",
              title: "Error",
              description: "Something went wrong!",
              position,
            });
          }}
        >
          Show Destructive Toast
        </Button>
      </div>
    </div>
  );
};

const CalendarPreview: React.FC = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [highlighted, setHighlighted] = React.useState<Date[]>([]);

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
    <div className="flex flex-col items-center justify-center w-full h-full p-6 md:p-12 gap-16">
      <div className="flex flex-col lg:flex-row gap-16 items-start justify-center w-full max-w-5xl">
        <div className="flex flex-col gap-6 items-center w-full">
          <div className="flex flex-col items-center gap-1">
            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-foreground/40">
              Professional
            </h3>
            <p className="text-[10px] text-muted-foreground/30 font-medium italic">
              Glassmorphism & Depth
            </p>
          </div>
          <Calendar
            value={date}
            onChange={setDate}
            highlightedDates={highlighted}
            onHighlightToggle={toggleHighlight}
            variant="modern"
          />
        </div>

        <div className="flex flex-col gap-6 items-center w-full">
          <div className="flex flex-col items-center gap-1">
            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-foreground/40">
              Minimalist
            </h3>
            <p className="text-[10px] text-muted-foreground/30 font-medium italic">
              Pure & Structured
            </p>
          </div>
          <Calendar
            value={date}
            onChange={setDate}
            highlightedDates={highlighted}
            onHighlightToggle={toggleHighlight}
            variant="clean"
          />
        </div>
      </div>

      <div className="flex flex-col gap-6 items-center w-full max-w-sm">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-border/40 to-transparent" />
        <div className="flex flex-col gap-4 items-center">
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setHighlighted([])}
              className="text-[10px] uppercase tracking-widest font-black h-10 px-6 rounded-full border-primary/20 hover:bg-primary/5 hover:text-primary transition-all"
            >
              Clear Highlights
            </Button>
          </div>
          <p className="text-[10px] text-muted-foreground/40 uppercase tracking-[0.1em] font-bold text-center leading-relaxed">
            Interact with the grid to{" "}
            <span className="text-primary/60 italic underline underline-offset-4">
              Toggle Highlighting
            </span>{" "}
            or select dates.
          </p>
        </div>
      </div>
    </div>
  );
};

const CalculatorPreview: React.FC = () => {
  const [variant, setVariant] = React.useState<"glass" | "brutal" | "neon">(
    "glass",
  );

  return (
    <div className="flex flex-col gap-8 items-center justify-center w-full h-full p-4 sm:p-8">
      <div className="flex flex-wrap justify-center gap-2 sm:gap-4 p-2 bg-muted/20 rounded-full border border-border/50 backdrop-blur-md relative z-20">
        <Button
          variant={variant === "glass" ? "default" : "ghost"}
          size="sm"
          onClick={() => setVariant("glass")}
          className="rounded-full px-6 transition-all"
        >
          Glass
        </Button>
        <Button
          variant={variant === "brutal" ? "default" : "ghost"}
          size="sm"
          onClick={() => setVariant("brutal")}
          className="rounded-full px-6 transition-all"
        >
          Brutal
        </Button>
        <Button
          variant={variant === "neon" ? "default" : "ghost"}
          size="sm"
          onClick={() => setVariant("neon")}
          className="rounded-full px-6 transition-all"
        >
          Neon
        </Button>
      </div>

      <div className="flex items-center justify-center w-full flex-1">
        <Calculator variant={variant} />
      </div>
    </div>
  );
};

const DynamicFormPreview: React.FC = () => {
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
    <div className="flex flex-col gap-8 items-center justify-center w-full h-full p-4 sm:p-8 select-text">
      <div className="flex flex-wrap justify-center gap-2 p-1.5 bg-muted/20 rounded-full border border-border/50 backdrop-blur-md relative z-20">
        <Button
          variant={activeDemo === "contact" ? "default" : "ghost"}
          size="sm"
          onClick={() => {
            setActiveDemo("contact");
            setSubmittedData(null);
          }}
          className="rounded-full px-6 transition-all"
        >
          Contact Form
        </Button>
        <Button
          variant={activeDemo === "wizard" ? "default" : "ghost"}
          size="sm"
          onClick={() => {
            setActiveDemo("wizard");
            setSubmittedData(null);
          }}
          className="rounded-full px-6 transition-all"
        >
          Multi-Step Wizard
        </Button>
        <Button
          variant={activeDemo === "login" ? "default" : "ghost"}
          size="sm"
          onClick={() => {
            setActiveDemo("login");
            setSubmittedData(null);
          }}
          className="rounded-full px-6 transition-all"
        >
          Compact Login
        </Button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-stretch justify-center w-full max-w-5xl">
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

          <div className="mt-4 flex-1 flex flex-col justify-center min-h-[200px] border border-dashed border-border/60 rounded-xl p-4 bg-black/5 dark:bg-black/40 overflow-hidden">
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
    </div>
  );
};

export const PreviewRegistry: Record<string, React.FC> = {
  primary: () => (
    <div className="flex items-center justify-center w-full h-full">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 items-center justify-items-center w-full">
        <PrimaryButton variant="primary">Primary</PrimaryButton>
        <PrimaryButton variant="success">Success</PrimaryButton>
        <PrimaryButton variant="warning">Warning</PrimaryButton>
        <PrimaryButton variant="danger">Danger</PrimaryButton>
        <PrimaryButton variant="info">Info</PrimaryButton>
        <PrimaryButton variant="secondary">Secondary</PrimaryButton>
      </div>
    </div>
  ),
  glowy: () => (
    <div className="flex flex-wrap gap-6 items-center justify-center w-full h-full p-4">
      <GlowyButton variant="primary">Primary</GlowyButton>
      <GlowyButton variant="success">Success</GlowyButton>
      <GlowyButton variant="danger">Danger</GlowyButton>
    </div>
  ),
  "basic-card": () => (
    <div className="flex items-center justify-center w-full h-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 w-full justify-items-center">
        <div className="flex flex-col gap-2 items-center w-full">
          <BasicCard
            variant="modern"
            color="#6366f1"
            name="Aryan Hooda"
            title="Full Stack Developer"
          />
        </div>
        <div className="flex flex-col gap-2 items-center w-full">
          <BasicCard
            variant="clean"
            color="#10b981"
            name="John Doe"
            title="Product Designer"
          />
        </div>
      </div>
    </div>
  ),
  "boxy-rotate": () => (
    <div className="flex items-center justify-center w-full h-full">
      <BoxyRotateLoader />
    </div>
  ),
  "boxy-bounce": () => (
    <div className="flex items-center justify-center w-full h-full">
      <BoxyBounceLoader />
    </div>
  ),
  "boxy-shift": () => (
    <div className="flex items-center justify-center w-full h-full">
      <BoxyShiftLoader />
    </div>
  ),
  "text-system": () => (
    <div className="flex items-center justify-center w-full h-full">
      <div className="max-w-2xl w-full flex flex-col gap-8 select-text text-left">
        <div className="space-y-2">
          <Label className="text-xs uppercase tracking-widest text-blue-500">
            Semantic Headings
          </Label>
          <Heading variant="h1">Heading 1</Heading>
          <Heading variant="h2">Heading 2</Heading>
          <Heading variant="h3">Heading 3</Heading>
        </div>
        <div className="space-y-4">
          <Label className="text-xs uppercase tracking-widest text-emerald-500">
            Text Variants
          </Label>
          <Text variant="lead">
            This is a lead paragraph with larger font and muted color.
          </Text>
          <Text>
            This is the default body text that users will read most of the time.
          </Text>
          <Text variant="large">This is large text for emphasis.</Text>
          <Text variant="muted">
            This is muted text for secondary information.
          </Text>
          <Text variant="blockquote">
            &quot;This is a blockquote variant for citing sources or
            highlighting quotes.&quot;
          </Text>
        </div>
        <div className="space-y-2">
          <Label className="text-xs uppercase tracking-widest text-orange-500">
            Form Elements
          </Label>
          <div className="flex flex-col gap-2">
            <Label>Input Label</Label>
            <div className="flex items-center gap-2">
              <Code>npm install futureuikit</Code>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
  "infinite-slider": () => (
    <div className="w-full h-full overflow-hidden rounded-xl flex flex-col items-center justify-center">
      <CarouselSlider
        slides={[
          {
            id: 1,
            tag: "EXPLORE",
            title: "EXOTIC ADVENTURE",
            location: "Bali, Indonesia",
            image:
              "https://images.unsplash.com/photo-1556206079-747a7a424d3d?ixlib=rb-4.0.3&q=80",
            tagBg: "bg-indigo-600",
          },
          {
            id: 2,
            tag: "CITY",
            title: "URBAN EXPLORER",
            location: "Tokyo, Japan",
            image:
              "https://images.unsplash.com/photo-1571900670723-a317a66e3fb7?ixlib=rb-4.0.3&q=80",
            tagBg: "bg-emerald-600",
          },
          {
            id: 3,
            tag: "NATURE",
            title: "MOUNTAIN RETREAT",
            location: "Swiss Alps",
            image:
              "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&q=80",
            tagBg: "bg-amber-600",
          },
        ]}
      />
    </div>
  ),
  menu: () => (
    <div className="flex items-center justify-center w-full h-full relative">
      <NavMenu />
    </div>
  ),
  "error-page": () => <ErrorPage errorCode="404" errorText="ERROR" />,
  "expanding-card": () => (
    <div className="w-full h-full flex items-center justify-center">
      <ExpandingFlexCard
        options={[
          {
            id: 1,
            main: "Forest",
            sub: "Majestic trees",
            img: "https://66.media.tumblr.com/6fb397d822f4f9f4596dff2085b18f2e/tumblr_nzsvb4p6xS1qho82wo1_1280.jpg",
            icon: "🚶",
          },
          {
            id: 2,
            main: "Winter",
            sub: "Delicate fall",
            img: "https://66.media.tumblr.com/8b69cdde47aa952e4176b4200052abf4/tumblr_o51p7mFFF21qho82wo1_1280.jpg",
            icon: "❄️",
          },
          {
            id: 3,
            main: "Ocean",
            sub: "Deep blue",
            img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
            icon: "🌊",
          },
          {
            id: 4,
            main: "Desert",
            sub: "Golden sands",
            img: "https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?ixlib=rb-4.0.3&q=80",
            icon: "☀️",
          },
        ]}
      />
    </div>
  ),
  basic: () => (
    <div className="flex items-center justify-center w-full h-full p-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 w-full max-w-3xl items-center justify-items-center">
        <div className="flex flex-col gap-4 items-center">
          <BasicLoader
            variant="modern"
            color="#3b82f6"
            text="Modern Rings..."
          />
        </div>
        <div className="flex flex-col gap-4 items-center">
          <BasicLoader variant="clean" color="#10b981" text="Clean Dots..." />
        </div>
        <div className="flex flex-col gap-4 items-center">
          <BasicLoader variant="minimal" color="#f59e0b" text="Minimal..." />
        </div>
      </div>
    </div>
  ),
  toast: ToastPreview,
  "dot-background": () => (
    <DotBackground dotColor="#6366f1" maskOpacity={0.15}>
      <div className="flex items-center justify-center w-full h-full">
        <h3 className="text-xl md:text-3xl font-black italic tracking-tighter uppercase opacity-50">
          Premium Dotted Grid
        </h3>
      </div>
    </DotBackground>
  ),
  badge: () => (
    <div className="flex flex-wrap gap-8 items-center justify-center w-full h-full">
      <Badge variant="default">Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  ),
  button: () => (
    <div className="flex flex-wrap gap-8 items-center justify-center w-full h-full">
      <Button variant="default">Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
  card: () => (
    <div className="flex items-center justify-center w-full h-full">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description goes here.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground text-left">
            This is the main content area of the card component. It can hold any
            type of content.
          </p>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <Button variant="outline" size="sm">
            Cancel
          </Button>
          <Button size="sm">Action</Button>
        </CardFooter>
      </Card>
    </div>
  ),
  "sidebar-button": () => (
    <div className="flex items-center justify-center w-full h-full">
      <div className="w-full max-w-60 flex flex-col gap-1 p-4 bg-muted/20 rounded-xl">
        <SidebarButton label="Dashboard" isActive />
        <SidebarButton label="Analytics" />
        <SidebarButton label="Settings" />
        <div className="h-4" />
        <SidebarButton label="User Profile" isCategory />
        <SidebarButton label="Billing" isCategory />
      </div>
    </div>
  ),
  particles: () => (
    <div className="w-full h-full bg-slate-950 dark:bg-background">
      <Particles quantity={150} color="#3b82f6" />
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <h3 className="text-2xl font-bold text-white dark:text-foreground italic tracking-tighter uppercase pointer-events-none">
          Dynamic Particle System
        </h3>
      </div>
    </div>
  ),
  "perspective-grid": () => (
    <div className="w-full h-full bg-slate-950 dark:bg-background">
      <PerspectiveGrid gridLineGap={50} />
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <h3 className="text-2xl font-bold text-white dark:text-foreground italic tracking-tighter uppercase pointer-events-none">
          Perspective Horizon
        </h3>
      </div>
    </div>
  ),
  "search-input": () => (
    <div className="flex items-center justify-center w-full h-full p-8">
      <div className="w-full max-w-sm">
        <SearchInput placeholder="Try searching 'button'..." />
      </div>
    </div>
  ),
  "github-icon": () => (
    <div className="flex flex-col gap-8 items-center justify-center w-full h-full p-8">
      <div className="flex gap-12 items-center">
        <div className="flex flex-col items-center gap-2">
          <GithubIcon className="w-6 h-6" />
          <span className="text-[10px] uppercase font-bold opacity-50">sm</span>
        </div>
        <div className="flex flex-col items-center gap-2 text-primary">
          <GithubIcon className="w-10 h-10" />
          <span className="text-[10px] uppercase font-bold opacity-50">md</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <GithubIcon className="w-16 h-16" />
          <span className="text-[10px] uppercase font-bold opacity-50">lg</span>
        </div>
      </div>
      <div className="flex gap-4">
        <Badge variant="outline" className="gap-2">
          <GithubIcon className="w-3 h-3" /> GitHub Repo
        </Badge>
        <Button size="sm" className="gap-2">
          <GithubIcon className="w-4 h-4" /> View Source
        </Button>
      </div>
    </div>
  ),
  "linkedin-icon": () => (
    <div className="flex flex-col gap-8 items-center justify-center w-full h-full p-8">
      <div className="flex gap-12 items-center">
        <div className="flex flex-col items-center gap-2">
          <LinkedinIcon className="w-6 h-6" />
          <span className="text-[10px] uppercase font-bold opacity-50">sm</span>
        </div>
        <div className="flex flex-col items-center gap-2 text-primary">
          <LinkedinIcon className="w-10 h-10" />
          <span className="text-[10px] uppercase font-bold opacity-50">md</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <LinkedinIcon className="w-16 h-16" />
          <span className="text-[10px] uppercase font-bold opacity-50">lg</span>
        </div>
      </div>
      <div className="flex gap-4">
        <Badge variant="outline" className="gap-2">
          <LinkedinIcon className="w-3 h-3" /> LinkedIn Profile
        </Badge>
        <Button
          size="sm"
          className="gap-2 bg-[#0077b5] hover:bg-[#0077b5]/90 border-none"
        >
          <LinkedinIcon className="w-4 h-4 fill-white" /> Connect Now
        </Button>
      </div>
    </div>
  ),
  "scroll-progress": () => (
    <div className="flex items-center justify-center w-full h-full p-8 text-center">
      <p className="text-muted-foreground font-medium">
        The scroll progress will be shown on top of the viewport right above
        header
      </p>
    </div>
  ),
  "point-cursor": () => (
    <PointCursor className="rounded-xl overflow-hidden border border-border bg-muted/10">
      <div className="flex flex-col items-center justify-center w-full h-full min-h-[300px] sm:min-h-[400px] p-8 text-center space-y-8 relative overflow-hidden">
        {/* Decorative background to make it feel like a "playground" */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <DotBackground dotColor="currentColor" gap={20} />
        </div>

        <div className="space-y-3 relative z-10">
          <Badge variant="secondary" className="mb-2">
            Isolated Custom Cursor
          </Badge>
          <h3 className="text-2xl font-bold tracking-tight">
            Interactive Playground
          </h3>
          <p className="text-muted-foreground max-w-sm mx-auto">
            The custom cursor is only active inside this box. Hover over the
            elements to test the{" "}
            <span className="text-primary font-bold italic">Dot-to-Ring</span>{" "}
            transformation.
          </p>
        </div>

        <div className="flex flex-wrap gap-4 justify-center relative z-10">
          <Button className="rounded-full px-8 shadow-lg shadow-primary/20">
            Hover Me
          </Button>
          <Button
            variant="outline"
            className="rounded-full px-8 bg-background/50 backdrop-blur-sm"
          >
            Try This One
          </Button>
          <a
            href="#"
            className="text-primary font-medium underline underline-offset-4 hover:text-primary/80 transition-colors py-2 px-4"
            onClick={(e) => e.preventDefault()}
          >
            Interactive Link
          </a>
        </div>

        <div className="grid grid-cols-2 gap-4 w-full max-w-md relative z-10">
          <div className="p-4 rounded-xl border border-border/50 bg-background/50 backdrop-blur-sm clickable">
            <span className="text-[10px] uppercase tracking-widest font-bold opacity-50">
              Custom Box
            </span>
            <p className="text-xs mt-1">Has &apos;clickable&apos; class</p>
          </div>
          <div className="p-4 rounded-xl border border-border/50 bg-background/50 backdrop-blur-sm">
            <span className="text-[10px] uppercase tracking-widest font-bold opacity-50">
              Standard Box
            </span>
            <p className="text-xs mt-1">Normal behavior</p>
          </div>
        </div>
      </div>
    </PointCursor>
  ),
  accordion: () => (
    <div className="flex items-center justify-center w-full h-full p-4">
      <Accordion
        items={[
          {
            title: "What is Future UI?",
            content:
              "Future UI is a modern, high-performance UI component library built for Next.js 16 and React 19. It leverages Tailwind CSS 4 and Framer Motion to provide visually stunning, reusable components.",
          },
          {
            title: "How do I install components?",
            content:
              "You can use our custom CLI tool to add components directly to your project. Simply run 'npx futureuikit add <slug>' and we'll handle the rest, including dependencies and path aliases.",
          },
          {
            title: "Is it customizable?",
            content:
              "Yes! Since you download the source code, you have full ownership and can customize every aspect of the components to fit your specific needs and design system.",
          },
        ]}
      />
    </div>
  ),
  calendar: CalendarPreview,
  calculator: CalculatorPreview,
  // "dot-background": () => (
  //   <div className="w-full h-full overflow-hidden relative">
  //     <DotBackground gap={24} dotSize={2} maskOpacity={0.8}>
  //       <div className="flex flex-col items-center justify-center space-y-4 relative z-10 w-full h-full">
  //         <h3 className="text-3xl font-bold tracking-tight text-foreground">Content Layer</h3>
  //         <p className="text-muted-foreground text-center max-w-sm">
  //           Everything inside the component sits perfectly above the dotted pattern.
  //         </p>
  //       </div>
  //     </DotBackground>
  //   </div>
  // ),
  // "perspective-grid": () => (
  //   <div className="w-full h-full overflow-hidden relative">
  //     <PerspectiveGrid gridLineGap={40} fadeRadius={70} />
  //     <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-20">
  //       <h3 className="text-4xl md:text-6xl font-black tracking-tighter uppercase text-foreground">Cyberspace</h3>
  //       <p className="text-muted-foreground text-center max-w-sm mt-4 font-mono text-sm">
  //         A fully 3D CSS grid projection that automatically adapts to your theme.
  //       </p>
  //     </div>
  //   </div>
  // ),
  // "particles": () => (
  //   <div className="w-full h-full overflow-hidden relative bg-background">
  //     <Particles quantity={100} size={1} className="absolute inset-0 z-0" />
  //     <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-20">
  //       <h3 className="text-4xl md:text-6xl font-light tracking-tight text-foreground">Quantum Space</h3>
  //       <p className="text-muted-foreground text-center max-w-sm mt-4">
  //         Interactive particle simulation with physics and cursor magnetism.
  //       </p>
  //     </div>
  //   </div>
  // ),
  "cinematic-error": () => (
    <div className="w-full h-full rounded-2xl overflow-hidden border border-border/50">
      <CinematicError />
    </div>
  ),
  "nexus-card": () => (
    <div className="flex items-center justify-center w-full h-full p-4 sm:p-8">
      <NexusCard className="w-80 h-96">
        <h2 className="text-2xl font-bold text-foreground mb-2">Nexus Design</h2>
        <p className="text-muted-foreground">Hover over this card to experience the premium tactile feel, reactive spotlight, and 3D parallax tilt.</p>
      </NexusCard>
    </div>
  ),
  "scroll-text-reveal": () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const scrollContainer = React.useRef<HTMLDivElement>(null);
    return (
      <div ref={scrollContainer} className="w-full h-full overflow-y-auto">
        <div className="min-h-[150vh] flex flex-col items-center">
          <div className="h-[70vh] flex items-center justify-center text-muted-foreground w-full">
            <span className="animate-pulse">Scroll down to reveal text ↓</span>
          </div>
          <div className="py-20 px-8 max-w-4xl flex items-center justify-center">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-center">
              <ScrollTextReveal container={scrollContainer}>
                The future of UI design is here. Experience seamless, highly optimized animations that elevate your application's feel.
              </ScrollTextReveal>
            </h2>
          </div>
          <div className="h-[60vh] flex items-center justify-center text-muted-foreground w-full">
            <span className="animate-pulse">Scroll up to reverse ↑</span>
          </div>
        </div>
      </div>
    );
  },
  "cursor-glow-button": () => (
    <div className="flex items-center justify-center w-full h-full p-4">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-3xl justify-items-center">
        <CursorGlowButton variant="default">Primary</CursorGlowButton>
        <CursorGlowButton variant="secondary">Secondary</CursorGlowButton>
        <CursorGlowButton variant="outline">Outline</CursorGlowButton>
        <CursorGlowButton variant="destructive" glowColor="rgba(239, 68, 68, 0.8)">Destructive</CursorGlowButton>
        <CursorGlowButton variant="ghost">Ghost</CursorGlowButton>
        <CursorGlowButton variant="link">Link</CursorGlowButton>
      </div>
    </div>
  ),
  "dynamic-form": DynamicFormPreview,
};
