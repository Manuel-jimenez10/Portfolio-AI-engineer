"use client";

import { useRef } from "react";
import CursorSpotlight from "@/components/CursorSpotlight";
import Hero from "@/components/Hero";
import AboutCard from "@/components/AboutCard";
import StatusCard from "@/components/StatusCard";
import StackConstellation from "@/components/StackConstellation";
import MetricsRow from "@/components/MetricsRow";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import { EducationCard, CertificationsCard, ContactCard } from "@/components/InfoCards";
import Footer from "@/components/Footer";
import AIChatWidget, { type AIChatWidgetHandle } from "@/components/AIChatWidget";
import { LanguageProvider } from "@/lib/LanguageContext";

export default function Home() {
  const chatRef = useRef<AIChatWidgetHandle>(null);

  return (
    <LanguageProvider>
      <div className="relative min-h-screen">
        <div className="bg-grid" />
        <CursorSpotlight />

        <main className="relative z-10 mx-auto max-w-5xl px-5 sm:px-6">
          <Hero onOpenChat={() => chatRef.current?.open()} />

          <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
            <AboutCard />
            <StatusCard />
          </section>

          <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 mt-4 sm:mt-5">
            <StackConstellation />
          </section>

          <MetricsRow />

          <ExperienceTimeline />

          <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 mt-6">
            <EducationCard />
            <CertificationsCard />
            <ContactCard />
          </section>

          <Footer />
        </main>

        <AIChatWidget ref={chatRef} />
      </div>
    </LanguageProvider>
  );
}
