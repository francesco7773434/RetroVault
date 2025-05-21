const initialState = {
  user: null,
  loading: false,
  error: null,
  token: null,
  successMessage: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "AUTH_REQUEST":
      return { ...state, loading: true, error: null, successMessage: null };
    case "AUTH_SUCCESS":
      return { ...state, loading: false, user: action.payload.user, token: action.token, successMessage: null };
    case "REGISTER_SUCCESS":
      return { ...state, loading: false, successMessage: action.payload };
    case "AUTH_FAILURE":
      return { ...state, loading: false, error: action.payload, successMessage: null };
    case "LOGOUT":
      return initialState;
    default:
      return state;
  }
};

export default authReducer;
