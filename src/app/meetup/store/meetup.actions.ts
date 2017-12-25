import { Action } from '@ngrx/store';
import { Meetup } from '../meetup';
import { AuthState } from '../../authStore/auth.reducers';

export const GET_MEETUPS = 'GET_MEETUPS';
export const GET_MEETUPS_SUCCESS = 'GET_MEETUPS_SUCCESS';
export const UPDATE_MEETUP = 'UPDATE_MEETUP';
export const ADD_MEETUP = 'ADD_MEETUP';
export const DELETE_MEETUP = 'DELETE_MEETUP';

export const REGISTER_MEETUP = 'REGISTER_MEETUP';
export const UNREGISTER_MEETUP = 'UNREGISTER_MEETUP';

export class GetMeetups implements Action {
  readonly type = GET_MEETUPS;
}

export class UpdateMeetup implements Action {
  readonly type = UPDATE_MEETUP;

  constructor(public payload: {key: string, meetup: Meetup}) {}
}

export class AddMeetup implements Action {
  readonly type = ADD_MEETUP;

  constructor(public payload: { meetup: Meetup }) {}
}

export class DeleteMeetup implements Action {
  readonly type = DELETE_MEETUP;

  constructor(public payload: { key: string }) {}
}

export class RegisterMeetup implements Action {
  readonly type = REGISTER_MEETUP;

  constructor(public payload: { meetupKey: string, user: AuthState }) {}
}

export class UnRegisterMeetup implements Action {
  readonly type = UNREGISTER_MEETUP;

  constructor(public payload: { meetupKey: string, userUid: string }) {}
}
