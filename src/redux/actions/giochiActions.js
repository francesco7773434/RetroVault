export const fetchGiochi = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: "FETCH_GIOCHI_REQUEST" });

      const response = await fetch("http://localhost:8082/giochi/all?page=0&size=30&sort=titolo");
      if (!response.ok) throw new Error("Errore nel caricamento");

      const data = await response.json();
      console.log(data);
      dispatch({ type: "FETCH_GIOCHI_SUCCESS", payload: data.content });
    } catch (error) {
      dispatch({ type: "FETCH_GIOCHI_FAILURE", payload: error.message });
    }
  };
};

export const fetchGiocoById = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "FETCH_GIOCO_REQUEST" });

      const response = await fetch(`http://localhost:8082/giochi/${id}`);
      if (!response.ok) throw new Error("Errore nel caricamento");

      const data = await response.json();
      console.log(data);
      dispatch({ type: "FETCH_GIOCO_SUCCESS", payload: data });
    } catch (error) {
      dispatch({ type: "FETCH_GIOCO_FAILURE", payload: error.message });
    }
  };
};
export const creaGioco = (gioco) => async (dispatch) => {
  try {
    const res = await fetch("http://localhost:8082/giochi", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(gioco),
    });
    if (!res.ok) throw new Error("Errore creazione gioco");
    dispatch(fetchGiochi());
  } catch (error) {
    alert(error.message);
  }
};

export const modificaGioco = (id, gioco) => async (dispatch) => {
  try {
    const res = await fetch(`http://localhost:8082/giochi/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(gioco),
    });
    if (!res.ok) throw new Error("Errore modifica gioco");
    dispatch(fetchGiochi());
  } catch (error) {
    alert(error.message);
  }
};

export const eliminaGioco = (id) => async (dispatch) => {
  try {
    const res = await fetch(`http://localhost:8082/giochi/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (!res.ok) throw new Error("Errore eliminazione gioco");
    dispatch(fetchGiochi());
  } catch (error) {
    alert(error.message);
  }
};

export const fetchRecensioniByGiocoId = (giocoId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "FETCH_RECENSIONI_REQUEST" });

      const response = await fetch(`http://localhost:8082/recensioni/giochi/${giocoId}/recensioni?page=0&size=10`);
      if (!response.ok) throw new Error("Errore nel caricamento");

      const data = await response.json();
      console.log(data);
      dispatch({ type: "FETCH_RECENSIONI_SUCCESS", payload: data.content });
    } catch (error) {
      dispatch({ type: "FETCH_RECENSIONI_FAILURE", payload: error.message });
    }
  };
};

export const creaRecensione = (giocoId, recensione) => {
  return async (dispatch) => {
    dispatch({ type: "CREA_RECENSIONE_REQUEST" });

    try {
      const response = await fetch(`http://localhost:8082/recensioni`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(recensione),
      });

      if (!response.ok) {
        throw new Error("Errore nella creazione della recensione");
      }

      const data = await response.json();
      console.log(data);

      dispatch({ type: "CREA_RECENSIONE_SUCCESS", payload: data });
      dispatch(fetchRecensioniByGiocoId(giocoId));
    } catch (error) {
      dispatch({ type: "CREA_RECENSIONE_FAILURE", payload: error.message });
    }
  };
};

export const aggiornaRecensione = (recensioneId, updateData) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: "UPDATE_RECENSIONE_REQUEST" });
      const token = getState().auth.token || localStorage.getItem("token");
      const response = await fetch(`http://localhost:8082/recensioni/${recensioneId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updateData),
      });

      if (!response.ok) {
        throw new Error("Errore nell'aggiornamento della recensione");
      }

      const updateRecensione = await response.json();
      console.log(updateRecensione);

      dispatch({ type: "UPDATE_RECENSIONE_SUCCESS", payload: updateRecensione });
      dispatch(fetchTutteLeRecensioni());
    } catch (error) {
      dispatch({ type: "UPDATE_RECENSIONE_FAILURE", payload: error.message });
    }
  };
};

export const loginUser = (credentials) => async (dispatch) => {
  try {
    dispatch({ type: "AUTH_REQUEST" });
    const response = await fetch("http://localhost:8082/utenti/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
    if (!response.ok) {
      throw new Error("Errore nella registrazione");
    }
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Errore durante il login");
    }
    if (data.user) {
      localStorage.setItem("user", JSON.stringify(data.user));
    }
    if (data.token) {
      localStorage.setItem("token", data.token);
    }
    console.log(data);
    dispatch({
      type: "AUTH_SUCCESS",
      payload: {
        user: data.user,
        token: data.token,
      },
    });
  } catch (error) {
    dispatch({ type: "AUTH_FAILURE", payload: error.message });
  }
};

export const registerUser = (userData) => async (dispatch) => {
  try {
    dispatch({ type: "AUTH_REQUEST" });
    console.log("Registrazione in corso con dati:", userData);
    const response = await fetch("http://localhost:8082/utenti/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Errore back-end:", errorText);
      throw new Error(errorText || "Errore nella registrazione");
    }

    const message = await response.text();
    console.log("Risposta dal backend:", message);

    dispatch({ type: "REGISTER_SUCCESS", payload: message });
  } catch (error) {
    console.error("Errore durante la registrazione:", error.message);
    dispatch({ type: "AUTH_FAILURE", payload: error.message });
  }
};

export const logoutUser = () => {
  return (dispatch) => {
    localStorage.removeItem("token");
    dispatch({ type: "LOGOUT" });
  };
};

export const fetchTutteLeRecensioni = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: "FETCH_ALL_RECENSIONI_REQUEST" });

      const response = await fetch("http://localhost:8082/recensioni/recensioni?page=0&size=10");
      if (!response.ok) throw new Error("Errore nel caricamento delle recensioni");

      const data = await response.json();
      console.log(data);
      dispatch({ type: "FETCH_ALL_RECENSIONI_SUCCESS", payload: data.content });
    } catch (error) {
      dispatch({ type: "FETCH_ALL_RECENSIONI_FAILURE", payload: error.message });
    }
  };
};

export const deleteRecensione = (recensioneId) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: "RECENSIONE_DELETE_REQUEST" });
      const { auth } = getState();
      const token = auth?.user?.token;

      const response = await fetch(`http://localhost:8082/recensioni/${recensioneId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Errore nella cancellazione della recensione");
      }

      dispatch({ type: "RECENSIONE_DELETE_SUCCESS", payload: recensioneId });
    } catch (error) {
      dispatch({ type: "RECENSIONE_DELETE_FAILURE", payload: error.message });
    }
  };
};

