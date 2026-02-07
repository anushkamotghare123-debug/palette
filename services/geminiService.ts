
import { GoogleGenAI, Type } from "@google/genai";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateArtDescription = async (title: string, category: string, style: string) => {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Generate a compelling, poetic 3-sentence description for a piece of artwork titled "${title}" which is in the "${category}" category and has a "${style}" style. Keep it professional for an art gallery listing.`,
    });
    return response.text || "No description generated.";
  } catch (error) {
    console.error("AI Error:", error);
    return "The piece speaks for itself through its intricate details and unique composition.";
  }
};

export const semanticArtSearch = async (query: string, artworks: any[]) => {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Analyze the following user query for artwork: "${query}". 
      From the provided list of artworks, identify the top 3 IDs that best match the query's mood, color, or subject matter.
      Artworks: ${JSON.stringify(artworks.map(a => ({ id: a.id, title: a.title, tags: a.tags, category: a.category })))}
      Return only the IDs in a JSON array format.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: { type: Type.STRING }
        }
      }
    });
    return JSON.parse(response.text || "[]");
  } catch (error) {
    console.error("AI Search Error:", error);
    return [];
  }
};
