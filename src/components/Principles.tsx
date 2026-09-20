import { motion } from "framer-motion";
import { Section, Heading, reveal } from "./Section";
import { PRINCIPLES } from "../content";

export default function Principles() {
  return (
    <Section id="principles">
      <Heading
        num="07"
        eyebrow="Principles"
        title={<>The operating <span className="serif-i">standard.</span></>}
      />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-2">
        {PRINCIPLES.map((p, i) => (
          <motion.div key={p.title} {...reveal(i * 0.05)} className="py-7 border-t hairline">
            <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-black/40 mb-3">{String(i + 1).padStart(2, "0")} — {p.title}</div>
            <p className="text-[20px] md:text-[22px] font-medium tracking-[-0.02em] leading-snug">{p.body}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
