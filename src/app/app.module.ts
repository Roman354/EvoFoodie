import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { AuthState } from './store/auth.state';
import { LikedRecipesState } from './store/liked-recipes.state';

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
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { SlideComponent } from './componensts-page/home/slide/slide.component';
import { BestRecipesComponent } from './componensts-page/home/best-recipes/best-recipes.component';
import { TryRecipesComponent } from './componensts-page/home/try-recipes/try-recipes.component';
import { WhyUsComponent } from './componensts-page/home/why-us/why-us.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SubscribeComponent } from './componensts-page/home/subscribe/subscribe.component';
import { LikeModalComponent } from './componensts-page/home/like-modal/like-modal.component';
import { ShopNotificationComponent } from './componensts-page/home/shop-notification/shop-notification.component';
import { RecipeContentComponent } from './componensts-page/recipes-detail/recipe-content/recipe-content.component';
import { IngredientsComponent } from './componensts-page/recipes-detail/ingredients/ingredients.component';
import { OtherRecipesComponent } from './componensts-page/recipes-detail/other-recipes/other-recipes.component';
import { CookingStepsComponent } from './componensts-page/recipes-detail/cooking-steps/cooking-steps.component';
import { LikeItRecipesComponent } from './componensts-page/recipes-detail/like-it-recipes/like-it-recipes.component';
import { CommentsComponent } from './componensts-page/recipes-detail/comments/comments.component';
import { AuthInterceptor } from './auth-interceptor';
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
    TryRecipesComponent,
    WhyUsComponent,
    SubscribeComponent,
    LikeModalComponent,
    ShopNotificationComponent,
    RecipeContentComponent,
    IngredientsComponent,
    OtherRecipesComponent,
    CookingStepsComponent,
    LikeItRecipesComponent,
    CommentsComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxsModule.forRoot([AuthState, LikedRecipesState]),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot()
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
