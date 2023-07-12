import { configureStore } from "@reduxjs/toolkit";
import { CryptoApi } from "../api/CryptoApi";
import { CryptoNewsApi } from "../api/CryptoNewsApi";

export default configureStore({
  reducer: {
    [CryptoApi.reducerPath]: CryptoApi.reducer,
    [CryptoNewsApi.reducerPath]: CryptoNewsApi.reducer,
  },
});
