import { configureStore } from "@reduxjs/toolkit";
import { formSlice } from "./reducers/formReducer";

const store = configureStore({
  reducer: {
    form: formSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
