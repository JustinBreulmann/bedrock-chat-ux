# Bedrock Chat, Ranks & Visual UX Suite

[![Minecraft Bedrock](https://img.shields.io/badge/Minecraft-Bedrock%201.21.60%2B-green.svg)](https://minecraft.net/)
[![Mojang Creator Tools](https://img.shields.io/badge/Tooling-mctools.dev-blue.svg)](https://mctools.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Creator](https://img.shields.io/badge/Creator-JustinBreulmann-orange.svg)](https://github.com/JustinBreulmann)

Modular chat engine, role/rank nametags, join/quit broadcasts, custom fonts, glyphs and HUD enhancements for Minecraft Bedrock

---

## 📦 Architektur & Übersicht

Dieses Repository ist Teil der modularen **Divide & Conquer**-Architektur für Minecraft Bedrock, modularisiert aus monolithischen Welten und ausgerichtet nach offiziellen Standards von [Mojang Creator Tools (mctools.dev)](https://mctools.dev/).

### Pack-Identifikatoren
- **Behavior Pack UUID**: `259a54b0-e2cd-4541-bc5e-b40b86a7270d`
- **Resource Pack UUID**: `f9ac91d1-c128-46a1-9c75-d539348d399d`
- **Zielversion**: Minecraft Bedrock 1.21.0 - 1.21.60+ (Neueste Version)
- **Script Engine**: `@minecraft/server` v1.14.0+ / `@minecraft/server-ui` v1.3.0+

---

## 📂 Projektstruktur

```
bedrock-chat-ux/
├── behavior_packs/
│   └── bedrock_chat_ux_bp/
│       ├── manifest.json
│       └── scripts/
│           └── main.js
├── resource_packs/
│   └── bedrock_chat_ux_rp/
│       ├── manifest.json
│       └── textures / models / sounds
├── package.json
├── .gitignore
└── README.md
```

---

## 🚀 Installation & Bedrock Verlinkung

### Methode 1: Direkt in Minecraft-Welt verlinken (NTFS Junctions)
1. Repository klonen:
   ```bash
   git clone https://github.com/JustinBreulmann/bedrock-chat-ux.git
   ```
2. Verzeichnis-Junctions erstellen:
   - Behavior Pack -> `<welt>/behavior_packs/bedrock_chat_ux_bp`
   - Resource Pack -> `<welt>/resource_packs/bedrock_chat_ux_rp`

### Methode 2: Globaler Development-Ordner
Verlinkung in `development_behavior_packs` bzw. `development_resource_packs` im `com.mojang`-Verzeichnis für weltübergreifendes Live-Testing.

---

## 🛠️ Entwicklung & Tooling
Unterstützt moderne Tooling-Standards kompatibel mit `@minecraft/creator-tools`:
```bash
npm install
npm test
```

## 📄 Lizenz
MIT License © Justin Breulmann
