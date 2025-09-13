import React, { useState } from "react";
import { motion } from "framer-motion";

const SPELLS = [
  { 
    name: "Swap", icon: "🔄", example: "Swap 1 ETH → best privacy token",
    description: "Exchange one token for another via a privacy-preserving route."
  },
  { 
    name: "Private Tx", icon: "🕵️‍♂️", example: "Send privately 50 XAN",
    description: "Send tokens privately without revealing your identity."
  },
  { 
    name: "DAO Contribution", icon: "🏛️", example: "Contribute 100 XAN to DAO",
    description: "Contribute tokens to a DAO proposal or treasury."
  },
  { 
    name: "Escrow Payment", icon: "💰", example: "Lock 200 XAN for trade",
    description: "Lock tokens in escrow for secure trades."
  }
];

const MOCK_FLOWS = {
  Swap: ["Token A → DEX → Privacy Pool → Token B"],
  "Private Tx": ["Sender → Mixer → Receiver"],
  "DAO Contribution": ["Wallet → DAO Treasury → Proposal"],
  "Escrow Payment": ["Payer → Escrow → Payee"]
};

const FLOW_EXPLANATIONS = {
  "Token A → DEX → Privacy Pool → Token B": [
    "Swap route", "Privacy Pool hides transaction", "Receive token B"
  ],
  "Sender → Mixer → Receiver": [
    "Send token", "Mixer hides sender", "Receiver gets token"
  ],
  "Wallet → DAO Treasury → Proposal": [
    "Select DAO", "Contribute XAN", "Proposal updated"
  ],
  "Payer → Escrow → Payee": [
    "Lock in Escrow", "Funds held securely", "Release to payee"
  ]
};

const STATUS_ICONS = { pending: "⏳", executed: "✅", failed: "❌" };

