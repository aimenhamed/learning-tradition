export function RecipeView({
  recipe,
}: {
  recipe: {
    foodDish: string;
    ingredients: string[];
    equipment: string[];
    method: string[];
    timeNeeded: string;
    culturalBackground: string;
  };
}) {
  return (
    <div className="flex flex-col justify-center pt-6">
      <p className="text-2xl font-bold">Dish</p>
      <p className="mb-6">{recipe.foodDish}</p>
      <p className="font-bold">Ingredients</p>
      {recipe.ingredients.map((i) => (
        <p id={i}>- {i}</p>
      ))}
      <p className="font-bold mt-6">Equipment</p>
      {recipe.equipment.map((e) => (
        <p id={e}>- {e}</p>
      ))}
      <p className="font-bold mt-6">Method</p>
      {recipe.method.map((s) => (
        <p id={s}>- {s}</p>
      ))}
      <p className="font-bold mt-6">Time</p>
      <p>{recipe.timeNeeded}</p>
      <p className="font-bold mt-6">Cultural Background of the dish</p>
      <p>{recipe.culturalBackground}</p>
    </div>
  );
}
