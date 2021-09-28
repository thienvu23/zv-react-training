import { call, put, takeLatest, takeEvery, delay } from "redux-saga/effects";
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
import { toast } from "react-toastify";

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
    const res = yield call(() => $axios.post("todos", action.payload));

    yield put(createTodoSuccess(res.data));
  } catch (e) {
    yield put(createTodoFail(getErrorMessage(e)));
  }
}

function* editTodoSaga(action) {
  try {
    yield call(() => $axios.put("todos/" + action.payload?.id, action.payload));

    yield delay(2000); // show loading trick

    yield put(
      editTodoSuccess({ id: action.payload?.id, data: action.payload })
    );
  } catch (e) {
    toast(getErrorMessage(e));
    yield put(
      editTodoFail({ id: action.payload?.id, error: getErrorMessage(e) })
    );
  }
}

function* removeTodoSaga(action) {
  try {
    yield call(() => $axios.delete("todos/" + action.payload?.id));

    yield delay(2000); // show loading trick

    yield put(removeTodoSuccess({ id: action.payload?.id }));
  } catch (e) {
    toast(getErrorMessage(e));
    yield put(
      removeTodoFail({ id: action.payload?.id, error: getErrorMessage(e) })
    );
  }
}

function* todoSaga() {
  yield takeLatest(fetchTodo.toString(), fetchTodoSaga);
  yield takeLatest(createTodo.toString(), createTodoSaga);
  yield takeEvery(editTodo.toString(), editTodoSaga);
  yield takeEvery(removeTodo.toString(), removeTodoSaga);
}

export default todoSaga;
