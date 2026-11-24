"use client";

import { useEffect, useRef, useState } from "react";
import Icon from "./Icon";

const MAX_NAME = 100;
const MAX_EMAIL = 254;
const MIN_MESSAGE = 10;
const MAX_MESSAGE = 2000;
const REQUEST_TIMEOUT_MS = 15000; // a little longer than the server's 10 second wait for n8n

type Status = "idle" | "sending" | "sent" | "error";

// The "Hire me" button and its popup form. Same pattern as the chat: the classes come from the hero,
// and the popup is a bottom sheet on phones and a centred card on larger screens.
export default function HireMeButton({
  icon,
  className,
  iconClassName,
  labelClassName,
}: {
  icon: string;
  className: string;
  iconClassName: string;
  labelClassName?: string;
}) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);

  function close() {
    setOpen(false);
    setStatus("idle");
    setError("");
    buttonRef.current?.focus(); // give keyboard focus back to the button
  }

  // While the popup is open: move focus in, lock page scroll, and let Escape close it.
  useEffect(() => {
    if (!open) return;
    // Phone: focus the popup itself, because focusing a field would pop the keyboard up over the form.
    if (window.matchMedia("(max-width: 47.99rem)").matches) dialogRef.current?.focus();
    else nameRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Tab stays inside the popup, because the page behind it is covered.
  function keepTabInside(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key !== "Tab") return;
    const items = [...e.currentTarget.querySelectorAll<HTMLElement>("button:not([disabled]), input:not([disabled]), textarea:not([disabled])")].filter(
      (el) => el.tabIndex >= 0 && el.getClientRects().length,
    );
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

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return; // blocks double submit
    const form = new FormData(e.currentTarget);
    const payload = {
      name: String(form.get("name") ?? ""),
      email: String(form.get("email") ?? ""),
      message: String(form.get("message") ?? ""),
      website: String(form.get("website") ?? ""), // the honeypot
    };
    setStatus("sending");
    setError("");

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });
      let data: { error?: unknown } | null = null;
      try {
        data = await res.json();
      } catch {}
      if (!res.ok) throw new Error(typeof data?.error === "string" ? data.error : "Something went wrong. Please try again.");
      setStatus("sent");
      setMessage("");
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") setError("This is taking too long. Please try again.");
      else if (err instanceof TypeError) setError("Could not reach the server. Please check your connection.");
      else setError((err as Error).message);
      setStatus("error");
    } finally {
      clearTimeout(timer);
    }
  }

  const field =
    "w-full px-3.5 rounded-xl bg-surface border border-surface-container-highest text-on-surface placeholder:text-secondary text-base outline-none focus:border-on-surface focus:ring-1 focus:ring-on-surface transition-all md:text-body-sm";
  const label = "font-label-sm text-label-sm text-secondary uppercase tracking-wider";

  return (
    <>
      <button ref={buttonRef} type="button" onClick={() => setOpen(true)} aria-haspopup="dialog" className={className}>
        <Icon name={icon} className={iconClassName} />
        <span className={labelClassName}>Hire me</span>
      </button>

      {open && (
        <>
          {/* Dimmed backdrop. Tapping it closes the popup. */}
          <div onClick={close} aria-hidden="true" className="fixed inset-0 z-[60] bg-inverse-surface/35 backdrop-blur-sm" />

          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="hire-title"
            tabIndex={-1}
            onKeyDown={keepTabInside}
            className="animate-sheet-in outline-none fixed z-[60] left-0 right-0 bottom-0 flex flex-col max-h-[90vh] w-full max-w-lg mx-auto rounded-t-3xl bg-surface overflow-hidden shadow-[0_-12px_40px_rgba(27,26,23,0.18)] md:inset-0 md:m-auto md:h-fit md:max-h-[calc(100vh-3rem)] md:rounded-2xl md:border md:border-surface-container-highest md:shadow-[0_16px_40px_-6px_rgba(27,26,23,0.18)]"
          >
            <div className="px-space-md pt-4 pb-3 flex items-start justify-between gap-3 shrink-0 md:px-6 md:pt-5">
              <div className="flex flex-col gap-1">
                <h2 id="hire-title" className="font-headline-sm text-headline-sm text-on-surface">
                  Hire me
                </h2>
                <p className="font-body-sm text-body-sm text-secondary">Tell me about the role. I usually reply by email.</p>
              </div>
              <button
                onClick={close}
                aria-label="Close"
                type="button"
                className="w-8 h-8 shrink-0 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface md:bg-transparent md:text-secondary md:hover:bg-surface-container transition-colors"
              >
                <Icon name="close" className="text-[18px]" />
              </button>
            </div>

            <div className="overflow-y-auto overscroll-contain px-space-md pb-[max(1.25rem,env(safe-area-inset-bottom))] md:px-6 md:pb-6">
              {status === "sent" ? (
                // Success: a calm green-tinted card, then a button to close.
                <div role="status" className="flex flex-col gap-4">
                  <div className="p-4 rounded-2xl bg-surface-container-low flex items-start gap-3">
                    <Icon name="check_circle" className="text-tertiary text-[22px]" />
                    <div className="flex flex-col gap-1">
                      <span className="font-body-md text-body-md font-medium text-on-surface">Message sent</span>
                      <p className="font-body-sm text-body-sm text-secondary">Thank you. I will get back to you by email soon.</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={close}
                    className="h-12 px-space-md rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-body-md text-body-md font-medium active:scale-[0.98] transition-all"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <form onSubmit={submit} className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="hire-name" className={label}>Name</label>
                    <input ref={nameRef} id="hire-name" name="name" type="text" required maxLength={MAX_NAME} autoComplete="name" className={`${field} h-11`} />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="hire-email" className={label}>Email</label>
                    <input id="hire-email" name="email" type="email" required maxLength={MAX_EMAIL} autoComplete="email" className={`${field} h-11`} />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="hire-message" className={label}>Message</label>
                    <textarea
                      id="hire-message"
                      name="message"
                      required
                      minLength={MIN_MESSAGE}
                      maxLength={MAX_MESSAGE}
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className={`${field} py-2.5 resize-none`}
                    />
                    <span className="self-end font-label-sm text-[10px] text-secondary">{message.length}/{MAX_MESSAGE}</span>
                  </div>

                  {/* Honeypot: hidden from people and screen readers. Bots fill it in, and the server drops those. */}
                  <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                    <label htmlFor="hire-website">Website</label>
                    <input id="hire-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
                  </div>

                  {status === "error" && (
                    <div role="alert" className="p-4 rounded-2xl bg-error-container text-on-error-container flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <Icon name="error" className="text-[18px]" />
                        <span className="font-label-sm text-label-sm uppercase font-semibold">Couldn&apos;t send</span>
                      </div>
                      <p className="font-body-sm text-body-sm [overflow-wrap:anywhere]">{error}</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="h-12 px-space-md rounded-xl bg-primary-strong text-on-primary font-body-md text-body-md font-medium shadow-sm flex items-center justify-center gap-2 active:scale-[0.98] transition-all enabled:hover:bg-primary disabled:bg-surface-container-highest disabled:text-secondary disabled:shadow-none disabled:active:scale-100"
                  >
                    {status === "sending" ? (
                      <>
                        <Icon name="progress_activity" className="text-[18px] animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Icon name="send" className="text-[18px]" />
                        Send message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}
