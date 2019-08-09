export const initialState = {
  mainPosts: [{
    id: 1,
    User: {
      id: 1,
      nickname: '제로초',
    },
    content: '첫 번째 게시글',
    img: 'https://bookthumb-phinf.pstatic.net/cover/137/995/13799585.jpg?udate=20180726',
    Comments: [],
  }], // 화면에 보일 포스트들
  imagePaths: [], // 미리보기 이미지 경로
  addPostErrorReason: '', // 포스트 업로드 실패 사유
  isAddingPost: false, // 포스트 업로드 중
  postAdded: false, // 포스트 업로드 성공
};

const dummyPost = {
  id: 2,
  User: {
    id: 1,
    nickname: '제로초',
  },
  content: '나는 더미입니다.',
  Comments: [],
};


// Action types
export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

// Action creators
export const addPostRequest = () => {
  return {
    type: ADD_POST_REQUEST,
  };
};

// reducers
export default (state = initialState, action) => {
  const { type, payload } = action;
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
        mainPosts: [dummyPost, ...state.mainPosts],
      };
    case ADD_POST_FAILURE:
      return {
        ...state,
        isAddingPost: false,
        addPostErrorReason: payload.error,
      };
    default:
      return state;
  }
};
