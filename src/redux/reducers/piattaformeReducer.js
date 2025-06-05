const initialState = {
  piattaforme: [],
  loading: false,
  error: null,
};

const piattaformeReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_PIATTAFORME_REQUEST":
      return { ...state, loading: true, error: null };

    case "FETCH_PIATTAFORME_SUCCESS":
      return { ...state, loading: false, piattaforme: action.payload };

    case "FETCH_PIATTAFORME_FAILURE":
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default piattaformeReducer;
