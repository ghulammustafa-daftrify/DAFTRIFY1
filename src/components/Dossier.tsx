import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent, useSpring, MotionValue } from "framer-motion";
import { AlertTriangle, Check, UserCheck, Package } from "lucide-react";

type Status = "REVIEWED" | "EXCEPTION — REVIEW REQUIRED" | "REVIEW COMPLETE" | "SOURCE";

const DOCS: { title: string; status: Status; fields: [string, string][]; kind: "source" | "extract" | "norm" | "compare" | "exception" | "human" | "complete" | "package" }[] = [
  { title: "Source record", status: "SOURCE", kind: "source", fields: [["DOC", "SRC-01"], ["TYPE", "Statement"], ["PAGES", "3"]] },
  { title: "Extracted information", status: "REVIEWED", kind: "extract", fields: [["NAME", "A. Sample"], ["DATE", "03/07/24"], ["REF", "TX-4471"]] },
  { title: "Normalized information", status: "REVIEWED", kind: "norm", fields: [["NAME", "SAMPLE, A."], ["DATE", "2024-07-03"], ["REF", "TX-4471"]] },
  { title: "Comparison / reconciliation", status: "REVIEWED", kind: "compare", fields: [["SRC-01", "2024-07-03"], ["SRC-02", "2024-07-03"], ["MATCH", "YES"]] },
  { title: "Exception / discrepancy", status: "EXCEPTION — REVIEW REQUIRED", kind: "exception", fields: [["SRC-01", "TX-4471"], ["SRC-03", "TX-4417"], ["MATCH", "NO"]] },
  { title: "Human review", status: "REVIEWED", kind: "human", fields: [["FINDING", "REF mismatch"], ["CHECKED", "Against SRC-03"], ["NOTE", "Transposed"]] },
  { title: "Review complete", status: "REVIEW COMPLETE", kind: "complete", fields: [["ITEMS", "12"], ["EXCEPTIONS", "1"], ["RESOLVED", "1"]] },
  { title: "Final package", status: "REVIEW COMPLETE", kind: "package", fields: [["INDEX", "Included"], ["TRACE", "Per field"], ["READY", "Next stage"]] },
];

const STAGES = [
  { k: "01", label: "Closed dossier", text: "The source package arrives as a bound set of records." },
  { k: "02", label: "Documents separate", text: "Each record is isolated so information can be extracted." },
  { k: "03", label: "Organized, normalized, reconciled", text: "Fields are standardized and compared across records. Exceptions are flagged, then reviewed by a person against the source." },
  { k: "04", label: "Final package", text: "The reviewed set is re-assembled, indexed, and ready for the next stage." },
];

const EASE = [0.22, 1, 0.36, 1] as const;

function useViewport() {
  const [vp, setVp] = useState({ w: 1280, h: 800 });
  useEffect(() => {
    const f = () => setVp({ w: window.innerWidth, h: window.innerHeight });
    f();
    window.addEventListener("resize", f);
    return () => window.removeEventListener("resize", f);
  }, []);
  return vp;
}

