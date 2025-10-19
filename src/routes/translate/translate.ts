export async function translateText(text: string) {
  try {
    const res = await fetch("/api/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: "hello hello" }),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching translation:", error);
    return { success: false, message: "Translation failed" };
  }
}

export async function translateToEnglish(text: string) {
  try {
    const response = await fetch("https://libretranslate.de/translate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        q: text,
        source: "auto",
        target: "en",
        format: "text",
      }),
    });

    if (!response.ok) {
      throw new Error(`Translation failed: ${response.statusText}`);
    }

    const data = await response.json();
    console.log(data);
    
    return data.translatedText;
  } catch (error) {
    console.error("Translation error:", error);
    throw new Error("Failed to translate text");
  }
}
