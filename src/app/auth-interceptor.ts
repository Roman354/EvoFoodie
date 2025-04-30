import { HttpRequest } from '@angular/common/http';
import { HttpHandler } from '@angular/common/http';
import { HttpInterceptor } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private readonly _store: Store) {}

    public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
        const authToken = this._store.selectSnapshot((state: any) => state.auth.user?.jwtToken);

        if (!authToken) {
            return next.handle(req);
        }

        const authReq = req.clone({
            headers: req.headers.set('Authorization', `Bearer ${authToken}`)
        });

        return next.handle(authReq);
    }
}