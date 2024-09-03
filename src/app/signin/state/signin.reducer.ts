import { createReducer, on } from '@ngrx/store';
import { _loginState } from './signin.state';
import { loginSuccess, loginFailure, login } from './signin.action';

const loginReducer = createReducer(
  _loginState,
  on(login, (state,action) => {
    console.log(state,action)
    return {
      ...state,
      loading: true,
      loginFailure: false,
    };
  }),
  on(loginSuccess, (state, action) => {
    return { ...state,
        loginSuccess:action.loginSuccess,
        loading: false,
        loginFailure: false
    };
  }),
  on(loginFailure, (state,action) => {
    return { ...state,loading:false, loginFailure: action.loginFailure };
  })
);

export const _loginReducer = (state: any, action: any) => {
  return loginReducer(state, action);
};
