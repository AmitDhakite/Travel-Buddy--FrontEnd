import { createStore } from "react-redux";
import { createSlice, configureStore } from "@reduxjs/toolkit";

const initialAuthenticationState = {
  isLoggedIn: false,
  token: "",
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
      state.isLoggedIn = false;
      state.token = "";
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
      state.token = action.payload.token;
      state.user.firstName = action.payload.user.firstName;
      state.user.lastName = action.payload.user.lastName;
      state.user.email = action.payload.user.email;
      state.user.mobile = action.payload.user.mobile;
      state.user.addressLine1 = action.payload.user.addressLine1;
      state.user.addressLine2 = action.payload.user.addressLine2;
      state.user.city = action.payload.user.city;
      state.user.state = action.payload.user.state;
      state.user.zipCode = action.payload.user.zipCode;
      state.user.country = action.payload.user.country;
    },
  },
});

const store = configureStore({
  reducer: { auth: authenticationSlice.reducer },
});

export const authActions = authenticationSlice.actions;

export default store;
