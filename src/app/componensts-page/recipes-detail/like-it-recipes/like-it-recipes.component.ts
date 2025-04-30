import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { HttpParams } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { Recipe } from 'src/app/my-interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-like-it-recipes',
  templateUrl: './like-it-recipes.component.html',
  styleUrls: ['./like-it-recipes.component.css']
})
export class LikeItRecipesComponent implements OnInit {
  randomRecipes: Recipe[] = [];
  recipes: Recipe[] = [];
  constructor(private recipeService: ApiService, private router: Router) {}
  private subscription: Subscription = new Subscription();
  likedRecipes: Set<string> = new Set();
  showLikeMessage = false;
  private showTimeMessage: any;

  ngOnInit(): void {
    this.loadRecipes();
  }

  private loadRecipes() {
    this.subscription.add(
      this.recipeService.getCookingBlog(new HttpParams()).subscribe({
        next: (data: any) => {

          this.recipes = this.randomFourRecipes(data);
          console.log(this.recipes);
        },
        error: (error: any) => {
          console.error('Error loading recipes:', error);
        }
      })
    );
  }
  randomFourRecipes(data: any){
    return data.sort(() => Math.random() - 0.5).slice(0, 4);
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
  viewRecipe(id: string) {
    this.router.navigate(['/recipes', id]).then(() => {
      window.location.reload();
    });
  }
}
