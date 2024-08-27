import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { apis } from '../../../environments/apiEnvironments';
import { Observable } from 'rxjs';
import { loginPayload, signUpPayload } from '../../models/loginData.module';

@Injectable({
  providedIn:'root'
})
export class LogInService {

  constructor(private httpClient:HttpClient) { }

  
  signUp(data:any):Observable<signUpPayload>{
    return this.httpClient.post<any>(apis.BASE_URL+'/createAccount',data);
  }

  signIn(data:loginPayload):Observable<any>{
    return this.httpClient.post<signUpPayload>(apis.BASE_URL+'/login',data);
  }


}
