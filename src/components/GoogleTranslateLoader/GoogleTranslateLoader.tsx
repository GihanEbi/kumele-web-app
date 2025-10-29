"use client";

import { useEffect } from "react";

export default function GoogleTranslateLoader() {
  useEffect(() => {
    // Only run once
    if ((window as any).googleTranslateInit) return;

    (window as any).googleTranslateInit = function () {
      new (window as any).google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: "en,fr,es,de,ar,zh-CN",
          autoDisplay: false,
        },
        "google_translate_container"
      );
    };

    const script = document.createElement("script");
    script.src =
      "//translate.google.com/translate_a/element.js?cb=googleTranslateInit";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return <div id="google_translate_container" style={{ display: "none" }} />;
}
