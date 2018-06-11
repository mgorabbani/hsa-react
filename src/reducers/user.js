import {
  USER_LOGGED_IN,
  USER_LOGGED_OUT,
  FETCH_CURRENT_USER_SUCCESS,
  UPDATE_USER_INFO
} from "../types";

export default function user(state = { loaded: false }, action = {}) {
  switch (action.type) {
    case USER_LOGGED_IN:
      return { ...action.user, loaded: true };
    case FETCH_CURRENT_USER_SUCCESS:
      return { ...state, ...action.user, loaded: true };
    case USER_LOGGED_OUT:
      return { loaded: true };
    case UPDATE_USER_INFO:
      return { ...state, ...action.user };
    default:
      return state;
  }
}
