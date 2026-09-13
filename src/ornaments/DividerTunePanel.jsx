import React, { useEffect, useState } from "react";
import { tuning, setTuning, subscribe } from "./dividerTuning.js";

/** PREVIEW-ONLY control panel, mounted when the URL carries ?tune. */
export default function DividerTunePanel() {
  const [t, setT] = useState({ ...tuning });
  useEffect(() => subscribe(setT), []);
  const box = {
    position: "fixed", left: 12, bottom: 12, zIndex: 9999, width: 260, padding: "12px 14px",
    background: "rgba(8,29,18,.94)", color: "#FFF4DF", border: "2px solid #FFB53C", borderRadius: 12,
    font: "13px/1.35 'Space Mono', ui-monospace, monospace", boxShadow: "0 8px 24px rgba(0,0,0,.35)",
  };
  const row = { display: "flex", gap: 6, margin: "6px 0 10px" };
  const btn = (on) => ({
    flex: 1, padding: "6px 0", borderRadius: 8, cursor: "pointer", font: "inherit",
    border: "1.5px solid #FFB53C", background: on ? "#FFB53C" : "transparent", color: on ? "#081D12" : "#FFF4DF",
  });
  return (
    <div style={box} role="region" aria-label="Divider tuning (preview only)">
      <strong style={{ color: "#FFB53C" }}>Divider tuning</strong>
      <div style={{ opacity: 0.7, fontSize: 11 }}>preview only · scroll past a divider</div>
      <div style={row}>
        {["dissolve", "tide", "static"].map((m) => (
          <button key={m} style={btn(t.mode === m)} onClick={() => setTuning({ mode: m })}>{m}</button>
        ))}
      </div>
      <label>parallax cap: <b>±{t.cap}px</b>
        <input type="range" min="0" max="30" step="1" value={t.cap} style={{ width: "100%" }}
               onChange={(e) => setTuning({ cap: Number(e.target.value) })} />
      </label>
      <div style={row}>
        {[0, 6, 15, 30].map((c) => (
          <button key={c} style={btn(t.cap === c)} onClick={() => setTuning({ cap: c })}>±{c}</button>
        ))}
      </div>
      {t.mode === "dissolve" && (
        <label>faded side at: <b>{Math.round(t.floor * 100)}%</b>
          <input type="range" min="0" max="1" step="0.05" value={t.floor} style={{ width: "100%" }}
                 onChange={(e) => setTuning({ floor: Number(e.target.value) })} />
        </label>
      )}
    </div>
  );
}
