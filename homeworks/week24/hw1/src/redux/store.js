import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userReducer";
import postReducer from "./reducers/postReducer";

export const store = configureStore({
  reducer: {
    user: userReducer,
    post: postReducer,
  },
});
