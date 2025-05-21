const initialState = {
  user: null,
  loading: false,
  error: null,
  token: null,
  successMessage: null,
  updateSuccess: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "AUTH_REQUEST":
      return { ...state, loading: true, error: null, successMessage: null };
    case "FETCH_USER_PROFILE_REQUEST":
    case "UPDATE_USER_PROFILE_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
        successMessage: null,
        updateSuccess: false,
      };
    case "AUTH_SUCCESS":
      return { ...state, loading: false, user: action.payload.user, token: action.payload.token, successMessage: null };
    case "REGISTER_SUCCESS":
      return { ...state, loading: false, successMessage: action.payload };
    case "FETCH_USER_PROFILE_SUCCESS":
    case "UPDATE_USER_PROFILE_SUCCESS":
      return {
        ...state,
        loading: false,
        user: action.payload,
        updateSuccess: true,
        error: null,
      };
    case "AUTH_FAILURE":
      return { ...state, loading: false, error: action.payload, successMessage: null };
    case "FETCH_USER_PROFILE_FAILURE":
    case "UPDATE_USER_PROFILE_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
        updateSuccess: false,
      };
    case "LOGOUT":
      return initialState;
    default:
      return state;
  }
};

export default authReducer;
