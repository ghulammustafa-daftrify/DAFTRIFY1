import { motion } from "framer-motion";
import { Section, Heading, reveal } from "./Section";
import { FITS, WORK_TYPES, NICHES } from "../content";

export default function Fit() {
  const ticker = [...WORK_TYPES, ...WORK_TYPES];
  return (
    <>
      <Section id="fit" className="border-t hairline !pb-12">
        <Heading
          num="06"
          eyebrow="Where DAFTRIFY fits"
          title={<>Not bound to a <span className="serif-i">single</span> industry.</>}
          lead="For teams and professionals handling document-heavy workflows. The operation is the same everywhere: information has to be extracted, structured, compared, verified, and packaged before work can move forward."
        />

        <div className="mb-16">
          <motion.p {...reveal()} className="eyebrow mb-5">Documents that need to be</motion.p>
          <div className="flex flex-wrap gap-2.5">
            {FITS.map((f, i) => (
              <motion.span
                key={f}
                {...reveal(i * 0.04)}
                className="px-4 py-2.5 rounded-full border hairline text-[14px] md:text-[16px] font-semibold uppercase tracking-[0.04em] hover:bg-ink hover:text-paper hover:border-ink transition-colors duration-300"
              >
                {f}
              </motion.span>
            ))}
          </div>
        </div>

        <motion.p {...reveal()} className="eyebrow mb-5">
          Workflows where this shows up — directly or indirectly
        </motion.p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-black/10 border hairline">
          {NICHES.map((n, i) => (
            <motion.div
              key={n}
              {...reveal(i * 0.03)}
              className="group bg-paper px-5 py-4.5 flex items-center gap-4 hover:bg-[#faf8f4] transition-colors duration-300"
            >
              <span className="font-mono text-[10px] text-black/35 w-6 shrink-0">{String(i + 1).padStart(2, "0")}</span>
              <span className="text-[15px] font-medium tracking-[-0.01em] group-hover:translate-x-0.5 transition-transform duration-300">{n}</span>
              <span className="ml-auto w-1.5 h-1.5 rounded-full bg-amber opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </div>
        <motion.p {...reveal(0.2)} className="mt-5 text-[13px] text-black/50 max-w-[680px] leading-relaxed">
          These are examples of where document-heavy work appears — not claims of industry specialization or past volume. If documents have to be checked before they move forward, the workflow fits.
        </motion.p>
      </Section>

      {/* work types ticker */}
      <div className="relative border-y hairline py-5 overflow-hidden">
        <div className="eyebrow absolute left-5 md:left-10 top-1/2 -translate-y-1/2 z-10 bg-paper pr-4 hidden md:block">Work types</div>
        <div
          className="overflow-hidden"
          style={{ maskImage: "linear-gradient(to right, transparent, black 12%, black 88%, transparent)", WebkitMaskImage: "linear-gradient(to right, transparent, black 12%, black 88%, transparent)" }}
        >
          <div className="marquee-track flex w-max gap-10 items-center">
            {ticker.map((w, i) => (
              <span key={i} className="flex items-center gap-10 text-[16px] md:text-[20px] font-bold uppercase tracking-[-0.01em] text-ink whitespace-nowrap">
                {w}
                <span className="w-1.5 h-1.5 rounded-full bg-black/25" />
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
