import { Component, OnInit } from '@angular/core';
import { RecipesDetailComponent } from '../recipes-detail.component';
@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.css']
})
export class IngredientsComponent implements OnInit {

  ingredients: any = false;
  selectedIngredients: Set<number> = new Set();
  constructor(private recipeComponent: RecipesDetailComponent) { }

  ngOnInit() {
    if (this.recipeComponent.recipe && this.recipeComponent.recipe.ingredients) {
      this.ingredients = this.recipeComponent.recipe.ingredients;
    }

  }
  toggleIngredient(index: number): void {
    if (this.selectedIngredients.has(index)) {
      this.selectedIngredients.delete(index);
    } else {
      this.selectedIngredients.add(index);
    }
  }

  isSelected(index: number): boolean {
    return this.selectedIngredients.has(index);
  }

}
