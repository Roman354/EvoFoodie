import { Component, OnInit } from '@angular/core';
import { RecipesDetailComponent } from '../recipes-detail.component';
@Component({
  selector: 'app-recipe-content',
  templateUrl: './recipe-content.component.html',
  styleUrls: ['./recipe-content.component.css']
})

export class RecipeContentComponent implements OnInit {
  recipe: any = false;
  isInFavorites = false;
  isShareModalOpen = false;
  constructor(private recipeComponent: RecipesDetailComponent) { }

  ngOnInit() {
    this.recipe = this.recipeComponent.recipe;
    console.log(this.recipe);
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  }

  toggleFavorite() {
    this.isInFavorites = !this.isInFavorites;
    console.log(this.isInFavorites);
  }

  print() {
    window.print();
  }

  share() {
    this.isShareModalOpen = true;
  }

  closeModal() {
    this.isShareModalOpen = false;
  }
}
