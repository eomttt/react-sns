import { all, call, fork, put, delay, takeLatest } from 'redux-saga/effects';

import axios from 'axios';
import * as actions from '../reducers/post';

function addPostApi() {
  return axios.post('/postcard');
}

function* addPost({ payload }) {
  try {
    const { addPostData } = payload;
    console.log('Add post data. ', addPostData);
    // yield call(addPostApi);
    yield delay(2000);
    yield put({
      type: actions.ADD_POST_SUCCESS,
    });
  } catch (error) {
    console.error('Add post error. ', error);
    yield put({
      type: actions.ADD_POST_FAILURE,
      error,
    });
  }
}

function addCommentApi() {
  return axios.post('/addcomment');
}

function* addComment({ payload }) {
  try {
    const { addCommentData } = payload;
    console.log('Add comment data.', addCommentData);
    // yield call(addCommentApi);
    yield delay(2000);
    yield put({
      type: actions.ADD_COMMENT_SUCCESS,
      payload: {
        postId: addCommentData.postId,
      },
    });
  } catch (error) {
    console.error('Add comment error. ', error);
    yield put({
      type: actions.ADD_COMMENT_FAILURE,
      error,
    });
  }
}

function* watchAddPost() {
  yield takeLatest(actions.ADD_POST_REQUEST, addPost);
}

function* watchAddComment() {
  yield takeLatest(actions.ADD_COMMENT_REQUEST, addComment);
}

export default function* postSaga() {
  yield all([
    fork(watchAddPost),
    fork(watchAddComment)
  ]);
}
