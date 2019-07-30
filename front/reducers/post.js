export const initialState = {
  mainPosts: [],
};

const ADD_POST = 'ADD_POST'; // Action nam
const ADD_DUMMY = 'ADD_DUMMY';

export const addPost = {
  type: ADD_POST,
};

export const addDummy = {
  type: ADD_DUMMY,
};

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
}


