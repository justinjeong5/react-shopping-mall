import { all, fork, put, call, takeLatest } from 'redux-saga/effects'
import axios from 'axios';

import {
  LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE,
  REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS, REGISTER_USER_FAILURE,
  LOGOUT_USER_REQUEST, LOGOUT_USER_SUCCESS, LOGOUT_USER_FAILURE,
  AUTHENTICATE_USER_REQUEST, AUTHENTICATE_USER_SUCCESS, AUTHENTICATE_USER_FAILURE,
  ADD_TO_CART_REQUEST, ADD_TO_CART_SUCCESS, ADD_TO_CART_FAILURE,
} from './types'

function logInAPI(data) {
  return axios.post('/api/user/login', data)
}

function* logIn(action) {
  try {
    const result = yield call(logInAPI, action.payload);
    yield put({
      type: LOGIN_USER_SUCCESS,
      payload: result.data,
    })
  } catch (error) {
    console.error(error)
    yield put({
      type: LOGIN_USER_FAILURE,
      error: error.response.data,
    })
  }
}

function registerAPI(data) {
  return axios.post('/api/user/register', data)
}

function* register(action) {
  try {
    const result = yield call(registerAPI, action.payload);
    yield put({
      type: REGISTER_USER_SUCCESS,
      payload: result.data,
    })
  } catch (error) {
    console.error(error)
    yield put({
      type: REGISTER_USER_FAILURE,
      error: error.response.data,
    })
  }
}

function logoutAPI() {
  return axios.get('/api/user/logout')
}

function* logout() {
  try {
    yield call(logoutAPI);
    yield put({
      type: LOGOUT_USER_SUCCESS,
    })
  } catch (error) {
    console.error(error)
    yield put({
      type: LOGOUT_USER_FAILURE,
      error: error.response.data,
    })
  }
}

function authAPI() {
  return axios.get('/api/user/auth')
}

function* auth() {
  try {
    const result = yield call(authAPI);
    yield put({
      type: AUTHENTICATE_USER_SUCCESS,
      payload: result.data,
    })
  } catch (error) {
    console.error(error)
    yield put({
      type: AUTHENTICATE_USER_FAILURE,
      error: error.response.data,
    })
  }
}

function addToCartAPI(data) {
  return axios.post(`/api/user/addToCart`, data)
}

function* addToCart(action) {
  try {
    const result = yield call(addToCartAPI, action.payload);
    console.log(result, 'result addToCart saga')
    yield put({
      type: ADD_TO_CART_SUCCESS,
      payload: result.data,
    })
  } catch (error) {
    console.error(error)
    yield put({
      type: ADD_TO_CART_FAILURE,
      error: error.response.data,
    })
  }
}

function* watchLogin() {
  yield takeLatest(LOGIN_USER_REQUEST, logIn)
}

function* watchRegister() {
  yield takeLatest(REGISTER_USER_REQUEST, register)
}

function* watchLogout() {
  yield takeLatest(LOGOUT_USER_REQUEST, logout)
}

function* watchAuthUser() {
  yield takeLatest(AUTHENTICATE_USER_REQUEST, auth)
}

function* watchLoadAddToCart() {
  yield takeLatest(ADD_TO_CART_REQUEST, addToCart)
}

export default function* userSaga() {
  yield all([
    fork(watchLogin),
    fork(watchRegister),
    fork(watchLogout),
    fork(watchAuthUser),
    fork(watchLoadAddToCart),
  ])
}