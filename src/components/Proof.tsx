import { motion } from "framer-motion";
import { AlertTriangle, Check, HelpCircle, Minus, UserCheck, ArrowRight } from "lucide-react";
import { Section, Heading, reveal } from "./Section";
import { StatusChip } from "./Dossier";

function SimLabel() {
  return (
    <span className="inline-flex items-center gap-2 font-mono text-[9px] tracking-[0.2em] text-black/55 border hairline rounded-full px-2.5 py-1 bg-paper">
      <span className="w-1.5 h-1.5 rounded-full bg-amber" /> SIMULATED DEMONSTRATION
    </span>
  );
}

function Frame({ n, title, sub, children, steps }: { n: string; title: string; sub: string; children: React.ReactNode; steps: string[] }) {
  return (
    <motion.article {...reveal()} className="grid lg:grid-cols-12 gap-8 lg:gap-12 py-14 border-t hairline">
      <div className="lg:col-span-4">
        <div className="font-mono text-[11px] tracking-[0.18em] text-black/40 mb-3">DEMONSTRATION {n}</div>
        <h3 className="text-[26px] md:text-[32px] font-medium tracking-[-0.02em] leading-tight">{title}</h3>
        <p className="mt-3 text-[15px] text-black/55 leading-relaxed">{sub}</p>
        <ul className="mt-6 space-y-2">
          {steps.map((s) => (
            <li key={s} className="flex items-center gap-2.5 text-[13px] text-black/70">
              <ArrowRight size={12} className="text-black/30" /> {s}
            </li>
          ))}
        </ul>
        <div className="mt-6"><SimLabel /></div>
      </div>
      <div className="lg:col-span-8">{children}</div>
    </motion.article>
  );
}

function Doc({ title, id, children, className = "" }: { title: string; id: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`doc-paper rounded-xl p-4 md:p-5 ${className}`}>
      <div className="flex items-center justify-between pb-3 mb-3 border-b hairline">
        <span className="text-[12px] font-semibold">{title}</span>
        <span className="font-mono text-[9px] tracking-[0.16em] text-black/40">{id}</span>
      </div>
      {children}
    </div>
  );
}

const Row = ({ k, v, warn, mono = true }: { k: string; v: string; warn?: boolean; mono?: boolean }) => (
  <div className="flex items-center justify-between gap-3 py-1.5 border-b border-dashed border-black/[0.07] last:border-0">
    <span className="font-mono text-[9px] md:text-[10px] tracking-[0.14em] text-black/40">{k}</span>
    <span className={`${mono ? "font-mono" : ""} text-[11px] md:text-[12px] ${warn ? "text-amber font-semibold" : "text-black/80"}`}>{v}</span>
  </div>
);

