import React from "react";
import { T, LINKS, BOOKING_EMAIL } from "../theme.js";
import { SiteNav, SiteFooter, chromeCss, useLang } from "./chrome.jsx";

/* Privacy policy. English only for now: legal text should not ship in an
   unreviewed translation, so the Spanish view carries a short notice above the
   same English text. Keep it factual; if the site starts collecting anything
   new (analytics, forms), update this page in the same change. */

const copy = {
  en: { nav_cta: "Email us", notice: null },
  es: { nav_cta: "Escríbenos", notice: "Esta política está disponible solo en inglés por ahora. Escríbenos si necesitas ayuda para entenderla." },
};
const footer = {
  en: { footer: "ALL ABOARD EARTH · UP WE GO! 🌱", give: "Donations are held for us by our fiscal sponsor," },
  es: { footer: "ALL ABOARD EARTH · ¡ARRIBA VAMOS! 🌱", give: "Las donaciones las recibe por nosotros nuestro patrocinador fiscal," },
};

export default function Privacy() {
  const [lang, setLang] = useLang();
  const c = copy[lang];
  const f = footer[lang];
  return (
    <div className="pg">
      <style>{chromeCss + `
        .pv{ max-width:760px; margin:0 auto; padding:clamp(96px,14vh,140px) clamp(16px,4vw,48px) clamp(40px,8vh,80px); }
        .pv h1{ font-size:clamp(40px,7vw,72px); margin-bottom:10px; }
        .pv .pv-date{ font-family:'Space Mono', ui-monospace, monospace; font-size:12px; letter-spacing:.12em; color:${T.cream}aa; margin-bottom:28px; }
        .pv h2{ font-size:clamp(24px,3vw,30px); margin:34px 0 10px; color:${T.marigold}; }
        .pv p, .pv li{ font-size:16.5px; line-height:1.6; color:${T.cream}e0; margin-bottom:12px; }
        .pv ul{ padding-left:22px; margin-bottom:12px; }
        .pv a{ color:${T.marigold}; }
        .pv .pv-note{ border:2px solid ${T.cream}33; border-radius:14px; padding:14px 18px; margin-bottom:24px; }
      `}</style>

      <SiteNav lang={lang} setLang={setLang} cta={c.nav_cta} ctaHref={LINKS.inquiryMail} />

      <main className="pv">
        <h1 className="display">Privacy Policy</h1>
        <div className="pv-date">LAST UPDATED 2026-11-10</div>
        {c.notice && <p className="pv-note">{c.notice}</p>}

        <p>All Aboard Earth (“we”, “us”) is a New Mexico education and arts project. This page explains what
          our website collects and how our internal tool, <strong>AAE Bridge</strong>, uses Google Drive.</p>

        <h2 className="display">This website</h2>
        <ul>
          <li>We don’t run analytics or advertising trackers, and we don’t sell or share visitor data.</li>
          <li>The site has no sign-up or contact forms. Buttons open your own email app, pre-addressed to us.
            We only receive what you choose to send in that email, and we use it to reply to you.</li>
          <li>Your browser stores one small preference on your device, your language choice (English or Spanish). It never leaves your device.</li>
          <li>Videos and music from other services (such as YouTube or Spotify) load only when you choose to play them,
            and those services have their own privacy policies.</li>
          <li>Our hosting provider, Vercel, keeps standard server logs (such as IP address and page requested) for security and reliability.</li>
        </ul>

        <h2 className="display">AAE Bridge (internal tool)</h2>
        <p>AAE Bridge is a private tool run by All Aboard Earth for its own use. It is not offered to the public, and it
          has no public users. It copies our own planning notes and status tables into native Google Docs and Sheets in the
          All Aboard Earth Google Drive, so our team and our Google assistants can read them.</p>
        <ul>
          <li><strong>Access requested:</strong> only the Google Drive “drive.file” permission, which limits the tool to files it
            created itself. It cannot see or change any other file in the Drive.</li>
          <li><strong>What it handles:</strong> our own organizational notes. It does not collect data from members of the public.</li>
          <li><strong>Storage:</strong> the sign-in token is kept in the operator’s own computer keychain. We don’t store Google data on any server of ours.</li>
          <li><strong>Sharing:</strong> we do not sell Google user data, transfer it to third parties, or use it for advertising.
            No person other than our authorized operator reads it through the tool.</li>
          <li><strong>AI:</strong> we do not use data obtained through Google APIs to develop or train generalized AI or machine-learning models.</li>
        </ul>
        <p>AAE Bridge’s use of information received from Google APIs follows the
          {" "}<a href="https://developers.google.com/terms/api-services-user-data-policy" target="_blank" rel="noopener noreferrer">Google API Services User Data Policy</a>,
          including its Limited Use requirements. To revoke the tool’s access at any time, remove “AAE Bridge” at
          {" "}<a href="https://myaccount.google.com/permissions" target="_blank" rel="noopener noreferrer">myaccount.google.com/permissions</a>.</p>

        <h2 className="display">Children</h2>
        <p>This website is intended for adults, such as educators and partners. It does not knowingly collect personal information from children.
          Student-facing programs run on separate platforms with their own terms.</p>

        <h2 className="display">Changes and contact</h2>
        <p>If we change how we handle information, we’ll update this page and its date. Questions or requests to delete an email
          you sent us: <a href={LINKS.inquiryMail}>{BOOKING_EMAIL}</a>.</p>
      </main>

      <SiteFooter footer={f.footer} give={f.give} />
    </div>
  );
}
