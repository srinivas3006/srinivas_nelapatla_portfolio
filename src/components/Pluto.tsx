import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import plutoImg from "@/assets/pluto.png";

interface PlutoProps {
  message: string;
}

export function Pluto({ message }: PlutoProps) {
  const [open, setOpen] = useState(true);
  const [displayed, setDisplayed] = useState(message);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    setOpen(true);
    setDisplayed(message);
    const t = setTimeout(() => setOpen(false), 5500);
    return () => clearTimeout(t);
  }, [message]);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 sm:bottom-8 sm:right-8">
      <AnimatePresence>
        {open && (
          <motion.div
            key={displayed}
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative max-w-[240px] rounded-2xl bg-card px-4 py-3 text-sm text-foreground shadow-lift"
          >
            <span className="font-display text-[13px] leading-snug">{displayed}</span>
            <div className="absolute -bottom-1.5 right-8 h-3 w-3 rotate-45 bg-card" />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setOpen((o) => !o)}
        onHoverStart={() => setHover(true)}
        onHoverEnd={() => setHover(false)}
        whileTap={{ scale: 0.95 }}
        className="group relative flex h-20 w-20 items-center justify-center rounded-full bg-card shadow-lift ring-1 ring-border/60 transition-shadow hover:shadow-lift"
        aria-label="Pluto, your guide"
      >
        <motion.div
          animate={hover ? { rotate: [-3, 3, -2, 0] } : { scale: [1, 1.025, 1] }}
          transition={
            hover
              ? { duration: 0.6, ease: "easeInOut" }
              : { duration: 4, repeat: Infinity, ease: "easeInOut" }
          }
          className="h-16 w-16"
        >
          <img
            src={plutoImg}
            alt="Pluto, golden retriever guide"
            width={64}
            height={64}
            className="h-full w-full object-contain"
          />
        </motion.div>
        <span className="absolute -bottom-1 right-1 h-3 w-3 rounded-full bg-accent ring-2 ring-card" />
      </motion.button>
    </div>
  );
}
