import { world, system } from "@minecraft/server";
import "./core/chat.js";
import "./entities/playerConnect.js";
import "./command/gm.js";
import { setNameTag } from "./entities/nametag.js";

system.runInterval(() => {
    setNameTag();
}, 20);

console.warn("[Bedrock Chat & Visual UX] Erfolgreich initialisiert.");

// Build-Trace #41: README Notizen aktualisiert

// Build-Trace #42: Cooldown angepasst

// Build-Trace #43: console.log entfernt

// Build-Trace #44: Werte feinjustiert

// Build-Trace #45: kleiner Fix
