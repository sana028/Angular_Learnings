import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, mergeMap, of, tap, pipe } from 'rxjs';
import { LogInService } from '../../services/logInSerive/log-in.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { login, loginFailure, loginSuccess } from './signin.action';

@Injectable({
  providedIn: 'root',
})
export class LoginEffect {
  private actions$ = inject(Actions);
  constructor(private loginService: LogInService, private router: Router) {}

  //pipe => it chain the operations to transform or handle data

  signIn$ = createEffect(() =>
    this.actions$?.pipe(
      ofType(login),
      mergeMap((action) =>
        this.loginService.signIn(action)?.pipe(
          map((response) =>{
            sessionStorage.setItem('access_token',response.auth.token);
            sessionStorage.setItem('userId',response.auth.id);
            sessionStorage.setItem('role',response.auth.role);
            sessionStorage.setItem('expiresIn',response.auth.decodedToken);
            return loginSuccess({ loginSuccess:true })
          }),
          catchError((error) => of(loginFailure({ loginFailure:true })))
        )
      )
    )
  );

  loginSuccessRedirect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loginSuccess),
        map(({ }) => {
          this.router.navigateByUrl('dashboard');
        })
      ),
    { dispatch: false }
  );
}
