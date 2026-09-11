import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Manuel Jiménez — AI Engineer",
  description:
    "AI Engineer y Senior Backend Developer especializado en workflows agénticos (LangGraph, CrewAI), RAG y automatización con APIs de Meta. Pregúntale a su asistente de IA sobre su trayectoria.",
  openGraph: {
    title: "Manuel Jiménez — AI Engineer",
    description:
      "Workflows agénticos, RAG y backends de alta concurrencia. Chatea con su asistente de IA para conocer su trayectoria.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
