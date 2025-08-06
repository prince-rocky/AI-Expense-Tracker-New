
import { GoogleGenAI, Type } from "@google/genai";
import { CATEGORIES } from '../constants';
import { ExpenseCategory } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const categorizeExpense = async (description: string): Promise<ExpenseCategory> => {
    const prompt = `Categorize the following expense based on its description: "${description}"`;

    const responseSchema = {
        type: Type.OBJECT,
        properties: {
            category: {
                type: Type.STRING,
                description: 'The single most appropriate expense category.',
                enum: CATEGORIES,
            },
        },
        required: ['category'],
    };

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: 'application/json',
                responseSchema: responseSchema,
                temperature: 0, // Lower temperature for more deterministic categorization
                thinkingConfig: { thinkingBudget: 0 } // Disable thinking for faster response
            },
        });
        
        const jsonText = response.text.trim();
        const result = JSON.parse(jsonText);
        const category = result.category;

        if (category && CATEGORIES.includes(category)) {
            return category as ExpenseCategory;
        }
        
        console.warn(`Gemini returned an unexpected or missing category: ${category}. Defaulting to 'Other'.`);
        return ExpenseCategory.Other;

    } catch (error) {
        console.error("Error categorizing expense with Gemini:", error);
        // Fallback to 'Other' if API call fails
        return ExpenseCategory.Other;
    }
};
