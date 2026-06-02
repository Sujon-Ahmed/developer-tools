# Developer Tools Portal

A premium, high-performance, responsive suite of client-side developer utility tools. The project acts as a monorepo portal where each tool is structured as an independent sub-project with its own styles and scripts.

Inspired by [W3Schools Developer Tools](https://www.w3schools.com/tools/index.php).

---

## 🎨 Features & Design System
- **Modern Aesthetics**: Curated color palettes with HSL-tailored colors, deep glassmorphism dark-mode gradients, and crisp typography (Plus Jakarta Sans).
- **Search & Filters**: Real-time filtering by category and instant title search in the central dashboard.
- **Privacy & Security**: All computations are performed entirely on the client-side. Zero server uploads.
- **Transitions**: Smooth micro-animations on interactive cards, copy-to-clipboard, status changes, and filter transitions.

---

## 🛠️ Built-in Tools

### 1. Base64 & URL Encoder/Decoder (`tools/encoder-decoder/`)
- Encodes or Decodes strings to/from Base64 standard format.
- Encodes or Decodes URL strings safe for browser requests.
- Live character counting, input paste, and output copy capability.

### 2. JSON Formatter & Validator (`tools/json-tool/`)
- Live syntax checks and validators giving line-by-line feedback.
- Format strings with customizeable space/tab indentation settings.
- Minify strings down to compact lines.
- Mock loading template data option.

### 3. Password & UUID Generator (`tools/generator-tool/`)
- Secure password builder with character configurations and custom length sliders.
- Real-time password complexity and entropy indicator (Weak / Medium / Strong).
- Batch UUID v4 generator with uppercase and hyphen settings.

---

## 📂 Project Architecture

```
developer-tools/
├── README.md
├── index.html          # Main portal dashboard
├── style.css           # Global design system & core styling variables
├── app.js              # Live portal search & category filter script
└── tools/              # Sub-tools directory
    ├── encoder-decoder/
    │   ├── index.html
    │   ├── style.css
    │   └── script.js
    ├── json-tool/
    │   ├── index.html
    │   ├── style.css
    │   └── script.js
    └── generator-tool/
        ├── index.html
        ├── style.css
        └── script.js
```

---

## 🚀 How to Run Locally

Since this portal runs 100% on the client-side, you can open the main `index.html` directly in your browser:
1. Open `index.html` in any web browser.
2. Or run a simple local server using Python, Node, or an extension (e.g. Live Server):
   ```bash
   npx serve .
   ```
