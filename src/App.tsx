import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Dossier from "./components/Dossier";
import Problem from "./components/Problem";
import Capabilities from "./components/Capabilities";
import Process from "./components/Process";
import Proof from "./components/Proof";
import HumanVerify from "./components/HumanVerify";
import Fit from "./components/Fit";
import Principles from "./components/Principles";
import Boundaries from "./components/Boundaries";
import Contact from "./components/Contact";

export default function App() {
  return (
    <div className="bg-paper text-ink min-h-screen">
      <Navbar />
      <main>
        <h1 className="sr-only">DAFTRIFY — Document Operations &amp; Pre-Submission Auditing</h1>
        <Hero />
        <Dossier />
        <Problem />
        <Capabilities />
        <Process />
        <Proof />
        <HumanVerify />
        <Fit />
        <Principles />
        <Boundaries />
        <Contact />
      </main>
    </div>
  );
}
