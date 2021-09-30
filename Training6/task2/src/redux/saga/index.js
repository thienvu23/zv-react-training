import { all } from "redux-saga/effects";
import tasksSaga from "./tasks";
import networkSaga from "./network";

export default function* rootSaga() {
  yield all([tasksSaga(), networkSaga()]);
}
