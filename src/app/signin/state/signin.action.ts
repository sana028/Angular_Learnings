import { createAction, props } from "@ngrx/store";

export const login = createAction('login',props<{email:string,password:string}>());

export const loginSuccess = createAction('loginSuccess',props<{loginSuccess:boolean}>());

export const loginFailure = createAction('loginFailure',props<{loginFailure:boolean}>());