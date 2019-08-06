const mockUser = {
  nickname: 'MockUserRedux',
  Post: [],
  Followings: [],
  Followers: [],
};

export const initialState = {
  isLoggedIn: false,
  user: null,
  signUpData: {},
  loginData: {},
};

// Action types
const SIGN_UP = 'SIGN_UP';
const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
const LOG_IN = 'LOG_IN';
const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
const LOG_IN_FAILURE = 'LOG_IN_FAILURE';
const LOG_OUT = 'LOG_OUT';

// Actions creators
export const signUpAction = (data) => {
  return {
    type: SIGN_UP,
    payload: {
      signUpData: data
    }
  }
};

export const loginAction = (data) => {
  return {
    type: LOG_IN,
    payload: {
      loginData: data
    }
  };
};

export const logoutAction = () => {
  return {
    type: LOG_OUT
  }
};

// reducers
export default (state = initialState, action) => {
  const {type, payload} = action;

  switch(type) {
    case SIGN_UP: {
      return {
        ...state,
        signUpData: payload.signUpData,
      };
    }
    case SIGN_UP_SUCCESS:
      return state;
    case LOG_IN:
      return {
        ...state,
        isLoggedIn: true,
        user: mockUser,
        loginData: payload.loginData
      }
    case LOG_IN_SUCCESS:
      return state;
    case LOG_IN_FAILURE:
      return state;
    case LOG_OUT:
      return {
        ...state,
        isLoggedIn: false,
        user: {}
      }
    default:
      return state;
  }
};
