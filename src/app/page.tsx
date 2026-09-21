"use client";

import { useRef, useState } from "react";
import BongoTopNav from "@/components/BongoTopNav";
import BongoSidebar from "@/components/BongoSidebar";
import BongoChat, { type BongoChatHandle } from "@/components/BongoChat";
import Footer from "@/components/Footer";
import { LanguageProvider } from "@/lib/LanguageContext";
import type { ModuleId } from "@/lib/i18n";

export default function Home() {
  const chatRef = useRef<BongoChatHandle>(null);
  const [treats, setTreats] = useState(0);

  const pickModule = (id: ModuleId) => chatRef.current?.openModule(id);

  return (
    <LanguageProvider>
      <div className="flex min-h-screen flex-col">
        <BongoTopNav onPickModule={pickModule} />

        <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-5 sm:px-6">
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-[300px_minmax(0,1fr)]">
            {/* Chat leads on narrow screens — stacking the sidebar first would
                bury the one thing this page is for. */}
            <div className="order-2 lg:order-1">
              <BongoSidebar
                treats={treats}
                onTreat={() => setTreats((n) => n + 1)}
                onPickModule={pickModule}
              />
            </div>
            <div className="order-1 h-[min(78vh,820px)] min-h-[560px] lg:order-2">
              <BongoChat ref={chatRef} barkNonce={treats} />
            </div>
          </div>

          <Footer />
        </main>
      </div>
    </LanguageProvider>
  );
}
