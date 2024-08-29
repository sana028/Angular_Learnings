import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanActivateChild,
  CanMatch,
  Resolve,
} from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { ApiService } from '../apiService/api.service';
import e from 'express';
import { catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard
  implements CanActivate, CanActivateChild, CanMatch, Resolve<any>
{
  constructor(
    private router: Router,
    private authService: AuthService,
    private api: ApiService
  ) {}

  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      return true;
    } else {
      this.router.navigateByUrl('access-denied');
      return false;
    }
  }

  canActivateChild(): boolean {
    if (this.authService.isUserAdmin()) {
      return true;
    } else {
      alert('access-denied');
      this.router.navigateByUrl('/dashboard');
      return false;
    }
  }

  canMatch(): boolean {
    if (this.authService.isAuthenticated()) {
      return true;
    } else {
      this.router.navigateByUrl('access-denied');
      return false;
    }
  }

  resolve() {
    if (this.authService.isAuthenticated()) {
      const id = Number(sessionStorage.getItem('userId'));
      return this.api.getUserData(id).pipe(
        map((response: any) => {
            return response.data;
        }),
        catchError((error: any) => {
            // Handle error, perhaps navigate to an error page
            this.router.navigate(['/error']);
            return of(null); // or throwError, depending on your needs
        })
    );
    }
    return false;
  }
}
