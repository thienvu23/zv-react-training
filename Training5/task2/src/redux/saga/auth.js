import { call, put, takeLatest } from "redux-saga/effects";
import { login, loginFail, loginSuccess } from "../actions/auth";
import axios from "axios";

const $axios = axios.create({
  baseURL: "http://localhost:9000/",
});

const getErrorMessage = (e) =>
  e?.response ? e.response?.data?.message : e.message ?? "Unknown error";

function* loginSaga(action) {
  try {
    const response = yield call(() => $axios.post("login", action.payload));
    yield put(loginSuccess(response.data));
  } catch (e) {
    yield put(loginFail(getErrorMessage(e)));
  }
}

function* todoSaga() {
  yield takeLatest(login.toString(), loginSaga);
}

export default todoSaga;
