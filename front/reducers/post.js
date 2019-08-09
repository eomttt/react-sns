export const initialState = {
  imagePaths: [],
  mainPosts: [{
    User: {
      id: 1,
      nickname: 'MockNickName',
    },
    content: 'First card',
    img: 'https://bookthumb-phinf.pstatic.net/cover/137/995/13799585.jpg?udate=20180726',
  }],
};

// Action types
const ADD_POST = 'ADD_POST'; // Action nam
const ADD_DUMMY = 'ADD_DUMMY';

// Action creators
export const addPost = {
  type: ADD_POST,
};

export const addDummy = {
  type: ADD_DUMMY,
};

// reducers
export default (state = initialState, action) => {
  const { type } = action;
  switch (type) {
    case ADD_POST: {
      return {
        ...state,
      };
    }
    case ADD_DUMMY: {
      return {
        ...state,
      };
    }
    default:
      return state;
  }
};
