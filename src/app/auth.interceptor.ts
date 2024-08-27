import {
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
    const authReq = req.clone({
      setHeaders: {
        // Authorization: `Bearer ${sessionStorage.getItem('access_token')}`,
      },
    });
  
    return next(authReq);
  };
