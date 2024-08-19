import { Injectable } from '@angular/core';
import { icons } from '../models/unrelated-data.module';

@Injectable({
  providedIn: 'root'
})
export class UnrelatedService {
 iconNames:icons[]=[];
  constructor() { }

  setIconsNames = (data:icons[])=>{
    this.iconNames=data;
  }

  getIconNames = () =>{
    return this.iconNames;
  }
}
