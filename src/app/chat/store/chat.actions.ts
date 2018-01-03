import { Action } from '@ngrx/store';

export const GET_USERS = 'GET_USERS';
export const GET_USERS_SUCCESS = 'GET_USERS_SUCCESS';
export const SEND_MESSAGE = 'SEND_MESSAGE';
export const GET_CHAT_DIALOG = 'GET_CHAT_DIALOG';
export const GET_CHAT_DIALOG_SUCCESS = 'GET_CHAT_DIALOG_SUCCESS';

export class GetUsers implements Action {
  readonly type = GET_USERS;
}

export class SendMessage implements Action {
  readonly type = SEND_MESSAGE;
  constructor(public payload: {
    between: string[],
    message: string,
    sender: string
  }) {}
}

export class GetChatDialog implements Action {
  readonly type = GET_CHAT_DIALOG;
  constructor(public payload: {
    between: string[]
  }) {}
}

export class GetChatDialogSuccess implements Action {
  readonly type = GET_CHAT_DIALOG_SUCCESS;
}
