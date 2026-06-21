const fs = require('fs');

const file = 'src/route-components/previews/feedback-previews.tsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(/<Toggle variant="solid"/g, '<Toggle variant="default"');

fs.writeFileSync(file, content, 'utf8');
console.log('Fixed Toggle 2');
