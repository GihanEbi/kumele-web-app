import { NextResponse } from "next/server";

const MIRRORS = [
  "https://libretranslate.de/translate",
  "https://translate.argosopentech.com/translate",
  "https://translate.terraprint.co/translate",
];

export async function POST(req: Request) {
  try {
    const { text } = await req.json();

    const res = await fetch("https://translate.astian.org/translate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        q: "mein Name ist Gihan",
        source: "auto",
        target: "en",
        format: "text",
      }),
    });

    const data = await res.json();

    return NextResponse.json({ translated: data.translatedText });
  } catch (error) {
    console.error("Translation error:", error);
    return NextResponse.json(
      { error: "Failed to translate text" },
      { status: 500 }
    );
  }
}
