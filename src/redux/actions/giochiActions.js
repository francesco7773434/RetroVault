export const fetchGiochi = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: "FETCH_GIOCHI_REQUEST" });

      const response = await fetch("http://localhost:8082/giochi/all?page=0&size=10&sort=titolo");
      if (!response.ok) throw new Error("Errore nel caricamento");

      const data = await response.json();
      console.log(data);
      dispatch({ type: "FETCH_GIOCHI_SUCCESS", payload: data.content });
    } catch (error) {
      dispatch({ type: "FETCH_GIOCHI_FAILURE", payload: error.message });
    }
  };
};
