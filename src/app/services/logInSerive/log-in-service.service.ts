import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { apis } from '../../../environments/apiEnvironments';
import { Observable } from 'rxjs';
import { signUpPayload } from '../../models/loginData.module';


@Injectable({
  providedIn:'root'
})
export class LogInServiceService {

  constructor(private httpClient:HttpClient) { }
  signUp(data:any):Observable<signUpPayload>{
    return this.httpClient.post<any>(apis.BASE_URL+'/createAccount',data);
  }

}
