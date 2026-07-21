"use client";

import React from "react";
import { Check, ChevronRight } from "lucide-react";

function parseInlineMarkdown(text: string): React.ReactNode[] {
  // Matches **bold**, *italic*, `code`
  const regex = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g;
  const parts = text.split(regex);

  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-bold text-ink">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("*") && part.endsWith("*")) {
      return (
        <em key={i} className="font-serif italic text-ink/90">
          {part.slice(1, -1)}
        </em>
      );
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code
          key={i}
          className="bg-ink text-bone font-mono text-xs px-1.5 py-0.5 rounded-sm mx-0.5 inline-block"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    return part;
  });
}

export function MarkdownRenderer({ content }: { content: string }) {
  if (!content) return null;

  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let inList = false;
  let listItems: React.ReactNode[] = [];
  let inOrderedList = false;
  let orderedItems: React.ReactNode[] = [];

  const flushLists = () => {
    if (inList && listItems.length > 0) {
      elements.push(
        <ul key={`ul-${elements.length}`} className="space-y-2 my-4 pl-1">
          {listItems}
        </ul>
      );
      listItems = [];
      inList = false;
    }
    if (inOrderedList && orderedItems.length > 0) {
      elements.push(
        <ol key={`ol-${elements.length}`} className="space-y-2.5 my-4">
          {orderedItems}
        </ol>
      );
      orderedItems = [];
      inOrderedList = false;
    }
  };

  lines.forEach((line, idx) => {
    const trimmed = line.trim();

    // Empty line
    if (!trimmed) {
      flushLists();
      return;
    }

    // Horizontal rule ---
    if (trimmed === "---" || trimmed === "***" || trimmed === "___") {
      flushLists();
      elements.push(
        <hr key={idx} className="my-6 border-0 hairline-t border-ink/30" />
      );
      return;
    }

    // Heading 1 (# title)
    if (trimmed.startsWith("# ")) {
      flushLists();
      elements.push(
        <h1
          key={idx}
          className="font-display font-black text-3xl md:text-4xl text-ink uppercase mt-8 mb-4 tracking-tight"
        >
          {parseInlineMarkdown(trimmed.slice(2))}
          <span className="text-signal">.</span>
        </h1>
      );
      return;
    }

    // Heading 2 (## title)
    if (trimmed.startsWith("## ")) {
      flushLists();
      elements.push(
        <h2
          key={idx}
          className="font-display font-black text-2xl md:text-3xl text-ink uppercase mt-8 mb-3 pb-2 hairline-b border-ink/40 tracking-tight flex items-center gap-2"
        >
          <span>{parseInlineMarkdown(trimmed.slice(3))}</span>
        </h2>
      );
      return;
    }

    // Heading 3 (### title)
    if (trimmed.startsWith("### ")) {
      flushLists();
      elements.push(
        <h3
          key={idx}
          className="mono-label text-sm md:text-base font-bold text-signal uppercase mt-6 mb-2 tracking-wider flex items-center gap-2"
        >
          <ChevronRight className="h-4 w-4 shrink-0 text-signal" />
          <span>{parseInlineMarkdown(trimmed.slice(4))}</span>
        </h3>
      );
      return;
    }

    // Blockquote (> quote)
    if (trimmed.startsWith("> ")) {
      flushLists();
      elements.push(
        <blockquote
          key={idx}
          className="my-5 p-4 md:p-5 bg-paper hairline border-ink border-l-4 border-l-signal font-serif italic text-lg md:text-xl text-ink/90 leading-snug shadow-[3px_3px_0_0_oklch(0.13_0.01_60)]"
        >
          {parseInlineMarkdown(trimmed.slice(2))}
        </blockquote>
      );
      return;
    }

    // Task list items (- [x] or - [ ])
    if (trimmed.startsWith("- [x]") || trimmed.startsWith("- [ ]")) {
      flushLists();
      const isChecked = trimmed.startsWith("- [x]");
      const itemText = trimmed.slice(5).trim();
      elements.push(
        <div key={idx} className="flex items-center gap-3 my-2 mono-label text-xs">
          <span
            className={`h-4 w-4 hairline border-ink grid place-items-center ${
              isChecked ? "brick text-bone" : "bg-bone"
            }`}
          >
            {isChecked && <Check className="h-3 w-3" />}
          </span>
          <span className={isChecked ? "line-through opacity-60" : ""}>
            {parseInlineMarkdown(itemText)}
          </span>
        </div>
      );
      return;
    }

    // Unordered List (* item or - item)
    if (trimmed.startsWith("* ") || trimmed.startsWith("- ")) {
      inList = true;
      const itemContent = trimmed.slice(2).trim();
      listItems.push(
        <li key={idx} className="flex items-start gap-2.5 text-ink leading-relaxed">
          <span className="h-1.5 w-1.5 rounded-none bg-signal mt-2.5 shrink-0" />
          <span className="flex-1">{parseInlineMarkdown(itemContent)}</span>
        </li>
      );
      return;
    }

    // Ordered List (1. item, 2. item)
    const matchOrdered = trimmed.match(/^(\d+)\.\s+(.*)/);
    if (matchOrdered) {
      inOrderedList = true;
      const num = String(matchOrdered[1]).padStart(2, "0");
      const itemContent = matchOrdered[2];
      orderedItems.push(
        <li key={idx} className="flex items-start gap-3 text-ink leading-relaxed">
          <span className="mono-label text-xs text-signal font-mono font-bold pt-1 shrink-0">
            {num} //
          </span>
          <span className="flex-1">{parseInlineMarkdown(itemContent)}</span>
        </li>
      );
      return;
    }

    // Regular paragraph
    flushLists();
    elements.push(
      <p key={idx} className="my-3 text-ink/90 leading-relaxed font-sans text-base md:text-lg">
        {parseInlineMarkdown(trimmed)}
      </p>
    );
  });

  flushLists();

  return <div className="space-y-1">{elements}</div>;
}
