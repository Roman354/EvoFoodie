import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/api.service';
import { Recipe } from 'src/app/my-interface';

@Component({
  selector: 'app-other-recipes',
  templateUrl: './other-recipes.component.html',
  styleUrls: ['./other-recipes.component.css']
})
export class OtherRecipesComponent implements OnInit {
  recipes: Recipe[] = [];
  displayedRecipes: Recipe[] = [];
  otherRecipes: any[] = [];
  currentRecipeId: string = '';

  private subscription: Subscription = new Subscription();

  constructor(private recipeService: ApiService, private router: Router) { }

  ngOnInit() {
    this.loadRecipes();
  }

  private loadRecipes() {
    this.subscription.add(
      this.recipeService.getCookingBlog(new HttpParams()).subscribe({
        next: (data: any) => {
          this.recipes = this.randomThreeRecipes(data);
          this.displayedRecipes = this.recipes.slice(0, 3);
          console.log(this.recipes);
        },
        error: (error: any) => {
          console.error('Error loading recipes:', error);
        }
      })
    );
  }

  randomThreeRecipes(data: any) {
    return data.sort(() => Math.random() - 0.5).slice(0, 3);
  }

  navigateToRecipe(id: string) {
    this.router.navigate(['/recipes', id]).then(() => {
      window.location.reload();
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
