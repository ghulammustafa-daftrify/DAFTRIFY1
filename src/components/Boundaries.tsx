import { motion } from "framer-motion";
import { Trash2, ShieldOff, Scale } from "lucide-react";
import { Section, reveal } from "./Section";

export default function Boundaries() {
  return (
    <Section id="data-handling" className="bg-paper-2/60 border-t hairline">
      <div className="grid md:grid-cols-2 gap-6">
        <motion.div {...reveal()} className="doc-paper rounded-2xl p-7 md:p-9">
          <div className="eyebrow mb-5 flex items-center gap-3"><span>08</span><span className="h-px w-6 bg-black/15" />Data handling</div>
          <h3 className="text-[26px] md:text-[32px] font-medium tracking-[-0.02em] leading-tight">
            Handled only as necessary. <span className="serif-i">Then deleted.</span>
          </h3>
          <ul className="mt-7 space-y-5">
            <li className="flex gap-4">
              <Trash2 size={18} className="text-black/50 shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-[15px]">Client documents are permanently deleted 48 hours after delivery.</div>
                <div className="text-[14px] text-black/55 mt-1">Documents are handled only as necessary for the requested work.</div>
              </div>
            </li>
            <li className="flex gap-4">
              <ShieldOff size={18} className="text-black/50 shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-[15px]">Client-identifying information is not placed into external generative tools.</div>
                <div className="text-[14px] text-black/55 mt-1">This is a boundary of the normal DAFTRIFY workflow.</div>
              </div>
            </li>
          </ul>
          <p className="mt-7 pt-5 border-t hairline font-mono text-[10px] tracking-[0.14em] text-black/40 leading-loose">
            NO CLAIMS MADE ABOUT CERTIFICATIONS, ENCRYPTION GRADES, OR ZERO RISK. ONLY POLICIES ACTUALLY FOLLOWED ARE STATED HERE.
          </p>
        </motion.div>

        <motion.div {...reveal(0.1)} className="doc-paper rounded-2xl p-7 md:p-9">
          <div className="eyebrow mb-5 flex items-center gap-3"><span>09</span><span className="h-px w-6 bg-black/15" />Professional boundary</div>
          <h3 className="text-[26px] md:text-[32px] font-medium tracking-[-0.02em] leading-tight">
            Preparation support. <span className="serif-i">Not regulated advice.</span>
          </h3>
          <div className="mt-7 flex gap-4">
            <Scale size={18} className="text-black/50 shrink-0 mt-0.5" />
            <div className="text-[15px] leading-relaxed text-black/70">
              DAFTRIFY provides document operations and preparation support: organization, extraction, comparison, reconciliation, consistency checking, gap identification, verification against supplied records, and packaging.
            </div>
          </div>
          <p className="mt-5 text-[15px] leading-relaxed text-black/70">
            DAFTRIFY does not replace a regulated lawyer, immigration adviser, accountant, medical professional, or other regulated professional.
          </p>
          <p className="mt-7 pt-5 border-t hairline font-mono text-[10px] tracking-[0.14em] text-black/40 leading-loose">
            NOT GUARANTEED: VISA APPROVAL · LEGAL OUTCOMES · REGULATORY OUTCOMES · FINANCIAL OUTCOMES · ANY EXTERNAL DECISION
          </p>
        </motion.div>
      </div>
    </Section>
  );
}
