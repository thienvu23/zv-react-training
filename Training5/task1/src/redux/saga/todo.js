import { call, put, takeLatest } from "redux-saga/effects";
import {
  createTodo,
  createTodoSuccess,
  createTodoFail,
  fetchTodo,
  fetchTodoFail,
  fetchTodoSuccess,
  editTodo,
  editTodoFail,
  editTodoSuccess,
  removeTodo,
  removeTodoSuccess,
  removeTodoFail,
} from "../actions/todo";
import axios from "axios";

const $axios = axios.create({
  baseURL: "http://localhost:9000/",
});

const getErrorMessage = (e) =>
  e?.response ? e.response?.data?.message : e.message ?? "Unknown error";

function* fetchTodoSaga() {
  try {
    const response = yield call(() => $axios.get("todos"));

    const data = response.data.reduce(
      (finalData, currentData) => {
        finalData.entity[currentData.id] = currentData;
        finalData.ids.push(currentData.id);
        return finalData;
      },
      { entity: {}, ids: [] }
    );

    yield put(fetchTodoSuccess(data));
  } catch (e) {
    yield put(fetchTodoFail(getErrorMessage(e)));
  }
}

function* createTodoSaga(action) {
  try {
    yield call(() => $axios.post("todos", action.payload));
    yield put(createTodoSuccess());
  } catch (e) {
    yield put(createTodoFail(getErrorMessage(e)));
  }
}

function* editTodoSaga(action) {
  try {
    yield call(() => $axios.put("todos/" + action.payload?.id, action.payload));
    yield put(editTodoSuccess());
  } catch (e) {
    yield put(editTodoFail(getErrorMessage(e)));
  }
}

function* removeTodoSaga(action) {
  try {
    yield call(() => $axios.delete("todos/" + action.payload?.id));
    yield put(removeTodoSuccess());
  } catch (e) {
    yield put(removeTodoFail(getErrorMessage(e)));
  }
}

function* todoSaga() {
  yield takeLatest(fetchTodo.toString(), fetchTodoSaga);
  yield takeLatest(createTodo.toString(), createTodoSaga);
  yield takeLatest(editTodo.toString(), editTodoSaga);
  yield takeLatest(removeTodo.toString(), removeTodoSaga);
}

export default todoSaga;
