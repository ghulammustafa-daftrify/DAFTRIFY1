import { motion } from "framer-motion";
import { Section, Heading, reveal } from "./Section";
import { PROBLEMS } from "../content";

export default function Problem() {
  return (
    <Section id="problem" className="border-t hairline">
      <div className="grid md:grid-cols-12 gap-10 md:gap-16">
        <div className="md:col-span-5">
          <Heading
            num="01"
            eyebrow="The problem"
            title={<>Document-heavy work <span className="serif-i">accumulates</span> friction.</>}
            lead="Before anything moves to the next stage, someone has to find, read, compare, and re-check what the documents actually say. That burden is rarely visible until something is missed."
          />
        </div>
        <div className="md:col-span-7">
          <ul className="border-t hairline">
            {PROBLEMS.map((p, i) => (
              <motion.li
                key={p}
                {...reveal(i * 0.04)}
                className="group flex items-center gap-5 py-4 md:py-5 border-b hairline"
              >
                <span className="font-mono text-[11px] text-black/35 w-7 shrink-0">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-[16px] md:text-[19px] font-medium tracking-[-0.01em] text-ink group-hover:translate-x-1 transition-transform duration-300">
                  {p}
                </span>
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-amber opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.li>
            ))}
          </ul>
          <motion.p {...reveal(0.3)} className="mt-6 text-[14px] text-black/50 max-w-[520px]">
            None of this is unusual. It is simply what document work looks like when information lives across multiple files and formats.
          </motion.p>
        </div>
      </div>
    </Section>
  );
}
