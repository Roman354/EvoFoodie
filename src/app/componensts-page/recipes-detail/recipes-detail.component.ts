import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Recipe } from 'src/app/my-interface';
import { ApiService } from 'src/app/api.service';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-recipes-detail',
  templateUrl: './recipes-detail.component.html',
  styleUrls: ['./recipes-detail.component.css']
})
export class RecipesDetailComponent implements OnInit {
  recipe: any = false;
  recipes: any = false;
  private subscription: Subscription = new Subscription();
  private subscriptionChange: Subscription = new Subscription();
  constructor(
    private recipeService: ApiService,
    private route: ActivatedRoute,
    private title: Title,
    private meta: Meta,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.params.subscribe({
      next: (params) => {
        this.recipeService.getOneRecipe(params['id']).subscribe({
          next: (recipe) => {
            this.recipe = recipe;
            this.title.setTitle(`Foodie: ${this.recipe.title}`);
            this.meta.addTags([
              { name: 'description', content: `${this.recipe.description}` },
              { property: 'og:description', content: `${this.recipe.description}` },
              { property: 'og:image', content: `${this.recipe.image}` },
              { property: 'og:title', content: `${this.recipe.title}` }
            ]);
          },
          error: (error) => {
            if (error.status === 400) {
              this.router.navigate(['/denied']);
            }
          }
        });
      }
    });

    this.subscriptionChange.add(
      this.route.params.subscribe(params => {
        const id = params['id'];
        this.loadRecipe(id);
      })
    );
    this.loadRecipes();
  }

  private loadRecipe(id: string) {
    this.subscription.add(
      this.recipeService.getOneRecipe(id).subscribe({
        next: (data: any) => {
          this.recipe = data;
          console.log('Рецепт загружен:', data);
        },
        error: (err) => {
          console.error('Ошибка при загрузке рецепта:', err);
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private loadRecipes() {
    this.subscription.add(
      this.recipeService.getCookingBlog(new HttpParams()).subscribe({
        next: (data: any) => {
          console.log(data);
          this.recipes = data;
        },
        error: (error: any) => {
          console.error('Error loading recipes:', error);
        }
      })
    );
  }
}
