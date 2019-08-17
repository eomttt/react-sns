export const initialState = {
  mainPosts: [], // 화면에 보일 포스트들
  imagePaths: [], // 미리보기 이미지 경로
  addPostErrorReason: '', // 포스트 업로드 실패 사유
  isAddingPost: false, // 포스트 업로드 중
  postAdded: false, // 포스트 업로드 성공
  isAddingComment: false,
  addCommentErrorReason: '',
  commentAdded: false,
};


// Action types
export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

export const LOAD_COMMENTS_REQUEST = 'LOAD_COMMENTS_REQUEST';
export const LOAD_COMMENTS_SUCCESS = 'LOAD_COMMENTS_SUCCESS';
export const LOAD_COMMENTS_FAILURE = 'LOAD_COMMENTS_FAILURE';

export const LOAD_MAIN_POSTS_REQUEST = 'LOAD_MAIN_POSTS_REQUEST';
export const LOAD_MAIN_POSTS_SUCCESS = 'LOAD_MAIN_POSTS_SUCCESS';
export const LOAD_MAIN_POSTS_FAILURE = 'LOAD_MAIN_POSTS_FAILURE';

export const LOAD_HASHTAG_POSTS_REQUEST = 'LOAD_HASHTAG_POSTS_REQUEST';
export const LOAD_HASHTAG_POSTS_SUCCESS = 'LOAD_HASHTAG_POSTS_SUCCESS';
export const LOAD_HASHTAG_POSTS_FAILURE = 'LOAD_HASHTAG_POSTS_FAILURE';

export const LOAD_USER_POSTS_REQUEST = 'LOAD_USER_POSTS_REQUEST';
export const LOAD_USER_POSTS_SUCCESS = 'LOAD_USER_POSTS_SUCCESS';
export const LOAD_USER_POSTS_FAILURE = 'LOAD_USER_POSTS_FAILURE';

export const UPLOAD_IMAGES_REQUEST = 'UPLOAD_IMAGES_REQUEST';
export const UPLOAD_IMAGES_SUCCESS = 'UPLOAD_IMAGES_SUCCESS';
export const UPLOAD_IMAGES_FAILURE = 'UPLOAD_IMAGES_FAILURE';

// Action creators
export const addPostRequest = data => ({
  type: ADD_POST_REQUEST,
  payload: {
    addPostData: data,
  },
});

export const addCommentRequest = data => ({
  type: ADD_COMMENT_REQUEST,
  payload: {
    addCommentData: data,
  },
});

export const loadCommentRequest = data => ({
  type: LOAD_COMMENTS_REQUEST,
  payload: {
    postId: data,
  },
});

export const loadMainPostsRequest = () => ({
  type: LOAD_MAIN_POSTS_REQUEST,
});

export const loadHashTagPostsRequest = data => ({
  type: LOAD_HASHTAG_POSTS_REQUEST,
  payload: {
    tag: data,
  },
});

export const loadUserPostsRequest = data => ({
  type: LOAD_USER_POSTS_REQUEST,
  payload: {
    userId: data,
  },
});

export const uploadImagesRequest = data => ({
  type: UPLOAD_IMAGES_REQUEST,
  payload: {
    imageData: data,
  },
});

// reducers
export default (state = initialState, action) => {
  const { type, payload, error } = action;
  switch (type) {
    case ADD_POST_REQUEST:
      return {
        ...state,
        isAddingPost: true,
        postAdded: false,
        addPostErrorReason: '',
      };
    case ADD_POST_SUCCESS:
      return {
        ...state,
        isAddingPost: false,
        postAdded: true,
        imagePaths: [],
        mainPosts: [payload.data, ...state.mainPosts],
      };
    case ADD_POST_FAILURE:
      return {
        ...state,
        isAddingPost: false,
        addPostErrorReason: error,
      };
    case ADD_COMMENT_REQUEST:
      return {
        ...state,
        isAddingComment: true,
        commentAdded: false,
        addCommentErrorReason: '',
      };
    case ADD_COMMENT_SUCCESS: {
      const postIndex = state.mainPosts.findIndex(v => v._id === payload.data.postId);
      const post = state.mainPosts[postIndex];
      const comments = post.comments ? [payload.data, ...post.comments] : [payload.data];
      const mainPosts = [...state.mainPosts];
      mainPosts[postIndex] = { ...post, comments };

      return {
        ...state,
        isAddingComment: false,
        commentAdded: true,
        mainPosts,
      };
    }

    case ADD_COMMENT_FAILURE:
      return {
        ...state,
        isAddingComment: false,
        addCommentErrorReason: error,
      };
    case LOAD_COMMENTS_REQUEST:
      return {
        ...state,
      };
    case LOAD_COMMENTS_SUCCESS: {
      const postIndex = state.mainPosts.findIndex(v => v._id === payload.postId);
      const post = state.mainPosts[postIndex];
      const mainPosts = [...state.mainPosts];
      mainPosts[postIndex] = { ...post, comments: payload.data };

      return {
        ...state,
        mainPosts,
      };
    }
    case LOAD_COMMENTS_FAILURE:
      return {
        ...state,
      };
    case LOAD_MAIN_POSTS_REQUEST:
      return {
        ...state,
      };
    case LOAD_MAIN_POSTS_SUCCESS:
      return {
        ...state,
        mainPosts: payload.data,
      };
    case LOAD_MAIN_POSTS_FAILURE:
      return {
        ...state,
      };
    case LOAD_HASHTAG_POSTS_REQUEST:
      return {
        ...state,
      };
    case LOAD_HASHTAG_POSTS_SUCCESS:
      return {
        ...state,
        mainPosts: payload.data,
      };
    case LOAD_HASHTAG_POSTS_FAILURE:
      return {
        ...state,
      };
    case LOAD_USER_POSTS_REQUEST:
      return {
        ...state,
      };
    case LOAD_USER_POSTS_SUCCESS:
      return {
        ...state,
        mainPosts: payload.data,
      };
    case LOAD_USER_POSTS_FAILURE:
      return {
        ...state,
      };
    case UPLOAD_IMAGES_REQUEST:
      return {
        ...state,
      };
    case UPLOAD_IMAGES_SUCCESS:
      return {
        ...state,
        imagePaths: [...state.imagePaths, ...payload.data],
      };
    case UPLOAD_IMAGES_FAILURE:
      return {
        ...state,
      };
    default:
      return state;
  }
};
