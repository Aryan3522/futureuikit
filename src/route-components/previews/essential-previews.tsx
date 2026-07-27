"use client";

import React from "react";
import { Mail, Search, User, CreditCard, Bell } from "lucide-react";
import { PreviewContainer, DEFAULT_COLORS } from "../preview-engine/PreviewContainer";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Avatar, AvatarGroup } from "@/components/ui/avatar";
import { Progress, CircularProgress } from "@/components/ui/progress";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Alert } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";

export const InputPreview: React.FC = () => {
  const [variant, setVariant] = React.useState<any>("outline");
  const [color, setColor] = React.useState<any>("default");

  return (
    <PreviewContainer
      title="Input"
      variants={["outline", "solid", "ghost", "underline"] as const}
      activeVariant={variant}
      onVariantChange={setVariant}
      colors={DEFAULT_COLORS}
      activeColor={color}
      onColorChange={setColor}
    >
      <div className="flex flex-col gap-5 w-full max-w-sm p-8">
        <Input variant={variant} color={color} placeholder="Your name" />
        <Input variant={variant} color={color} type="email" placeholder="you@example.com" leftIcon={<Mail />} />
        <Input variant={variant} color={color} placeholder="Search components..." leftIcon={<Search />} />
        <Input variant={variant} color={color} placeholder="Disabled field" disabled />
        <Input variant={variant} placeholder="Invalid value" error defaultValue="not-an-email" />
      </div>
    </PreviewContainer>
  );
};

export const TextareaPreview: React.FC = () => {
  const [variant, setVariant] = React.useState<any>("outline");
  const [color, setColor] = React.useState<any>("default");

  return (
    <PreviewContainer
      title="Textarea"
      variants={["outline", "solid", "ghost"] as const}
      activeVariant={variant}
      onVariantChange={setVariant}
      colors={DEFAULT_COLORS}
      activeColor={color}
      onColorChange={setColor}
    >
      <div className="flex flex-col gap-5 w-full max-w-md p-8">
        <Textarea variant={variant} color={color} placeholder="Write your message..." rows={4} />
        <Textarea variant={variant} color={color} placeholder="This one grows as you type…" autoResize rows={2} />
      </div>
    </PreviewContainer>
  );
};

export const CheckboxPreview: React.FC = () => {
  const [color, setColor] = React.useState<any>("default");
  const [shape, setShape] = React.useState<any>("default");

  return (
    <PreviewContainer
      title="Checkbox"
      variants={["default", "square", "rounded", "sharp"] as const}
      activeVariant={shape}
      onVariantChange={setShape}
      colors={DEFAULT_COLORS}
      activeColor={color}
      onColorChange={setColor}
    >
      <div className="flex flex-col gap-5 p-8">
        <Checkbox color={color} shape={shape} label="Accept terms and conditions" defaultChecked />
        <Checkbox color={color} shape={shape} label="Subscribe to the newsletter" />
        <Checkbox color={color} shape={shape} size="lg" label="Enable two-factor authentication" defaultChecked />
        <Checkbox color={color} shape={shape} label="Disabled option" disabled />
      </div>
    </PreviewContainer>
  );
};

export const SwitchPreview: React.FC = () => {
  const [color, setColor] = React.useState<any>("default");

  return (
    <PreviewContainer
      title="Switch"
      colors={DEFAULT_COLORS}
      activeColor={color}
      onColorChange={setColor}
    >
      <div className="flex flex-col gap-6 p-8">
        <Switch color={color} label="Email notifications" defaultChecked />
        <Switch color={color} label="Marketing messages" />
        <Switch color={color} size="lg" label="Auto-save drafts" defaultChecked />
        <Switch color={color} size="sm" label="Compact mode" />
        <Switch color={color} label="Disabled toggle" disabled />
      </div>
    </PreviewContainer>
  );
};

export const LabelPreview: React.FC = () => {
  const [color, setColor] = React.useState<any>("default");

  return (
    <PreviewContainer
      title="Label"
      colors={DEFAULT_COLORS}
      activeColor={color}
      onColorChange={setColor}
    >
      <div className="flex flex-col gap-5 w-full max-w-sm p-8">
        <div className="flex flex-col gap-2">
          <Label color={color} htmlFor="lp-email" required>Email address</Label>
          <Input id="lp-email" placeholder="you@example.com" />
        </div>
        <div className="flex flex-col gap-2">
          <Label color={color} htmlFor="lp-bio" hint="(optional)">Short bio</Label>
          <Textarea id="lp-bio" placeholder="A sentence about you" rows={3} />
        </div>
      </div>
    </PreviewContainer>
  );
};

