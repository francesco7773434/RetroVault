import { combineReducers, configureStore } from "@reduxjs/toolkit";
import giochiReducer from "../reducers/giochiReducer";
import recensioniReducer from "../reducers/recensioniReducer";
import authReducer from "../reducers/authReducer";
import utentiReducer from "../reducers/utentiReducer";

const rootReducer = combineReducers({
  giochi: giochiReducer,
  recensioni: recensioniReducer,
  auth: authReducer,
  utenti: utentiReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
