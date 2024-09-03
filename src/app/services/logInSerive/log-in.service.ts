import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { apis } from '../../../environments/apiEnvironments';
import { Observable } from 'rxjs';
import { loginPayload, responseData } from '../../models/loginData.module';

@Injectable({
  providedIn:'root'
})
export class LogInService {

  constructor(private httpClient:HttpClient) { }

  
  signUp(data:any):Observable<responseData>{
    return this.httpClient.post<responseData>(apis.BASE_URL+'/createAccount',data);
  }

  signIn(data:loginPayload):Observable<responseData>{
    console.log(data,'de')
    return this.httpClient.post<responseData>(apis.BASE_URL+'/login',data);
  }


}
