import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Section, Heading, reveal } from "./Section";
import { CAPABILITIES } from "../content";

export default function Capabilities() {
  return (
    <Section id="capabilities" className="bg-paper-2/60 border-t hairline">
      <Heading
        num="02"
        eyebrow="What DAFTRIFY does"
        title={<>A document-operations and <span className="serif-i">verification</span> workflow.</>}
        lead="Not a generic software product. A structured way of turning a pile of records into something checked, comparable, and ready to hand over."
      />
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-black/10 border hairline rounded-2xl overflow-hidden">
        {CAPABILITIES.map((c, i) => (
          <motion.div
            key={c.title}
            {...reveal(i * 0.05)}
            className="group bg-paper p-6 md:p-7 min-h-[220px] flex flex-col justify-between hover:bg-[#fbfbf9] transition-colors duration-300"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-[11px] tracking-[0.18em] text-black/40">{c.n}</span>
              <ArrowUpRight size={16} className="text-black/25 group-hover:text-ink group-hover:-rotate-45 transition-all duration-300" />
            </div>
            <div>
              <h3 className="text-[20px] md:text-[22px] font-semibold tracking-[-0.02em] mb-2">{c.title}</h3>
              <p className="text-[14px] leading-relaxed text-black/55">{c.body}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
