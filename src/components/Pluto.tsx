import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageCircle, X, ArrowRight } from "lucide-react";
import plutoSit from "@/assets/pluto-sit.png";

interface PlutoChatProps {
  hint: string;
}

const quickActions = [
  { label: "Show me projects", target: "work" },
  { label: "Tell me about skills", target: "skills" },
  { label: "How can I contact you?", target: "contact" },
];

export function PlutoChat({ hint }: PlutoChatProps) {
  const [open, setOpen] = useState(false);
  const [bubble, setBubble] = useState(true);
  const [currentHint, setCurrentHint] = useState(hint);
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      setCurrentHint(hint);
      const t = setTimeout(() => setBubble(false), 5500);
      return () => clearTimeout(t);
    }
    setCurrentHint(hint);
    setBubble(true);
    const t = setTimeout(() => setBubble(false), 4500);
    return () => clearTimeout(t);
  }, [hint]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3 sm:bottom-7 sm:right-7">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="w-[280px] overflow-hidden rounded-2xl border border-border bg-card shadow-lift"
          >
            <div className="flex items-center justify-between gap-3 bg-primary px-4 py-3 text-primary-foreground">
              <div className="flex items-center gap-2">
                <div className="h-7 w-7 overflow-hidden rounded-full bg-card">
                  <img src={plutoSit} alt="" className="h-full w-full object-cover" />
                </div>
                <span className="font-display text-sm">Pluto</span>
              </div>
              <button onClick={() => setOpen(false)} aria-label="Close">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="p-4">
              <p className="text-sm leading-relaxed text-foreground/85">
                Hey! I'm Pluto 🐾
                <br />I can help you explore the portfolio.
              </p>
              <div className="mt-4 space-y-2">
                {quickActions.map((a) => (
                  <button
                    key={a.target}
                    onClick={() => scrollTo(a.target)}
                    className="group flex w-full items-center justify-between gap-2 rounded-xl border border-border bg-secondary/50 px-3 py-2.5 text-left text-xs text-foreground/80 transition-colors hover:border-primary/40 hover:bg-secondary"
                  >
                    {a.label}
                    <ArrowRight className="h-3.5 w-3.5 text-primary transition-transform group-hover:translate-x-0.5" />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {!open && bubble && (
          <motion.div
            key={currentHint}
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative max-w-[240px] rounded-2xl bg-card px-4 py-3 text-sm text-foreground shadow-lift ring-1 ring-border/60"
          >
            <p className="font-display text-[13px] leading-snug">{currentHint}</p>
            <div className="absolute -bottom-1.5 right-8 h-3 w-3 rotate-45 bg-card" />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setOpen((o) => !o)}
        whileTap={{ scale: 0.94 }}
        whileHover={{ y: -2 }}
        className="relative flex h-[72px] w-[72px] items-center justify-center rounded-full bg-card shadow-lift ring-1 ring-border/60"
        aria-label="Open Pluto chat"
      >
        <motion.div
          animate={{ scale: [1, 1.03, 1] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          className="h-[60px] w-[60px] overflow-hidden rounded-full"
        >
          <img
            src={plutoSit}
            alt="Pluto, your golden retriever guide"
            width={120}
            height={120}
            className="h-full w-full object-cover scale-110"
          />
        </motion.div>
        <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground shadow-soft">
          <MessageCircle className="h-3 w-3" />
        </span>
      </motion.button>
    </div>
  );
}
