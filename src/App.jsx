import React, { useState } from "react";
import { motion } from "framer-motion";

export default function App() {
  const [intent, setIntent] = useState("");
  const [log, setLog] = useState([]);
  const [executing, setExecuting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!intent.trim()) return;
    setLog((prev) => [...prev, { type: "intent", text: intent }]);
    setExecuting(true);
    setTimeout(() => {
      setLog((prev) => [
        ...prev,
        { type: "system", text: `✨ Executed intent: ${intent}` },
      ]);
      setExecuting(false);
    }, 1500);
    setIntent("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 text-white flex flex-col">
      {/* Header */}
      <header className="p-6 border-b border-white/10">
        <h1 className="text-3xl font-bold tracking-wide">
          🔮 Anoma Intent Demo
        </h1>
        <p className="text-slate-300">
          Prototype for intent-centric applications in Web3
        </p>
      </header>

      {/* Hero Section */}
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
          In Anoma, you don’t just send transactions — you express your goals
          and let the network find the best way to fulfill them. Try the demo
          below to see how it works.
        </p>
      </section>

      {/* Intent Form */}
      <main className="flex-1 p-6 flex flex-col items-center">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-xl flex gap-2 mb-6"
        >
          <input
            type="text"
            value={intent}
            onChange={(e) => setIntent(e.target.value)}
            placeholder="e.g., Swap 1 ETH for the best available privacy coin"
            className="flex-1 px-4 py-2 rounded-xl bg-slate-800 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            type="submit"
            className="px-6 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 transition font-semibold"
          >
            Cast
          </button>
        </form>

        {/* Log Display */}
        <div className="w-full max-w-2xl bg-slate-800/60 rounded-2xl p-4 border border-slate-700 overflow-y-auto max-h-[300px]">
          <h3 className="text-lg font-semibold mb-2">Quest Log</h3>
          <div className="space-y-2">
            {log.map((entry, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: entry.type === "intent" ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                className={`p-2 rounded-lg ${
                  entry.type === "intent"
                    ? "bg-purple-500/20 text-purple-200"
                    : "bg-green-500/20 text-green-200"
                }`}
              >
                {entry.text}
              </motion.div>
            ))}
            {executing && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ repeat: Infinity, duration: 1, repeatType: "reverse" }}
                className="p-2 rounded-lg bg-yellow-500/20 text-yellow-200"
              >
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
