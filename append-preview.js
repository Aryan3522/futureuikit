const fs = require('fs');
const path = require('path');

const previewRegistryPath = path.join(__dirname, 'src', 'route-components', 'PreviewRegistry.tsx');
const previewEntry = `
function OTPVerificationPreview() {
  return (
    <PreviewContainer title="OTP Verification" description="A premium OTP Verification component with Framer Motion animations." isVirtualScreen={true}>
      <div className="w-full flex items-center justify-center p-4 min-h-[400px]">
        <OTPVerification />
      </div>
    </PreviewContainer>
  );
}
`;

fs.appendFileSync(previewRegistryPath, '\n' + previewEntry);
console.log('Successfully appended OTPVerificationPreview to PreviewRegistry.tsx');
