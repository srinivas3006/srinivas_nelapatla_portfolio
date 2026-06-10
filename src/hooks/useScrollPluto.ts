import { useEffect, useState } from "react";

export function useScrollPluto(defaultMsg: string) {
  const [message, setMessage] = useState(defaultMsg);

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-pluto-hint]"),
    );
    if (!sections.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const hint = (e.target as HTMLElement).dataset.plutoHint;
            if (hint) setMessage(hint);
          }
        });
      },
      { threshold: 0.45 },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return message;
}
