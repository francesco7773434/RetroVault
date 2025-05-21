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
    localStorage.setItem("token", data.token);
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
