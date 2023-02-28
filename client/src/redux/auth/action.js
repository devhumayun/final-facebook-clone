import axios from 'axios'
import Cookies from 'js-cookie'
import { createToast } from '../../utility/toast'
import { LOADER_START } from '../loader/loaderTypes'
import {
  LOGIN_FAILED,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  REGISTER_FAILED,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  TOKEN_USER_FAILED,
  TOKEN_USER_REQ,
  TOKEN_USER_SUCCESS,
  USER_LOGOUT,
  USER_PROFILE_PHOTO_UPDATE,
  USER_UPDATE,
} from './actionType'

// create user
export const userRegister =
  (data, e, setInput, setRegister, navigate) => async (dispatch) => {
    try {
      dispatch({
        type: REGISTER_REQUEST,
      })

      await axios
        .post('/api/v1/user/register', data)
        .then((res) => {
          dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data.message,
          })

          navigate('/activation/account')

          e.target.reset()
          setRegister(false)
          setInput({
            fname: '',
            surname: '',
            mobileORemail: '',
            password: '',
            gender: '',
            day: '',
            month: '',
            year: '',
          })

          createToast(res.data.message, 'success')
        })
        .catch((error) => {
          createToast(error.response.data.message, 'error')
          console.log(error.response.data)
          dispatch({
            type: REGISTER_FAILED,
            payload: error.response.data,
          })
        })
    } catch (error) {
      createToast(error.response.data.message, 'error')
      console.log(error.response.data)
      dispatch({
        type: REGISTER_FAILED,
        payload: error.response.data,
      })
    }
  }

// account activation via OTP
export const accountActivationByCode =
  ({ code, auth }, navigate) =>
  async (dispatch) => {
    try {
      await axios
        .post('/api/v1/user/code-activation', {
          code: code,
          auth: auth,
        })
        .then((res) => {
          createToast('Account Activation Successfull', 'success')
          navigate('/login')
          Cookies.remove('otp')
        })
        .catch((error) => {
          createToast(error.response.data.message)
        })
    } catch (error) {
      createToast(error.response.data.message)
    }
  }

// resend activation Link
export const resendActivationLink = (email, navigate) => async (dispatch) => {
  try {
    await axios
      .post('/api/v1/user/resend-activation', {
        auth: email,
      })
      .then((res) => {
        createToast(res.data.message, 'success')
        navigate('/activation/account')
      })
      .catch((error) => {
        createToast(error.response.data.message)
      })
  } catch (error) {
    createToast(error.response.data.message)
  }
}

// resend  reset password code
export const resendResetPasswordCode = (auth) => async (dispatch) => {
  try {
    await axios
      .post('/api/v1/user/resend-reset-otp', {
        auth: auth,
      })
      .then((res) => {
        createToast(res.data.message, 'success')
      })
      .catch((error) => {
        createToast(error.response.data.message)
      })
  } catch (error) {
    createToast(error.response.data.message)
  }
}

/**
 * Password reset OTP check
 */
export const checkResetOTP =
  ({ code, auth }, navigate) =>
  async (dispatch) => {
    try {
      await axios
        .post('/api/v1/user/password-reset-otp-check', {
          code: code,
          auth: auth,
        })
        .then((res) => {
          createToast(res.data.message, 'success')
          navigate('/password-reset')
          Cookies.remove('otp')
        })
        .catch((error) => {
          createToast(error.response.data.message)
        })
    } catch (error) {
      createToast(error.response.data.message)
    }
  }

/**
 * reset password
 */
export const resetPassword = (data, navigate) => {
  try {
    axios
      .post('/api/v1/user/change-password', {
        id: data.id,
        code: data.code,
        password: data.password,
      })
      .then((res) => {
        createToast(res.data.message, 'success')
        navigate('/login')
      })
      .catch((error) => {
        createToast(error.response.data.message)
      })
  } catch (error) {
    createToast(error.response.data.message)
  }
}

/**
 * user login
 */
export const userLogin = (data, navigate) => async (dispatch) => {
  try {
    dispatch({
      type: LOGIN_REQUEST,
    })

    await axios
      .post('/api/v1/user/login', {
        auth: data.auth,
        password: data.password,
      })
      .then((res) => {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: res.data.user,
        })
        dispatch({
          type: LOADER_START,
        })
        createToast(res.data.message)
        navigate('/')
      })
      .catch((error) => {
        dispatch({
          type: LOGIN_FAILED,
        })
        createToast(error.response.data.message)
      })
  } catch (error) {
    dispatch({
      type: LOGIN_FAILED,
    })
    createToast(error.response.data.message)
  }
}

/**
 * Logged in user check by token
 */
export const tokenUser = (token) => async (dispatch) => {
  try {
    dispatch({
      type: TOKEN_USER_REQ,
    })
    await axios
      .get('/api/v1/user/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        dispatch({
          type: TOKEN_USER_SUCCESS,
          payload: res.data.user,
        })
        dispatch({
          type: LOADER_START,
        })
      })
      .catch((error) => {
        dispatch(userLogout())
        dispatch({
          type: TOKEN_USER_FAILED,
        })
        createToast(error.response.data.message)
      })
  } catch (error) {
    dispatch(userLogout())
    dispatch({
      type: TOKEN_USER_FAILED,
    })
    createToast(error.response.data.message)
  }
}

/**
 * User logout
 */
export const userLogout = () => (dispatch) => {
  dispatch({
    type: LOADER_START,
  })
  Cookies.remove('authToken')
  dispatch({
    type: USER_LOGOUT,
  })
}

/**
 * edit and update user
 */
export const updateUserInfo =
  (
    data,
    id,
    setCatShow,
    setJobShow,
    setEduShow,
    setUniShow,
    setCityShow,
    setTownShow
  ) =>
  async (dispatch) => {
    try {
      await axios
        .put(`/api/v1/user/update-user/${id}`, data)
        .then((res) => {
          dispatch({
            type: USER_UPDATE,
            payload: res.data.user,
          })
          setCatShow(false)
          setJobShow(false)
          setEduShow(false)
          setUniShow(false)
          setCityShow(false)
          setTownShow(false)
        })
        .catch((error) => {
          createToast(error.responseli)
        })
    } catch (error) {
      console.log(error.response)
    }
  }

/**
 * User profile photo update
 */
export const userProfilePhoto =
  (data, id, setProfilePhoto, setImage) => async (dispatch) => {
    try {
      await axios
        .put(`/api/v1/user/update-user/${id}`, data)
        .then((res) => {
          dispatch({
            type: USER_PROFILE_PHOTO_UPDATE,
            payload: res.data.filename,
          })
          setImage(null)
          setProfilePhoto(false)
        })
        .catch((error) => {
          createToast(error.responseli)
        })
    } catch (error) {
      console.log(error.response)
    }
  }
