import { all, call, fork, put, delay, takeLatest } from 'redux-saga/effects';

import axios from 'axios';
import * as actions from '../reducers/post';

function addPostApi(postData) {
  return axios.post('/post', postData, {
    withCredentials: true,
  });
}

function* addPost({ payload }) {
  try {
    const { addPostData } = payload;
    console.log('Add post data. ', addPostData);
    const { data } = yield call(addPostApi, addPostData);
    yield put({
      type: actions.ADD_POST_SUCCESS,
      payload: {
        data,
      },
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

function loadMainPostsAPI() {
  return axios.get('/posts');
}

function* loadMainPosts() {
  try {
    const { data } = yield call(loadMainPostsAPI);
    yield put({
      type: actions.LOAD_MAIN_POSTS_SUCCESS,
      payload: {
        data,
      },
    });
  } catch (error) {
    yield put({
      type: actions.LOAD_MAIN_POSTS_FAILURE,
      error,
    });
  }
}

function loadHashTagPostsApi(tag) {
  return axios.get(`/hashtag/${tag}`); // Get /api/hashtag/:tag
}

function* loadHashTagPosts({ payload }) {
  try {
    const { tag } = payload;
    console.log('Get hashtag posts. ', tag);
    const { data } = yield call(loadHashTagPostsApi, tag);
    yield put({
      type: actions.LOAD_HASHTAG_POSTS_SUCCESS,
      payload: {
        data,
      },
    });
  } catch (error) {
    console.error('Get hashtag posts error. ', error);
    yield put({
      type: actions.LOAD_HASHTAG_POSTS_FAILURE,
      error,
    });
  }
}

function loadUserPostsApi(userId) {
  return axios.get(`/user/${userId}/posts`);
}

function* loadUserPosts({ payload }) {
  try {
    const { userId } = payload;
    console.log('Get loaduser posts. ', userId);
    const { data } = yield call(loadUserPostsApi, userId);
    yield put({
      type: actions.LOAD_USER_POSTS_SUCCESS,
      payload: {
        data,
      },
    });
  } catch (error) {
    console.error('Get loaduser posts error. ', error);
    yield put({
      type: actions.LOAD_USER_POSTS_FAILURE,
      error,
    });
  }
}

function* watchLoadMainPosts() {
  yield takeLatest(actions.LOAD_MAIN_POSTS_REQUEST, loadMainPosts);
  yield takeLatest(actions.LOAD_HASHTAG_POSTS_REQUEST, loadHashTagPosts);
  yield takeLatest(actions.LOAD_USER_POSTS_REQUEST, loadUserPosts);
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
    fork(watchLoadMainPosts),
    fork(watchAddComment),
  ]);
}
