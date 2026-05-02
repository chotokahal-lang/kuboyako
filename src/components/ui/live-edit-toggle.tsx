import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Edit3, CheckCircle2, Wand2 } from "lucide-react";
import { useLiveEditStore } from "@/store/useLiveEditStore";
import { LiveText } from "@/components/ui/live-text";

export function LiveEditToggle() {
  const { isEditMode, toggleEditMode } = useLiveEditStore();

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 20, delay: 1 }}
      className="live-edit-toggle-wrap fixed bottom-6 right-6 z-[9999] flex flex-col items-end gap-3 pointer-events-none"
    >
      <AnimatePresence>
        {isEditMode && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="surface-elevated rounded-2xl p-3 border border-primary/30 shadow-[0_10px_40px_hsl(var(--primary)/0.2)] flex items-center gap-3"
          >
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center animate-pulse text-primary">
              <Wand2 className="w-4 h-4" />
            </div>
            <div className="pr-2">
              <p className="text-xs font-bold text-primary">
                <LiveText as="span" id="live-toggle-banner-title" defaultText="Live Edit ON" />
              </p>
              <p className="text-[10px] text-muted-foreground">
                <LiveText as="span" id="live-toggle-banner-hint" defaultText="Click text to modify" />
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={toggleEditMode}
        className={`live-toolbar-btn w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 pointer-events-auto shadow-2xl ${
          isEditMode
            ? "bg-primary text-primary-foreground shadow-[0_0_30px_hsl(var(--primary)/0.5)] ring-4 ring-primary/20"
            : "bg-black/50 text-white/70 backdrop-blur-md border border-white/10 hover:bg-white/10 hover:text-white"
        }`}
        title="Toggle Live Edit Mode"
      >
        <AnimatePresence mode="wait">
          {isEditMode ? (
            <motion.div
              key="active"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
            >
              <CheckCircle2 className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="inactive"
              initial={{ scale: 0, rotate: 180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: -180 }}
            >
              <Edit3 className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </motion.div>
  );
}
