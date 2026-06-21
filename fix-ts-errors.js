const { execSync } = require('child_process');
const fs = require('fs');

function run() {
  while (true) {
    console.log("Running tsc...");
    try {
      execSync('npx tsc --noEmit', { stdio: 'pipe' });
      console.log("No TypeScript errors!");
      break;
    } catch (error) {
      const output = error.stdout.toString();
      const lines = output.split('\n');
      let fixes = 0;

      for (const line of lines) {
        // e.g., src/route-components/previews/advanced-previews.tsx(77,27): error TS2322: Type '{ ... color: any; ... }' is not assignable...
        const match = line.match(/^([a-zA-Z0-9_\-\./]+)\((\d+),(\d+)\): error TS2322:.*Type '.*?' is not assignable to type '.*?'\./);
        if (match) {
          const file = match[1];
          const lineNum = parseInt(match[2], 10);

          if (!fs.existsSync(file)) continue;

          let fileContent = fs.readFileSync(file, 'utf8').split('\n');
          let codeLine = fileContent[lineNum - 1];

          let modified = false;
          if (codeLine.includes('color={previewColor}')) {
            codeLine = codeLine.replace(/\s*color=\{previewColor\}/g, '');
            modified = true;
          }
          if (codeLine.includes('variant={previewVariant}')) {
            codeLine = codeLine.replace(/\s*variant=\{previewVariant\}/g, '');
            modified = true;
          }

          if (modified) {
            fileContent[lineNum - 1] = codeLine;
            fs.writeFileSync(file, fileContent.join('\n'), 'utf8');
            fixes++;
          }
        }
      }

      if (fixes === 0) {
        console.log("No automatic fixes could be applied.");
        console.log(output);
        break;
      } else {
        console.log(`Applied ${fixes} fixes.`);
      }
    }
  }
}

run();
