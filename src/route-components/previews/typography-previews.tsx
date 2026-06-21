"use client";

import React from "react";
import {
  Heading,
  Text,
  Label,
  Code,
} from "../preview-engine/preview-utils";
import { PreviewContainer, DEFAULT_COLORS } from "../preview-engine/PreviewContainer";

export const TextSystemPreview: React.FC = () => {
    const [previewColor, setPreviewColor] = React.useState<any>("default");
    const [previewVariant, setPreviewVariant] = React.useState<any>("solid");
  return (
    <PreviewContainer title="Text System" description="A robust and fully responsive typography system." align="start" colors={DEFAULT_COLORS} activeColor={previewColor} onColorChange={setPreviewColor} variants={["solid", "outline", "ghost", "link"]} activeVariant={previewVariant} onVariantChange={setPreviewVariant}>
      <div className="max-w-2xl w-full flex flex-col gap-8 select-text text-left p-6 md:p-12">
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
    </PreviewContainer>
  );
};