export const TabsPreview: React.FC = () => {
  const [variant, setVariant] = React.useState<any>("solid");
  const [color, setColor] = React.useState<any>("default");

  return (
    <PreviewContainer
      title="Tabs"
      variants={["solid", "pill", "underline", "ghost"] as const}
      activeVariant={variant}
      onVariantChange={setVariant}
      colors={DEFAULT_COLORS}
      activeColor={color}
      onColorChange={setColor}
    >
      <div className="w-full max-w-md p-8">
        <Tabs defaultValue="account" variant={variant} color={color} shape={variant === "pill" ? "rounded" : "default"}>
          <TabsList>
            <TabsTrigger value="account"><User className="size-3.5 mr-1.5 inline" />Account</TabsTrigger>
            <TabsTrigger value="billing"><CreditCard className="size-3.5 mr-1.5 inline" />Billing</TabsTrigger>
            <TabsTrigger value="alerts"><Bell className="size-3.5 mr-1.5 inline" />Alerts</TabsTrigger>
          </TabsList>
          <TabsContent value="account" className="text-sm text-muted-foreground leading-relaxed">
            Manage your profile, display name, and connected accounts from one place.
          </TabsContent>
          <TabsContent value="billing" className="text-sm text-muted-foreground leading-relaxed">
            View invoices, update payment methods, and manage your subscription plan.
          </TabsContent>
          <TabsContent value="alerts" className="text-sm text-muted-foreground leading-relaxed">
            Choose which notifications you receive and how they are delivered.
          </TabsContent>
        </Tabs>
      </div>
    </PreviewContainer>
  );
};

export const AvatarPreview: React.FC = () => {
  const [color, setColor] = React.useState<any>("default");
  const [shape, setShape] = React.useState<any>("default");

  return (
    <PreviewContainer
      title="Avatar"
      variants={["default", "square", "rounded", "sharp"] as const}
      activeVariant={shape}
      onVariantChange={setShape}
      colors={DEFAULT_COLORS}
      activeColor={color}
      onColorChange={setColor}
    >
      <div className="flex flex-col items-center gap-8 p-8">
        <div className="flex items-end gap-4">
          <Avatar color={color} shape={shape} size="xs" alt="Aryan Hooda" />
          <Avatar color={color} shape={shape} size="sm" alt="Jane Doe" />
          <Avatar color={color} shape={shape} size="md" alt="Sam Smith" status="online" />
          <Avatar color={color} shape={shape} size="lg" alt="Kai Ito" status="busy" />
          <Avatar color={color} shape={shape} size="xl" alt="Ada Lovelace" status="away" />
        </div>
        <AvatarGroup max={4} shape={shape}>
          <Avatar color={color} alt="Aryan Hooda" />
          <Avatar color="blue" alt="Jane Doe" />
          <Avatar color="emerald" alt="Sam Smith" />
          <Avatar color="rose" alt="Kai Ito" />
          <Avatar color="amber" alt="Ada Lovelace" />
          <Avatar color="violet" alt="Alan Turing" />
        </AvatarGroup>
      </div>
    </PreviewContainer>
  );
};

export const ProgressPreview: React.FC = () => {
  const [color, setColor] = React.useState<any>("default");
  const [value, setValue] = React.useState(64);

  React.useEffect(() => {
    const t = setInterval(() => setValue((v) => (v >= 100 ? 8 : v + 4)), 900);
    return () => clearInterval(t);
  }, []);

  return (
    <PreviewContainer
      title="Progress"
      colors={DEFAULT_COLORS}
      activeColor={color}
      onColorChange={setColor}
    >
      <div className="flex flex-col gap-8 w-full max-w-sm p-8">
        <Progress color={color} value={value} showValue />
        <Progress color={color} value={40} size="sm" />
        <Progress color={color} value={80} size="lg" />
        <Progress color={color} indeterminate />
        <div className="flex items-center justify-center gap-6 pt-2">
          <CircularProgress color={color} value={value} showValue />
          <CircularProgress color={color} value={25} size={48} strokeWidth={5} />
          <CircularProgress color={color} value={90} size={80} strokeWidth={8} showValue />
        </div>
      </div>
    </PreviewContainer>
  );
};

