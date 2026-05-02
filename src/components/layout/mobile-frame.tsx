import { ReactNode } from "react";
import { motion } from "framer-motion";
import { AgentDebugger } from "@/components/agents/AgentDebugger";

export function MobileFrame({ children }: { children: ReactNode }) {
  return (
    <div
      className="w-full flex items-center justify-center sm:p-6 md:p-10 font-sans relative overflow-hidden"
      style={{ 
        minHeight: "100vh",
        height: "100svh" 
      }}
    >
      {/* Ambient background glows (desktop only) */}
      <div className="hidden sm:block absolute top-[-15%] left-[-10%] w-[55%] h-[55%] rounded-full bg-primary/18 blur-[160px] pointer-events-none" />
      <div className="hidden sm:block absolute bottom-[-20%] right-[-15%] w-[55%] h-[55%] rounded-full bg-accent/8 blur-[180px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-[430px] sm:rounded-[3rem] overflow-hidden flex flex-col
                   sm:border-[10px] sm:border-[hsl(24_30%_8%)]
                   sm:shadow-[0_60px_140px_-30px_hsl(20_100%_4%/0.9),0_0_0_1px_hsl(30_20%_96%/0.07)]"
        style={{
          /* Full viewport on mobile with safe-area, fixed phone height on desktop */
          height: "100vh",
          maxHeight: "100svh",
        }}
      >
        {/* Safe-area overlay for notch / dynamic island / status bar */}
        <div
          className="pointer-events-none absolute inset-0 z-[70]"
          style={{
            paddingTop: "env(safe-area-inset-top, 0px)",
            paddingBottom: "env(safe-area-inset-bottom, 0px)",
          }}
        />

        {/* Screen sheen */}
        <div className="pointer-events-none absolute inset-0 z-50 bg-gradient-to-tr from-white/[0.015] via-transparent to-white/[0.04]" />

        {/* Dynamic island pill — desktop sim */}
        <div className="hidden sm:flex absolute top-3 inset-x-0 h-9 z-[60] pointer-events-none justify-center">
          <div className="h-7 w-28 rounded-full bg-black/95 border border-white/5 flex items-center justify-center gap-2.5 shadow-inner">
            <span className="w-7 h-1 rounded-full bg-white/10" />
            <span className="w-1.5 h-1.5 rounded-full bg-primary/50 animate-pulse" />
          </div>
        </div>

        {/* Scrollable content — flex-col fills remaining space */}
        <div
          className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-hide relative z-10 flex flex-col"
          style={{
            background: "var(--gradient-deep)",
            /* iOS momentum scrolling */
            WebkitOverflowScrolling: "touch",
            /* Account for bottom safe area in scroll padding */
            paddingBottom: "env(safe-area-inset-bottom, 0px)",
          }}
        >
          <div className="relative grain min-h-full flex flex-col">{children}</div>
        </div>

        {/* Home indicator bar — desktop */}
        <div className="hidden sm:flex absolute bottom-2.5 inset-x-0 z-[60] pointer-events-none justify-center">
          <div className="w-28 h-1 rounded-full bg-white/20" />
        </div>
      </motion.div>

      {/* Global Agent Debugger — accessible from any page */}
      <AgentDebugger />
    </div>
  );
}
