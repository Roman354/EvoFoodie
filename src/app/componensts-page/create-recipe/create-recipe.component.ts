import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ApiService } from 'src/app/api.service';
import { Router } from '@angular/router';
import { CreateRecipe } from 'src/app/interfaces/recipe.interface';

@Component({
  selector: 'app-create-recipe',
  templateUrl: './create-recipe.component.html',
  styleUrls: ['./create-recipe.component.css']
})
export class CreateRecipeComponent implements OnInit {
  recipeForm: FormGroup;
  showError = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router
  ) {
    this.recipeForm = this.fb.group({
      title: ['', [Validators.required]],
      body: ['', [Validators.required]],
      tagsInput: ['', [Validators.required]],
      image: ['', [Validators.required]],
      timeCooking: [0, [Validators.required, Validators.min(0)]],
      foodValue: this.fb.group({
        calories: [0, [Validators.required, Validators.min(0)]],
        fats: [0, [Validators.required, Validators.min(0)]],
        carbohydrates: [0, [Validators.required, Validators.min(0)]],
        proteins: [0, [Validators.required, Validators.min(0)]]
      }),
      cookingSteps: this.fb.array([
        this.createStep()
      ]),
      ingredients: this.fb.array([
        this.createIngredient()
      ])
    });
  }

  ngOnInit(): void {}

  get cookingSteps() {
    return this.recipeForm.get('cookingSteps') as FormArray;
  }

  get ingredients() {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  createStep(): FormGroup {
    return this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  createIngredient(): FormGroup {
    return this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  addStep() {
    this.cookingSteps.push(this.createStep());
  }

  addIngredient() {
    this.ingredients.push(this.createIngredient());
  }

  onSubmit() {
    if (this.recipeForm.valid) {
      const formValue = this.recipeForm.value;
      const tags: string[] = formValue.tagsInput.trim().split(' ').filter((tag: string) => tag.length > 0);

      if (tags.length === 0) {
        this.recipeForm.get('tagsInput')?.setErrors({ 'required': true });
        this.markFormGroupTouched(this.recipeForm);
        return;
      }

      const recipe: CreateRecipe = {
        title: formValue.title,
        body: formValue.body,
        tags: tags,
        image: formValue.image,
        timeCooking: Number(formValue.timeCooking),
        foodValue: {
          calories: Number(formValue.foodValue.calories),
          fats: Number(formValue.foodValue.fats),
          carbohydrates: Number(formValue.foodValue.carbohydrates),
          proteins: Number(formValue.foodValue.proteins)
        },
        cookingSteps: formValue.cookingSteps,
        ingredients: formValue.ingredients
      };

      this.apiService.createRecipe(recipe).subscribe({
        next: (response: any) => {
          this.router.navigate(['/recipes']);
        },
        error: (error: any) => {
          this.showError = true;
          this.errorMessage = error.message || 'Произошла ошибка при создании рецепта';
          setTimeout(() => {
            this.showError = false;
          }, 5000);
        }
      });
    } else {
      this.markFormGroupTouched(this.recipeForm);
    }
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.recipeForm.get(fieldName);
    return field ? (field.invalid && (field.dirty || field.touched)) : false;
  }
}
