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

function addCommentApi({ userId, postId, text }) {
  return axios.post(`/post/${postId}/comment`, { content: text, userId }, {
    withCredentials: true,
  });
}

function* addComment({ payload }) {
  try {
    const { addCommentData } = payload;
    console.log('Add comment data.', addCommentData);
    const { data } = yield call(addCommentApi, addCommentData);
    yield put({
      type: actions.ADD_COMMENT_SUCCESS,
      payload: {
        data,
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

function loadCommentsApi(postId) {
  console.log(postId);
  return axios.get(`/post/${postId}/comments`);
}

function* loadComments({ payload }) {
  try {
    const { postId } = payload;
    console.log('Load comments data.', postId);
    const { data } = yield call(loadCommentsApi, postId);
    yield put({
      type: actions.LOAD_COMMENTS_SUCCESS,
      payload: {
        data,
        postId,
      },
    });
  } catch (error) {
    console.error('Load comments error. ', error);
    yield put({
      type: actions.LOAD_COMMENTS_FAILURE,
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

function uploadImageApi(imageData) {
  return axios.post('/post/images', imageData);
}

function* uploadImage({ payload }) {
  try {
    const { imageData } = payload;
    const { data } = yield call(uploadImageApi, imageData);
    console.log(data);
    yield put({
      type: actions.UPLOAD_IMAGES_SUCCESS,
      payload: {
        data,
      },
    });
  } catch (error) {
    console.error('Upload image error. ', error);
    yield put({
      type: actions.UPLOAD_IMAGES_FAILURE,
      error,
    });
  }
}

function likePostApi(postId) {
  return axios.post(`/post/${postId}/like`, {}, {
    withCredentials: true,
  });
}

function* likePost({ payload }) {
  try {
    const { postId } = payload;
    const { data } = yield call(likePostApi, postId);
    yield put({
      type: actions.LIKE_POST_SUCCESS,
      payload: {
        data,
      },
    });
  } catch (error) {
    console.error('Like post error. ', error);
    yield put({
      type: actions.LIKE_POST_FAILURE,
      error,
    });
  }
}

function unlikePostAPI(postId) {
  return axios.delete(`/post/${postId}/unlike`, {
    withCredentials: true,
  });
}

function* unLikePost({ payload }) {
  try {
    const { postId } = payload;
    const { data } = yield call(unlikePostAPI, postId);
    console.log(data);
    yield put({
      type: actions.UNLIKE_POST_SUCCESS,
      payload: {
        data,
      },
    });
  } catch (error) {
    console.error('Unlike post error. ', error);
    yield put({
      type: actions.UNLIKE_POST_FAILURE,
      error,
    });
  }
}

function* watchLikePost() {
  yield takeLatest(actions.LIKE_POST_REQUEST, likePost);
  yield takeLatest(actions.UNLIKE_POST_REQUEST, unLikePost);
}

function* watchLoadMainPosts() {
  yield takeLatest(actions.LOAD_MAIN_POSTS_REQUEST, loadMainPosts);
  yield takeLatest(actions.LOAD_HASHTAG_POSTS_REQUEST, loadHashTagPosts);
  yield takeLatest(actions.LOAD_USER_POSTS_REQUEST, loadUserPosts);
}

function* watchAddPost() {
  yield takeLatest(actions.ADD_POST_REQUEST, addPost);
}

function* watchUploadImages() {
  yield takeLatest(actions.UPLOAD_IMAGES_REQUEST, uploadImage);
}

function* watchAddComment() {
  yield takeLatest(actions.ADD_COMMENT_REQUEST, addComment);
  yield takeLatest(actions.LOAD_COMMENTS_REQUEST, loadComments);
}

export default function* postSaga() {
  yield all([
    fork(watchAddPost),
    fork(watchUploadImages),
    fork(watchLoadMainPosts),
    fork(watchAddComment),
    fork(watchLikePost),
  ]);
}
