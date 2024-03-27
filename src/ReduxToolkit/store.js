import { configureStore } from "@reduxjs/toolkit";
import CartSlice from "./CartSlice";
import UserSlice from "./UserSlice";

const store = configureStore({
  reducer: {
    cartslicedata: CartSlice,
    userslicedata: UserSlice,
  },
});

export default store;
