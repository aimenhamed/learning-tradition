import { LanguageModel, generateObject } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";

class AiClient {
  private model: LanguageModel;
  private PROMPTS = {
    traditionalRecipes: {
      schema: z.object({
        completed: z.boolean(),
        recipe: z.object({
          foodDish: z.string(),
          ingredients: z.array(z.string()),
          equipment: z.array(z.string()),
          method: z.array(z.string()),
          timeNeeded: z.string(),
          culturalBackground: z.string(),
        }),
      }),
      prompt: (food: string) => `
      You are an agent that specialises in providing traditional old school recipes for any particular food dish across all cultures.
      
      Follow these rules:
      - You only suggest food recipes that are traditional to their origin culture and country.
      - You only suggest food recipes relevant to the input food dish.
      - You must only format the recipe in the template provided below.
      - If for whatever reason you cannot provide a traditional recipe for a food dish fallback to the following options:
        a) Provide the non-traditional recipe.
        b) Provide a recipe which is semantically similar to the dish.

      Recipe Template:
      Ingredients:
      <list of ingredients>

      Equipment:
      <list of equipment needed for recipe>

      Method:
      <list of steps to make the recipe>

      Time needed:
      <approximate time it takes to make >

      Cultural background:
      <a very pleasantly written paragraph regarding the origin of the dish, historical and interesting cultural facts>

      The food dish is: ${food}
`,
    },
  };

  constructor() {
    this.model = openai("gpt-4o");
  }

  async chat(promptKey: keyof typeof this.PROMPTS, food: string) {
    const promptEntry = this.PROMPTS[promptKey];
    const result = await generateObject({
      model: this.model,
      schema: promptEntry.schema,
      prompt: promptEntry.prompt(food),
    });

    return result.object;
  }

  async generateImage(food: string): Promise<string> {
    const res = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "dall-e-3",
        prompt: `Generate a very realistic looking image of the following food in its traditional fashion: ${food}`,
        n: 1,
        size: "1024x1024",
      }),
    });

    const json = await res.json();
    return json.data[0].url as string;
  }
}

export const aiClient = new AiClient();
