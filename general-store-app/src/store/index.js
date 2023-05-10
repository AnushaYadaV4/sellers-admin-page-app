import { configureStore } from "@reduxjs/toolkit";
import generalStoreReducer from "./generalStore-reducer";

const store = configureStore({
  reducer: {generalStoreItems: generalStoreReducer},
});

export default store;