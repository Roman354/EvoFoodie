import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './componensts-page/home/home.component';
import { RecipesComponent } from './componensts-page/recipes/recipes.component';
import { RecipesDetailComponent } from './componensts-page/recipes-detail/recipes-detail.component';
import { ErrorComponent } from './componensts-page/error/error.component';
import { AccessDeniedComponent } from './componensts-page/access-denied/access-denied.component';
import { AuthorizationComponent } from './componensts-page/authorization/authorization.component';
import { RegistrationComponent } from './componensts-page/registration/registration.component';
import { CreateRecipeComponent } from './componensts-page/create-recipe/create-recipe.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'recipes', component: RecipesComponent},
  {path: 'recipes/:id', component: RecipesDetailComponent},
  {path: 'error', component: ErrorComponent},
  {path:'denied', component:AccessDeniedComponent},
  {path:'authorization', component: AuthorizationComponent},
  {path:'registration', component: RegistrationComponent},
  {path:'create-recipe', component: CreateRecipeComponent, canActivate: [AuthGuard]},
  {path: '**', redirectTo: 'error' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
