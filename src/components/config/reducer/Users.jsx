const initialState = {
  data: {
    name: "",
    email: "",
    password: "",
  },
  usrId: [],
};

export const usersReducers = (state = initialState, action) => {
  if (action.type === "USER_LOGIN_PENDING") {
    return {
      ...state,
      isLoading: true,
    };
  } else if (action.type === "REGISTER_SUCCESS") {
    return {
      ...state,
      data: action.payload,
    };
  } else if (action.type === "LOGIN_SUCCESS") {
    return {
      ...state,
      data: action.payload,
    };
  } else if (action.type === "GET_USER_BY_ID") {
    return {
      usrId: action.payload,
    };
  } else {
    return state;
  }
};