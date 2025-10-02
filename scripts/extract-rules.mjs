import fs from 'fs/promises';
import path from 'path';
// pdf-parse has a debug block in index.js when module.parent is falsy under ESM.
// Import the actual implementation to avoid that side effect.
import pdf from 'pdf-parse/lib/pdf-parse.js';

const root = process.cwd();
const inputDir = path.join(root, 'public', 'rules');
const files = [
  { pdf: 'r1.pdf', md: 'r1.md', title: '한국모래상자치료학회 윤리규정' },
  { pdf: 'r2.pdf', md: 'r2.md', title: '연구윤리규정' },
  { pdf: 'r3.pdf', md: 'r3.md', title: '자격규정' },
  { pdf: 'r4.pdf', md: 'r4.md', title: '편집규정' },
];

async function extract() {
  for (const f of files) {
    const pdfPath = path.join(inputDir, f.pdf);
    const mdPath = path.join(inputDir, f.md);
    try {
      const data = await fs.readFile(pdfPath);
      const result = await pdf(data);
      const text = result.text || '';
      const md = `# ${f.title}\n\n${text.trim()}\n`;
      await fs.writeFile(mdPath, md, 'utf8');
      console.log(`✔ Extracted ${f.pdf} -> ${f.md} (${text.length} chars)`);
    } catch (err) {
      console.error(`✖ Failed to extract ${f.pdf}:`, err.message || err);
      process.exitCode = 1;
    }
  }
}

extract();
