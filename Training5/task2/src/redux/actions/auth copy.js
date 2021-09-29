import { createAction } from "@reduxjs/toolkit";

export const login = createAction("auth/login");
export const loginSuccess = createAction("auth/loginSuccess");
export const loginFail = createAction("auth/loginFail");

export const getProfile = createAction("auth/getProfile");
export const getProfileSuccess = createAction("auth/getProfileSuccess");
export const getProfileFail = createAction("auth/getProfileFail");

export const getUsers = createAction("auth/getUsers");
export const getUsersSuccess = createAction("auth/getUsersSuccess");

export const setPermissionDeny = createAction("auth/setPermissionDeny");

export const logout = createAction("auth/logout");