const teamRows = [
  { name: "Aryan Hooda", role: "Founder", status: "Active", plan: "Pro" },
  { name: "Jane Doe", role: "Designer", status: "Active", plan: "Team" },
  { name: "Sam Smith", role: "Engineer", status: "Invited", plan: "Team" },
  { name: "Kai Ito", role: "Marketing", status: "Active", plan: "Free" },
];

export const TablePreview: React.FC = () => {
  const [variant, setVariant] = React.useState<any>("default");
  const [color, setColor] = React.useState<any>("default");

  return (
    <PreviewContainer
      title="Table"
      variants={["default", "striped", "bordered", "minimal"] as const}
      activeVariant={variant}
      onVariantChange={setVariant}
      colors={DEFAULT_COLORS}
      activeColor={color}
      onColorChange={setColor}
    >
      <div className="w-full max-w-2xl p-8">
        <Table variant={variant} color={color} hoverable>
          <TableHeader>
            <TableRow>
              <TableHead>Member</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Plan</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {teamRows.map((row) => (
              <TableRow key={row.name}>
                <TableCell className="font-medium">{row.name}</TableCell>
                <TableCell className="text-muted-foreground">{row.role}</TableCell>
                <TableCell>{row.status}</TableCell>
                <TableCell>{row.plan}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </PreviewContainer>
  );
};

export const BreadcrumbPreview: React.FC = () => {
  const [color, setColor] = React.useState<any>("default");

  return (
    <PreviewContainer
      title="Breadcrumb"
      colors={DEFAULT_COLORS}
      activeColor={color}
      onColorChange={setColor}
    >
      <div className="flex flex-col gap-8 p-8">
        <Breadcrumb color={color}>
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Components</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
          </BreadcrumbItem>
        </Breadcrumb>
        <Breadcrumb color={color} size="lg">
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>/</BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Settings</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>/</BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbPage>Billing</BreadcrumbPage>
          </BreadcrumbItem>
        </Breadcrumb>
      </div>
    </PreviewContainer>
  );
};

export const AlertPreview: React.FC = () => {
  const [variant, setVariant] = React.useState<any>("soft");
  const [color, setColor] = React.useState<any>("blue");

  return (
    <PreviewContainer
      title="Alert"
      variants={["soft", "solid", "outline"] as const}
      activeVariant={variant}
      onVariantChange={setVariant}
      colors={DEFAULT_COLORS}
      activeColor={color}
      onColorChange={setColor}
    >
      <div className="flex flex-col gap-4 w-full max-w-lg p-8">
        <Alert variant={variant} color={color} status="info" title="Heads up">
          A new version of the CLI is available. Run the update when convenient.
        </Alert>
        <Alert variant={variant} color="emerald" status="success" title="Deployed" dismissible>
          Your site is live. All 12 pages built without warnings.
        </Alert>
        <Alert variant={variant} color="amber" status="warning" title="Storage almost full">
          You have used 90% of your plan. Upgrade to keep uploading.
        </Alert>
        <Alert variant={variant} color="rose" status="error" title="Payment failed" dismissible>
          Your card was declined. Update your billing details to continue.
        </Alert>
      </div>
    </PreviewContainer>
  );
};

export const SeparatorPreview: React.FC = () => {
  const [variant, setVariant] = React.useState<any>("solid");
  const [color, setColor] = React.useState<any>("default");

  return (
    <PreviewContainer
      title="Separator"
      variants={["solid", "dashed", "dotted", "gradient"] as const}
      activeVariant={variant}
      onVariantChange={setVariant}
      colors={DEFAULT_COLORS}
      activeColor={color}
      onColorChange={setColor}
    >
      <div className="flex flex-col gap-8 w-full max-w-md p-8">
        <div className="text-sm text-muted-foreground text-center">Section one</div>
        <Separator variant={variant} color={color} />
        <div className="text-sm text-muted-foreground text-center">Section two</div>
        <Separator variant={variant} color={color} label="or continue with" />
        <div className="flex items-center justify-center gap-4 h-10">
          <span className="text-sm text-muted-foreground">Left</span>
          <Separator orientation="vertical" variant={variant} color={color} />
          <span className="text-sm text-muted-foreground">Right</span>
        </div>
      </div>
    </PreviewContainer>
  );
};
