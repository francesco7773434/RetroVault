const initialState = {
  lista: [],
  loading: false,
  error: null,
  loadingCreate: false,
  errorCreate: null,
  successCreate: false,
};

const recensioniReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_RECENSIONI_REQUEST":
      return { ...state, loading: true, error: null };
    case "FETCH_RECENSIONI_SUCCESS":
      return { ...state, loading: false, lista: action.payload };
    case "FETCH_RECENSIONI_FAILURE":
      return { ...state, loading: false, error: action.payload };

    case "CREA_RECENSIONE_REQUEST":
      return { ...state, loadingCreate: true, errorCreate: null, successCreate: false };
    case "CREA_RECENSIONE_SUCCESS":
      return { ...state, loadingCreate: false, successCreate: true };
    case "CREA_RECENSIONE_FAILURE":
      return { ...state, loadingCreate: false, errorCreate: action.payload };
    default:
      return state;
  }
};

export default recensioniReducer;
