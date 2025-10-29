"use client";

import { useEffect } from "react";

const languages = [
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "fr", label: "French", flag: "🇫🇷" },
  { code: "es", label: "Spanish", flag: "🇪🇸" },
  { code: "de", label: "German", flag: "🇩🇪" },
  { code: "ar", label: "Arabic", flag: "🇸🇦" },
  { code: "zh-CN", label: "Chinese (Simplified)", flag: "🇨🇳" },
  { code: "zh-TW", label: "Chinese (Traditional)", flag: "🇹🇼" },
];

export default function LanguageSelector() {
  const hideGoogleTranslateBanner = () => {
    const banner = document.querySelector(".goog-te-banner-frame.skiptranslate") as HTMLIFrameElement;
    if (banner) banner.style.display = "none";

    const logo = document.querySelector(".goog-logo-link") as HTMLElement;
    if (logo) logo.style.display = "none";

    const gadget = document.querySelector(".goog-te-gadget") as HTMLElement;
    if (gadget) gadget.style.fontSize = "0";
  };

  const waitForGoogleCombo = (callback: () => void) => {
    const interval = setInterval(() => {
      const select = document.querySelector(".goog-te-combo") as HTMLSelectElement;
      if (select) {
        clearInterval(interval);
        callback();
      }
    }, 100);
  };

  const handleTranslate = (lang: string) => {
    waitForGoogleCombo(() => {
      const select = document.querySelector(".goog-te-combo") as HTMLSelectElement;
      if (select) {
        select.value = lang;
        select.dispatchEvent(new Event("change"));

        // Hide banner after language change
        setTimeout(() => {
          hideGoogleTranslateBanner();
        }, 500);
      }
    });
  };

  // Optional: hide banner on component mount (in case Google injected it already)
  useEffect(() => {
    setTimeout(hideGoogleTranslateBanner, 1000);
  }, []);

  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "6px 10px",
        background: "#fff",
        width: "fit-content",
      }}
    >
      <select
        onChange={(e) => handleTranslate(e.target.value)}
        defaultValue="en"
        style={{
          border: "none",
          background: "none",
          fontSize: "14px",
          cursor: "pointer",
        }}
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.flag} {lang.label}
          </option>
        ))}
      </select>
    </div>
  );
}
