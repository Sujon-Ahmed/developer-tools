"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function EncoderDecoder() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [algo, setAlgo] = useState<"base64" | "url">("base64");
  const [copied, setCopied] = useState(false);

  // Conversion operations
  useEffect(() => {
    if (!inputText) {
      setOutputText("");
      return;
    }

    try {
      if (mode === "encode") {
        if (algo === "base64") {
          setOutputText(btoa(unescape(encodeURIComponent(inputText))));
        } else {
          setOutputText(encodeURIComponent(inputText));
        }
      } else {
        if (algo === "base64") {
          try {
            setOutputText(decodeURIComponent(escape(atob(inputText.trim()))));
          } catch {
            setOutputText("Error: Invalid Base64 character sequence. Please check your input.");
          }
        } else {
          try {
            setOutputText(decodeURIComponent(inputText.replace(/\+/g, " ")));
          } catch {
            setOutputText("Error: Invalid URI formatting. Please check your input.");
          }
        }
      }
    } catch (err: any) {
      setOutputText(`Error: Conversion failed. ${err.message}`);
    }
  }, [inputText, mode, algo]);

  const handleCopy = () => {
    if (!outputText || outputText.startsWith("Error:")) return;
    navigator.clipboard.writeText(outputText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setInputText(text);
    } catch {
      alert("Click inside the input box and use Ctrl+V to paste.");
    }
  };

  const inputCharCount = inputText.length;
  const inputLineCount = inputText ? inputText.split("\n").length : 0;
  const outputCharCount = outputText.length;

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white mb-2 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
          </Link>
          <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white to-indigo-400 bg-clip-text text-transparent">
            Base64 & URL Encoder / Decoder
          </h1>
          <p className="text-sm text-gray-400">
            Encode or decode strings instantly. All conversions are performed in your browser securely.
          </p>
        </div>
      </div>

      {/* Main interface grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_220px_1fr] gap-6 items-stretch">
        {/* Input Panel */}
        <div className="flex flex-col bg-gray-900/30 border border-white/5 rounded-2xl p-5 space-y-3 shadow-xl">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-gray-200">Input Text</h3>
            <div className="flex gap-2">
              <button
                onClick={() => setInputText("")}
                className="px-2.5 py-1 rounded bg-white/5 border border-white/5 text-xs font-semibold text-gray-400 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
              >
                Clear
              </button>
              <button
                onClick={handlePaste}
                className="px-2.5 py-1 rounded bg-white/5 border border-white/5 text-xs font-semibold text-gray-400 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
              >
                Paste
              </button>
            </div>
          </div>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type or paste your text here..."
            className="flex-grow min-h-[300px] bg-black/30 border border-white/5 rounded-xl p-4 font-mono text-sm text-gray-100 placeholder-gray-600 focus:outline-none focus:border-indigo-500 transition-all resize-y"
            autoFocus
          />
          <div className="flex justify-end text-xs text-gray-500 font-semibold">
            Chars: {inputCharCount} | Lines: {inputLineCount}
          </div>
        </div>

        {/* Configurations Column */}
        <div className="flex flex-col justify-center gap-6 p-4 border-y lg:border-y-0 lg:border-x border-white/5">
          {/* Mode group */}
          <div className="space-y-2">
            <label className="text-[10px] uppercase font-bold tracking-wider text-gray-500">
              Conversion Mode
            </label>
            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-2 text-sm text-gray-300 hover:text-white cursor-pointer select-none">
                <input
                  type="radio"
                  name="mode"
                  checked={mode === "encode"}
                  onChange={() => setMode("encode")}
                  className="accent-indigo-500"
                />
                Encode
              </label>
              <label className="flex items-center gap-2 text-sm text-gray-300 hover:text-white cursor-pointer select-none">
                <input
                  type="radio"
                  name="mode"
                  checked={mode === "decode"}
                  onChange={() => setMode("decode")}
                  className="accent-indigo-500"
                />
                Decode
              </label>
            </div>
          </div>

          {/* Algorithm group */}
          <div className="space-y-2">
            <label className="text-[10px] uppercase font-bold tracking-wider text-gray-500">
              Algorithm
            </label>
            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-2 text-sm text-gray-300 hover:text-white cursor-pointer select-none">
                <input
                  type="radio"
                  name="algo"
                  checked={algo === "base64"}
                  onChange={() => setAlgo("base64")}
                  className="accent-indigo-500"
                />
                Base64
              </label>
              <label className="flex items-center gap-2 text-sm text-gray-300 hover:text-white cursor-pointer select-none">
                <input
                  type="radio"
                  name="algo"
                  checked={algo === "url"}
                  onChange={() => setAlgo("url")}
                  className="accent-indigo-500"
                />
                URL Safe
              </label>
            </div>
          </div>
        </div>

        {/* Output Panel */}
        <div className="flex flex-col bg-gray-900/30 border border-white/5 rounded-2xl p-5 space-y-3 shadow-xl">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-gray-200">Output Result</h3>
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
            value={outputText}
            readOnly
            placeholder="Result will appear here..."
            className="flex-grow min-h-[300px] bg-black/30 border border-white/5 rounded-xl p-4 font-mono text-sm text-gray-100 placeholder-gray-600 focus:outline-none transition-all resize-y"
          />
          <div className="flex justify-end text-xs text-gray-500 font-semibold">
            Chars: {outputCharCount}
          </div>
        </div>
      </div>
    </div>
  );
}
