import type { Metadata } from "next";
import { Newsreader, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import ChatWidget from "../components/ChatWidget";

// The three fonts from the design. next/font is built into Next.js, so no new library.
const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"],});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "B Mohammed Thariq — Full Stack Software Engineer",
  description:
    "Portfolio of B Mohammed Thariq, a Full Stack Software Engineer in Dubai. Ask the assistant about his work. It only answers from his documents.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      // A browser extension adds attributes to <html>; this stops the false hydration warning.
      suppressHydrationWarning
      className={`${newsreader.variable} ${jakarta.variable} ${jetbrains.variable} h-full antialiased`}
    >
      <head>
        {/* The design's icon font (Material Symbols). It is a font file, not an npm package. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=block"
        />
      </head>
      <body className="min-h-full flex flex-col">
        {children}
        <ChatWidget />
      </body>
    </html>
  );
}
