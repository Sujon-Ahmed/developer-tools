# Developer Tools Portal

A premium, high-performance developer utility suite built with **Next.js**, **Tailwind CSS**, and **Shadcn UI**. All tools run entirely client-side — zero server uploads, maximum privacy.

Inspired by [W3Schools Developer Tools](https://www.w3schools.com/tools/index.php).

---

## 🎨 Features & Design System

- **Modern Stack**: Next.js 16 (App Router), TypeScript, Tailwind CSS v4, Shadcn UI
- **Premium Dark-Mode UI**: Deep gradients, glassmorphism panels, Lucide icons, Plus Jakarta Sans typography
- **Search & Filters**: Real-time search and category tabs on the dashboard
- **Privacy First**: All computations run in-browser — nothing leaves your machine
- **Micro-Animations**: Smooth hover effects, transitions, and interactive feedback

---

## 🛠️ Built-in Tools

### 1. Base64 & URL Encoder/Decoder
Encode or decode strings to/from Base64 or URL-safe format with live character stats.

### 2. JSON Formatter & Validator
Format, minify, and validate JSON with real-time syntax error feedback and configurable indentation.

### 3. Password & UUID Generator
Generate secure passwords with strength indicators and batch UUID v4 strings with customizable formatting.

### 4. QR Code Generator
Generate custom QR codes with configurable resolution, colors, and error correction. Download as PNG.

---

## 📂 Project Architecture

```
developer-tools/
├── src/
│   └── app/
│       ├── layout.tsx              # Root layout with header/footer
│       ├── globals.css             # Tailwind CSS + theme tokens
│       ├── page.tsx                # Dashboard with search & filters
│       └── tools/
│           ├── encoder-decoder/
│           │   └── page.tsx        # Base64 & URL tool
│           ├── json-tool/
│           │   └── page.tsx        # JSON formatter & validator
│           ├── generator-tool/
│           │   └── page.tsx        # Password & UUID generator
│           └── qrcode-generator/
│               └── page.tsx        # QR Code generator
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.ts
```

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run the development server
npm run dev

# Build for production
npm run build
```

Open [http://localhost:3000](http://localhost:3000) to access the portal.

---

## 📦 Tech Stack

| Layer      | Technology                        |
|------------|-----------------------------------|
| Framework  | Next.js 16 (App Router)           |
| Language   | TypeScript                        |
| Styling    | Tailwind CSS v4, Shadcn UI        |
| Icons      | Lucide React                      |
| QR Codes   | qrcode (npm)                      |
| Fonts      | Plus Jakarta Sans, JetBrains Mono |
