import { useState } from "react";
import { Menu, X } from "lucide-react";
import { NAV, MAILTO } from "../content";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header
      className="fixed top-0 left-0 right-0 z-50"
      style={{ background: "rgba(242,240,235,0.85)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(13,13,13,0.08)" }}
    >
      <div className="grid grid-cols-2 md:grid-cols-3 items-center px-5 md:px-10 py-4">
        <a href="#top" className="justify-self-start flex items-center gap-2.5">
          <Logo />
          <span className="font-semibold tracking-[0.18em] text-[14px] text-ink-2">DAFTRIFY</span>
        </a>

        <nav className="hidden md:flex justify-self-center items-center">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="px-3.5 py-2 text-[13px] font-semibold tracking-[0.12em] uppercase text-ink-2 hover:opacity-55 transition-opacity duration-200"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="justify-self-end flex items-center gap-3">
          <a href={MAILTO} className="pill-dark hidden sm:inline-flex !py-2.5 !px-5 !text-[13px]">
            <span className="w-[18px] h-[18px] rounded-full bg-white/20 grid place-items-center">
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
            </span>
            Start a Review
          </a>
          <button
            className="md:hidden p-2 -mr-2"
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t hairline px-5 py-4 flex flex-col gap-1 bg-paper">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              className="py-2.5 text-[15px] font-medium"
            >
              {n.label}
            </a>
          ))}
          <a href={MAILTO} className="pill-dark mt-3 justify-center">
            Start a Review
          </a>
        </div>
      )}
    </header>
  );
}

export function Logo({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M3 3.5h11.5l6.5 6.5v10.5H3V3.5Z" stroke="#111" strokeWidth="1.7" strokeLinejoin="round"/>
      <path d="M14.5 3.5V10H21" stroke="#111" strokeWidth="1.7" strokeLinejoin="round"/>
      <path d="M8 12.5h7.5M8 16h5" stroke="#111" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  );
}
