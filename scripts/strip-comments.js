const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const skip = new Set(["node_modules", ".git", "scripts"]);

function walk(dir, files = []) {
  for (const name of fs.readdirSync(dir)) {
    if (skip.has(name)) continue;
    const p = path.join(dir, name);
    const st = fs.statSync(p);
    if (st.isDirectory()) walk(p, files);
    else if (/\.(js|css|html)$/.test(name)) files.push(p);
  }
  return files;
}

function stripHtml(content) {
  return content.replace(/^[ \t]*<!--[\s\S]*?-->[ \t]*\r?\n?/gm, "");
}

function stripCss(content) {
  let out = "";
  let i = 0;
  const len = content.length;

  while (i < len) {
    if (content[i] === "/" && content[i + 1] === "*") {
      const start = i;
      i += 2;
      while (i < len && !(content[i] === "*" && content[i + 1] === "/")) i++;
      i += 2;
      const comment = content.slice(start, i);
      const lineStart = content.lastIndexOf("\n", start - 1) + 1;
      const lineEnd = content.indexOf("\n", i);
      const before = content.slice(lineStart, start);
      const after = lineEnd === -1 ? content.slice(i) : content.slice(i, lineEnd);

      if (before.trim() || after.trim()) {
        if (before.trim() && after.trim()) out += " ";
      } else {
        out += "\n";
      }
      continue;
    }

    out += content[i++];
  }

  out = out.replace(/[ \t]+\r?\n/g, "\n");
  out = out.replace(/\n{3,}/g, "\n\n");
  return out;
}

function stripJs(content) {
  let out = "";
  let i = 0;
  const len = content.length;

  while (i < len) {
    const ch = content[i];

    if (ch === '"' || ch === "'" || ch === "`") {
      out += ch;
      i++;
      while (i < len) {
        if (content[i] === "\\") {
          out += content.slice(i, i + 2);
          i += 2;
          continue;
        }
        if (content[i] === ch) {
          out += ch;
          i++;
          break;
        }
        out += content[i++];
      }
      continue;
    }

    if (ch === "/" && content[i + 1] === "/") {
      while (i < len && content[i] !== "\n") i++;
      continue;
    }

    if (ch === "/" && content[i + 1] === "*") {
      i += 2;
      while (i < len && !(content[i] === "*" && content[i + 1] === "/")) i++;
      i += 2;
      continue;
    }

    out += ch;
    i++;
  }

  out = out.replace(/^[ \t]+\r?\n/gm, "");
  out = out.replace(/\n{3,}/g, "\n\n");
  return out;
}

function preserveLineEndings(original, updated) {
  if (original.includes("\r\n")) {
    return updated.replace(/\n/g, "\r\n");
  }
  return updated;
}

const files = walk(root);
let count = 0;

for (const file of files) {
  const ext = path.extname(file);
  let content = fs.readFileSync(file, "utf8");
  const orig = content;

  if (ext === ".html") content = stripHtml(content);
  else if (ext === ".css") content = stripCss(content);
  else if (ext === ".js") content = stripJs(content);

  content = preserveLineEndings(orig, content);

  if (content !== orig) {
    fs.writeFileSync(file, content.endsWith("\n") || content.endsWith("\r\n") ? content : `${content}\n`);
    count++;
  }
}

console.log(`Updated ${count} files`);
