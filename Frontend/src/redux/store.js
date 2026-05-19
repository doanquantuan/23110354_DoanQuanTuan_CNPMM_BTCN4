import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/authSlice";
import profileReducer from "./slices/profileSlice";
import courseReducer from "./slices/courseSlice";
import sectionReducer from "./slices/sectionSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    course: courseReducer,
    section: sectionReducer,
  },
});

export default store;
