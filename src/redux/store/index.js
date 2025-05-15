import { combineReducers, configureStore } from "@reduxjs/toolkit";
import giochiReducer from "../reducers/giochiReducer";
import recensioniReducer from "../reducers/recensioniReducer";

const rootReducer = combineReducers({
  giochi: giochiReducer,
  recensioni: recensioniReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
