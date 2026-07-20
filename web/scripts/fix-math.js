const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', '..', '..', '..', 'd:', 'Ki4_Summer_2026', 'CSD201', 'Ly-Thuyet', 'TrangWebKienThucCSD', 'web', 'src', 'content', 'theories');

const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Replace big block equations
  content = content.replace(/\$\$\s*\|\s*Height\(LeftChild\)\s*-\s*Height\(RightChild\)\s*\|\s*\\le\s*1\s*\$\$/g, '| Height(LeftChild) - Height(RightChild) | <= 1');
  
  // Replace arrows
  content = content.replace(/\\rightarrow/g, '->');
  
  // Replace inline equations
  content = content.replace(/\$([^\$]+)\$/g, (match, p1) => {
    let clean = p1.trim();
    clean = clean.replace(/\\log_2/g, 'log_2');
    clean = clean.replace(/\\log/g, 'log');
    clean = clean.replace(/\\le/g, '<=');
    
    // If it looks like Big O notation
    if (clean.startsWith('O(')) {
      return '`' + clean + '`';
    }
    // If it's just a single letter or short expression like V, V-1, D+W, etc.
    return '`' + clean + '`';
  });
  
  fs.writeFileSync(filePath, content);
}
console.log("Done fixing math formatting!");
