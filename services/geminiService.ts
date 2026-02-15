
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { AIResponse, GroundingChunk } from "../types";

const API_KEY = process.env.API_KEY || "";

export const getLindberghInfo = async (query: string, useMaps: boolean = false): Promise<AIResponse> => {
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  
  // Use gemini-2.5-flash for maps as requested, or gemini-3-flash-preview for general search
  const modelName = useMaps ? 'gemini-2.5-flash' : 'gemini-3-flash-preview';
  
  const config: any = {
    tools: useMaps ? [{ googleMaps: {} }, { googleSearch: {} }] : [{ googleSearch: {} }],
  };

  // Add location context if maps are requested and available
  if (useMaps && navigator.geolocation) {
    try {
      const pos = await new Promise<GeolocationPosition>((res, rej) => 
        navigator.geolocation.getCurrentPosition(res, rej)
      );
      config.toolConfig = {
        retrievalConfig: {
          latLng: {
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude
          }
        }
      };
    } catch (e) {
      console.warn("Location permission denied or unavailable.");
    }
  }

  const response = await ai.models.generateContent({
    model: modelName,
    contents: query,
    config: config,
  });

  const text = response.text || "Keine Antwort erhalten.";
  const sources: GroundingChunk[] = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];

  return { text, sources };
};
