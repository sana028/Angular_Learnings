import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuthenticated(): boolean {
    if (typeof sessionStorage !== 'undefined') {
      const token = sessionStorage.getItem('access_token');
      if (!token) {
        return false;
      }
      const decodedTokenTime: any = sessionStorage.getItem('expiresIn');
      const currentTime: any = Math.floor(Date.now() / 1000);
      return currentTime < decodedTokenTime;
    }
    return false;
  }
}