export default function Dossier() {
  const ref = useRef<HTMLDivElement>(null);
  const vp = useViewport();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 });
  const [stage, setStage] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setStage(v < 0.14 ? 0 : v < 0.42 ? 1 : v < 0.78 ? 2 : 3);
  });

  const mobile = vp.w < 768;
  const cardW = mobile ? 132 : 188;
  const cardH = mobile ? 176 : 248;
  const gap = mobile ? 10 : 22;

  return (
    <section ref={ref} className="relative" style={{ height: "420vh" }} aria-label="Simulated document review demonstration">
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* caption */}
        <div className="absolute top-20 md:top-24 left-0 right-0 z-30 px-5 md:px-10 flex flex-col md:flex-row md:items-start md:justify-between gap-3 pointer-events-none">
          <div className="max-w-[420px]">
            <div className="eyebrow mb-2">Signature demonstration</div>
            <div className="flex items-baseline gap-3">
              <span className="font-mono text-[11px] text-black/40">{STAGES[stage].k}</span>
              <h3 className="text-[22px] md:text-[28px] font-medium tracking-[-0.02em] leading-tight">
                {STAGES[stage].label}
              </h3>
            </div>
            <p className="mt-2 text-[14px] md:text-[15px] text-black/55 leading-relaxed">{STAGES[stage].text}</p>
          </div>
          <div className="inline-flex items-center gap-2 self-start border hairline rounded-full px-3 py-1.5 bg-paper/80">
            <span className="w-1.5 h-1.5 rounded-full bg-amber" />
            <span className="font-mono text-[10px] tracking-[0.2em]">SIMULATED DEMONSTRATION</span>
          </div>
        </div>

        {/* progress rail */}
        <div className="absolute left-5 md:left-10 bottom-8 z-30 flex items-center gap-3 pointer-events-none">
          {STAGES.map((s, i) => (
            <div key={s.k} className="h-[3px] rounded-full transition-all duration-300" style={{ width: i === stage ? 36 : 14, background: i <= stage ? "#111" : "rgba(0,0,0,0.15)" }} />
          ))}
          <span className="font-mono text-[10px] tracking-[0.2em] text-black/45 ml-2">SCROLL</span>
        </div>

        {/* cards */}
        <div className="absolute inset-0 flex items-center justify-center" style={{ paddingTop: mobile ? 120 : 60 }}>
          <div className="relative" style={{ width: cardW, height: cardH }}>
            {DOCS.map((d, i) => (
              <Card key={d.title} i={i} d={d} p={p} vp={vp} cardW={cardW} cardH={cardH} gap={gap} mobile={mobile} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Card({ i, d, p, vp, cardW, cardH, gap, mobile }: {
  i: number; d: (typeof DOCS)[number]; p: MotionValue<number>; vp: { w: number; h: number };
  cardW: number; cardH: number; gap: number; mobile: boolean;
}) {
  const c = i - 3.5;
  // stack
  const sX = c * 1.5, sY = -c * 1.2, sR = c * 1.2;
  // fan
  const spread = Math.min(mobile ? 44 : 150, vp.w / 8.6);
  const fX = c * spread, fY = Math.abs(c) * Math.abs(c) * (mobile ? 5 : 7) - 20, fR = c * (mobile ? 6 : 5);
  // grid 4x2 (mobile 4x2 still but tighter)
  const col = i % 4, row = Math.floor(i / 4);
  const gX = (col - 1.5) * (cardW + gap), gY = (row - 0.5) * (cardH + gap);
  // final
  const eX = -c * 1.2, eY = c * 1.0, eR = -c * 0.8;

  const keys = [0, 0.14, 0.42, 0.62, 0.78, 1];
  const x = useTransform(p, keys, [sX, sX, fX, gX, gX, eX]);
  const y = useTransform(p, keys, [sY, sY, fY, gY, gY, eY]);
  const rotate = useTransform(p, keys, [sR, sR, fR, 0, 0, eR]);
  const scale = useTransform(p, [0, 0.14, 0.42, 0.62, 0.78, 1], [1, 1, 0.96, 1, 1, 1]);
  const tagOpacity = useTransform(p, [0.55, 0.64, 0.8, 0.86], [0, 1, 1, 0]);
  const coverOpacity = useTransform(p, [0.05, 0.16], [1, 0]);
  const finalOpacity = useTransform(p, [0.9, 1], [0, 1]);

  const isException = d.kind === "exception";
  const zIndex = 10 + (7 - i);

  return (
    <motion.div
      className="absolute left-0 top-0 doc-paper rounded-[10px] overflow-hidden"
      style={{ width: cardW, height: cardH, x, y, rotate, scale, zIndex, transformOrigin: "50% 60%" }}
      transition={{ ease: EASE }}
    >
      {/* header */}
      <div className="px-3 pt-3 pb-2 border-b hairline flex items-center justify-between">
        <span className="font-mono text-[9px] tracking-[0.18em] text-black/45">DOC {String(i + 1).padStart(2, "0")}</span>
        <Icon kind={d.kind} />
      </div>
      <div className="px-3 pt-2.5">
        <div className="text-[12px] md:text-[13px] font-semibold leading-tight tracking-[-0.01em]">{d.title}</div>
        <div className="mt-2.5 space-y-2">
          {d.fields.map(([k, v]) => (
            <div key={k} className="flex items-center justify-between gap-2">
              <span className="font-mono text-[8px] md:text-[9px] tracking-[0.14em] text-black/40">{k}</span>
              <span className={`font-mono text-[9px] md:text-[10px] truncate ${isException && v === "TX-4417" ? "text-amber font-semibold" : "text-black/75"}`}>{v}</span>
            </div>
          ))}
        </div>
        <div className="mt-3 space-y-1.5 hidden md:block">
          <div className="doc-line w-full" />
          <div className="doc-line w-4/5" />
          <div className="doc-line w-3/5" />
        </div>
      </div>
      {/* status tag */}
      <motion.div style={{ opacity: tagOpacity }} className="absolute left-2 right-2 bottom-2">
        <StatusChip status={d.status} />
      </motion.div>

      {/* cover for closed dossier, only on top card */}
      {i === 0 && (
        <motion.div style={{ opacity: coverOpacity }} className="absolute inset-0 bg-[#e9e6df] flex flex-col justify-between p-3 md:p-4">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[9px] tracking-[0.2em] text-black/50">SOURCE PACKAGE</span>
            <span className="w-2 h-2 rounded-full bg-black/25" />
          </div>
          <div>
            <div className="serif-i text-[22px] md:text-[30px] leading-none text-ink">Dossier</div>
            <div className="font-mono text-[9px] tracking-[0.16em] text-black/45 mt-2">08 RECORDS · UNCHECKED</div>
          </div>
          <div className="absolute left-0 right-0 top-1/2 h-[14px] bg-[#111]/85 -translate-y-1/2" />
        </motion.div>
      )}
      {/* final cover */}
      {i === 0 && (
        <motion.div style={{ opacity: finalOpacity }} className="absolute inset-0 bg-[#111] text-paper flex flex-col justify-between p-3 md:p-4">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[9px] tracking-[0.2em] text-white/55">FINAL PACKAGE</span>
            <Package size={14} className="text-white/70" />
          </div>
          <div>
            <div className="font-bold uppercase tracking-[-0.02em] text-[20px] md:text-[26px] leading-none">Reviewed</div>
            <div className="font-mono text-[9px] tracking-[0.16em] text-white/55 mt-2">08 RECORDS · 1 EXCEPTION RESOLVED</div>
          </div>
          <div className="inline-flex items-center gap-1.5 font-mono text-[9px] tracking-[0.16em] text-verify-soft">
            <Check size={11} /> REVIEW COMPLETE
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

function Icon({ kind }: { kind: string }) {
  const cls = "text-black/50";
  if (kind === "exception") return <AlertTriangle size={12} className="text-amber" />;
  if (kind === "human") return <UserCheck size={12} className={cls} />;
  if (kind === "complete") return <Check size={12} className="text-verify" />;
  if (kind === "package") return <Package size={12} className={cls} />;
  return <span className="w-2 h-2 rounded-full border border-black/30" />;
}

export function StatusChip({ status, large = false }: { status: Status | string; large?: boolean }) {
  const exception = status.startsWith("EXCEPTION");
  const complete = status === "REVIEW COMPLETE";
  const src = status === "SOURCE";
  const bg = exception ? "bg-amber-soft text-amber" : complete ? "bg-verify-soft text-verify" : src ? "bg-black/5 text-black/55" : "bg-black/[0.06] text-black/70";
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-[4px] font-mono tracking-[0.14em] ${large ? "text-[10px] px-2.5 py-1.5" : "text-[8px] px-1.5 py-1"} ${bg} w-full justify-center truncate`}>
      {exception ? <AlertTriangle size={large ? 11 : 9} /> : complete ? <Check size={large ? 11 : 9} /> : null}
      {src ? "SOURCE RECORD" : status}
    </span>
  );
}
