import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, Check, FileText, UserCheck } from "lucide-react";
import { MAILTO } from "../content";

type CardState = {
  label: string;
  rows: [string, string][];
  accent: boolean;
  icon: "file" | "alert" | "user" | "check";
};

const CARD_STATES: CardState[] = [
  { label: "Source record", icon: "file", accent: false, rows: [["DOC", "SRC-01"], ["TYPE", "Statement"], ["PAGES", "03"]] },
  { label: "Extracted", icon: "file", accent: false, rows: [["NAME", "A. Sample"], ["DATE", "03/07/24"], ["REF", "TX-4471"]] },
  { label: "Normalized", icon: "file", accent: false, rows: [["NAME", "SAMPLE, A."], ["DATE", "2024-07-03"], ["REF", "TX-4471"]] },
  { label: "Reconciled", icon: "check", accent: false, rows: [["SRC-01", "2024-07-03"], ["SRC-02", "2024-07-03"], ["MATCH", "YES"]] },
  { label: "Exception", icon: "alert", accent: true, rows: [["SRC-01", "TX-4471"], ["SRC-03", "TX-4417"], ["MATCH", "NO"]] },
  { label: "Human review", icon: "user", accent: false, rows: [["FINDING", "REF mismatch"], ["CHECKED", "SRC-03"], ["NOTE", "Transposed"]] },
  { label: "Review complete", icon: "check", accent: false, rows: [["ITEMS", "12"], ["EXCEPTIONS", "01"], ["RESOLVED", "01"]] },
];

const LINE1 = "DOCUMENTS".split("");
const LINE2 = "CHECKED.".split("");

function StateIcon({ k, accent }: { k: CardState["icon"]; accent: boolean }) {
  if (k === "alert") return <AlertTriangle size={12} className="text-amber" />;
  if (k === "user") return <UserCheck size={12} className="text-black/55" />;
  if (k === "check") return <Check size={12} className={accent ? "text-amber" : "text-black/55"} />;
  return <FileText size={12} className="text-black/45" />;
}

