import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Recipe } from 'src/app/my-interface';
import { Router } from '@angular/router';
import { ToggleLikeRecipe } from 'src/app/store/liked-recipes.state';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-like-it-recipes',
  templateUrl: './like-it-recipes.component.html',
  styleUrls: ['./like-it-recipes.component.css']
})
export class LikeItRecipesComponent implements OnInit {
  randomRecipes: Recipe[] = [];
  @Input() recipes: any;
  recipesRender: any;
  constructor(private router: Router, private store: Store) {}
  private subscription: Subscription = new Subscription();
  likedRecipes: Set<string> = new Set();
  showLikeMessage = false;
  private showTimeMessage: any;

  ngOnInit(): void {
    this.recipesRender = this.randomFourRecipes(this.recipes);
  }

  randomFourRecipes(data: any){
    return data.sort(() => Math.random() - 0.5).slice(0, 4);
  }


  toggleLike(recipeId: string, event: Event) {
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

  ngOnDestroy() {
    if (this.showTimeMessage) {
      clearTimeout(this.showTimeMessage);
    }
    this.subscription.unsubscribe();
  }
  closeModal() {
    this.showLikeMessage = false;
    if (this.showTimeMessage) {
      clearTimeout(this.showTimeMessage);
    }
  }
  viewRecipe(id: string) {
    this.recipesRender = this.randomFourRecipes(this.recipes);
    window.scrollTo(0, 0);
    this.router.navigate(['/recipes', id])

  }
}
