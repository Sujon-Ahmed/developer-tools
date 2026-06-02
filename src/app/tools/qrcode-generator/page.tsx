"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowLeft, Download } from "lucide-react";
import QRCode from "qrcode";

export default function QrCodeGenerator() {
  const [text, setText] = useState("https://github.com/Sujon-Ahmed/developer-tools");
  const [size, setSize] = useState(256);
  const [fgColor, setFgColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [errorCorrection, setErrorCorrection] = useState<"L" | "M" | "Q" | "H">("M");
  const [qrUrl, setQrUrl] = useState("");
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const generateQr = async () => {
    if (!text.trim()) {
      setQrUrl("");
      return;
    }

    try {
      const url = await QRCode.toDataURL(text, {
        width: size,
        margin: 2,
        color: {
          dark: fgColor,
          light: bgColor,
        },
        errorCorrectionLevel: errorCorrection,
      });
      setQrUrl(url);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    generateQr();
  }, [text, size, fgColor, bgColor, errorCorrection]);

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div>
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white mb-2 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>
        <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white to-indigo-400 bg-clip-text text-transparent">
          QR Code Generator
        </h1>
        <p className="text-sm text-gray-400">
          Generate custom, high-resolution QR codes client-side. Download the generated codes instantly as PNG images.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-8">
        {/* Settings panel */}
        <div className="bg-gray-900/30 border border-white/5 rounded-2xl p-6 flex flex-col gap-6 shadow-xl backdrop-blur-md">
          <h3 className="font-bold text-lg text-gray-200 border-b border-white/5 pb-4">
            Configuration Options
          </h3>

          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400">
              QR Code Value (URL or Text)
            </label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter link or text to encode..."
              className="w-full min-h-[100px] bg-black/30 border border-white/5 rounded-xl p-4 font-mono text-sm text-gray-100 placeholder-gray-600 focus:outline-none focus:border-indigo-500 transition-all resize-y"
              autoFocus
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold text-gray-400">
                <span>Resolution Sizing</span>
                <span className="font-mono text-indigo-400">{size}x{size} px</span>
              </div>
              <input
                type="range"
                min="128"
                max="512"
                step="32"
                value={size}
                onChange={(e) => setSize(parseInt(e.target.value, 10))}
                className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400">
                Error Correction Strength
              </label>
              <select
                value={errorCorrection}
                onChange={(e) => setErrorCorrection(e.target.value as any)}
                className="w-full bg-black/20 border border-white/5 text-gray-100 text-sm rounded-lg p-2.5 focus:outline-none focus:border-indigo-500 cursor-pointer"
              >
                <option value="L">Low (7% recovery)</option>
                <option value="M">Medium (15% recovery)</option>
                <option value="Q">Quartile (25% recovery)</option>
                <option value="H">High (30% recovery)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400">
                Foreground Color
              </label>
              <div className="flex gap-2 items-center">
                <input
                  type="color"
                  value={fgColor}
                  onChange={(e) => setFgColor(e.target.value)}
                  className="w-10 h-10 border border-white/10 rounded bg-transparent cursor-pointer"
                />
                <input
                  type="text"
                  value={fgColor}
                  onChange={(e) => setFgColor(e.target.value)}
                  className="w-full bg-black/20 border border-white/5 text-gray-100 font-mono text-xs rounded p-2 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400">
                Background Color
              </label>
              <div className="flex gap-2 items-center">
                <input
                  type="color"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="w-10 h-10 border border-white/10 rounded bg-transparent cursor-pointer"
                />
                <input
                  type="text"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="w-full bg-black/20 border border-white/5 text-gray-100 font-mono text-xs rounded p-2 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Display / Output Panel */}
        <div className="bg-gray-900/30 border border-white/5 rounded-2xl p-6 flex flex-col items-center justify-center gap-6 shadow-xl backdrop-blur-md min-h-[350px]">
          <div className="flex flex-col items-center gap-4">
            <h4 className="font-bold text-gray-400 text-sm">QR Code Preview</h4>
            <div className="p-4 bg-white rounded-xl shadow-lg flex items-center justify-center">
              {qrUrl ? (
                <img
                  src={qrUrl}
                  alt="Generated QR Code"
                  width={200}
                  height={200}
                  className="block"
                />
              ) : (
                <div className="w-[200px] h-[200px] flex items-center justify-center text-gray-400 font-semibold text-xs border border-dashed border-gray-300 rounded">
                  No Input Data
                </div>
              )}
            </div>
          </div>

          {qrUrl && (
            <a
              href={qrUrl}
              download="qrcode-devtools.png"
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm px-6 py-3 rounded-xl transition-all shadow-[0_0_20px_rgba(99,102,241,0.2)] cursor-pointer"
            >
              <Download className="w-4 h-4" /> Download PNG
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
