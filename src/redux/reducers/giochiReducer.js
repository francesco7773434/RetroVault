const initialState = {
  loading: false,
  error: null,
  giochi: [],
  giocoSingolo: null,
  totalPages: 0,
};

const giochiReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_GIOCHI_REQUEST":
    case "FETCH_GIOCO_REQUEST":
      return { ...state, loading: true, error: null };
    case "FETCH_GIOCHI_SUCCESS":
      return { ...state, loading: false, giochi: action.payload.content, totalPages: action.payload.totalPages };
    case "FETCH_GIOCO_SUCCESS":
      return { ...state, loading: false, giocoSingolo: action.payload };
    case "FETCH_GIOCHI_FAILURE":
    case "FETCH_GIOCO_FAILURE":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default giochiReducer;
