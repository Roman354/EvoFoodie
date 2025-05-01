import { Component, OnInit } from '@angular/core';
import { RecipesDetailComponent } from '../recipes-detail.component';

@Component({
  selector: 'app-cooking-steps',
  templateUrl: './cooking-steps.component.html',
  styleUrls: ['./cooking-steps.component.css']
})
export class CookingStepsComponent implements OnInit {

  cookingSteps: any = false;
  selectedIngredients: Set<number> = new Set();
  constructor(private recipeComponent: RecipesDetailComponent) { }

  ngOnInit() {
    if (this.recipeComponent.recipe && this.recipeComponent.recipe.cookingSteps) {
      this.cookingSteps = this.recipeComponent.recipe.cookingSteps;
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
