const ts = require("typescript");
const fs = require("fs");
const path = require("path");

function findFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        if (file === "node_modules" || file === ".next" || file === ".git" || file === "dist") continue;
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            findFiles(filePath, fileList);
        } else {
            if (/\.(ts|tsx|js|jsx|mjs)$/.test(file)) {
                fileList.push(filePath);
            }
        }
    }
    return fileList;
}

function processFile(filePath) {
    const code = fs.readFileSync(filePath, "utf8");
    const sourceFile = ts.createSourceFile(
        filePath,
        code,
        ts.ScriptTarget.Latest,
        true
    );

    const commentsToRemove = [];

    function visit(node) {
        const leading = ts.getLeadingCommentRanges(code, node.pos);
        if (leading) {
            for (const c of leading) commentsToRemove.push(c);
        }
        const trailing = ts.getTrailingCommentRanges(code, node.end);
        if (trailing) {
            for (const c of trailing) commentsToRemove.push(c);
        }
        ts.forEachChild(node, visit);
    }
    visit(sourceFile);

    const eofLeading = ts.getLeadingCommentRanges(code, sourceFile.endOfFileToken.pos);
    if (eofLeading) {
        for (const c of eofLeading) commentsToRemove.push(c);
    }

    if (commentsToRemove.length === 0) return false;

    const uniqueComments = [];
    const seen = new Set();
    for (const c of commentsToRemove) {
        const key = c.pos + "-" + c.end;
        if (!seen.has(key)) {
            seen.add(key);
            uniqueComments.push(c);
        }
    }

    const toRemove = uniqueComments.filter(c => {
        const text = code.substring(c.pos, c.end);
        if (c.kind === ts.SyntaxKind.MultiLineCommentTrivia && text.startsWith("/**")) {
            return false;
        }
        return true;
    });

    if (toRemove.length === 0) return false;

    toRemove.sort((a, b) => b.pos - a.pos);

    let newCode = code;
    for (const c of toRemove) {
        let start = c.pos;
        let end = c.end;

        if (start > 0 && newCode[start - 1] === '{' && end < newCode.length && newCode[end] === '}') {
            start -= 1;
            end += 1;
        }

        let lineStart = start - 1;
        let onlySpacesBefore = true;
        while (lineStart >= 0 && newCode[lineStart] !== '\n') {
            if (newCode[lineStart] !== ' ' && newCode[lineStart] !== '\t') {
                onlySpacesBefore = false;
                break;
            }
            lineStart--;
        }

        let lineEnd = end;
        let onlySpacesAfter = true;
        while (lineEnd < newCode.length && newCode[lineEnd] !== '\n' && newCode[lineEnd] !== '\r') {
            if (newCode[lineEnd] !== ' ' && newCode[lineEnd] !== '\t') {
                onlySpacesAfter = false;
                break;
            }
            lineEnd++;
        }

        if (onlySpacesBefore && onlySpacesAfter) {
            if (lineEnd < newCode.length && newCode[lineEnd] === '\r') lineEnd++;
            if (lineEnd < newCode.length && newCode[lineEnd] === '\n') lineEnd++;
            start = lineStart + 1;
            end = lineEnd;
        } else if (onlySpacesBefore && !onlySpacesAfter) {
            start = lineStart + 1;
        } else if (!onlySpacesBefore && onlySpacesAfter) {
             let spaceStart = start - 1;
             while (spaceStart >= 0 && (newCode[spaceStart] === ' ' || newCode[spaceStart] === '\t')) {
                 spaceStart--;
             }
             start = spaceStart + 1;
        } else {
             let spaceStart = start - 1;
             while (spaceStart >= 0 && (newCode[spaceStart] === ' ' || newCode[spaceStart] === '\t')) {
                 spaceStart--;
             }
             start = spaceStart + 1;
        }

        newCode = newCode.substring(0, start) + newCode.substring(end);
    }

    if (code === newCode) return false;
    fs.writeFileSync(filePath, newCode);
    return true;
}

const files = findFiles(path.join(__dirname, ".."));
let count = 0;
for (const file of files) {
    if (file.includes("scripts\\clean-comments.js")) continue;
    if (processFile(file)) {
        count++;
        console.log("Cleaned AST comments in", file.replace(path.join(__dirname, ".."), ""));
    }
}
console.log(`Finished AST cleaning comments in ${count} files.`);
