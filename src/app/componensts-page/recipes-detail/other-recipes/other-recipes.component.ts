
import { Component, Input, OnInit } from '@angular/core';
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
  @Input() recipes: any;
  recipesRender: any;
  displayedRecipes: Recipe[] = [];
  otherRecipes: any[] = [];
  currentRecipeId: string = '';

  constructor( private router: Router) { }

  ngOnInit() {
    this.recipesRender = this.randomThreeRecipes(this.recipes);
  }


  randomThreeRecipes(data: any) {
    return data.sort(() => Math.random() - 0.5).slice(0, 3);
  }

  navigateToRecipe(id: string) {
    this.recipesRender = this.randomThreeRecipes(this.recipes);
    window.scrollTo(0, 0);
    this.router.navigate(['/recipes', id])

  }


}
