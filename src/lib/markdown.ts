/**
 * Parser de Markdown leve e seguro sem dependências externas.
 * Otimizado para Next.js App Router (Server Components & SSG).
 */

export function parseFrontmatter(rawContent: string): {
  data: Record<string, any>;
  content: string;
} {
  const frontmatterRegex = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/;
  const match = rawContent.match(frontmatterRegex);

  if (!match) {
    return { data: {}, content: rawContent.trim() };
  }

  const yamlBlock = match[1];
  const content = match[2].trim();
  const data: Record<string, any> = {};

  const lines = yamlBlock.split(/\r?\n/);
  let currentArrayKey: string | null = null;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    // Check array item
    if (trimmed.startsWith("- ") && currentArrayKey) {
      const itemVal = trimmed.slice(2).trim().replace(/^["']|["']$/g, "");
      if (Array.isArray(data[currentArrayKey])) {
        data[currentArrayKey].push(itemVal);
      }
      continue;
    }

    const colonIdx = line.indexOf(":");
    if (colonIdx === -1) continue;

    const key = line.slice(0, colonIdx).trim();
    const rawVal = line.slice(colonIdx + 1).trim();

    // Check inline array format: [a, b, c]
    if (rawVal.startsWith("[") && rawVal.endsWith("]")) {
      const items = rawVal
        .slice(1, -1)
        .split(",")
        .map((s) => s.trim().replace(/^["']|["']$/g, ""))
        .filter(Boolean);
      data[key] = items;
      currentArrayKey = null;
      continue;
    }

    if (rawVal === "") {
      data[key] = [];
      currentArrayKey = key;
    } else {
      currentArrayKey = null;
      let cleanVal = rawVal.replace(/^["']|["']$/g, "");
      if (cleanVal === "true") data[key] = true;
      else if (cleanVal === "false") data[key] = false;
      else data[key] = cleanVal;
    }
  }

  return { data, content };
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export function markdownToHtml(markdown: string): string {
  const lines = markdown.split(/\r?\n/);
  const output: string[] = [];
  let inCodeBlock = false;
  let codeBlockLang = "";
  let codeBlockContent: string[] = [];
  let inList = false;
  let listType: "ul" | "ol" = "ul";
  let inBlockquote = false;
  let blockquoteContent: string[] = [];
  let inTable = false;
  let tableRows: string[][] = [];

  const flushBlockquote = () => {
    if (inBlockquote) {
      const innerHtml = markdownToHtml(blockquoteContent.join("\n"));
      output.push(
        `<blockquote class="border-l-4 border-teal-500/80 bg-slate-900/40 pl-4 py-2 my-4 rounded-r text-slate-300 italic">${innerHtml}</blockquote>`
      );
      blockquoteContent = [];
      inBlockquote = false;
    }
  };

  const flushList = () => {
    if (inList) {
      output.push(listType === "ul" ? "</ul>" : "</ol>");
      inList = false;
    }
  };

  const flushTable = () => {
    if (inTable && tableRows.length > 0) {
      let tableHtml = '<div class="overflow-x-auto my-6"><table class="w-full text-left text-sm text-slate-300 border border-slate-800">';
      const [headerRow, ...bodyRows] = tableRows;
      
      tableHtml += '<thead class="bg-slate-900 text-slate-100 border-b border-slate-700"><tr>';
      headerRow.forEach((cell) => {
        tableHtml += `<th class="px-4 py-3 font-semibold font-mono text-teal-300">${formatInline(cell)}</th>`;
      });
      tableHtml += '</tr></thead><tbody>';

      bodyRows.forEach((row, idx) => {
        const bg = idx % 2 === 0 ? "bg-slate-950/40" : "bg-slate-900/30";
        tableHtml += `<tr class="${bg} border-b border-slate-800/80 hover:bg-slate-800/40 transition-colors">`;
        row.forEach((cell) => {
          tableHtml += `<td class="px-4 py-2.5">${formatInline(cell)}</td>`;
        });
        tableHtml += '</tr>';
      });

      tableHtml += '</tbody></table></div>';
      output.push(tableHtml);
      tableRows = [];
      inTable = false;
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Fenced Code Block
    if (line.trim().startsWith("```")) {
      flushBlockquote();
      flushList();
      flushTable();

      if (!inCodeBlock) {
        inCodeBlock = true;
        codeBlockLang = line.trim().slice(3).trim();
        codeBlockContent = [];
      } else {
        inCodeBlock = false;
        const codeText = escapeHtml(codeBlockContent.join("\n"));
        const langBadge = codeBlockLang
          ? `<div class="flex items-center justify-between px-4 py-1.5 bg-slate-900 border-b border-slate-800 text-xs font-mono text-slate-400"><span>${escapeHtml(
              codeBlockLang
            )}</span><span class="text-[10px] text-teal-400 uppercase">terminal / código</span></div>`
          : "";
        output.push(
          `<div class="my-6 rounded-lg overflow-hidden border border-slate-800 bg-[#060910] shadow-xl">${langBadge}<pre class="p-4 overflow-x-auto text-sm font-mono text-slate-200 leading-relaxed"><code>${codeText}</code></pre></div>`
        );
      }
      continue;
    }

    if (inCodeBlock) {
      codeBlockContent.push(line);
      continue;
    }

    // Table Row
    if (line.trim().startsWith("|") && line.trim().endsWith("|")) {
      flushBlockquote();
      flushList();

      const cells = line
        .trim()
        .slice(1, -1)
        .split("|")
        .map((c) => c.trim());

      // Check if separator line (e.g. |---|---|)
      const isSeparator = cells.every((c) => /^:?-+:?$/.test(c));
      if (!isSeparator) {
        inTable = true;
        tableRows.push(cells);
      }
      continue;
    } else if (inTable) {
      flushTable();
    }

    // Blockquote
    if (line.trim().startsWith(">")) {
      flushList();
      flushTable();
      inBlockquote = true;
      blockquoteContent.push(line.trim().slice(1).trim());
      continue;
    } else if (inBlockquote) {
      flushBlockquote();
    }

    // Blank line
    if (!line.trim()) {
      flushList();
      flushTable();
      continue;
    }

    // Headings
    const headingMatch = line.match(/^(#{1,6})\s+(.*)$/);
    if (headingMatch) {
      flushList();
      flushTable();
      const level = headingMatch[1].length;
      const text = headingMatch[2].trim();
      const slug = slugify(text);
      const classes: Record<number, string> = {
        1: "text-3xl font-extrabold text-white mt-8 mb-4 border-b border-slate-800 pb-2 tracking-tight",
        2: "text-2xl font-bold text-slate-100 mt-8 mb-3 border-b border-slate-800/60 pb-1.5 tracking-tight flex items-center group",
        3: "text-xl font-semibold text-teal-300 mt-6 mb-2 tracking-tight",
        4: "text-lg font-semibold text-slate-200 mt-4 mb-2",
        5: "text-base font-medium text-slate-300 mt-3 mb-1",
        6: "text-sm font-medium text-slate-400 mt-2 mb-1",
      };

      const anchor =
        level <= 3
          ? `<a href="#${slug}" class="text-teal-400/0 group-hover:text-teal-400 ml-2 text-sm transition-opacity" aria-hidden="true">#</a>`
          : "";

      output.push(
        `<h${level} id="${slug}" class="${classes[level]}">${formatInline(
          text
        )}${anchor}</h${level}>`
      );
      continue;
    }

    // Horizontal Rule
    if (/^(\*{3,}|-{3,}|_{3,})$/.test(line.trim())) {
      flushList();
      flushTable();
      output.push('<hr class="border-slate-800 my-8" />');
      continue;
    }

    // Unordered List item
    const ulMatch = line.match(/^[\*\-]\s+(.*)$/);
    if (ulMatch) {
      flushTable();
      if (!inList || listType !== "ul") {
        flushList();
        inList = true;
        listType = "ul";
        output.push('<ul class="list-disc list-inside space-y-1.5 my-3 text-slate-300 pl-2">');
      }
      output.push(`<li>${formatInline(ulMatch[1])}</li>`);
      continue;
    }

    // Ordered List item
    const olMatch = line.match(/^(\d+)\.\s+(.*)$/);
    if (olMatch) {
      flushTable();
      if (!inList || listType !== "ol") {
        flushList();
        inList = true;
        listType = "ol";
        output.push('<ol class="list-decimal list-inside space-y-1.5 my-3 text-slate-300 pl-2">');
      }
      output.push(`<li>${formatInline(olMatch[2])}</li>`);
      continue;
    }

    // Regular paragraph
    flushList();
    flushTable();
    output.push(
      `<p class="text-slate-300 leading-relaxed my-3 font-normal text-base md:text-[17px]">${formatInline(
        line.trim()
      )}</p>`
    );
  }

  flushBlockquote();
  flushList();
  flushTable();

  return output.join("\n");
}

function formatInline(text: string): string {
  let result = escapeHtml(text);

  // Inline code: `code`
  result = result.replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 font-mono text-[13px] text-teal-300">$1</code>');

  // Bold + Italic: ***text***
  result = result.replace(/\*\*\*([^*]+)\*\*\*/g, '<strong class="font-bold"><em class="italic">$1</em></strong>');

  // Bold: **text**
  result = result.replace(/\*\*([^*]+)\*\*/g, '<strong class="font-bold text-white">$1</strong>');

  // Italic: *text*
  result = result.replace(/\*([^*]+)\*/g, '<em class="italic text-slate-300">$1</em>');

  // Links: [text](url)
  result = result.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, linkText, url) => {
    const isExternal = url.startsWith("http://") || url.startsWith("https://");
    const targetAttrs = isExternal
      ? 'target="_blank" rel="noopener noreferrer"'
      : "";
    return `<a href="${url}" ${targetAttrs} class="text-teal-400 hover:text-teal-300 underline underline-offset-4 decoration-teal-500/40 hover:decoration-teal-400 transition-colors">${linkText}</a>`;
  });

  return result;
}
