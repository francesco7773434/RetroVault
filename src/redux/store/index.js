import { combineReducers, configureStore } from "@reduxjs/toolkit";
import giochiReducer from "../reducers/giochiReducer";
import recensioniReducer from "../reducers/recensioniReducer";
import authReducer from "../reducers/authReducer";

const rootReducer = combineReducers({
  giochi: giochiReducer,
  recensioni: recensioniReducer,
  auth: authReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
