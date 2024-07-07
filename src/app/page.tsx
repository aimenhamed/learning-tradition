"use client";

import { getFoodImage } from "@/actions/get-food-image";
import { getTraditionalRecipe } from "@/actions/get-recipe";
import { RecipeView } from "@/components/recipe-view";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";

const initialState = {
  completed: false,
  recipe: {
    foodDish: "",
    ingredients: [],
    equipment: [],
    method: [],
    timeNeeded: "",
    culturalBackground: "",
  },
};

export default function Home() {
  const [state, formAction] = useFormState(getTraditionalRecipe, initialState);
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    if (state.completed) {
      const getImage = async () => {
        const url = await getFoodImage(state.recipe.foodDish);
        setImageUrl(url);
      };
      getImage();
    }
  }, [state.completed]);

  return (
    <div className="flex py-24 px-48 flex-col justify-center">
      <h1 className="text-3xl pb-2 font-bold">Learning Tradition</h1>
      <h2 className="text-xl pb-4">
        Enter a dish to find a traditional recipe.
      </h2>
      <form action={formAction}>
        <Input type="text" name="food" placeholder="Enter a food dish here" />
        <SubmitButton />
      </form>
      {imageUrl !== "" && (
        <img
          src={imageUrl}
          alt={state.recipe.foodDish}
          width={1024}
          height={1024}
        />
      )}
      {state.completed && <RecipeView recipe={state.recipe} />}
    </div>
  );
}