export const fetchUserProfile = () => async (dispatch) => {
  dispatch({ type: "FETCH_USER_PROFILE_REQUEST" });

  try {
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:8082/utenti/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) throw new Error("Errore nel recupero utente");
    const data = await response.json();
    console.log(data);
    dispatch({ type: "FETCH_USER_PROFILE_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "FETCH_USER_PROFILE_FAILURE", payload: error.message });
  }
};

const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8082";

export const updateUserProfile = (data) => async (dispatch, getState) => {
  try {
    dispatch({ type: "AUTH_REQUEST" });

    const state = getState();
    const token = state.auth.token || localStorage.getItem("token");

    const user = state.auth.user;

    console.log("Token:", token);
    console.log("User ID:", user?.id);
    console.log("Dati da aggiornare:", data);

    const res = await fetch(`${BASE_URL}/utenti/${user.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(errorText || "Errore nella richiesta");
    }

    const contentType = res.headers.get("content-type");
    let result = {};
    if (contentType && contentType.includes("application/json")) {
      result = await res.json();
    }

    dispatch({
      type: "UPDATE_USER_SUCCESS",
      payload: result,
    });
  } catch (error) {
    dispatch({
      type: "AUTH_FAILURE",
      payload: error.message,
    });
  }
};

export const resetUserUpdateSuccess = () => ({
  type: "RESET_USER_UPDATE_SUCCESS",
});

export const fetchRecensioniByUser = (userId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "FETCH_RECENSIONI_UTENTE_REQUEST" });

      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:8082/recensioni/utente/${userId}/recensioni?page=0&size=10`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Errore nel caricamento delle recensioni");

      const data = await response.json();
      console.log(data);

      dispatch({ type: "FETCH_RECENSIONI_UTENTE_SUCCESS", payload: data.content });
    } catch (error) {
      dispatch({ type: "FETCH_RECENSIONI_UTENTE_FAILURE", payload: error.message });
    }
  };
};

export const loadUserFromLocalStorage = () => (dispatch) => {
  const userJSON = localStorage.getItem("user");
  try {
    const user = userJSON ? JSON.parse(userJSON) : null;
    dispatch({ type: "LOAD_USER", payload: user });
  } catch (e) {
    console.error("Errore nel parsing user da localStorage:", e);
    localStorage.removeItem("user");
    dispatch({ type: "LOAD_USER", payload: null });
  }
};

export const fetchUtenti = () => async (dispatch, getState) => {
  dispatch({ type: "FETCH_UTENTI_REQUEST" });
  try {
    const token = getState().auth.token || localStorage.getItem("token");
    const response = await fetch("http://localhost:8082/utenti", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) throw new Error("Errore nel caricamento degli utenti");
    const data = await response.json();
    console.log(data);
    dispatch({ type: "FETCH_UTENTI_SUCCESS", payload: data.content || data });
  } catch (error) {
    dispatch({ type: "FETCH_UTENTI_FAILURE", payload: error.message });
  }
};

export const eliminaUtente = (id) => async (dispatch, getState) => {
  dispatch({ type: "DELETE_UTENTE_REQUEST" });
  try {
    const token = getState().auth.token || localStorage.getItem("token");
    const response = await fetch(`http://localhost:8082/utenti/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) throw new Error("Errore nell'eliminazione dell'utente");
    const data = await response.json();
    console.log(data);
    dispatch({ type: "DELETE_UTENTE_SUCCESS", payload: id });
  } catch (error) {
    dispatch({ type: "DELETE_UTENTE_FAILURE", payload: error.message });
  }
};
