"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, Binary, Braces, KeyRound, ArrowRight, QrCode } from "lucide-react";

interface ToolCardProps {
  href: string;
  title: string;
  desc: string;
  category: string;
  categorySlug: string;
  icon: React.ReactNode;
  themeColor: "indigo" | "cyan";
}

const tools: ToolCardProps[] = [
  {
    href: "/tools/encoder-decoder",
    title: "Base64 & URL Tool",
    desc: "Quickly encode or decode strings into Base64 format or URL safe representation. Supporting live statistics.",
    category: "Encoders",
    categorySlug: "encoders",
    icon: <Binary className="w-6 h-6 stroke-inherit" />,
    themeColor: "indigo"
  },
  {
    href: "/tools/json-tool",
    title: "JSON Formatter & Validator",
    desc: "Beautify, validate, format, and minify JSON data. Highlights syntax errors instantly with detailed issue placement.",
    category: "Formatters",
    categorySlug: "formatters",
    icon: <Braces className="w-6 h-6 stroke-inherit" />,
    themeColor: "cyan"
  },
  {
    href: "/tools/generator-tool",
    title: "Password & UUID Generator",
    desc: "Generate secure passwords with custom entropy requirements and generate v4 compliant UUID identifiers individually or in batches.",
    category: "Generators",
    categorySlug: "generators",
    icon: <KeyRound className="w-6 h-6 stroke-inherit" />,
    themeColor: "indigo"
  },
  {
    href: "/tools/qrcode-generator",
    title: "QR Code Generator",
    desc: "Generate custom, high-resolution QR codes client-side. Download the generated codes instantly as PNG images.",
    category: "Generators",
    categorySlug: "generators",
    icon: <QrCode className="w-6 h-6 stroke-inherit" />,
    themeColor: "cyan"
  }
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredTools = tools.filter(tool => {
    const matchesSearch = 
      tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.desc.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "all" || tool.categorySlug === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center space-y-4 animate-fade-in">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent">
          Developer Utilities Suite
        </h1>
        <p className="text-lg text-gray-400 max-w-xl mx-auto">
          Clean, private, fast, and feature-rich developer tools to speed up your daily workflows. Running fully in-browser.
        </p>
      </section>

      {/* Controls */}
      <div className="bg-gray-900/40 border border-white/5 backdrop-blur-md rounded-2xl p-6 flex flex-col md:flex-row gap-4 justify-between items-center shadow-2xl">
        <div className="relative w-full md:max-w-md">
          <input
            type="text"
            placeholder="Search developer tools (e.g. Base64, JSON...)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-black/20 border border-white/5 text-gray-100 placeholder-gray-500 rounded-xl py-3 pl-11 pr-4 text-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
          />
          <Search className="w-5 h-5 text-gray-500 absolute left-4 top-1/2 -translate-y-1/2" />
        </div>

        <div className="flex gap-2 flex-wrap w-full md:w-auto">
          {[
            { label: "All Tools", value: "all" },
            { label: "Encoders & Decoders", value: "encoders" },
            { label: "Formatters & Parsers", value: "formatters" },
            { label: "Generators", value: "generators" },
          ].map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={`px-4 py-2.5 rounded-lg text-sm font-semibold border transition-all cursor-pointer ${
                activeCategory === cat.value
                  ? "bg-indigo-500/10 border-indigo-500 text-indigo-300 shadow-[0_0_15px_rgba(99,102,241,0.15)]"
                  : "border-white/5 text-gray-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTools.map((tool) => {
          const isIndigo = tool.themeColor === "indigo";
          return (
            <Link
              key={tool.href}
              href={tool.href}
              className="group relative flex flex-col justify-between bg-gray-900/30 border border-white/5 rounded-2xl p-6 hover:-translate-y-1 hover:border-white/10 hover:shadow-2xl transition-all duration-300 overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${
                isIndigo ? "from-indigo-500/5" : "from-cyan-500/5"
              } to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`} />
              
              <div className="relative z-10 space-y-4">
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center border transition-colors duration-300 ${
                  isIndigo 
                    ? "bg-white/5 border-white/5 text-indigo-400 group-hover:bg-indigo-500 group-hover:border-indigo-500 group-hover:text-white" 
                    : "bg-white/5 border-white/5 text-cyan-400 group-hover:bg-cyan-500 group-hover:border-cyan-500 group-hover:text-white"
                }`}>
                  <span className="stroke-current">{tool.icon}</span>
                </div>
                <div className="space-y-1">
                  <h2 className="text-xl font-bold tracking-tight text-white group-hover:text-indigo-200 transition-colors">
                    {tool.title}
                  </h2>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {tool.desc}
                  </p>
                </div>
              </div>

              <div className="relative z-10 flex items-center justify-between pt-6 border-t border-white/5 mt-6">
                <span className="text-[10px] uppercase font-bold tracking-widest text-gray-500">
                  {tool.category}
                </span>
                <span className={`flex items-center gap-1 text-sm font-semibold transition-transform duration-300 group-hover:translate-x-1 ${
                  isIndigo ? "text-indigo-400" : "text-cyan-400"
                }`}>
                  Launch Tool
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
