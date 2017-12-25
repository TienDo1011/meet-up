import { LOGIN_SUCCESS, LOGOUT_SUCCESS } from './auth.actions';

export interface AuthState {
  uid: string;
  displayName: string;
  email: string;
  photoURL: string;
}

const initialState: AuthState = {
  uid: null,
  displayName: null,
  email: null,
  photoURL: null
};

export function authReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return action.payload.user;
    case LOGOUT_SUCCESS:
      return initialState;
    default:
      return state;
  }
}
