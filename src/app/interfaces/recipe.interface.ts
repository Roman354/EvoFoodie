export interface CookingSteps {
  title: string;
  description: string;
}

export interface Ingredient {
  title: string;
  description: string;
}
export interface FoodValue {
  calories: number;
  fats: number;
  carbohydrates: number;
  proteins: number;
}
export interface CreateRecipe {
  body: string;
  title: string;
  tags: string[];
  image: string;
  timeCooking: number;
  foodValue: FoodValue;
  cookingSteps: CookingSteps[];
  ingredients: Ingredient[];
}

