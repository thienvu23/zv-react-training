import { call, put, takeLatest, delay } from "redux-saga/effects";
import {
  login,
  loginFail,
  loginSuccess,
  getProfile,
  getProfileFail,
  getProfileSuccess,
  getUsers,
  getUsersSuccess,
} from "../actions/auth";
import { $axios } from "../../utils/axios";
import { toast } from "react-toastify";

const getErrorMessage = (e) => {
  if (e?.response?.status == 401) {
    return "Login session expired";
  }
  const { data } = e?.response ?? {};

  const error = data
    ? typeof data?.error == "string"
      ? data?.error
      : data?.error?.message
    : e?.message ?? "Unknown error";

  return error ?? "Unknown error";
};

function* loginSaga(action) {
  try {
    const response = yield call(() => $axios.post("login", action.payload));
    yield delay(1000);
    yield put(loginSuccess(response.data));
  } catch (e) {
    console.log("e", e?.response);
    toast.error(getErrorMessage(e));
    yield put(loginFail(getErrorMessage(e)));
  }
}

function* getProfileSaga() {
  try {
    const response = yield call(() => $axios.get("api/users/my"));
    yield delay(1000);
    yield put(getProfileSuccess(response.data));
  } catch (e) {
    toast.error("Cannot get profile: " + getErrorMessage(e));
    yield put(getProfileFail(getErrorMessage(e)));
  }
}

function* getUsersSaga(action) {
  const { resolve, reject } = action.payload ?? {};
  try {
    const response = yield call(() => $axios.get("api/users"));

    const data = response.data?.users?.reduce(
      (finalData, currentData) => {
        finalData.entity[currentData.id] = currentData;
        finalData.ids.push(currentData.id);
        return finalData;
      },
      { entity: {}, ids: [] }
    );
    yield delay(1000);
    resolve?.(data);
    yield put(getUsersSuccess(data));
  } catch (e) {
    toast.error("Cannot get users: " + getErrorMessage(e));

    reject?.(getErrorMessage(e));
  }
}

function* todoSaga() {
  yield takeLatest(login.toString(), loginSaga);
  yield takeLatest(getProfile.toString(), getProfileSaga);
  yield takeLatest(getUsers.toString(), getUsersSaga);
}

export default todoSaga;
