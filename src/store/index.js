import { createStore } from "react-redux";
import { createSlice, configureStore } from "@reduxjs/toolkit";

const initialAuthenticationState = {
  isLoggedIn: false,
  user: {
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  },
};

const authenticationSlice = createSlice({
  name: "authentication",
  initialState: initialAuthenticationState,
  reducers: {
    logOut(state) {
      state.user.isLoggedIn = false;
      state.user.firstName = "";
      state.user.lastName = "";
      state.user.email = "";
      state.user.mobile = "";
      state.user.addressLine1 = "";
      state.user.addressLine2 = "";
      state.user.city = "";
      state.user.state = "";
      state.user.zipCode = "";
      state.user.country = "";
    },
    logIn(state, action) {
      state.isLoggedIn = true;
      state.user.firstName = action.payload.firstName;
      state.user.lastName = action.payload.lastName;
      state.user.email = action.payload.email;
      state.user.mobile = action.payload.mobile;
      state.user.addressLine1 = action.payload.addressLine1;
      state.user.addressLine2 = action.payload.addressLine2;
      state.user.city = action.payload.city;
      state.user.state = action.payload.state;
      state.user.zipCode = action.payload.zipCode;
      state.user.country = action.payload.country;
    },
  },
});

const store = configureStore({
  reducer: { auth: authenticationSlice.reducer },
});

export const authActions = authenticationSlice.actions;

export default store;
