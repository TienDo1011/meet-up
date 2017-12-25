import { ActionReducerMap } from '@ngrx/store/src/models';
import { meetupsReducer } from './meetup/store/meetup.reducers';
import { Meetup } from './meetup/meetup';
import { AuthState, authReducer } from './authStore/auth.reducers';

export interface AppState {
  meetups: Meetup[];
  auth: AuthState;
}

export const reducers: ActionReducerMap<AppState> = {
  meetups: meetupsReducer,
  auth: authReducer
};
