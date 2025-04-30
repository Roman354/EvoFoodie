import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { HttpParams } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { Recipe } from 'src/app/my-interface';



@Component({
  selector: 'app-slider',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.css']
})
export class SlideComponent implements OnInit, OnDestroy {
  recipes: Recipe[] = [];
  currentSlideIndex = 0;
  private autoSlideInterval: any;
  private subscription: Subscription = new Subscription();

  constructor(
    private router: Router,
    private recipeService: ApiService
  ) {}

  ngOnInit() {
    this.loadRecipes();
    this.startAutoSlide();
  }

  ngOnDestroy() {
    this.stopAutoSlide();
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private loadRecipes() {
    this.subscription.add(
      this.recipeService.getCookingBlog(new HttpParams().set('filter', 3)).subscribe({
        next: (data: any) => {
          // console.log(data);
          this.recipes = data;
        },
        error: (error: any) => {
          console.error('Error loading recipes:', error);
        }
      })
    );
  }

  private startAutoSlide() {
    this.autoSlideInterval = setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  private stopAutoSlide() {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
    }
  }

  nextSlide() {
    if (this.recipes.length > 0) {
      this.currentSlideIndex = (this.currentSlideIndex + 1) % this.recipes.length;
    }
  }

  previousSlide() {
    if (this.recipes.length > 0) {
      this.currentSlideIndex = this.currentSlideIndex === 0
        ? this.recipes.length - 1
        : this.currentSlideIndex - 1;
    }
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


  onMouseEnter() {
    this.stopAutoSlide();
  }

  onMouseLeave() {
    this.startAutoSlide();
  }

}
