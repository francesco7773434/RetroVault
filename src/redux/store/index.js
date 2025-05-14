import { combineReducers, configureStore } from "@reduxjs/toolkit";
import giochiReducer from "../reducers/giochiReducer";

const rootReducer = combineReducers({
  giochi: giochiReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