export default function App() {
  const [intent, setIntent] = useState("");
  const [log, setLog] = useState([]);
  const [executing, setExecuting] = useState(false);
  const [flow, setFlow] = useState([]);
  const [currentDescription, setCurrentDescription] = useState("");
  const [hoverParticles, setHoverParticles] = useState([]);
  const [flowParticles, setFlowParticles] = useState([]);
  const [logParticles, setLogParticles] = useState([]);
  const [showOnboarding, setShowOnboarding] = useState(true);

  const executeIntent = (intentName) => {
    const flowSteps = MOCK_FLOWS[intentName] || ["User Intent"];
    setFlow(flowSteps);
    setLog(prev => [...prev, { type: "intent", text: intentName, status: "pending" }]);
    setExecuting(true);
    triggerFlowParticles();
    triggerLogParticles();
    setTimeout(() => {
      setLog(prev => [...prev, { type: "system", text: `Executed: ${intentName}`, status: "executed" }]);
      setExecuting(false);
    }, 1800);
  };

  const triggerFlowParticles = () => {
    const particles = Array.from({length: 5}).map(() => ({
      x: Math.random() * 40 - 20,
      y: Math.random() * 20,
      opacity: Math.random(),
      size: Math.random() * 3 + 1,
      id: Math.random().toString(36).substr(2, 9)
    }));
    setFlowParticles(particles);
    setTimeout(() => setFlowParticles([]), 800);
  };

  const triggerLogParticles = () => {
    const particles = Array.from({length: 5}).map(() => ({
      x: Math.random() * 40 - 20,
      y: Math.random() * 20,
      opacity: Math.random(),
      size: Math.random() * 3 + 1,
      id: Math.random().toString(36).substr(2, 9)
    }));
    setLogParticles(particles);
    setTimeout(() => setLogParticles([]), 800);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!intent.trim()) return;
    executeIntent(intent);
    setIntent("");
    setCurrentDescription("");
  };

  const handleSpellClick = (spell) => {
    executeIntent(spell.name);
    setCurrentDescription(spell.description);
  };

  const handleSpellHover = () => {
    const particles = Array.from({length: 8}).map(() => ({
      x: Math.random() * 60 - 30,
      y: Math.random() * 30,
      opacity: Math.random(),
      size: Math.random() * 4 + 2,
      id: Math.random().toString(36).substr(2, 9)
    }));
    setHoverParticles(particles);
    setTimeout(() => setHoverParticles([]), 800);
  };

  const particleCount = window.innerWidth < 640 ? 8 : 15;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 text-white flex flex-col relative overflow-hidden">
      
      {/* Onboarding Panel */}
      {showOnboarding && (
        <motion.div initial={{y:-50, opacity:0}} animate={{y:0, opacity:1}} transition={{duration:0.5}}
          className="absolute top-6 left-1/2 -translate-x-1/2 bg-purple-800/70 p-4 rounded-xl shadow-lg z-20 max-w-lg w-[90%] text-center">
          <p>Welcome! Express your intent (e.g., swap tokens, send privately) and see how the system would fulfill it.</p>
          <button onClick={() => setShowOnboarding(false)} className="mt-2 px-3 py-1 bg-purple-600 rounded hover:bg-purple-700 transition text-sm">Got it!</button>
        </motion.div>
      )}

      {/* Background Particles */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        {[...Array(particleCount)].map((_, i) => (
          <motion.div key={i} className="absolute w-2 h-2 rounded-full blur-md"
            style={{backgroundColor: `hsl(${Math.random()*360}, 70%, 60%)`}}
            initial={{ opacity: 0 }} animate={{ opacity: [0,1,0] }} 
            transition={{ repeat: Infinity, duration: 4 + i*0.3, repeatType: "loop", yoyo: Infinity }}
            style={{ top: `${Math.random()*100}%`, left: `${Math.random()*100}%` }}
          />
        ))}
      </div>

      {/* Header */}
      <header className="p-6 border-b border-white/10 text-center z-10 relative">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-wide">🔮 Anoma Intent Demo</h1>
        <p className="text-slate-300 mt-1 text-sm sm:text-base">Prototype for intent-centric applications in Web3</p>
      </header>

      {/* Hero */}
      <section className="p-6 sm:p-10 text-center z-10 relative">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-2xl sm:text-4xl font-extrabold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent"
        >
          Shape the Future with Intents
        </motion.h2>
        <p className="mt-2 sm:mt-4 text-sm sm:text-lg text-slate-300 max-w-xl sm:max-w-2xl mx-auto">
          Express your goals and let the system find the best way to fulfill them.
        </p>
        {currentDescription && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}
            className="mt-3 sm:mt-4 p-2 sm:p-3 bg-purple-800/50 rounded-lg inline-block text-slate-200 shadow-lg text-sm sm:text-base"
          >
            {currentDescription}
          </motion.div>
        )}
      </section>

      {/* Spells */}
      <section className="p-4 sm:p-6 flex flex-wrap justify-center gap-3 sm:gap-4 z-10 relative">
        {SPELLS.map((spell, i) => (
          <motion.div key={i} 
            whileHover={{ scale: 1.08, rotate: 2, boxShadow: "0 0 30px rgba(128,0,255,0.8)" }}
            className="cursor-pointer group bg-purple-800/30 border border-purple-600 rounded-2xl px-4 py-3 sm:px-5 sm:py-3 flex flex-col items-center w-full sm:w-auto transition relative overflow-visible"
            onClick={() => handleSpellClick(spell)}
            onMouseEnter={handleSpellHover}
            title={spell.description}
          >
            <span className="text-2xl sm:text-3xl">{spell.icon}</span>
            <span className="mt-1 sm:mt-2 font-semibold text-sm sm:text-base">{spell.name}</span>
            <span className="text-xs text-purple-300 mt-1 opacity-0 group-hover:opacity-100 transition">{spell.example}</span>
          </motion.div>
        ))}
      </section>

      {/* Intent Form */}
      <main className="flex-1 p-4 sm:p-6 flex flex-col items-center z-10 relative">
        <form onSubmit={handleSubmit} className="w-full max-w-xl flex flex-col sm:flex-row gap-2 sm:gap-2 mb-4 sm:mb-6">
          <input type="text" value={intent} onChange={(e) => setIntent(e.target.value)}
            placeholder="Type your intent or click a Spell..." 
            className="flex-1 px-3 sm:px-4 py-2 rounded-xl bg-slate-800 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm sm:text-base" />
          <button type="submit" className="mt-2 sm:mt-0 px-4 sm:px-6 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 transition font-semibold text-sm sm:text-base">Cast</button>
        </form>

        {/* Flow Visualizer */}
        {flow.length > 0 && (
          <div className="w-full max-w-3xl mb-4 sm:mb-6 p-3 sm:p-4 bg-gradient-to-r from-purple-700/30 to-indigo-900/30 rounded-2xl flex flex-col sm:flex-row justify-between relative shadow-md gap-2 sm:gap-3">
            {flow.map((step, i) => (
              <motion.div key={i} 
                whileHover={{ boxShadow: "0 0 15px rgba(255,0,255,0.6)" }}
                initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y:0 }} transition={{ delay: i*0.25 }}
                className="px-2 sm:px-3 py-2 rounded-xl bg-gradient-to-r from-purple-600/60 to-pink-500/60 text-center flex-1 shadow-md text-sm sm:text-base relative"
              >
                {step}
                {FLOW_EXPLANATIONS[step] && (
                  <div className="mt-1 text-xs text-purple-300">
                    {FLOW_EXPLANATIONS[step].join(" → ")}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}

        {/* Quest Log */}
        <div className="w-full max-w-3xl bg-slate-800/60 rounded-2xl p-3 sm:p-4 border border-slate-700 overflow-y-auto max-h-[300px] shadow-lg relative">
          <h3 className="text-lg font-semibold mb-2">Quest Log</h3>
          <div className="space-y-2">
            {log.map((entry, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, x: entry.type === "intent" ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                className={`p-2 rounded-lg flex items-center justify-between text-sm sm:text-base relative ${
                  entry.status === "pending" ? "bg-yellow-500/20 text-yellow-200 shadow-md" :
                  entry.status === "executed" ? "bg-green-500/20 text-green-200 shadow-md" :
                  "bg-red-500/20 text-red-200 shadow-md"
                }`}
              >
                <span>{STATUS_ICONS[entry.status || "pending"]}</span>
                <span className="ml-2">{entry.text}</span>
              </motion.div>
            ))}
            {executing && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ repeat: Infinity, duration: 1, repeatType: "reverse" }} 
                className="p-2 rounded-lg bg-yellow-500/20 text-yellow-200 flex items-center shadow-lg animate-pulse text-sm sm:text-base relative">
                ⏳ Executing intent...
              </motion.div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="p-4 sm:p-6 border-t border-white/10 text-center text-slate-400 z-10 relative text-xs sm:text-sm">
        Built for the <span className="text-purple-300">Mages of Anoma</span> ✨
      </footer>
    </div>
  );
}
