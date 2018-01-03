import { GET_USERS_SUCCESS, GET_CHAT_DIALOG, GET_CHAT_DIALOG_SUCCESS } from './chat.actions';

const initialState = {
  users: [],
  chatDialogs: {}
};

export function chatReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload.users
      };
    case GET_CHAT_DIALOG_SUCCESS:
      return {
        users: state.users,
        chatDialogs: {
          ...state.chatDialogs,
          [action.payload.chatWith]: action.payload.chatDialog
        }
      };
    default:
      return state;
  }
}
