import { motion } from "framer-motion";
import { Section, reveal } from "./Section";

function FlowPaths({ position }: { position: number }) {
  const paths = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${380 - i * 5 * position} -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${152 - i * 5 * position} ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${684 - i * 5 * position} ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
    width: 0.5 + i * 0.03,
  }));
  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden>
      <svg className="w-full h-full text-paper" viewBox="0 0 696 316" fill="none" preserveAspectRatio="xMidYMid slice">
        {paths.map((p) => (
          <motion.path
            key={p.id}
            d={p.d}
            stroke="currentColor"
            strokeWidth={p.width}
            strokeOpacity={0.03 + p.id * 0.01}
            initial={{ pathLength: 0.3, opacity: 0.5 }}
            animate={{ pathLength: 1, opacity: [0.2, 0.45, 0.2], pathOffset: [0, 1, 0] }}
            transition={{ duration: 22 + (p.id % 7) * 2.5, repeat: Infinity, ease: "linear" }}
          />
        ))}
      </svg>
    </div>
  );
}

export default function HumanVerify() {
  return (
    <Section id="verification" dark className="overflow-hidden">
      <FlowPaths position={1} />
      <FlowPaths position={-1} />
      <div className="relative z-10 grid md:grid-cols-12 gap-10 items-end">
        <div className="md:col-span-8">
          <motion.div {...reveal()} className="eyebrow !text-white/45 mb-4 flex items-center gap-3">
            <span>05</span>
            <span className="h-px w-6 bg-white/20" />
            Human verification
          </motion.div>
          <motion.h2
            {...reveal(0.08)}
            className="uppercase font-bold text-[34px] sm:text-[46px] md:text-[60px] leading-[0.95] tracking-[-0.03em]"
          >
            Tools accelerate the work.
            <br />
            <span style={{ color: "transparent", WebkitTextStroke: "1.4px rgba(242,240,235,0.85)" }}>
              Human review protects the output.
            </span>
          </motion.h2>
        </div>
        <div className="md:col-span-4 space-y-5">
          <motion.p {...reveal(0.15)} className="text-[16px] leading-relaxed text-white/60">
            Automation and structured tooling can accelerate extraction, organization, comparison, and repetitive document operations.
          </motion.p>
          <motion.p {...reveal(0.22)} className="text-[16px] leading-relaxed text-white/85">
            Important findings are still reviewed by a person against the source record before delivery.
          </motion.p>
          <motion.div {...reveal(0.3)} className="pt-4 border-t border-white/10 font-mono text-[10px] tracking-[0.16em] text-white/40 leading-loose">
            NOT CLAIMED: PERFECT ACCURACY · ZERO ERRORS · GUARANTEED OUTCOMES · AUTONOMOUS DECISIONS · REGULATORY APPROVAL
          </motion.div>
        </div>
      </div>
    </Section>
  );
}
