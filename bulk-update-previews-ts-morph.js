const { Project, SyntaxKind } = require('ts-morph');
const path = require('path');

const project = new Project();
project.addSourceFilesAtPaths("src/route-components/previews/*-previews.tsx");

for (const sourceFile of project.getSourceFiles()) {
  let needsSave = false;
  
  // 1. Add DEFAULT_COLORS import if missing but PreviewContainer is imported
  const previewContainerImport = sourceFile.getImportDeclaration(decl => decl.getModuleSpecifierValue().includes("PreviewContainer"));
  if (previewContainerImport) {
    const hasDefaultColors = previewContainerImport.getNamedImports().some(n => n.getName() === "DEFAULT_COLORS");
    if (!hasDefaultColors) {
      previewContainerImport.addNamedImport("DEFAULT_COLORS");
      needsSave = true;
    }
  }

  // 2. Find all exported arrow functions or functions ending with Preview
  const varDecls = sourceFile.getVariableDeclarations();
  for (const varDecl of varDecls) {
    if (!varDecl.getName().endsWith("Preview")) continue;
    
    const initializer = varDecl.getInitializerIfKind(SyntaxKind.ArrowFunction) || varDecl.getInitializerIfKind(SyntaxKind.FunctionExpression);
    if (!initializer) continue;

    const body = initializer.getBody();
    if (!body || body.getKind() !== SyntaxKind.Block) continue;

    // Check if body returns a PreviewContainer
    const returnStatements = body.getDescendantsOfKind(SyntaxKind.ReturnStatement);
    let previewContainerJsx = null;

    for (const ret of returnStatements) {
      const expr = ret.getExpression();
      if (!expr) continue;
      
      // Look for JsxElement
      if (expr.getKind() === SyntaxKind.JsxElement) {
        if (expr.getOpeningElement().getTagNameNode().getText() === "PreviewContainer") {
          previewContainerJsx = expr;
          break;
        }
      } else if (expr.getKind() === SyntaxKind.ParenthesizedExpression) {
        const inner = expr.getExpression();
        if (inner && inner.getKind() === SyntaxKind.JsxElement) {
           if (inner.getOpeningElement().getTagNameNode().getText() === "PreviewContainer") {
              previewContainerJsx = inner;
              break;
           }
        }
      }
    }

    if (!previewContainerJsx) continue;

    // 3. Inject useState hooks into the body
    let hasColorState = false;
    let hasVariantState = false;
    
    for (const stmt of body.getStatements()) {
      if (stmt.getKind() === SyntaxKind.VariableStatement) {
        if (stmt.getText().includes('previewColor')) hasColorState = true;
        if (stmt.getText().includes('previewVariant')) hasVariantState = true;
      }
    }

    if (!hasColorState) {
      body.insertStatements(0, `const [previewColor, setPreviewColor] = React.useState<any>("default");`);
      needsSave = true;
    }
    if (!hasVariantState) {
      body.insertStatements(1, `const [previewVariant, setPreviewVariant] = React.useState<any>("solid");`);
      needsSave = true;
    }

    // 4. Add props to PreviewContainer
    const openingElem = previewContainerJsx.getOpeningElement();
    
    if (!openingElem.getAttribute('colors')) {
      openingElem.addAttribute({ name: 'colors', initializer: '{DEFAULT_COLORS}' });
      needsSave = true;
    }
    if (!openingElem.getAttribute('activeColor')) {
      openingElem.addAttribute({ name: 'activeColor', initializer: '{previewColor}' });
      needsSave = true;
    }
    if (!openingElem.getAttribute('onColorChange')) {
      openingElem.addAttribute({ name: 'onColorChange', initializer: '{setPreviewColor}' });
      needsSave = true;
    }
    if (!openingElem.getAttribute('variants') && !openingElem.getText().includes('variants={[')) {
      // Don't overwrite existing variants, but add if absent
      openingElem.addAttribute({ name: 'variants', initializer: '{["solid", "outline", "ghost", "link"]}' });
      openingElem.addAttribute({ name: 'activeVariant', initializer: '{previewVariant}' });
      openingElem.addAttribute({ name: 'onVariantChange', initializer: '{setPreviewVariant}' });
      needsSave = true;
    } else if (openingElem.getAttribute('variants') && !openingElem.getAttribute('activeVariant')) {
      openingElem.addAttribute({ name: 'activeVariant', initializer: '{previewVariant}' });
      openingElem.addAttribute({ name: 'onVariantChange', initializer: '{setPreviewVariant}' });
      needsSave = true;
    }

    // 5. Inject color and variant props to all child components that are capitalized
    const children = previewContainerJsx.getJsxChildren();
    
    // recursive helper to find all JsxElements
    function processJsxElements(nodes) {
      for (const node of nodes) {
        if (node.getKind() === SyntaxKind.JsxElement) {
          const tagName = node.getOpeningElement().getTagNameNode().getText();
          if (/^[A-Z]/.test(tagName) && !['BrowserWindow', 'PreviewContainer', 'motion', 'AnimatePresence', 'Badge', 'Card', 'CardContent', 'CardHeader', 'Icons', 'TooltipProvider', 'div', 'span', 'p'].includes(tagName)) {
            const openElem = node.getOpeningElement();
            if (!openElem.getAttribute('color') && !openElem.getText().includes('...')) {
              openElem.addAttribute({ name: 'color', initializer: '{previewColor}' });
            }
            if (!openElem.getAttribute('variant') && !openElem.getText().includes('...')) {
               openElem.addAttribute({ name: 'variant', initializer: '{previewVariant}' });
            }
          }
          processJsxElements(node.getJsxChildren());
        } else if (node.getKind() === SyntaxKind.JsxSelfClosingElement) {
          const tagName = node.getTagNameNode().getText();
          if (/^[A-Z]/.test(tagName) && !['BrowserWindow', 'PreviewContainer', 'motion', 'AnimatePresence', 'Badge', 'Card', 'CardContent', 'CardHeader', 'Icons', 'TooltipProvider'].includes(tagName)) {
             if (!node.getAttribute('color') && !node.getText().includes('...')) {
                node.addAttribute({ name: 'color', initializer: '{previewColor}' });
             }
             if (!node.getAttribute('variant') && !node.getText().includes('...')) {
                node.addAttribute({ name: 'variant', initializer: '{previewVariant}' });
             }
          }
        }
      }
    }
    
    processJsxElements(children);
  }

  if (needsSave) {
    sourceFile.saveSync();
    console.log(`Saved ${sourceFile.getBaseName()}`);
  }
}
