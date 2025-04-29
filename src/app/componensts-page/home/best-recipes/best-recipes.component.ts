import { HttpParams } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/api.service';
import { Recipe } from 'src/app/my-interface';

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

  constructor( private recipeService: ApiService, private router: Router) {};

  private loadRecipes() {
    this.subscription.add(
      this.recipeService.getCookingBlog(new HttpParams()).subscribe({
        next: (data: any) => {

          this.recipes = this.randomSixRecipes(data);
          this.displayedRecipes = this.recipes.slice(0, 3);
          console.log(this.recipes);
        },
        error: (error: any) => {
          console.error('Error loading recipes:', error);
        }
      })
    );
  }

  ngOnInit() {
    this.loadRecipes();

  }

  randomSixRecipes(data: any){
    return data.sort(() => Math.random() - 0.5).slice(0, 6);
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
    if (this.likedRecipes.has(recipeId)) {
      this.likedRecipes.delete(recipeId);
    } else {
      this.likedRecipes.add(recipeId);
      this.onLike();
    }
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
