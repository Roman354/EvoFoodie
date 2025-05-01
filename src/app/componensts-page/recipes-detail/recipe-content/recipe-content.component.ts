import { Component, Input } from '@angular/core';
import { RecipesDetailComponent } from '../recipes-detail.component';
import { ToggleLikeRecipe } from 'src/app/store/liked-recipes.state';
import { Store } from '@ngxs/store';
@Component({
  selector: 'app-recipe-content',
  templateUrl: './recipe-content.component.html',
  styleUrls: ['./recipe-content.component.css']
})

export class RecipeContentComponent  {
  @Input() recipe: any ;
  isInFavorites = false;
  isShareModalOpen = false;
  showLikeMessage = false;
  private showTimeMessage: any;
  constructor(private recipeComponent: RecipesDetailComponent, private store: Store) { }


  formatDate(date: string): string {
    return new Date(date).toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
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

  toggleFavorite(recipeId: string, event: Event) {
    event.stopPropagation();
    this.store.dispatch(new ToggleLikeRecipe(recipeId));
    this.onLike();
  }

  isRecipeLiked(recipeId: string): boolean {
    return this.store.selectSnapshot(state => state.likedRecipes.likedRecipeIds.has(recipeId));
  }

  onLike() {
    this.showLikeMessage = true;
    if (this.showTimeMessage) {
      clearTimeout(this.showTimeMessage);
    }
    this.showTimeMessage = setTimeout(() => {
      this.showLikeMessage = false;
    }, 5000);
  }

  closeModalLike() {
    this.showLikeMessage = false;
    if (this.showTimeMessage) {
      clearTimeout(this.showTimeMessage);
    }
  }
}
