import { HttpParams } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/api.service';
import { Recipe } from 'src/app/my-interface';
import { LikeModalComponent } from '../like-modal/like-modal.component';

@Component({
  selector: 'app-try-recipes',
  templateUrl: './try-recipes.component.html',
  styleUrls: ['./try-recipes.component.css']
})
export class TryRecipesComponent implements OnInit, OnDestroy {
  recipes: Recipe[] = [];
  likedRecipes: Set<string> = new Set();
  private subscription: Subscription = new Subscription();
  showLikeMessage = false;
  private showTimeMessage: any;

  constructor(
    private recipeService: ApiService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadRecipes();
  }


  private loadRecipes() {
    this.subscription.add(
      this.recipeService.getCookingBlog(new HttpParams()).subscribe({
        next: (data: any) => {
          this.recipes = this.randomFourRecipes(data);
          // console.log(this.recipes);
        },
        error: (error: any) => {
          console.error('Error loading recipes:', error);
        }
      })
    );
  }

  randomFourRecipes(data: any) {
    return data.sort(() => Math.random() - 0.5).slice(0, 4);
  }

  viewRecipe(id: string) {
    this.router.navigate(['/recipes', id]);
  }


  formatCookingTime(minutes: number): string {
    if (minutes < 60) {
      return `${minutes} мин`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return remainingMinutes > 0
      ? `${hours} ч ${remainingMinutes} мин`
      : `${hours} ч`;
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
