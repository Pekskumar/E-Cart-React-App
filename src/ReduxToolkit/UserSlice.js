import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userdata: localStorage.getItem("userdataslice")
    ? JSON.parse(localStorage.getItem("userdataslice"))
    : "",
};

const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userdataslice: (state, action) => {
      state.userdata = action.payload;
      localStorage.setItem("userdataslice", JSON.stringify(action.payload));
    },
  },
});

export const { userdataslice } = UserSlice.actions;
export default UserSlice.reducer;
