const fs = require('fs');
const path = require('path');

const previewRegistryPath = path.join(__dirname, 'src', 'route-components', 'PreviewRegistry.tsx');
let code = fs.readFileSync(previewRegistryPath, 'utf8');

if (!code.includes('import { PremiumUploadButton }')) {
  code = code.replace(
    /import { BmwM4 } from "@\/components\/ui\/bmw-m4";/,
    'import { BmwM4 } from "@/components/ui/bmw-m4";\nimport { PremiumUploadButton } from "@/components/ui/premium-upload-button";'
  );
}

const previewEntry = `
  "premium-upload-button": function PremiumUploadButtonPreview() {
    return (
      <PreviewContainer title="Premium Upload Button" description="A premium, highly interactive file upload button with various design variants." isVirtualScreen={true}>
        <div className="w-full flex items-center justify-center p-4 min-h-[400px]">
          <PremiumUploadButton />
        </div>
      </PreviewContainer>
    );
  }
`;

if (!code.includes('"premium-upload-button": function')) {
    const lastClosingBraceIdx = code.lastIndexOf('};');
    if (lastClosingBraceIdx !== -1) {
        code = code.slice(0, lastClosingBraceIdx) + ',\n' + previewEntry + '\n};\n';
        fs.writeFileSync(previewRegistryPath, code);
        console.log('Successfully injected premium-upload-button to PreviewRegistry.tsx');
    } else {
        console.error('Could not find }; at the end');
    }
} else {
    console.log('Already exists');
}
