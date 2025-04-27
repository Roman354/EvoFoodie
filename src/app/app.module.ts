import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './componensts-page/home/home.component';
import { RecipesComponent } from './componensts-page/recipes/recipes.component';
import { RecipesDetailComponent } from './componensts-page/recipes-detail/recipes-detail.component';
import { AuthorizationComponent } from './componensts-page/authorization/authorization.component';
import { RegistrationComponent } from './componensts-page/registration/registration.component';
import { ErrorComponent } from './componensts-page/error/error.component';
import { AccessDeniedComponent } from './componensts-page/access-denied/access-denied.component';
import { CreateRecipeComponent } from './componensts-page/create-recipe/create-recipe.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { SlideComponent } from './components/slide/slide.component';
import { BestRecipesComponent } from './components/best-recipes/best-recipes.component';
import { TryRecipesComponent } from './components/try-recipes/try-recipes.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RecipesComponent,
    RecipesDetailComponent,
    AuthorizationComponent,
    RegistrationComponent,
    ErrorComponent,
    AccessDeniedComponent,
    CreateRecipeComponent,
    NavbarComponent,
    DropdownComponent,
    FooterComponent,
    SlideComponent,
    BestRecipesComponent,
    TryRecipesComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
