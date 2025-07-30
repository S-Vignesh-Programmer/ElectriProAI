import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE,
});

export const askGemini = async (message) => {
  try {
    const res = await API.post("/api/ai/chat", { message });

    return res.data.response;
  } catch (err) {
    console.error("Gemini error:", err);
    return "Error contacting Gemini AI.";
  }
};
