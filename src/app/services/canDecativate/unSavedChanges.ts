import { Injectable } from "@angular/core";
import { CanDeactivate } from "@angular/router";
import { Observable } from "rxjs";

export interface canComponentActivate{
    canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable({
    providedIn: 'root'
})

export class UnSavedChanges implements CanDeactivate<canComponentActivate>{
    canDeactivate(component:canComponentActivate):Observable<boolean> | Promise<boolean> | boolean{
        return component.canDeactivate ? component.canDeactivate() : true;
    }
}