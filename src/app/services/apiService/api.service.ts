import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import  {apis} from '../../../environments/apiEnvironments';
import { UserData } from '../../models/loginData.module';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  getUserData(id:number):Observable<UserData>{
    return this.http.get<UserData>(apis.BASE_URL+'/getData/'+id);
   }

  getSkills():Observable<string[]>{
    return this.http.get<string[]>(apis.BASE_URL+'/getSkills');
  }

  getDesignations():Observable<string[]>{
    return this.http.get<string[]>(apis.BASE_URL+'/getDesignations');
  }

  updateProfile(data:any,id:number):Observable<any>{4
    return this.http.patch<any>(apis.BASE_URL+'/updateProfile',{...data.value,id:id});
  }

  getAllTasksList():Observable<Object[]>{
    return this.http.get<Object[]>(apis.BASE_URL+'/getTasksData');
  }

  getTaskData(Id:string):Observable<[]>{
    return this.http.get<[]>(apis.BASE_URL+'/getTask'+Id);
  }

  addTask(data:any):Observable<Object>{
    return this.http.post<Object>(apis.BASE_URL+'/addTask',data);
  }

  updateTask(data:any):Observable<Object>{
    return this.http.patch<Object>(apis.BASE_URL+'/updateTask',data);
  }

  filterTaskData(sortBy:string,sortOrder:string):Observable<Object[]>{
    let params = new HttpParams()
      .set('sortBy', sortBy)
      .set('sortOrder', sortOrder);
    return this.http.get<Object[]>(apis.BASE_URL+'/tasks',{params})
  }
}
