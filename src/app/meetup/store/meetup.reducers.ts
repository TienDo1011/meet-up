import { GET_MEETUPS_SUCCESS } from './meetup.actions';

export function meetupsReducer(state = [], action) {
  switch (action.type) {
    case GET_MEETUPS_SUCCESS:
      return action.payload;
    default:
      return state;
  }
}
