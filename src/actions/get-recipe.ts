"use server";

import { aiClient } from "@/lib/ai-client";

export async function getTraditionalRecipe(prevState: any, formData: FormData) {
  const food = formData.get("food") as string;
  const traditionalRecipe = await aiClient.chat("traditionalRecipes", food);
  return traditionalRecipe;
}
