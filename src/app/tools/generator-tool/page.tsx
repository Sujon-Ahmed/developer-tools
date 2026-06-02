"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function GeneratorTool() {
  // Password state
  const [password, setPassword] = useState("");
  const [passLength, setPassLength] = useState(16);
  const [passUpper, setPassUpper] = useState(true);
  const [passLower, setPassLower] = useState(true);
  const [passNumbers, setPassNumbers] = useState(true);
  const [passSymbols, setPassSymbols] = useState(true);
  const [passStrength, setPassStrength] = useState({ class: "", text: "Password Strength" });
  const [copiedPass, setCopiedPass] = useState(false);

  // UUID state
  const [uuidQty, setUuidQty] = useState(5);
  const [uuidUpper, setUuidUpper] = useState(false);
  const [uuidHyphens, setUuidHyphens] = useState(true);
  const [uuidsOutput, setUuidsOutput] = useState("");
  const [copiedUuids, setCopiedUuids] = useState(false);

  // Password Generator
  const generatePassword = () => {
    const charsets = {
      upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
      lower: "abcdefghijklmnopqrstuvwxyz",
      numbers: "0123456789",
      symbols: "!@#$%^&*()_+-=[]{}|;:,.<>?"
    };

    let charset = "";
    let setsCount = 0;
    if (passUpper) { charset += charsets.upper; setsCount++; }
    if (passLower) { charset += charsets.lower; setsCount++; }
    if (passNumbers) { charset += charsets.numbers; setsCount++; }
    if (passSymbols) { charset += charsets.symbols; setsCount++; }

    if (!charset) {
      setPassword("");
      setPassStrength({ class: "", text: "Select at least 1 option!" });
      return;
    }

    let result = "";
    const array = new Uint32Array(passLength);
    if (typeof window !== "undefined" && window.crypto && window.crypto.getRandomValues) {
      window.crypto.getRandomValues(array);
    }

    for (let i = 0; i < passLength; i++) {
      const randomIndex = array[i] ? (array[i] % charset.length) : Math.floor(Math.random() * charset.length);
      result += charset.charAt(randomIndex);
    }

    setPassword(result);

    // Calculate strength (simple entropy evaluation)
    const entropy = passLength * Math.log2(setsCount * 15 || 1);
    if (entropy < 40 || passLength < 8) {
      setPassStrength({ class: "bg-rose-500 w-1/3", text: "Weak Password" });
    } else if (entropy < 75 || setsCount < 3) {
      setPassStrength({ class: "bg-amber-500 w-2/3", text: "Medium Password" });
    } else {
      setPassStrength({ class: "bg-emerald-500 w-full", text: "Strong Password" });
    }
  };

  // UUID Generator
  const generateUUIDv4 = () => {
    let uuid = "";
    if (typeof window !== "undefined" && window.crypto && typeof window.crypto.randomUUID === "function") {
      uuid = crypto.randomUUID();
    } else {
      uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0;
        const v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      });
    }

    if (!uuidHyphens) {
      uuid = uuid.replace(/-/g, "");
    }
    if (uuidUpper) {
      uuid = uuid.toUpperCase();
    }
    return uuid;
  };

  const generateUUIDBatch = () => {
    const results = [];
    for (let i = 0; i < uuidQty; i++) {
      results.push(generateUUIDv4());
    }
    setUuidsOutput(results.join("\n"));
  };

  // Run on mount and changes
  useEffect(() => {
    generatePassword();
  }, [passLength, passUpper, passLower, passNumbers, passSymbols]);

  useEffect(() => {
    generateUUIDBatch();
  }, [uuidQty, uuidUpper, uuidHyphens]);

  const handleCopyPass = () => {
    if (!password) return;
    navigator.clipboard.writeText(password).then(() => {
      setCopiedPass(true);
      setTimeout(() => setCopiedPass(false), 1500);
    });
  };

  const handleCopyUuids = () => {
    if (!uuidsOutput) return;
    navigator.clipboard.writeText(uuidsOutput).then(() => {
      setCopiedUuids(true);
      setTimeout(() => setCopiedUuids(false), 1500);
    });
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div>
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white mb-2 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>
        <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white to-indigo-400 bg-clip-text text-transparent">
          Password & UUID Generator
        </h1>
        <p className="text-sm text-gray-400">
          Generate secure passwords with custom specifications or generate batch UUID strings instantly.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Password Card */}
        <div className="bg-gray-900/30 border border-white/5 rounded-2xl p-6 flex flex-col gap-6 shadow-xl backdrop-blur-md">
          <h3 className="font-bold text-lg text-gray-200 border-b border-white/5 pb-4">
            Secure Password Generator
          </h3>

          <div className="flex gap-2">
            <input
              type="text"
              readOnly
              value={password}
              placeholder="Select options..."
              className="flex-grow bg-black/30 border border-white/5 rounded-xl px-4 py-3 font-mono text-lg font-bold text-gray-100 placeholder-gray-600 focus:outline-none"
            />
            <button
              onClick={handleCopyPass}
              className={`px-4 rounded-xl border text-sm font-semibold transition-colors cursor-pointer ${
                copiedPass
                  ? "bg-emerald-500/10 border-emerald-500 text-emerald-400"
                  : "bg-white/5 border-white/5 text-gray-400 hover:text-white hover:bg-white/10"
              }`}
            >
              {copiedPass ? "Copied!" : "Copy"}
            </button>
          </div>

          {/* Strength bar */}
          <div className="flex items-center gap-4">
            <div className="flex-grow h-1.5 bg-white/5 rounded-full overflow-hidden">
              <div className={`h-full rounded-full transition-all duration-300 ${passStrength.class}`} />
            </div>
            <span className={`text-xs font-semibold ${
              passStrength.text.includes("Strong") 
                ? "text-emerald-400" 
                : passStrength.text.includes("Medium") 
                ? "text-amber-400" 
                : "text-rose-400"
            }`}>
              {passStrength.text}
            </span>
          </div>

          {/* Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm font-semibold text-gray-400">
              <span>Password Length</span>
              <span className="font-mono text-indigo-400">{passLength}</span>
            </div>
            <input
              type="range"
              min="6"
              max="64"
              value={passLength}
              onChange={(e) => setPassLength(parseInt(e.target.value, 10))}
              className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-indigo-500"
            />
          </div>

          {/* Checkboxes */}
          <div className="flex flex-col gap-3">
            {[
              { id: "upper", label: "Uppercase Letters (A-Z)", val: passUpper, set: setPassUpper },
              { id: "lower", label: "Lowercase Letters (a-z)", val: passLower, set: setPassLower },
              { id: "numbers", label: "Numbers (0-9)", val: passNumbers, set: setPassNumbers },
              { id: "symbols", label: "Special Symbols (!@#$...)", val: passSymbols, set: setPassSymbols }
            ].map(chk => (
              <label key={chk.id} className="flex items-center gap-3 text-sm text-gray-400 hover:text-white cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={chk.val}
                  onChange={(e) => chk.set(e.target.checked)}
                  className="w-4 h-4 rounded border-white/5 accent-indigo-500"
                />
                {chk.label}
              </label>
            ))}
          </div>

          <button
            onClick={generatePassword}
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-xl transition-all shadow-[0_0_20px_rgba(99,102,241,0.2)] mt-auto cursor-pointer"
          >
            Generate Password
          </button>
        </div>

        {/* UUID Card */}
        <div className="bg-gray-900/30 border border-white/5 rounded-2xl p-6 flex flex-col gap-6 shadow-xl backdrop-blur-md">
          <h3 className="font-bold text-lg text-gray-200 border-b border-white/5 pb-4">
            UUID v4 Generator
          </h3>

          {/* Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm font-semibold text-gray-400">
              <span>Batch Size (Quantity)</span>
              <span className="font-mono text-cyan-400">{uuidQty}</span>
            </div>
            <input
              type="range"
              min="1"
              max="50"
              value={uuidQty}
              onChange={(e) => setUuidQty(parseInt(e.target.value, 10))}
              className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-cyan-500"
            />
          </div>

          {/* Checkboxes */}
          <div className="flex flex-col gap-3">
            <label className="flex items-center gap-3 text-sm text-gray-400 hover:text-white cursor-pointer select-none">
              <input
                type="checkbox"
                checked={uuidUpper}
                onChange={(e) => setUuidUpper(e.target.checked)}
                className="w-4 h-4 rounded border-white/5 accent-cyan-500"
              />
              Uppercase Output
            </label>
            <label className="flex items-center gap-3 text-sm text-gray-400 hover:text-white cursor-pointer select-none">
              <input
                type="checkbox"
                checked={uuidHyphens}
                onChange={(e) => setUuidHyphens(e.target.checked)}
                className="w-4 h-4 rounded border-white/5 accent-cyan-500"
              />
              Include Hyphens
            </label>
          </div>

          <button
            onClick={generateUUIDBatch}
            className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 rounded-xl transition-all shadow-[0_0_20px_rgba(6,182,212,0.2)] cursor-pointer"
          >
            Generate UUIDs
          </button>

          {/* Results Box */}
          <div className="flex flex-col gap-2 mt-4 flex-grow">
            <div className="flex justify-between items-center text-sm">
              <h4 className="font-bold text-gray-400">UUIDs Output</h4>
              <button
                onClick={handleCopyUuids}
                className={`px-3 py-1 rounded border text-xs font-semibold transition-colors cursor-pointer ${
                  copiedUuids
                    ? "bg-emerald-500/10 border-emerald-500 text-emerald-400"
                    : "bg-white/5 border-white/5 text-gray-400 hover:text-white hover:bg-white/10"
                }`}
              >
                {copiedUuids ? "Copied All!" : "Copy All"}
              </button>
            </div>
            <textarea
              readOnly
              value={uuidsOutput}
              placeholder="UUIDs will appear here..."
              className="w-full min-h-[160px] bg-black/30 border border-white/5 rounded-xl p-4 font-mono text-sm text-gray-100 placeholder-gray-600 focus:outline-none transition-all resize-y flex-grow"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
