import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  CartDataSlice: localStorage.getItem("cartdataslice")
    ? JSON.parse(localStorage.getItem("cartdataslice"))
    : [],
  CartSearchSlice: [],
};

const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    cartdataslice: (state, action) => {
      state.CartDataSlice = [...state.CartDataSlice, action.payload];
      localStorage.setItem(
        "cartdataslice",
        JSON.stringify(state.CartDataSlice)
      );
    },
    increasecartdataslice: (state, action) => {
      let increaseqty = state.CartDataSlice.map((itemi) => {
        if (itemi?.id === action?.payload?.id) {
          itemi.qty++;
        }
        return itemi;
      });
      state.CartDataSlice = increaseqty;
      localStorage.setItem("cartdataslice", JSON.stringify(increaseqty));
    },
    decreasecartdataslice: (state, action) => {
      let decreaseqty = state.CartDataSlice.map((itemd) => {
        if (itemd?.id === action?.payload?.id) {
          itemd.qty--;
        }
        return itemd;
      });
      state.CartDataSlice = decreaseqty;
      localStorage.setItem("cartdataslice", JSON.stringify(decreaseqty));
    },
    removecartdataslice: (state, action) => {
      let removecart = state.CartDataSlice.filter(
        (f) => f?.id !== action?.payload?.id
      );
      state.CartDataSlice = removecart;
      localStorage.setItem("cartdataslice", JSON.stringify(removecart));
    },
    searchcartdataslice: (state, action) => {
      state.CartSearchSlice = action.payload;
    },
    removeallcartdataslice: (state, action) => {
      let removeall = [];
      state.CartDataSlice = removeall;
      localStorage.setItem("cartdataslice", removeall);
    },
  },
});

export const {
  cartdataslice,
  increasecartdataslice,
  decreasecartdataslice,
  removecartdataslice,
  searchcartdataslice,
  removeallcartdataslice,
} = CartSlice.actions;
export default CartSlice.reducer;
