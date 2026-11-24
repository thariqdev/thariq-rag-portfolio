"use client";

import { useState } from "react";

// Copies a value to the clipboard and says so for a moment. If the browser refuses, it asks you to select the text.
export default function CopyButton({ value, label }: { value: string; label: string }) {
  const [text, setText] = useState("Copy");

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setText("Copied");
    } catch {
      setText("Select text");
    }
    setTimeout(() => setText("Copy"), 1600);
  }

  return (
    <button type="button" onClick={copy} aria-label={`Copy ${label}`}>
      {text}
    </button>
  );
}
