const initialState = {
  loading: false,
  error: null,
  giochi: [],
};

const giochiReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_GIOCHI_REQUEST":
      return { ...state, loading: true, error: null };
    case "FETCH_GIOCHI_SUCCESS":
      return { ...state, loading: false, giochi: action.payload };
    case "FETCH_GIOCHI_FAILURE":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default giochiReducer;
