import { motion } from "framer-motion";
import type { ReactNode } from "react";

export const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 18, filter: "blur(8px)" },
  whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, delay, ease: "easeOut" as const },
});

export function Section({ id, children, className = "", dark = false }: { id?: string; children: ReactNode; className?: string; dark?: boolean }) {
  return (
    <section id={id} className={`relative px-5 md:px-10 py-20 md:py-28 ${dark ? "bg-ink text-paper" : ""} ${className}`}>
      <div className="mx-auto max-w-[1200px]">{children}</div>
    </section>
  );
}

export function Heading({ eyebrow, title, lead, dark = false, num }: { eyebrow: string; title: ReactNode; lead?: string; dark?: boolean; num?: string }) {
  return (
    <div className="max-w-[760px] mb-12 md:mb-16">
      <motion.div {...reveal()} className={`eyebrow mb-4 flex items-center gap-3 ${dark ? "!text-white/45" : ""}`}>
        {num && <span>{num}</span>}
        {num && <span className={`h-px w-6 ${dark ? "bg-white/20" : "bg-black/15"}`} />}
        {eyebrow}
      </motion.div>
      <motion.h2 {...reveal(0.08)} className="uppercase text-[30px] sm:text-[38px] md:text-[48px] font-bold leading-[0.95] tracking-[-0.03em]">
        {title}
      </motion.h2>
      {lead && (
        <motion.p {...reveal(0.16)} className={`mt-5 text-[16px] md:text-[18px] leading-relaxed max-w-[600px] ${dark ? "text-white/55" : "text-black/55"}`}>
          {lead}
        </motion.p>
      )}
    </div>
  );
}
