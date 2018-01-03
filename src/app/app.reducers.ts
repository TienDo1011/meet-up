import { ActionReducerMap } from '@ngrx/store/src/models';
import { meetupsReducer } from './meetup/store/meetup.reducers';
import { Meetup } from './meetup/meetup';
import { AuthState, authReducer } from './authStore/auth.reducers';
import { chatReducer } from './chat/store/chat.reducers';

export interface AppState {
  meetups: Meetup[];
  auth: AuthState;
  chat;
}

export const reducers: ActionReducerMap<AppState> = {
  meetups: meetupsReducer,
  auth: authReducer,
  chat: chatReducer
};
