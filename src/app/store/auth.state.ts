import { State, Action, StateContext, Store } from '@ngxs/store';
import { HttpRequest, HttpHandlerFn } from '@angular/common/http';
export interface User {
  id: string;
  role: string;
  firstName: string;
  lastName: string;
  middleName: string;
  avatar: string;
  username: string;
  jwtToken: string;
  expiresIn: number;
}

export class SetUser {
  static readonly type = '[Auth] Set User';
  constructor(public user: User) {}
}

export class Logout {
  static readonly type = '[Auth] Logout';
}

export interface AuthStateModel {
  user: User | null;
}

@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    user: null
  }
})
export class AuthState {
  @Action(SetUser)
  setUser(ctx: StateContext<AuthStateModel>, action: SetUser) {
    ctx.setState({
      user: action.user
    });
  }

  @Action(Logout)
  logout(ctx: StateContext<AuthStateModel>) {
    ctx.setState({
      user: null
    });
  }
}

