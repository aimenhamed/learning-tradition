"use server";

import { aiClient } from "@/lib/ai-client";

export async function getFoodImage(food: string) {
  const url = await aiClient.generateImage(food);
  return url;
}
