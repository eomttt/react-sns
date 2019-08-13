import { all, fork, takeEvery, call, put, delay } from 'redux-saga/effects';

import axios from 'axios';
import * as actions from '../reducers/user';

function loginApi(loginData) {
  return axios.post('/user/login', loginData, {
    withCredentials: true, // For transition cookie
  });
}

function* login({ payload }) {
  try {
    const { loginData } = payload;
    console.log('Login data', loginData);
    const { data } = yield call(loginApi, loginData);
    yield put({
      type: actions.LOG_IN_SUCCESS,
      payload: {
        data,
      },
    });
  } catch (error) {
    console.error('Login error. ', error);
    yield put({
      type: actions.LOG_IN_FAILURE,
      error,
    });
  }
}

function logoutApi() {
  return axios.post('/user/logout', {}, {
    withCredentials: true,
  });
}

function* logout() {
  try {
    yield call(logoutApi);
    yield put({
      type: actions.LOG_OUT_SUCCESS,
    });
  } catch (error) {
    console.error('Logout error. ', error);
    yield put({
      type: actions.LOG_OUT_FAILURE,
      error,
    });
  }
}

function loadUserApi() {
  return axios.get('/user', {
    withCredentials: true,
  });
}

function* loadUser() {
  try {
    const { data } = yield call(loadUserApi);
    yield put({
      type: actions.LOAD_USER_SUCCESS,
      payload: {
        data,
      },
    });
  } catch (error) {
    console.error('Load user error. ', error);
    yield put({
      type: actions.LOAD_USER_FAILURE,
      error,
    });
  }
}

function signUpApi(signUpData) {
  return axios.post('/user', signUpData);
}

function* signUp({ payload }) {
  try {
    const { signUpData } = payload;
    console.log('Sign up data', signUpData);
    yield call(signUpApi, signUpData);
    yield put({
      type: actions.SIGN_UP_SUCCESS,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: actions.SIGN_UP_FAILURE,
      error,
    });
  }
}

function* watchLogin() {
  yield takeEvery(actions.LOG_IN_REQUEST, login);
  yield takeEvery(actions.LOG_OUT_REQUEST, logout);
}

function* watchLoadUser() {
  yield takeEvery(actions.LOAD_USER_REQUEST, loadUser);
}

function* watchSignUp() {
  yield takeEvery(actions.SIGN_UP_REQUEST, signUp);
}

export default function* userSaga() {
  yield all([
    fork(watchLogin),
    fork(watchLoadUser),
    fork(watchSignUp),
  ]);
}
