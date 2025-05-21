const initialState = {
  lista: [],
  tutte: [],
  loading: false,
  error: null,
  loadingCreate: false,
  errorCreate: null,
  successCreate: false,

  errorDelete: null,
  successDelete: false,
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
    case "RESET_SUCCESS_CREATE":
      return { ...state, successCreate: false, errorCreate: null };
    case "FETCH_ALL_RECENSIONI_REQUEST":
      return { ...state, loading: true, error: null };

    case "FETCH_ALL_RECENSIONI_SUCCESS":
      return { ...state, loading: false, tutte: action.payload };

    case "FETCH_ALL_RECENSIONI_FAILURE":
      return { ...state, loading: false, error: action.payload };
    case "RECENSIONE_DELETE_REQUEST":
      return { ...state, errorDelete: null, successDelete: false };
    case "RECENSIONE_DELETE_SUCCESS":
      return { ...state, successDelete: true, lista: state.lista.filter((recensione) => recensione.id !== action.payload) };
    case "RECENSIONE_DELETE_FAILURE":
      return { ...state, errorDelete: action.payload };
    case "RESET_SUCCESS_DELETE":
      return { ...state, successDelete: false };
    default:
      return state;
  }
};

export default recensioniReducer;
