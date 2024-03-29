import {
  GET_ALL_USERS,
  GET_UPDATED_ME,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  REGISTER_FAILED,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  TOKEN_USER_FAILED,
  TOKEN_USER_SUCCESS,
  USER_LOGOUT,
  USER_PROFILE_PHOTO_UPDATE,
  USER_UPDATE,
} from './actionType'
import { authInitial } from './authInitial'

// create auth reducer
export const authReducer = (state = authInitial, { type, payload }) => {
  switch (type) {
    case REGISTER_REQUEST:
      return {
        ...state,
        loading: true,
      }

    case REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        message: payload,
      }

    case REGISTER_FAILED:
      return {
        ...state,
        loading: false,
        message: payload,
        user: null,
      }

    case LOGIN_SUCCESS:
      return {
        ...state,
        user: payload,
        loginStatus: true,
      }

    case LOGIN_FAILED:
      return {
        ...state,
        loginStatus: false,
      }

    case TOKEN_USER_FAILED:
      return {
        ...state,
        loginStatus: false,
        user: null,
      }

    case TOKEN_USER_SUCCESS:
      return {
        ...state,
        user: payload,
        loginStatus: true,
      }
    case USER_UPDATE:
      return {
        ...state,
        user: {
          ...payload,
        },
      }
    case USER_PROFILE_PHOTO_UPDATE:
      return {
        ...state,
        user: {
          ...state.user,
          ...payload,
        },
      }

    case USER_LOGOUT:
      return {
        ...state,
        user: null,
        loginStatus: false,
      }
    case GET_ALL_USERS:
      return {
        ...state,
        users: payload,
      }
    case GET_UPDATED_ME:
      return {
        ...state,
        user: payload,
      }

    default:
      return state
  }
}
