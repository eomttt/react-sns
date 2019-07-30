export const initialState = {
  isLoggedIn: false,
  user: {},
};

const LOG_IN = 'LOG_IN'; // Action name
const LOG_OUT = 'LOG_OUT';

export const loginAction = {
  type: LOG_IN,
  payload: {
    user: {
      nickname: 'MockNickname'
    }
  }
};

export const logoutAction = {
  type: LOG_OUT
};

export default (state = initialState, action) => {
  const {type, payload} = action;

  switch(type) {
    case LOG_IN:
      return {
        ...state,
        isLoggedIn: true,
        user: payload.user
      }
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
