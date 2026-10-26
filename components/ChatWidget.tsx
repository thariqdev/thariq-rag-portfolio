"use client";

import { Fragment, useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import Icon from "./Icon";

type Message = { role: "user" | "assistant"; text: string; sources?: string[]; isError?: boolean };

const SUGGESTIONS = [
  "Where is Thariq based?",
  "What did Thariq work on in FundsApp?",
  "What is Career AI?",
];

const MAX_LENGTH = 250;
const REQUEST_TIMEOUT_MS = 35000; // a little longer than the server's slowest case (about 30 seconds)

// An answer that starts like this means "it is not in the documents". It gets a calm card, not an error.
const REFUSAL = /^\s*i (don't|do not) (know|have)|^\s*i can only answer/i;
const CONTACT_EMAIL = "thariqmohammed0310@gmail.com"; // public email, from corpus/cv.md

// True on phone-sized screens (under 768px). useSyncExternalStore is React's tool for reading browser values like this.
function usePhone() {
  return useSyncExternalStore(
    (notify) => {
      const query = window.matchMedia("(max-width: 47.99rem)");
      query.addEventListener("change", notify);
      return () => query.removeEventListener("change", notify);
    },
    () => window.matchMedia("(max-width: 47.99rem)").matches,
    () => false, // on the server we do not know the screen size
  );
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  // Greeting bubble: "waiting" (it fades in after a short delay), then "shown", then "dismissed".
  const [greeting, setGreeting] = useState<"waiting" | "shown" | "dismissed">("waiting");
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // The panel stays in the page while it animates closed. "mounted" = it is in the page,
  // "shown" = it is in its open position (so the CSS transition has something to move to).
  const [mounted, setMounted] = useState(false);
  const [shown, setShown] = useState(false);
  const isPhone = usePhone();
  const dialogRef = useRef<HTMLDivElement>(null);
  const launcherPhoneRef = useRef<HTMLButtonElement>(null);
  const launcherDesktopRef = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hasOpened = useRef(false);

  // Opening and closing happen in these two functions (not in effects), which keeps the state simple.
  const openPanel = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    hasOpened.current = true;
    setGreeting("dismissed"); // opening the chat dismisses the greeting bubble for good, as in the design
    setMounted(true);
    setOpen(true);
  }, []);

  const closePanel = useCallback(() => {
    setOpen(false);
    setShown(false);
    closeTimer.current = setTimeout(() => setMounted(false), 300); // the design's duration-300
  }, []);

  // Once the panel is in the page, wait two frames, so the closed position is painted first and the transition can run.
  useEffect(() => {
    if (!open) return;
    let second = 0;
    const first = requestAnimationFrame(() => {
      second = requestAnimationFrame(() => setShown(true));
    });
    return () => {
      cancelAnimationFrame(first);
      cancelAnimationFrame(second);
    };
  }, [open]);

  // When the panel opens with no messages yet, start at the top, so the greeting is never cut off.
  useEffect(() => {
    if (shown && messages.length === 0) listRef.current?.scrollTo({ top: 0 });
  }, [shown, messages.length]);

  // When the panel opens, move keyboard focus into it. Desktop: the input box. Phone: the panel itself, because
  // focusing the input would pop the keyboard up and hide the conversation.
  useEffect(() => {
    if (!shown) return;
    if (isPhone) dialogRef.current?.focus();
    else inputRef.current?.focus();
  }, [shown, isPhone]);

  // When the panel has closed, give keyboard focus back to the launcher button, so keyboard users do not lose their place.
  useEffect(() => {
    if (open || mounted || !hasOpened.current) return;
    hasOpened.current = false;
    (isPhone ? launcherPhoneRef : launcherDesktopRef).current?.focus();
  }, [open, mounted, isPhone]);

  // Fade the greeting bubble in 1 second after load. The design only says "fade-in", with no delay,
  // so the 1 second is my choice.
  useEffect(() => {
    const t = setTimeout(() => setGreeting((g) => (g === "waiting" ? "shown" : g)), 1000);
    return () => clearTimeout(t);
  }, []);

  // The hero button sends an "open-chat" event to open this panel.
  useEffect(() => {
    window.addEventListener("open-chat", openPanel);
    return () => window.removeEventListener("open-chat", openPanel);
  }, [openPanel]);

  // Escape closes the panel.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closePanel();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, closePanel]);

  // Keep the newest message in view.
  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
  }, [messages, loading]);

  async function send(question: string) {
    const q = question.trim();
    if (!q || loading) return; // loading check blocks double submit
    // Memory: the last 4 messages (2 turns) go along, so follow-ups like "what about his role?" make sense.
    // Error bubbles are not part of the conversation.
    const history = messages.filter((m) => !m.isError).slice(-4).map((m) => ({ role: m.role, text: m.text }));
    setMessages((m) => [...m, { role: "user", text: q }]);
    setInput("");
    setLoading(true);

    // If the server never answers, give up after a while instead of showing "Thinking..." forever.
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: q, history }),
        signal: controller.signal,
      });
      // The reply may not be JSON (for example an error page from the host), so read it carefully.
      let data: { answer?: unknown; error?: unknown; sources?: { source: string }[] } | null = null;
      try {
        data = await res.json();
      } catch {}
      if (!res.ok) {
        throw new Error(typeof data?.error === "string" ? data.error : "The assistant is not available right now. Please try again.");
      }
      if (typeof data?.answer !== "string") throw new Error("The assistant sent a reply that could not be read. Please try again.");
      // Show each file name once.
      const sources = [...new Set<string>((data.sources ?? []).map((s) => s.source))];
      setMessages((m) => [...m, { role: "assistant", text: data.answer as string, sources }]);
    } catch (err) {
      // The server sends friendly messages (including rate limits). A timeout and a network failure have their own.
      let text: string;
      if (err instanceof DOMException && err.name === "AbortError") text = "This is taking too long. Please try again.";
      else if (err instanceof TypeError) text = "Could not reach the server. Please check your connection.";
      else text = (err as Error).message;
      setMessages((m) => [...m, { role: "assistant", text, isError: true }]);
    } finally {
      clearTimeout(timer);
      setLoading(false);
    }
  }

  // ---------- Launcher + greeting bubble ----------
  // Classes are copied from design/code.html (desktop) and design/code-res.html (phone).
  // Phone: above the tab bar. Desktop: bottom-right. Each wrapper ignores clicks itself
  // (pointer-events-none), so the empty space around the buttons never blocks the page.
  if (!open && !mounted) {
    const bubbleVisible = greeting === "shown";
    // The bubble fades in and out with the design's "transition-all duration-300".
    const bubbleState = bubbleVisible
      ? "translate-y-0 opacity-100 pointer-events-auto"
      : "translate-y-2 opacity-0 pointer-events-none";
    const dismissBubble = () => setGreeting("dismissed");

    // The key stops React from reusing these elements for the panel, which would skip the open animation.
    return (
      <Fragment key="launcher">
        {/* PHONE */}
        <div className="fixed bottom-20 right-4 z-40 flex flex-col items-end gap-2 pointer-events-none md:hidden">
          <div
            inert={!bubbleVisible}
            aria-hidden={!bubbleVisible}
            // Hidden on screens narrower than 360px, where it would cover too much of the page
            className={`flex max-[359px]:hidden items-center gap-2 px-3 py-1.5 rounded-full bg-inverse-surface text-inverse-on-surface shadow-xl transition-all duration-300 transform ${bubbleState}`}
          >
            <span className="font-label-sm text-label-sm">Ask me about my projects</span>
            <button
              className="text-inverse-on-surface/70 hover:text-inverse-on-surface p-[15px] -m-[13px] rounded-full flex items-center justify-center"
              onClick={dismissBubble}
              aria-label="Dismiss greeting"
              type="button"
            >
              <Icon name="close" className="text-[14px]" />
            </button>
          </div>
          <button
            ref={launcherPhoneRef}
            className="pointer-events-auto flex items-center gap-2.5 h-12 pl-3.5 pr-4 rounded-full bg-inverse-surface text-inverse-on-surface shadow-[0_12px_32px_-4px_rgba(27,26,23,0.2)] active:scale-95 transition-transform"
            onClick={openPanel}
            aria-label="Open AI Assistant"
            type="button"
          >
            <div className="relative flex items-center justify-center w-6 h-6 rounded-full bg-primary-strong text-on-primary font-label-sm text-label-sm font-semibold">
              MT
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-tertiary-container ring-1 ring-inverse-surface"></span>
            </div>
            <span className="font-body-sm text-body-sm font-medium text-inverse-on-surface">Talk to Thariq</span>
          </button>
        </div>

        {/* DESKTOP */}
        <div className="fixed bottom-6 right-6 z-50 hidden flex-col items-end pointer-events-none md:flex">
          <div
            inert={!bubbleVisible}
            aria-hidden={!bubbleVisible}
            className={`mb-3 p-3.5 rounded-2xl bg-surface-container-lowest shadow-xl border border-surface-container-highest max-w-xs flex items-center justify-between gap-3 transform transition-all duration-300 ${bubbleState}`}
          >
            <div className="flex items-center gap-2.5">
              <span className="flex h-2 w-2 rounded-full bg-tertiary"></span>
              <span className="font-body-sm text-body-sm text-on-surface font-medium">Ask me about my projects</span>
            </div>
            <button
              className="text-secondary hover:text-on-surface p-1 rounded-full hover:bg-surface-container text-xs flex items-center justify-center"
              onClick={dismissBubble}
              aria-label="Dismiss greeting"
              type="button"
            >
              <Icon name="close" className="text-[16px]" />
            </button>
          </div>
          <button
            ref={launcherDesktopRef}
            className="pointer-events-auto group relative flex items-center gap-3 pl-3.5 pr-4 py-3 rounded-full bg-inverse-surface text-inverse-on-surface shadow-[0_12px_32px_-4px_rgba(27,26,23,0.18)] hover:bg-on-surface transition-all active:scale-[0.98]"
            onClick={openPanel}
            aria-label="Open AI Assistant"
            type="button"
          >
            <div className="relative w-8 h-8 rounded-full bg-primary-strong text-on-primary flex items-center justify-center font-headline-sm text-xs font-bold">
              MT
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-container opacity-50"></span>
            </div>
            <div className="flex flex-col text-left">
              <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary-fixed">Talk to Thariq</span>
              <span className="text-[11px] text-secondary-fixed-dim font-label-sm leading-none">RAG Document Assistant</span>
            </div>
          </button>
        </div>
      </Fragment>
    );
  }

  // ---------- Panel ----------
  // Classes are copied from design/code.html (desktop card) and design/code-res.html (phone bottom sheet).
  // Phone: bottom sheet, max 75% of the screen, with a dimmed backdrop. Desktop: floating card.
  // Open/close: the sheet slides up/down (design: transition-transform duration-300 ease-out). The desktop
  // card scales and fades (design: transition-all duration-300, origin-bottom-right).
  // On a phone the sheet covers the page with a dimmed backdrop, so Tab must stay inside it.
  function keepTabInside(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key !== "Tab" || !isPhone) return;
    const items = [...e.currentTarget.querySelectorAll<HTMLElement>("button:not([disabled]), input:not([disabled]), a[href]")].filter((el) => el.getClientRects().length);
    if (!items.length) return;
    const first = items[0];
    const last = items[items.length - 1];
    const active = document.activeElement;
    if (e.shiftKey && (active === first || active === e.currentTarget)) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && active === last) {
      e.preventDefault();
      first.focus();
    }
  }

  const panelPosition = shown
    ? "translate-y-0 md:scale-100 md:opacity-100"
    : "translate-y-full md:translate-y-0 md:scale-95 md:opacity-0 pointer-events-none";

  return (
    <Fragment key="panel">
      {/* Dimmed backdrop (phones only). Tapping it closes the sheet. */}
      <div
        onClick={closePanel}
        aria-hidden="true"
        className={`fixed inset-0 z-50 bg-inverse-surface/35 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          shown ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />

      <div
        ref={dialogRef}
        role="dialog"
        aria-label="Chat with Thariq"
        aria-modal={isPhone}
        tabIndex={-1}
        onKeyDown={keepTabInside}
        className={`outline-none fixed left-0 right-0 bottom-0 z-50 flex flex-col max-h-[75vh] w-full max-w-lg mx-auto rounded-t-3xl bg-surface overflow-hidden shadow-[0_-12px_40px_rgba(27,26,23,0.18)] transition-all duration-300 ease-out transform md:ease-in-out md:left-auto md:right-6 md:bottom-6 md:mx-0 md:h-[560px] md:max-h-[calc(100vh-3rem)] md:w-[380px] md:max-w-none md:rounded-2xl md:border md:border-surface-container-highest md:shadow-[0_16px_40px_-6px_rgba(27,26,23,0.18)] md:origin-bottom-right ${panelPosition}`}
      >
        {/* Drag handle (phone). Tapping it closes the sheet. */}
        <button
          onClick={closePanel}
          aria-label="Close chat"
          type="button"
          className="w-full pt-2.5 pb-0.5 flex justify-center cursor-pointer shrink-0 md:hidden"
        >
          <span className="w-10 h-1 rounded-full bg-secondary-fixed-dim"></span>
        </button>

        {/* Header: phone */}
        <div className="px-space-md py-2 flex items-center justify-between border-b-0 bg-surface shrink-0 md:hidden">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-primary-strong text-on-primary flex items-center justify-center font-label-sm text-label-sm font-bold">MT</div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-body-sm text-body-sm font-medium text-on-surface">Thariq Assistant</span>
                <span className="w-1.5 h-1.5 rounded-full bg-tertiary-container"></span>
              </div>
              {/* body font, not mono: it is shorter, so it stays on one line on most phones */}
              <span className="font-body-sm text-[12px] leading-4 text-secondary">Answers only from Thariq&apos;s documents</span>
            </div>
          </div>
          <button
            onClick={closePanel}
            aria-label="Close chat"
            type="button"
            className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface"
          >
            <Icon name="close" className="text-[18px]" />
          </button>
        </div>

        {/* Header: desktop */}
        <div className="hidden md:flex px-4 py-3 bg-surface-container-low border-b border-surface-container-highest items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="relative w-9 h-9 rounded-full bg-inverse-surface text-inverse-on-surface font-headline-sm flex items-center justify-center text-sm font-semibold">
              MT
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-tertiary ring-2 ring-surface"></span>
            </div>
            <div className="flex flex-col">
              <span className="font-label-md text-label-md font-semibold text-on-surface">B. Mohammed Thariq (Assistant)</span>
              <span className="font-label-sm text-label-sm text-secondary truncate max-w-[240px]">Answers only from Thariq&apos;s documents</span>
            </div>
          </div>
          <button
            onClick={closePanel}
            aria-label="Close chat"
            type="button"
            className="w-8 h-8 rounded-full flex items-center justify-center text-secondary hover:text-on-surface hover:bg-surface-container transition-colors"
          >
            <Icon name="close" className="text-[18px]" />
          </button>
        </div>

        {/* Messages */}
        <div
          ref={listRef}
          role="log"
          aria-label="Conversation"
          aria-live="polite"
          className="flex-1 overflow-y-auto overflow-x-hidden overscroll-contain px-space-md py-3 flex flex-col gap-3 min-h-[min(260px,35vh)] font-body-sm text-body-sm md:p-4 md:gap-4 md:min-h-0"
        >
          {messages.length === 0 && (
            <div className="flex flex-col gap-3 md:gap-4 md:pt-2">
              <div className="self-start max-w-[88%] md:max-w-[90%] p-3 md:p-3.5 rounded-2xl rounded-tl-sm md:rounded-tl-2xl bg-surface-container md:bg-surface-container-low text-on-surface font-body-sm text-body-sm shadow-sm md:shadow-none">
                <p>Hi! I&apos;m Thariq&apos;s assistant. I only answer from his documents.</p>
              </div>
              <div className="flex flex-col gap-1.5 md:gap-2 md:pt-1">
                <span className="font-label-sm text-label-sm text-secondary uppercase tracking-wider">Suggested queries:</span>
                {SUGGESTIONS.map((s, i) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    type="button"
                    style={{ animationDelay: `${i * 80}ms` }}
                    className="animate-message-in text-left p-2.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-body-sm text-body-sm md:font-label-sm md:text-label-sm transition-colors flex items-center justify-between"
                  >
                    <span>&ldquo;{s}&rdquo;</span>
                    <Icon name="arrow_forward" className="text-[14px]" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((m, i) => {
            // Your question: coral bubble on the right
            if (m.role === "user") {
              return (
                <div
                  key={i}
                  className="animate-message-in self-end max-w-[85%] py-2.5 px-3 md:px-4 rounded-2xl rounded-tr-sm md:rounded-tr-2xl bg-primary-strong text-on-primary font-body-sm text-body-sm shadow-sm md:shadow-none whitespace-pre-wrap [overflow-wrap:anywhere]"
                >
                  {m.text}
                </div>
              );
            }

            // Failed request: error card (design: bg-error-container)
            if (m.isError) {
              return (
                <div key={i} className="animate-message-in self-start max-w-[95%] p-4 rounded-2xl bg-error-container text-on-error-container flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <Icon name="error" className="text-[18px]" />
                    <span className="font-label-sm text-label-sm uppercase font-semibold">Couldn&apos;t get an answer</span>
                  </div>
                  <p className="font-body-sm text-body-sm [overflow-wrap:anywhere]">{m.text}</p>
                </div>
              );
            }

            // "I don't know": a calm card, not an error (design: the "Fallback" state). No sources, because
            // nothing was answered from them.
            if (REFUSAL.test(m.text)) {
              return (
                <div
                  key={i}
                  className="animate-message-in self-start max-w-[92%] md:max-w-[95%] p-3.5 md:p-4 rounded-2xl rounded-tl-sm md:rounded-tl-2xl bg-surface-container md:bg-surface-container-low text-on-surface flex flex-col gap-2.5 shadow-sm md:shadow-none"
                >
                  <div className="flex items-center gap-1.5 text-secondary">
                    <Icon name="search_off" className="text-[16px]" />
                    <span className="font-label-sm text-label-sm uppercase font-semibold">Not in my documents</span>
                  </div>
                  <p className="font-body-sm text-body-sm leading-relaxed text-on-surface whitespace-pre-wrap [overflow-wrap:anywhere]">{m.text}</p>
                  <p className="font-body-sm text-body-sm text-secondary">
                    For other questions, you can reach him at{" "}
                    <a className="font-medium text-primary hover:underline" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
                  </p>
                </div>
              );
            }

            // Answer with its sources
            return (
              <div
                key={i}
                className="animate-message-in self-start max-w-[92%] md:max-w-[95%] p-3.5 md:p-4 rounded-2xl rounded-tl-sm md:rounded-tl-2xl bg-surface-container md:bg-surface-container-low text-on-surface flex flex-col gap-2 md:gap-3 shadow-sm md:shadow-none"
              >
                <p className="font-body-sm text-body-sm leading-relaxed whitespace-pre-wrap [overflow-wrap:anywhere]">{m.text}</p>
                {m.sources && m.sources.length > 0 && (
                  <div className="flex flex-wrap items-center gap-1.5 pt-1 md:pt-2 md:border-t md:border-surface-container-highest">
                    <span className="font-label-sm text-label-sm text-secondary uppercase font-mono">Sources:</span>
                    {m.sources.map((s) => (
                      <span key={s} className="px-2 py-0.5 rounded bg-primary-fixed text-on-primary-fixed-variant font-label-sm text-label-sm font-mono">
                        [{s}]
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          {/* Thinking: three bouncing dots (design: animate-bounce with staggered delays) */}
          {loading && (
            <div className="animate-message-in self-start max-w-[85%] p-3.5 rounded-2xl rounded-tl-sm md:rounded-tl-2xl bg-surface-container md:bg-surface-container-low text-on-surface flex flex-col md:flex-row md:items-center gap-2 md:gap-3 shadow-sm md:shadow-none">
              <div className="flex items-center gap-1.5 py-1 md:py-0 md:gap-1" aria-hidden="true">
                <span className="w-2 h-2 md:w-1.5 md:h-1.5 rounded-full bg-primary-container animate-bounce md:[animation-delay:-0.3s]"></span>
                <span className="w-2 h-2 md:w-1.5 md:h-1.5 rounded-full bg-primary-container animate-bounce [animation-delay:0.2s] md:[animation-delay:-0.15s]"></span>
                <span className="w-2 h-2 md:w-1.5 md:h-1.5 rounded-full bg-primary-container animate-bounce [animation-delay:0.4s] md:[animation-delay:0s]"></span>
              </div>
              <span className="font-label-sm text-label-sm text-secondary">Thinking...</span>
            </div>
          )}
        </div>

        {/* Input. A form means Enter sends. */}
        <div className="px-4 pt-3 bg-surface-container-low flex flex-col gap-1 pb-[max(0.75rem,env(safe-area-inset-bottom))] shrink-0 md:p-3 md:border-t md:border-surface-container-highest">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="relative flex items-center gap-2 md:gap-0"
          >
            <input
              ref={inputRef}
              value={input}
              maxLength={MAX_LENGTH}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about Thariq's work..."
              className="flex-1 h-11 px-3.5 rounded-xl bg-surface border border-surface-container-highest text-on-surface placeholder:text-secondary placeholder:text-[13px] text-base outline-none focus:border-on-surface focus:ring-1 focus:ring-on-surface transition-all min-w-0 md:w-full md:h-auto md:pr-20 md:py-2.5 md:text-body-sm md:border-0"
            />
            <div className="flex items-center gap-1.5 md:absolute md:right-2">
              <span className="hidden md:inline font-label-sm text-[10px] text-secondary">{input.length}/{MAX_LENGTH}</span>
              <button
                type="submit"
                aria-label="Send message"
                disabled={loading || !input.trim()}
                className="w-11 h-11 rounded-xl bg-primary-strong text-on-primary flex items-center justify-center shrink-0 active:scale-95 transition-all shadow-sm enabled:hover:bg-primary disabled:bg-surface-container-highest disabled:text-secondary disabled:shadow-none disabled:active:scale-100 md:w-7 md:h-7 md:rounded-lg md:active:scale-100 md:shadow-none"
              >
                <Icon name="arrow_upward" className="text-[19px] md:text-[16px]" />
              </button>
            </div>
          </form>
          {/* hidden on short screens (under 600px tall), where every pixel is needed for the conversation */}
          <div className="flex items-center justify-between px-1 pt-1 md:hidden [@media(max-height:600px)]:hidden">
            <span className="font-label-sm text-label-sm text-secondary">Document-grounded RAG agent</span>
            <span className="font-label-sm text-label-sm text-secondary font-mono">{input.length}/{MAX_LENGTH}</span>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
