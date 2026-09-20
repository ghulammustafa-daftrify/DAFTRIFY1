import { motion } from "framer-motion";
import { UserCheck } from "lucide-react";
import { Section, Heading, reveal } from "./Section";
import { PROCESS } from "../content";

export default function Process() {
  return (
    <Section id="process" className="border-t hairline">
      <Heading
        num="03"
        eyebrow="How it works"
        title={<>One operating sequence, <span className="serif-i">every time.</span></>}
        lead="Tools accelerate the repetitive parts. Important findings are subject to human review before anything is returned."
      />

      {/* sequence strip */}
      <motion.div {...reveal()} className="mb-12 overflow-x-auto -mx-5 px-5 md:mx-0 md:px-0">
        <div className="flex items-center gap-2 min-w-max font-mono text-[11px] tracking-[0.18em] uppercase">
          {PROCESS.map((s, i) => (
            <div key={s.step} className="flex items-center gap-2">
              <span className={`px-3 py-2 rounded-full border ${s.step === "Human Verify" ? "bg-ink text-paper border-ink" : "hairline text-black/70"}`}>
                {s.step}
              </span>
              {i < PROCESS.length - 1 && <span className="text-black/30">→</span>}
            </div>
          ))}
        </div>
      </motion.div>

      <ol className="grid md:grid-cols-2 gap-x-16">
        {PROCESS.map((s, i) => {
          const human = s.step === "Human Verify";
          return (
            <motion.li key={s.step} {...reveal(i * 0.04)} className="grid grid-cols-[56px_1fr] gap-4 py-6 border-t hairline">
              <div className="font-mono text-[12px] text-black/40 pt-1.5">{String(i + 1).padStart(2, "0")}</div>
              <div>
                <div className="flex items-center gap-2.5">
                  <h3 className="text-[22px] md:text-[26px] font-medium tracking-[-0.02em]">{s.step}</h3>
                  {human && (
                    <span className="inline-flex items-center gap-1 font-mono text-[9px] tracking-[0.16em] bg-ink text-paper rounded px-2 py-1">
                      <UserCheck size={10} /> PERSON
                    </span>
                  )}
                </div>
                <p className="mt-1.5 text-[15px] text-black/55 leading-relaxed max-w-[440px]">{s.body}</p>
              </div>
            </motion.li>
          );
        })}
      </ol>
    </Section>
  );
}
