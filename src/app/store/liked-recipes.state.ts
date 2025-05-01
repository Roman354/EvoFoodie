import { State, Action, StateContext } from '@ngxs/store';

export class ToggleLikeRecipe {
  static readonly type = '[LikedRecipes] Toggle Like';
  constructor(public recipeId: string) {}
}

export interface LikedRecipesStateModel {
  likedRecipeIds: Set<string>;
}

@State<LikedRecipesStateModel>({
  name: 'likedRecipes',
  defaults: {
    likedRecipeIds: new Set<string>()
  }
})
export class LikedRecipesState {
  @Action(ToggleLikeRecipe)
  toggleLike(ctx: StateContext<LikedRecipesStateModel>, action: ToggleLikeRecipe) {
    const state = ctx.getState();
    const newLikedRecipes = new Set(state.likedRecipeIds);

    if (newLikedRecipes.has(action.recipeId)) {
      newLikedRecipes.delete(action.recipeId);
    } else {
      newLikedRecipes.add(action.recipeId);
    }

    ctx.setState({
      likedRecipeIds: newLikedRecipes
    });
  }
}
