import { createAction } from "@reduxjs/toolkit";

export const login = createAction("auth/login");
export const loginSuccess = createAction("auth/loginSuccess");
export const loginFail = createAction("auth/loginFail");
