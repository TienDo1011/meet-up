import { Action } from '@ngrx/store';

export const LOGIN = 'LOGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT = 'LOGOUT';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const CHECK_LOGIN = 'CHECK_LOGIN';
export const DO_NOTHING = 'DO_NOTHING';

export class Login implements Action {
  readonly type = LOGIN;
}

export class Logout implements Action {
  readonly type = LOGOUT;
}

export class CheckLogin implements Action {
  readonly type = CHECK_LOGIN;
}
