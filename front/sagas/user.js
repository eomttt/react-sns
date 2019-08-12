import { all, fork, takeEvery, call, put, delay } from 'redux-saga/effects';

import axios from 'axios';
import * as actions from '../reducers/user';

function loginApi() {
  return axios.post('/login');
}

function* login({ payload }) {
  try {
    const { loginData } = payload;
    console.log('Login data', loginData);
    // yield call(loginApi);
    yield delay(2000);
    yield put({
      type: actions.LOG_IN_SUCCESS,
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
  return axios.post('/logout');
}

function* logout() {
  try {
    // yield call(logoutApi);
    yield delay(2000);
    yield put({
      type: actions.LOG_OUT_SUCCESS,
    });
  } catch (error) {
    console.error('Logout error. ', error);
    yield put({
      type: actions.LOG_OUT_FAILURE,
      payload: {
        error,
      },
    });
  }
}

function signUpApi() {
  return axios.post('/signup');
}

function* signUp({ payload }) {
  try {
    const { signUpData } = payload;
    console.log('Sign up data', signUpData);
    // yield call(signUpApi);
    yield delay(2000);
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

function* watchSignUp() {
  yield takeEvery(actions.SIGN_UP_REQUEST, signUp);
}

export default function* userSaga() {
  yield all([
    fork(watchLogin),
    fork(watchSignUp),
  ]);
}
