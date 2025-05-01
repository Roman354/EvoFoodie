import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private store: Store,
    private router: Router
  ) {}

  canActivate(): Observable<boolean> {
    return this.store.select(state => state.auth.user).pipe(
      map(user => {

        if (user && (user.role === 'user' || user.role === 'admin')) {
          return true;
        }

        this.router.navigate(['/denied']);
        return false;
      })
    );
  }
}