export default function Proof() {
  return (
    <Section id="proof" className="bg-paper-2/60 border-t hairline">
      <Heading
        num="04"
        eyebrow="Proof of work"
        title={<>Capability shown through <span className="serif-i">labeled</span> simulations.</>}
        lead="DAFTRIFY does not invent client history. Every example below is a controlled simulation built to show how the work is done — not a case study, testimonial, or completed project."
      />

      {/* 01 consistency audit */}
      <Frame
        n="01"
        title="Document Consistency Audit"
        sub="A simulated multi-document package containing controlled inconsistencies, compared field by field."
        steps={["Source comparison", "Discrepancy detection", "Exception flagging", "Human review", "Review-complete output"]}
      >
        <div className="grid md:grid-cols-3 gap-4">
          <Doc title="Source A" id="SRC-01">
            <Row k="FULL NAME" v="A. Sample" />
            <Row k="DATE OF BIRTH" v="03/07/1990" />
            <Row k="REFERENCE" v="TX-4471" />
            <Row k="AMOUNT" v="12,400.00" />
          </Doc>
          <Doc title="Source B" id="SRC-02">
            <Row k="FULL NAME" v="Sample, A." />
            <Row k="DATE OF BIRTH" v="1990-07-03" />
            <Row k="REFERENCE" v="TX-4471" />
            <Row k="AMOUNT" v="12,400.00" />
          </Doc>
          <Doc title="Source C" id="SRC-03">
            <Row k="FULL NAME" v="A. Sample" />
            <Row k="DATE OF BIRTH" v="07/03/1990" warn />
            <Row k="REFERENCE" v="TX-4417" warn />
            <Row k="AMOUNT" v="12,400.00" />
          </Doc>
        </div>
        <div className="mt-4 grid md:grid-cols-2 gap-4">
          <Doc title="Reconciliation" id="REC-01" className="!bg-[#fbeeea]">
            <div className="flex items-start gap-3">
              <AlertTriangle size={16} className="text-amber shrink-0 mt-0.5" />
              <div>
                <div className="text-[12px] font-semibold text-amber">EXCEPTION — REVIEW REQUIRED</div>
                <p className="mt-1 text-[12px] text-black/65 leading-relaxed">
                  REFERENCE differs between SRC-01/02 (TX-4471) and SRC-03 (TX-4417). DATE OF BIRTH in SRC-03 is ambiguous (DD/MM vs MM/DD).
                </p>
              </div>
            </div>
          </Doc>
          <Doc title="Human review" id="HR-01">
            <div className="flex items-start gap-3">
              <UserCheck size={16} className="text-black/60 shrink-0 mt-0.5" />
              <div className="w-full">
                <p className="text-[12px] text-black/65 leading-relaxed">
                  Checked against SRC-03 original. Reference digits transposed in source; date format confirmed as DD/MM from document header. Exception noted for the client, not silently corrected.
                </p>
                <div className="mt-3 max-w-[200px]"><StatusChip status="REVIEW COMPLETE" large /></div>
              </div>
            </div>
          </Doc>
        </div>
      </Frame>

      {/* 02 structured extraction */}
      <Frame
        n="02"
        title="Structured Extraction"
        sub="Information from several source documents converted into one structured working format, with each field traceable to where it came from."
        steps={["Extraction", "Organization", "Normalization", "Traceability to source"]}
      >
        <div className="grid md:grid-cols-[1fr_auto_1.4fr] gap-4 items-stretch">
          <div className="space-y-3">
            {[
              ["Invoice", "SRC-11", ["Invoice no. INV/2024/0091", "Issued 3 Jul 2024", "Total: twelve thousand four hundred"]],
              ["Contract extract", "SRC-12", ["Party: A. Sample", "Effective 03.07.2024", "Term: 12 months"]],
              ["Bank confirmation", "SRC-13", ["Payee SAMPLE A", "Value date 2024-07-03", "12400.00"]],
            ].map(([t, id, lines]) => (
              <Doc key={id as string} title={t as string} id={id as string}>
                <div className="space-y-1.5">
                  {(lines as string[]).map((l) => (
                    <div key={l} className="text-[11px] text-black/60 leading-snug">{l}</div>
                  ))}
                </div>
              </Doc>
            ))}
          </div>
          <div className="hidden md:flex items-center justify-center text-black/25"><ArrowRight size={20} /></div>
          <Doc title="Structured working record" id="WRK-01" className="!bg-[#f4f2ec]">
            <div className="grid grid-cols-[1fr_1fr_auto] gap-x-3 font-mono text-[9px] tracking-[0.14em] text-black/40 pb-2 border-b hairline">
              <span>FIELD</span><span>NORMALIZED</span><span>SOURCE</span>
            </div>
            {[
              ["PARTY", "SAMPLE, A.", "SRC-12 · SRC-13"],
              ["DOCUMENT NO.", "INV-2024-0091", "SRC-11"],
              ["DATE", "2024-07-03", "SRC-11 · 12 · 13"],
              ["AMOUNT", "12,400.00", "SRC-11 · SRC-13"],
              ["TERM", "12 months", "SRC-12"],
              ["CURRENCY", "— not stated", "GAP"],
            ].map(([f, v, s]) => (
              <div key={f} className="grid grid-cols-[1fr_1fr_auto] gap-x-3 py-2 border-b border-dashed border-black/[0.07] last:border-0 items-center">
                <span className="font-mono text-[10px] text-black/45">{f}</span>
                <span className={`font-mono text-[11px] ${s === "GAP" ? "text-amber" : "text-black/80"}`}>{v}</span>
                <span className={`font-mono text-[9px] ${s === "GAP" ? "text-amber" : "text-black/45"}`}>{s}</span>
              </div>
            ))}
            <div className="mt-4 max-w-[160px]"><StatusChip status="REVIEWED" large /></div>
          </Doc>
        </div>
      </Frame>

      {/* 03 completeness */}
      <Frame
        n="03"
        title="Evidence / Document Completeness"
        sub="A simulated evidence checklist: what was expected, what is present, what is missing, and what remains unclear."
        steps={["Expected items", "Present items", "Missing items", "Unclear items", "Review status"]}
      >
        <Doc title="Evidence set — completeness review" id="CHK-01">
          <div className="grid grid-cols-[1fr_auto] md:grid-cols-[1fr_120px_140px] gap-x-4 font-mono text-[9px] tracking-[0.14em] text-black/40 pb-2 border-b hairline">
            <span>EXPECTED ITEM</span><span className="hidden md:block">STATE</span><span className="text-right md:text-left">REVIEW</span>
          </div>
          {[
            ["Identity document (primary)", "present"],
            ["Proof of address — within 3 months", "present"],
            ["Signed declaration form", "missing"],
            ["Supporting statement, page 2 of 2", "missing"],
            ["Translation of foreign-language record", "unclear"],
            ["Reference letter — signature legible", "unclear"],
            ["Fee receipt", "present"],
          ].map(([item, state]) => {
            const icon = state === "present" ? <Check size={12} className="text-verify" /> : state === "missing" ? <Minus size={12} className="text-amber" /> : <HelpCircle size={12} className="text-black/50" />;
            const review = state === "present" ? "REVIEWED" : state === "missing" ? "EXCEPTION — REVIEW REQUIRED" : "EXCEPTION — REVIEW REQUIRED";
            return (
              <div key={item} className="grid grid-cols-[1fr_auto] md:grid-cols-[1fr_120px_140px] gap-x-4 gap-y-1 py-2.5 border-b border-dashed border-black/[0.07] last:border-0 items-center">
                <span className="text-[12px] text-black/80">{item}</span>
                <span className="hidden md:inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-black/60">{icon}{state}</span>
                <span className="w-[140px] justify-self-end md:justify-self-start"><StatusChip status={review} /></span>
              </div>
            );
          })}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 pt-3 border-t hairline">
            <span className="font-mono text-[10px] tracking-[0.14em] text-black/50">7 EXPECTED · 3 PRESENT · 2 MISSING · 2 UNCLEAR</span>
            <span className="inline-flex items-center gap-2 text-[12px] text-black/65"><UserCheck size={13} /> Gaps listed for the client — not filled with guesses.</span>
          </div>
        </Doc>
      </Frame>
    </Section>
  );
}
