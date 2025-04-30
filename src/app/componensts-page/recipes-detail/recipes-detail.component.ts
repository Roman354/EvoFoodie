import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-recipes-detail',
  templateUrl: './recipes-detail.component.html',
  styleUrls: ['./recipes-detail.component.css']
})
export class RecipesDetailComponent implements OnInit {
  recipe: any = false;

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
  }
}
