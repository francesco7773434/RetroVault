const initialState = {
  user: null,
  loading: false,
  error: null,
  token: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "AUTH_REQUEST":
      return { ...state, loading: true, error: null };
    case "AUTH_SUCCESS":
      return { ...state, loading: false, user: action.payload, token: action.token };
    case "AUTH_FAILURE":
      return { ...state, loading: false, error: action.payload };
    case "LOGOUT":
      return initialState;
    default:
      return state;
  }
};

export default authReducer;
