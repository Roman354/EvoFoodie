import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Meta } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/api.service';
import { Recipe } from 'src/app/my-interface';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  recipes: Recipe[] = [];
  private subscription: Subscription = new Subscription();

  constructor(
    private recipeService: ApiService,
    private router: Router,
    private meta: Meta,
    private title: Title) {};

  private loadRecipes() {
    this.subscription.add(
      this.recipeService.getCookingBlog(new HttpParams()).subscribe({
        next: (data: any) => {
          this.recipes = data;
        },
        error: (error: any) => {
          console.error('Error loading recipes:', error);
        }
      })
    );
  }

  ngOnInit() {
    this.loadRecipes();
    this.title.setTitle('Foodie: Каталог рецептов');
    this.meta.addTags([
      { name: 'description', content: 'Все самые лучшие рецепты собраны здесь' },
      { property: 'og:description', content: 'Все самые лучшие рецепты собраны здесь' }
    ]);
  }
  viewRecipe(id: string) {
    this.router.navigate(['/recipes', id]);
  }

  formatCookingTime(minutes: number): string {
    return `${minutes} минут`;
  }
}
