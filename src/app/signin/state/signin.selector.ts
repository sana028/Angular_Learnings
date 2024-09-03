import { createFeatureSelector,createSelector } from "@ngrx/store";
import { LoginState } from "./signin.state";

const loginFeature = createFeatureSelector<LoginState>('login');

export const getLoader = createSelector(loginFeature,(state)=>{
    return state.loading;
})

export const getLoginSuccess = createSelector(loginFeature,(state)=>{
    return state.loginSuccess;
});

export const getLoginFailure  = createSelector(loginFeature,(state)=>{
    return state.loginFailure;
})