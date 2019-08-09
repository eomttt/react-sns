import { all, fork, put, delay, takeLatest } from 'redux-saga/effects';

import axios from 'axios';
import * as actions from '../reducers/post';

function addPostApi() {
  return axios.post('/postcard');
}

function* addPost() {
  try {
    // yield call(addPostApi);
    yield delay(2000);
    yield put({
      type: actions.ADD_POST_SUCCESS,
    });
  } catch (error) {
    console.error('Add post error. ', error);
    yield put({
      type: actions.ADD_POST_FAILURE,
      payload: {
        error,
      },
    });
  }
}

function* watchAddPost() {
  yield takeLatest(actions.ADD_POST_REQUEST, addPost);
}

export default function* postSaga() {
  yield all([
    fork(watchAddPost),
  ]);
}
