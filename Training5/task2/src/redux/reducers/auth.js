import { createReducer } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import {
  login,
  loginFail,
  loginSuccess,
  logout,
  getProfile,
  getProfileFail,
  getProfileSuccess,
  getUsersSuccess,
  setPermissionDeny,
} from "../actions/auth";

const initialState = {
  loading: false,
  token: "",
  userInfo: {},
  users: {},
  permissionDeny: false,
};

export const authReducer = createReducer(initialState, {
  //Login logout
  [login]: (state) => {
    state.loading = true;
  },
  [loginSuccess]: (state, action) => {
    state.loading = false;
    state.token = action.payload.token;
  },
  [loginFail]: (state) => {
    state.loading = false;
  },
  [logout]: (state) => {
    state.token = "";
  },

  //getProfile
  [getProfile]: (state) => {
    state.loading = true;
  },
  [getProfileFail]: (state) => {
    state.loading = false;
  },
  [getProfileSuccess]: (state, action) => {
    state.loading = false;
    state.userInfo = action.payload;
  },

  [getUsersSuccess]: (state, action) => {
    state.users = action.payload;
  },

  [setPermissionDeny]: (state, action) => {
    state.permissionDeny = !!action.payload;
  },
});

export const selectorUserCharName = createSelector(
  (state) => state.auth.userInfo,
  (userInfo) => {
    const splitFullName = userInfo?.fullName?.split(" ");
    if (!splitFullName) return undefined;
    return splitFullName.map((wordName) => wordName[0]).join(" ");
  }
);

export default authReducer;
