import { createReducer } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { login, loginFail, loginSuccess } from "../actions/auth";

const defaultActionStartFun = (state) => {
  state.loading = true;
  state.statusAction = false;
  state.error = null;
};

const defaultActionErrorFun = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

const initialState = {
  loading: false,
  token: "",
};

export const authReducer = createReducer(initialState, {
  //Fetch
  [login]: (state) => {
    state.loading = true;
  },
  [loginSuccess]: (state, action) => {
    state.loading = false;
    state.token = action.payload.token;
  },
  [loginFail]: defaultActionErrorFun,
});

export default authReducer;
