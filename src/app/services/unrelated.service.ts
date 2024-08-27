import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UnrelatedService {
 userInfo:any;
  constructor() { }

  setUserData = (data:any)=>{
    this.userInfo=data;
  }

  getUserData = () =>{
    return this.userInfo;
  }
}
