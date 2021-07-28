import { createStore } from "react-redux";
import { createSlice, configureStore } from "@reduxjs/toolkit";

const initialAuthenticationState = {
  isLoggedIn: false,
  token: "",
  user: {
    id: "",
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
      state.user.id = "";
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
      state.user.id = action.payload.user._id;
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

    updateUser(state, action) {
      state.user.firstName = action.payload.firstName;
      state.user.lastName = action.payload.lastName;
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
