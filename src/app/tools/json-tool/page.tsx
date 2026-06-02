"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const sampleData = {
  appName: "Developer Tools Suite",
  version: "1.0.0",
  active: true,
  features: [
    "Encoders & Decoders",
    "Formatters & Parsers",
    "Generators"
  ],
  author: {
    name: "Sujon Ahmed",
    github: "https://github.com/Sujon-Ahmed"
  },
  metadata: null
};

export default function JsonTool() {
  const [jsonInput, setJsonInput] = useState("");
  const [jsonOutput, setJsonOutput] = useState("");
  const [indentSize, setIndentSize] = useState("2");
  const [validationStatus, setValidationStatus] = useState<{
    status: "idle" | "valid" | "invalid";
    message: string;
  }>({ status: "idle", message: "JSON is ready to validate" });
  const [copied, setCopied] = useState(false);

  // Validate JSON on input change
  useEffect(() => {
    const rawVal = jsonInput.trim();
    if (!rawVal) {
      setValidationStatus({ status: "idle", message: "JSON is ready to validate" });
      return;
    }

    try {
      JSON.parse(rawVal);
      setValidationStatus({ status: "valid", message: "✓ Valid JSON syntax!" });
    } catch (e: any) {
      setValidationStatus({ status: "invalid", message: `✗ Invalid JSON: ${e.message}` });
    }
  }, [jsonInput]);

  const handleFormat = () => {
    const rawVal = jsonInput.trim();
    if (!rawVal) return;

    try {
      const parsed = JSON.parse(rawVal);
      const spacing = indentSize === "tab" ? "\t" : parseInt(indentSize, 10);
      setJsonOutput(JSON.stringify(parsed, null, spacing));
    } catch {
      setJsonOutput("Cannot format: Input is invalid JSON.");
    }
  };

  const handleMinify = () => {
    const rawVal = jsonInput.trim();
    if (!rawVal) return;

    try {
      const parsed = JSON.parse(rawVal);
      setJsonOutput(JSON.stringify(parsed));
    } catch {
      setJsonOutput("Cannot minify: Input is invalid JSON.");
    }
  };

  const handleCopy = () => {
    if (!jsonOutput || jsonOutput.startsWith("Cannot")) return;
    navigator.clipboard.writeText(jsonOutput).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div>
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white mb-2 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>
        <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white to-cyan-400 bg-clip-text text-transparent">
          JSON Formatter & Validator
        </h1>
        <p className="text-sm text-gray-400">
          Format, minify, validate, and parse JSON data with syntax checks and customizable indentation sizes.
        </p>
      </div>

      {/* Grid container */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_220px_1fr] gap-6 items-stretch">
        {/* Input Panel */}
        <div className="flex flex-col bg-gray-900/30 border border-white/5 rounded-2xl p-5 space-y-3 shadow-xl">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-gray-200">Raw JSON Input</h3>
            <div className="flex gap-2">
              <button
                onClick={() => setJsonInput("")}
                className="px-2.5 py-1 rounded bg-white/5 border border-white/5 text-xs font-semibold text-gray-400 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
              >
                Clear
              </button>
              <button
                onClick={() => setJsonInput(JSON.stringify(sampleData, null, 2))}
                className="px-2.5 py-1 rounded bg-white/5 border border-white/5 text-xs font-semibold text-gray-400 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
              >
                Load Sample
              </button>
            </div>
          </div>
          <textarea
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            placeholder="Paste your raw JSON string here..."
            className="flex-grow min-h-[320px] bg-black/30 border border-white/5 rounded-xl p-4 font-mono text-sm text-gray-100 placeholder-gray-600 focus:outline-none focus:border-cyan-500 transition-all resize-y"
            autoFocus
          />
          {/* Validation Alert */}
          <div className={`p-3 rounded-lg border text-xs font-bold transition-all duration-300 ${
            validationStatus.status === "valid"
              ? "bg-emerald-500/10 border-emerald-500 text-emerald-400"
              : validationStatus.status === "invalid"
              ? "bg-rose-500/10 border-rose-500 text-rose-400 whitespace-pre-wrap"
              : "bg-white/5 border-white/5 text-gray-400"
          }`}>
            {validationStatus.message}
          </div>
        </div>

        {/* Options Panel */}
        <div className="flex flex-col justify-center gap-4 p-4 border-y lg:border-y-0 lg:border-x border-white/5">
          <div className="space-y-2">
            <label className="text-[10px] uppercase font-bold tracking-wider text-gray-500">
              Indentation Size
            </label>
            <select
              value={indentSize}
              onChange={(e) => setIndentSize(e.target.value)}
              className="w-full bg-black/20 border border-white/5 text-gray-100 text-sm rounded-lg p-2.5 focus:outline-none focus:border-cyan-500 cursor-pointer"
            >
              <option value="2">2 Spaces</option>
              <option value="4">4 Spaces</option>
              <option value="tab">Tab</option>
            </select>
          </div>

          <button
            onClick={handleFormat}
            className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-sm py-2.5 rounded-lg transition-all shadow-[0_0_20px_rgba(6,182,212,0.2)] cursor-pointer"
          >
            Format JSON
          </button>
          <button
            onClick={handleMinify}
            className="w-full bg-white/5 hover:bg-white/10 border border-white/5 text-white font-bold text-sm py-2.5 rounded-lg transition-all cursor-pointer"
          >
            Minify JSON
          </button>
        </div>

        {/* Output Panel */}
        <div className="flex flex-col bg-gray-900/30 border border-white/5 rounded-2xl p-5 space-y-3 shadow-xl">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-gray-200">Formatted Output</h3>
            <button
              onClick={handleCopy}
              className={`px-3 py-1 rounded border text-xs font-semibold transition-all cursor-pointer ${
                copied
                  ? "bg-emerald-500/10 border-emerald-500 text-emerald-400"
                  : "bg-white/5 border-white/5 text-gray-400 hover:text-white hover:bg-white/10"
              }`}
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
          <textarea
            value={jsonOutput}
            readOnly
            placeholder="Formatted result will appear here..."
            className="flex-grow min-h-[320px] bg-black/30 border border-white/5 rounded-xl p-4 font-mono text-sm text-gray-100 placeholder-gray-600 focus:outline-none transition-all resize-y"
          />
        </div>
      </div>
    </div>
  );
}
