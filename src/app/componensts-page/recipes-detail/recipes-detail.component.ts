import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/api.service';


@Component({
  selector: 'app-recipes-detail',
  templateUrl: './recipes-detail.component.html',
  styleUrls: ['./recipes-detail.component.css']
})
export class RecipesDetailComponent implements OnInit {
  recipe: any = false;


  constructor(private recipeService: ApiService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.recipeService.getOneRecipe(params['id']).subscribe((recipe) => {
        this.recipe = recipe;
      });
    });
  }

}
