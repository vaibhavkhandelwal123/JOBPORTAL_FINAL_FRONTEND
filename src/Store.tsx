import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./Slices/UserSlice";
import profileReducer from "./Slices/ProfileSlice";
import filterReducer from "./Slices/FilterSlice";
import sortReducer from "./Slices/SortSlice";
import jwtReducer from "./Slices/JWTSlice";
export default configureStore({
  reducer: {
    user: UserReducer,
    profile:profileReducer,
    filter:filterReducer,
    sort:sortReducer,
    jwt:jwtReducer,
  },
});
