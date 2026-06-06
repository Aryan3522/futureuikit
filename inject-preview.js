const fs = require('fs');
const path = require('path');

const previewRegistryPath = path.join(__dirname, 'src', 'route-components', 'PreviewRegistry.tsx');
let code = fs.readFileSync(previewRegistryPath, 'utf8');

if (!code.includes('import { OTPVerification }')) {
  code = code.replace(
    /import { BmwM4 } from "@\/components\/ui\/bmw-m4";/,
    'import { BmwM4 } from "@/components/ui/bmw-m4";\nimport { OTPVerification } from "@/components/ui/otp-verification";'
  );
}

const previewEntry = `
  "otp-verification": function OTPVerificationPreview() {
    return (
      <PreviewContainer title="OTP Verification" description="A premium OTP Verification component with Framer Motion animations." isVirtualScreen={true}>
        <div className="w-full flex items-center justify-center p-4 min-h-[400px]">
          <OTPVerification />
        </div>
      </PreviewContainer>
    );
  }
`;

// Replace the very last `}` with `},` + previewEntry + `};`
if (code.trim().endsWith('};')) {
    code = code.replace(/\n\s*\}\s*;\s*$/, '\n},\n' + previewEntry + '\n};');
} else if (code.trim().endsWith('}')) {
    code = code.replace(/\n\s*\}\s*$/, '\n},\n' + previewEntry + '\n};');
}

fs.writeFileSync(previewRegistryPath, code);
console.log('Successfully injected otp-verification to PreviewRegistry.tsx');