function CardFace({ i }: { i: number }) {
  const s = CARD_STATES[i];
  return (
    <div className="w-full h-full doc-paper rounded-lg overflow-hidden flex flex-col text-left">
      <div className="px-3 py-2 border-b hairline flex items-center justify-between">
        <span className="font-mono text-[8px] tracking-[0.22em] text-black/45">DAFTRIFY</span>
        <StateIcon k={s.icon} accent={s.accent} />
      </div>
      <div className="px-3 py-3 flex-1">
        <div className={`text-[13px] font-bold uppercase tracking-[0.02em] ${s.accent ? "text-amber" : "text-ink"}`}>
          {s.label}
        </div>
        <div className="mt-3 space-y-2">
          {s.rows.map(([k, v]) => (
            <div key={k} className="flex items-center justify-between gap-2">
              <span className="font-mono text-[8px] tracking-[0.16em] text-black/40">{k}</span>
              <span className={`font-mono text-[9px] ${s.accent && v === "TX-4417" ? "text-amber font-semibold" : "text-black/75"}`}>{v}</span>
            </div>
          ))}
        </div>
        <div className="mt-3 space-y-1.5">
          <div className="doc-line w-full" />
          <div className="doc-line w-3/4" />
          <div className="doc-line w-1/2" />
        </div>
      </div>
      <div className={`px-3 py-2 border-t hairline flex items-center justify-between gap-2 ${s.accent ? "bg-amber-soft" : ""}`}>
        <span className="font-mono text-[7px] tracking-[0.16em] text-black/50 whitespace-nowrap">SIMULATED DEMONSTRATION</span>
        <span className="font-mono text-[8px] tracking-[0.12em] text-black/60">
          {String(i + 1).padStart(2, "0")}/{String(CARD_STATES.length).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
}

export default function Hero() {
  const lettersRef = useRef<(HTMLSpanElement | null)[]>([]);
  const cardRef = useRef<HTMLDivElement>(null);
  const [idx, setIdx] = useState(0);
  const [interactive, setInteractive] = useState<boolean | null>(null);
  const [cardVisible, setCardVisible] = useState(false);
  const [hideCard, setHideCard] = useState(false);
  const [clock, setClock] = useState("");
  const s = useRef({ tx: 0, ty: 0, x: 0, y: 0, lastX: 0, lastY: 0, travel: 0, raf: 0 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setInteractive(fine && !reduced);
  }, []);

  useEffect(() => {
    const f = () => setClock(new Date().toLocaleTimeString("en-GB", { hour12: false }));
    f();
    const t = setInterval(f, 1000);
    return () => clearInterval(t);
  }, []);

  // auto-cycle states when cursor interaction is unavailable
  useEffect(() => {
    if (interactive !== false) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % CARD_STATES.length), 2200);
    return () => clearInterval(t);
  }, [interactive]);

  // lerp follow loop
  useEffect(() => {
    if (!interactive) return;
    const st = s.current;
    const loop = () => {
      st.x += (st.tx - st.x) * 0.15;
      st.y += (st.ty - st.y) * 0.15;
      const vx = st.tx - st.x;
      if (cardRef.current) {
        cardRef.current.style.transform = `translate(${st.x - 95}px, ${st.y - 125}px) rotate(${Math.max(-7, Math.min(7, vx * 0.05))}deg)`;
      }
      st.raf = requestAnimationFrame(loop);
    };
    st.raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(st.raf);
  }, [interactive]);

  const onMove = (e: React.MouseEvent) => {
    if (!interactive) return;
    const st = s.current;
    st.tx = e.clientX;
    st.ty = e.clientY;
    if (!cardVisible) {
      st.x = e.clientX;
      st.y = e.clientY;
      st.lastX = e.clientX;
      st.lastY = e.clientY;
      setCardVisible(true);
    }
    // pointer travel advances the review state
    st.travel += Math.hypot(e.clientX - st.lastX, e.clientY - st.lastY);
    st.lastX = e.clientX;
    st.lastY = e.clientY;
    if (st.travel > 90) {
      st.travel = 0;
      setIdx((i) => (i + 1) % CARD_STATES.length);
    }
    // magnetic letters — recoil away from the pointer
    lettersRef.current.forEach((el) => {
      if (!el) return;
      const r = el.getBoundingClientRect();
      const dx = r.left + r.width / 2 - e.clientX;
      const dy = r.top + r.height / 2 - e.clientY;
      const dist = Math.hypot(dx, dy);
      const R = 170;
      if (dist < R && dist > 0.01) {
        const f = (1 - dist / R) * 30;
        el.style.transform = `translate(${(dx / dist) * f}px, ${(dy / dist) * f}px)`;
      } else {
        el.style.transform = "translate(0,0)";
      }
    });
  };

  const onLeave = () => {
    setCardVisible(false);
    lettersRef.current.forEach((el) => el && (el.style.transform = "translate(0,0)"));
  };

  const renderLetters = (chars: string[], offset: number, cls: string) =>
    chars.map((ch, i) => {
      const index = offset + i;
      return (
        <motion.span
          key={index}
          initial={{ y: 90, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.12 + index * 0.03, type: "spring", stiffness: 150, damping: 24 }}
          className={`inline-block ${cls}`}
        >
          <span
            ref={(el) => { lettersRef.current[index] = el; }}
            className="inline-block will-change-transform"
            style={{ transition: "transform 0.5s cubic-bezier(0.22,1,0.36,1)" }}
          >
            {ch}
          </span>
        </motion.span>
      );
    });

  return (
    <section
      id="top"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`relative min-h-screen flex flex-col justify-center overflow-hidden ${interactive ? "md:cursor-none" : ""}`}
    >
      {/* registration marks */}
      <span aria-hidden className="absolute top-24 left-5 md:left-10 w-3 h-3 border-t border-l border-black/25" />
      <span aria-hidden className="absolute top-24 right-5 md:right-10 w-3 h-3 border-t border-r border-black/25" />
      <span aria-hidden className="absolute bottom-20 left-5 md:left-10 w-3 h-3 border-b border-l border-black/25" />
      <span aria-hidden className="absolute bottom-20 right-5 md:right-10 w-3 h-3 border-b border-r border-black/25" />

      {/* meta row */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="absolute top-[72px] md:top-[80px] inset-x-0 px-5 md:px-10 flex flex-wrap items-center justify-between gap-3"
      >
        <div className="eyebrow">Document Operations &amp; Pre-Submission Auditing</div>
        <div className="flex items-center gap-4">
          <span className="hidden md:inline font-mono text-[10px] tracking-[0.22em] text-black/50">{clock} — LOCAL</span>
          <span className="inline-flex items-center gap-2 border hairline rounded-full px-3 py-1.5">
            <span className="pulse-dot w-1.5 h-1.5 rounded-full bg-amber" />
            <span className="font-mono text-[9px] tracking-[0.22em] text-black/70">ACCEPTING DOCUMENT REVIEWS</span>
          </span>
        </div>
      </motion.div>

      {/* headline */}
      <div className="relative z-10 px-5 md:px-10 pt-32 pb-28 text-center">
        <h2 className="font-extrabold uppercase leading-[0.85] tracking-[-0.04em] select-none" style={{ fontSize: "clamp(3.2rem, 12.5vw, 10.5rem)" }}>
          <span className="block whitespace-nowrap text-ink">{renderLetters(LINE1, 0, "")}</span>
          <span className="block whitespace-nowrap text-amber">{renderLetters(LINE2, LINE1.length, "")}</span>
        </h2>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9, ease: "easeOut" }}
          className="mx-auto mt-10 max-w-[880px] border-t hairline pt-6 flex flex-col md:flex-row items-center md:items-start justify-between gap-6 text-left"
        >
          <p className="max-w-[360px] text-[12px] md:text-[13px] uppercase tracking-[0.08em] leading-relaxed text-black/60 text-center md:text-left">
            Before they move forward. DAFTRIFY helps document-heavy workflows become more structured, consistent, traceable, and ready for the next stage.
          </p>
          <div
            className="flex flex-wrap justify-center gap-3"
            onMouseEnter={() => setHideCard(true)}
            onMouseLeave={() => setHideCard(false)}
          >
            <a href={MAILTO} className="pill-dark cursor-pointer">
              <span className="w-1.5 h-1.5 rounded-full bg-paper" />
              Start a Review
            </a>
            <a href="#process" className="pill-ghost cursor-pointer">See the Process</a>
          </div>
        </motion.div>

        {/* static card for touch / reduced-motion */}
        {interactive === false && (
          <div className="mx-auto mt-12 w-[190px] h-[250px]">
            <CardFace i={idx} />
          </div>
        )}
      </div>

      {/* cursor-following card */}
      {interactive && (
        <div
          ref={cardRef}
          className="fixed top-0 left-0 z-40 pointer-events-none transition-opacity duration-300"
          style={{ width: 190, height: 250, opacity: cardVisible && !hideCard ? 1 : 0 }}
        >
          <CardFace i={idx} />
        </div>
      )}

      {/* bottom strip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.3 }}
        className="absolute bottom-0 inset-x-0 border-t hairline px-5 md:px-10 py-4 flex items-center justify-between gap-4 font-mono text-[9px] tracking-[0.22em] text-black/50"
      >
        <div className="flex items-center gap-3">
          <span className="hidden sm:inline">REVIEW STATES — {String(CARD_STATES.length).padStart(2, "0")}</span>
          <span className="flex items-center gap-1.5">
            {CARD_STATES.map((_, i) => (
              <span key={i} className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${i === idx ? "bg-amber" : "bg-black/20"}`} />
            ))}
          </span>
        </div>
        <span className="hidden md:inline">SCROLL — OPEN THE DOSSIER ↓</span>
        <span>{interactive ? "MOVE CURSOR TO EXPLORE ↗" : "STATES CYCLE AUTOMATICALLY"}</span>
      </motion.div>
    </section>
  );
}
