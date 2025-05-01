import { HttpParams } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';

import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/api.service';
import { Recipe } from 'src/app/my-interface';
import { ToggleLikeRecipe } from 'src/app/store/liked-recipes.state';

@Component({
  selector: 'app-best-recipes',
  templateUrl: './best-recipes.component.html',
  styleUrls: ['./best-recipes.component.css']
})
export class BestRecipesComponent implements OnInit, OnDestroy {
  recipes: Recipe[] = [];
  displayedRecipes: Recipe[] = [];
  showMoreButton = true;
  likedRecipes: Set<string> = new Set();
  private subscription: Subscription = new Subscription();
  showLikeMessage = false;
  private showTimeMessage: any;

  constructor( private recipeService: ApiService, private router: Router, private store: Store) {};

  private loadRecipes() {
    this.subscription.add(
      this.recipeService.getCookingBlog(new HttpParams()).subscribe({
        next: (data: any) => {

          this.recipes = this.randomSixRecipes(data);
          this.displayedRecipes = this.recipes.slice(0, 3);
        },
        error: (error: any) => {
          console.error('Error loading recipes:', error);
        }
      })
    );
  }
  randomSixRecipes(data: any){
    return data.sort(() => Math.random() - 0.5).slice(0, 6);
  }

  ngOnInit() {
    this.loadRecipes();

  }


  showMore() {
    this.displayedRecipes = this.recipes;
    this.showMoreButton = false;
  }

  viewRecipe(id: string) {
    this.router.navigate(['/recipes', id]);
  }



  formatCookingTime(minutes: number): string {
    return `${minutes} минут`;
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
}
