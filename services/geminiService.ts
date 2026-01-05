import { GoogleGenAI } from "@google/genai";
import { ImageSize } from '../types';

// Helper to check for API key selection
export const checkApiKey = async (): Promise<boolean> => {
  if (typeof window !== 'undefined' && (window as any).aistudio) {
    return await (window as any).aistudio.hasSelectedApiKey();
  }
  return false;
};

// Helper to open key selection dialog
export const openApiKeySelection = async (): Promise<void> => {
  if (typeof window !== 'undefined' && (window as any).aistudio) {
    await (window as any).aistudio.openSelectKey();
  } else {
    console.warn('AI Studio environment not detected');
  }
};

export const generateProductImage = async (productName: string, size: ImageSize): Promise<string> => {
  const hasKey = await checkApiKey();
  if (!hasKey) {
    // Attempt to prompt user, but if this is called programmatically it might fail without UI intervention first.
    // The UI should handle the button click to open selection before calling this.
    throw new Error("API Key not selected");
  }

  // Create a new instance to ensure we capture the selected key
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `Photorealistic studio photograph of ${productName}, dark moody lighting, charcoal textured surface, subtle reflections, cinematic color grading, high resolution, premium commercial photography.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-image-preview',
      contents: {
        parts: [
          {
            text: prompt,
          },
        ],
      },
      config: {
        imageConfig: {
          imageSize: size,
          aspectRatio: "1:1"
        },
      },
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    
    throw new Error("No image data returned from Gemini");

  } catch (error) {
    console.error("Gemini Image Generation Error:", error);
    throw error;
  }
};
