import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authenticatedUserReducer from "./AuthenticatedUserSlice";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(
  persistConfig,
  authenticatedUserReducer
);

const store = configureStore({
  reducer: {
    authenticatedUser: persistedReducer,
  },
});

export const persistor = persistStore(store);
export default store;
