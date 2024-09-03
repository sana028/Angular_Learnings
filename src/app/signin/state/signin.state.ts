export interface LoginState {
  loading: boolean;
  loginSuccess: boolean;
  loginFailure:boolean;
}

export const _loginState: LoginState = {
  loginSuccess: false,
  loading: false,
  loginFailure:false ,
};
