import React, { useState } from "react";
import { motion } from "framer-motion";

const SPELLS = [
  { name: "Swap", icon: "🔄", example: "Swap 1 ETH → best privacy token" },
  { name: "Private Tx", icon: "🕵️‍♂️", example: "Send privately 50 ANO" },
  { name: "DAO Contribution", icon: "🏛️", example: "Contribute 100 ANO to DAO" },
  { name: "Escrow Payment", icon: "💰", example: "Lock 200 ANO for trade" }
];

const MOCK_FLOWS = {
  Swap: ["Token A", "DEX", "Privacy Pool", "Token B"],
  "Private Tx": ["Sender", "Mixer", "Receiver"],
  "DAO Contribution": ["Wallet", "DAO Treasury", "Proposal"],
  "Escrow Payment": ["Payer", "Escrow", "Payee"]
};

export default function App() {
  const [intent, setIntent] = useState("");
  const [log, setLog] = useState([]);
  const [executing, setExecuting] = useState(false);
  const [flow, setFlow] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!intent.trim()) return;
    const spell = SPELLS.find(s => s.name === intent) || null;
    const flowSteps = spell ? MOCK_FLOWS[spell.name] : ["User Intent"];
    setFlow(flowSteps);
    setLog(prev => [...prev, { type: "intent", text: intent }]);
    setExecuting(true);
    setTimeout(() => {
      setLog(prev => [...prev, { type: "system", text: `✨ Executed intent: ${intent}` }]);
      setExecuting(false);
    }, 1800);
    setIntent("");
  };

  const handleSpellClick = (spell) => {
    setIntent(spell.name);
    const flowSteps = MOCK_FLOWS[spell.name];
    setFlow(flowSteps);
    setLog(prev => [...prev, { type: "intent", text: spell.name }]);
    setExecuting(true);
    setTimeout(() => {
      setLog(prev => [...prev, { type: "system", text: `✨ Executed intent: ${spell.name}` }]);
      setExecuting(false);
    }, 1800);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 text-white flex flex-col">
      {/* Header */}
      <header className="p-6 border-b border-white/10 text-center">
        <h1 className="text-3xl font-bold tracking-wide">🔮 Anoma Intent Demo</h1>
        <p className="text-slate-300 mt-1">
          Prototype for intent-centric applications in Web3
        </p>
      </header>

      {/* Hero */}
      <section className="p-10 text-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-extrabold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent"
        >
          Shape the Future with Intents
        </motion.h2>
        <p className="mt-4 text-lg text-slate-300 max-w-2xl mx-auto">
          Express your goals and let the system find the best way to fulfill them.
        </p>
      </section>

      {/* Spells */}
      <section className="p-6 flex flex-wrap justify-center gap-4">
        {SPELLS.map((spell, i) => (
          <motion.div key={i} whileHover={{ scale: 1.05 }} className="cursor-pointer bg-purple-800/30 border border-purple-600 rounded-2xl px-5 py-3 flex flex-col items-center transition">
            <span className="text-3xl">{spell.icon}</span>
            <span className="mt-2 font-semibold">{spell.name}</span>
          </motion.div>
        ))}
      </section>

      {/* Intent Form */}
      <main className="flex-1 p-6 flex flex-col items-center">
        <form onSubmit={handleSubmit} className="w-full max-w-xl flex gap-2 mb-6">
          <input type="text" value={intent} onChange={(e) => setIntent(e.target.value)}
            placeholder="Type your intent or click a Spell..." 
            className="flex-1 px-4 py-2 rounded-xl bg-slate-800 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500" />
          <button type="submit" className="px-6 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 transition font-semibold">Cast</button>
        </form>

        {/* Flow Visualizer */}
        {flow.length > 0 && (
          <div className="w-full max-w-2xl mb-6 p-4 bg-slate-800/50 rounded-2xl flex justify-between">
            {flow.map((step, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y:0 }} transition={{ delay: i*0.2 }} className="px-3 py-2 rounded-xl bg-purple-600/30 text-center flex-1 mx-1">
                {step}
              </motion.div>
            ))}
          </div>
        )}

        {/* Quest Log */}
        <div className="w-full max-w-2xl bg-slate-800/60 rounded-2xl p-4 border border-slate-700 overflow-y-auto max-h-[300px]">
          <h3 className="text-lg font-semibold mb-2">Quest Log</h3>
          <div className="space-y-2">
            {log.map((entry, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, x: entry.type === "intent" ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                className={`p-2 rounded-lg ${
                  entry.type === "intent" ? "bg-purple-500/20 text-purple-200" :
                  entry.type === "system" ? "bg-green-500/20 text-green-200" : "bg-red-500/20 text-red-200"
                }`}
              >
                {entry.text}
              </motion.div>
            ))}
            {executing && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ repeat: Infinity, duration: 1, repeatType: "reverse" }} className="p-2 rounded-lg bg-yellow-500/20 text-yellow-200">
                ⏳ Executing intent...
              </motion.div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="p-6 border-t border-white/10 text-center text-slate-400">
        Built for the <span className="text-purple-300">Mages of Anoma</span> ✨
      </footer>
    </div>
  );
}
