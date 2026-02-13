import { motion } from 'framer-motion';

// Syntax highlighting rules per language
const highlightRules = {
  'C#': [
    { pattern: /(\/\/.*)$/gm, className: 'text-slate-500' },                     // comments
    { pattern: /("(?:[^"\\]|\\.)*")/g, className: 'text-amber-300' },            // strings
    { pattern: /\b(var|new|await|using|async|public|private|class|static|return|void|string|int|bool|null|true|false)\b/g, className: 'text-violet-400' }, // keywords
    { pattern: /\b(HttpClient|AuthenticationHeaderValue|HttpResponseMessage|User)\b/g, className: 'text-emerald-400' }, // types
    { pattern: /\.(GetAsync|PostAsync|ReadFromJsonAsync|DefaultRequestHeaders|Authorization|Content)\b/g, className: 'text-blue-400', keepDot: true }, // methods
  ],
  'JSON': [
    { pattern: /("(?:[^"\\]|\\.)*")\s*:/g, className: 'text-blue-400', group: 1 },  // keys
    { pattern: /:\s*("(?:[^"\\]|\\.)*")/g, className: 'text-amber-300', group: 1 },  // string values
    { pattern: /:\s*(\d+)/g, className: 'text-emerald-400', group: 1 },               // numbers
    { pattern: /:\s*(true|false|null)/g, className: 'text-violet-400', group: 1 },    // literals
  ],
  'SQL': [
    { pattern: /(--.*$)/gm, className: 'text-slate-500' },                        // comments
    { pattern: /("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')/g, className: 'text-amber-300' }, // strings
    { pattern: /\b(SELECT|FROM|WHERE|JOIN|ON|INSERT|UPDATE|DELETE|INTO|VALUES|SET|AND|OR|ORDER BY|GROUP BY|LIMIT|OFFSET|AS|LEFT|RIGHT|INNER|OUTER|CREATE|INDEX|NOT|NULL|IN|EXISTS|DISTINCT|COUNT|SUM|AVG|EXPLAIN)\b/gi, className: 'text-violet-400' }, // keywords
    { pattern: /(\*)/g, className: 'text-white' },                                // wildcard
    { pattern: /\b(\d+)\b/g, className: 'text-emerald-400' },                     // numbers
  ],
  'HTTP': [
    { pattern: /^(GET|POST|PUT|DELETE|PATCH|HEAD|OPTIONS)\b/gm, className: 'text-emerald-400' }, // methods
    { pattern: /(\/\S+)/g, className: 'text-blue-400' },                          // paths
    { pattern: /^(HTTP\/[\d.]+)\s+(\d+)\s+(.*)$/gm, className: 'text-violet-400' }, // status line
    { pattern: /^([\w-]+):/gm, className: 'text-cyan-400' },                      // header names
    { pattern: /("(?:[^"\\]|\\.)*")/g, className: 'text-amber-300' },             // strings
  ],
  'GraphQL': [
    { pattern: /\b(query|mutation|subscription|fragment|on|type|input|enum|interface|union|scalar|extend|schema|directive)\b/g, className: 'text-violet-400' },
    { pattern: /("(?:[^"\\]|\\.)*")/g, className: 'text-amber-300' },
    { pattern: /\b(\d+)\b/g, className: 'text-emerald-400' },
  ],
};

function highlightCode(code, language) {
  const rules = highlightRules[language];
  if (!rules) return [{ text: code, className: '' }];

  // Build a flat list of spans with positions
  const spans = [];

  for (const rule of rules) {
    const regex = new RegExp(rule.pattern.source, rule.pattern.flags);
    let match;
    while ((match = regex.exec(code)) !== null) {
      const group = rule.group || 0;
      const text = match[group];
      const start = match.index + (group ? match[0].indexOf(text) : 0);
      spans.push({
        start,
        end: start + text.length,
        className: rule.className,
        text,
      });
    }
  }

  // Sort by start position, earlier first; longer match wins on ties
  spans.sort((a, b) => a.start - b.start || b.end - a.end);

  // Merge into non-overlapping segments
  const result = [];
  let cursor = 0;

  for (const span of spans) {
    if (span.start < cursor) continue; // skip overlapping
    if (span.start > cursor) {
      result.push({ text: code.slice(cursor, span.start), className: '' });
    }
    result.push({ text: span.text, className: span.className });
    cursor = span.end;
  }
  if (cursor < code.length) {
    result.push({ text: code.slice(cursor), className: '' });
  }

  return result;
}

export default function CodeSnippet({
  code,
  language = '',
  delay = 0,
  className = '',
}) {
  const tokens = highlightCode(code, language);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
      className={`overflow-hidden rounded-xl ${className}`}
    >
      {/* Header bar */}
      {language && (
        <div className="flex items-center gap-2 bg-slate-900/80 px-4 py-2 border-b border-slate-700/50">
          <div className="flex gap-1.5">
            <span className="h-3 w-3 rounded-full bg-red-500/60" />
            <span className="h-3 w-3 rounded-full bg-yellow-500/60" />
            <span className="h-3 w-3 rounded-full bg-green-500/60" />
          </div>
          <span className="ml-2 text-xs font-medium text-slate-500 uppercase tracking-wider">
            {language}
          </span>
        </div>
      )}
      {/* Code body */}
      <pre className="bg-slate-950/60 p-4 overflow-x-auto">
        <code className="text-sm font-mono leading-relaxed text-slate-300 whitespace-pre">
          {tokens.map((token, i) =>
            token.className ? (
              <span key={i} className={token.className}>{token.text}</span>
            ) : (
              <span key={i}>{token.text}</span>
            )
          )}
        </code>
      </pre>
    </motion.div>
  );
}
