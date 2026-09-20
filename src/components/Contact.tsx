import { motion } from "framer-motion";
import { Mail, ArrowUpRight } from "lucide-react";
import { Section, reveal } from "./Section";
import { CONTACT_PRIMARY, CONTACT_SECONDARY, MAILTO, NAV } from "../content";
import { Logo } from "./Navbar";

export default function Contact() {
  return (
    <>
      <Section id="contact" className="border-t hairline">
        <div className="grid md:grid-cols-12 gap-10 items-end">
          <div className="md:col-span-7">
            <motion.div {...reveal()} className="eyebrow mb-4 flex items-center gap-3"><span>10</span><span className="h-px w-6 bg-black/15" />Start</motion.div>
            <motion.h2 {...reveal(0.08)} className="uppercase text-[34px] sm:text-[50px] md:text-[66px] font-bold leading-[0.92] tracking-[-0.03em]">
              Have a document-heavy <span className="serif-i">workflow?</span>
            </motion.h2>
            <motion.p {...reveal(0.16)} className="mt-6 text-[17px] md:text-[19px] text-black/55 max-w-[520px] leading-relaxed">
              Send the process. We'll identify where the document work can be structured, checked, and improved.
            </motion.p>
            <motion.div {...reveal(0.24)} className="mt-8 flex flex-wrap gap-3">
              <a href={MAILTO} className="pill-dark !px-6 !py-3.5 !text-[15px]">
                <span className="w-[18px] h-[18px] rounded-full bg-white/20 grid place-items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-white" />
                </span>
                Start a Review
              </a>
            </motion.div>
          </div>
          <motion.div {...reveal(0.2)} className="md:col-span-5 doc-paper rounded-2xl p-6 md:p-8">
            <div className="eyebrow mb-5">Contact</div>
            <a href={`mailto:${CONTACT_PRIMARY}`} className="group flex items-center justify-between gap-3 py-4 border-t hairline">
              <span className="flex items-center gap-3 min-w-0">
                <Mail size={16} className="text-black/45 shrink-0" />
                <span className="text-[14px] md:text-[15px] font-medium truncate">{CONTACT_PRIMARY}</span>
              </span>
              <ArrowUpRight size={16} className="text-black/30 group-hover:text-ink group-hover:-rotate-45 transition-all shrink-0" />
            </a>
            <a href={`mailto:${CONTACT_SECONDARY}`} className="group flex items-center justify-between gap-3 py-4 border-t hairline">
              <span className="flex items-center gap-3 min-w-0">
                <Mail size={16} className="text-black/45 shrink-0" />
                <span className="text-[14px] md:text-[15px] font-medium truncate">{CONTACT_SECONDARY}</span>
              </span>
              <ArrowUpRight size={16} className="text-black/30 group-hover:text-ink group-hover:-rotate-45 transition-all shrink-0" />
            </a>
            <div className="pt-4 border-t hairline font-mono text-[10px] tracking-[0.14em] text-black/40 leading-relaxed">
              WHAT TO SEND: A SHORT DESCRIPTION OF THE WORKFLOW, THE DOCUMENT TYPES INVOLVED, AND WHAT THE NEXT STAGE IS.
            </div>
          </motion.div>
        </div>
      </Section>

      <footer className="border-t hairline px-5 md:px-10 py-12">
        <div className="mx-auto max-w-[1200px] grid md:grid-cols-12 gap-8">
          <div className="md:col-span-5">
            <div className="flex items-center gap-2.5">
              <Logo />
              <span className="font-semibold tracking-[0.18em] text-[14px]">DAFTRIFY</span>
            </div>
            <div className="mt-3 text-[14px] text-black/70">Document Operations &amp; Pre-Submission Auditing</div>
            <div className="mt-1 text-[14px] text-black/45">Human-verified document operations.</div>
          </div>
          <div className="md:col-span-4 grid grid-cols-2 gap-2 text-[14px]">
            {[...NAV, { label: "Privacy / Data Handling", href: "#data-handling" }].map((n) => (
              <a key={n.label} href={n.href} className="py-1 text-black/65 hover:text-ink transition-colors">{n.label}</a>
            ))}
          </div>
          <div className="md:col-span-3 md:text-right font-mono text-[10px] tracking-[0.14em] text-black/40 leading-loose">
            DOCUMENT OPERATIONS AND PREPARATION SUPPORT.
            <br />NOT REGULATED PROFESSIONAL ADVICE.
          </div>
        </div>
        <div className="mx-auto max-w-[1200px] mt-10 pt-5 border-t hairline flex flex-wrap justify-between gap-3 font-mono text-[10px] tracking-[0.14em] text-black/35">
          <span>© {new Date().getFullYear()} DAFTRIFY</span>
          <span>ALL DEMONSTRATIONS ON THIS SITE ARE SIMULATED AND DO NOT DEPICT REAL CLIENTS.</span>
        </div>
      </footer>
    </>
  );
}
