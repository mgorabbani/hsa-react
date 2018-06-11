import {
  CREATE_USER_REQUEST,
  CREATE_USER_FAILURE,
  FETCH_CURRENT_USER_REQUEST,
  FETCH_CURRENT_USER_SUCCESS,
  UPDATE_USER_INFO
} from "../types";

export const createUserRequest = user => ({
  type: CREATE_USER_REQUEST,
  user
});

export const createUserFailure = errors => ({
  type: CREATE_USER_FAILURE,
  errors
});

export const fetchCurrentUserRequest = () => ({
  type: FETCH_CURRENT_USER_REQUEST
});

export const fetchCurrentUserSuccess = user => ({
  type: FETCH_CURRENT_USER_SUCCESS,
  user
});

export const updateUserInfo = user => ({
  type: UPDATE_USER_INFO,
  user
});
