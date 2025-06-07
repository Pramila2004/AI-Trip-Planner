import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);

export const callGemini = async (prompt) => {
  try {
    const model = genAI.getGenerativeModel({ model:"gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();

    // 🔧 Clean markdown formatting and extract raw JSON
    if (text.startsWith("```json")) {
      text = text.replace(/```json/, "").replace(/```/, "").trim();
    } else if (text.startsWith("```")) {
      text = text.replace(/```/, "").replace(/```/, "").trim();
    }

    // 🔍 Try parsing clean JSON
    try {
      const json = JSON.parse(text);
      return json;
    } catch (err) {
      console.warn("❗ Raw text couldn't be parsed as JSON:", err);
      return { rawText: text, error: "Failed to parse as JSON" };
    }

  } catch (error) {
    console.error("Error calling Gemini:", error);
    return { error: "Failed to fetch response from Gemini model" };
  }
};
