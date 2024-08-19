import { Routes } from '@angular/router';

export const routes: Routes = [
    {path:'',loadComponent:()=>import('./signin/signin.component').then((m)=>m.SigninComponent)},
    {path:'signUp',loadComponent:()=>import('./sign-up/sign-up.component').then((m)=>m.SignUpComponent)},
    {path:'dashboard' , loadComponent:()=>import('./components/collectiondashboard/collectiondashboard.component').then((m)=>m.CollectiondashboardComponent)}
];
