const initialState = {
  loading: false,
  error: null,
  lista: [],
  deleteSuccess: false,
  totalPages: 0,
};

const utentiReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_UTENTI_REQUEST":
      return { ...state, loading: true, error: null };
    case "FETCH_UTENTI_SUCCESS":
      return { ...state, loading: false, lista: action.payload.lista, totalPages: action.payload.totalPages };
    case "FETCH_UTENTI_FAILURE":
      return { ...state, loading: false, error: action.payload };
    case "DELETE_UTENTE_REQUEST":
      return { ...state, errorDelete: null, deleteSuccess: false };
    case "DELETE_UTENTE_SUCCESS":
      return { ...state, deleteSuccess: true, lista: state.lista.filter((utente) => utente.id !== action.payload) };
    case "DELETE_UTENTE_FAILURE":
      return { ...state, errorDelete: action.payload, deleteSuccess: false };
    case "RESET_DELETE_UTENTE":
      return { ...state, deleteSuccess: false };
    default:
      return state;
  }
};

export default utentiReducer;
