import {
  call,
  put,
  delay,
  select,
  cancel,
  fork,
  take,
} from "redux-saga/effects";

import { syncNetworkStatus } from "../actions/network";
import { changeStatusTask, removeTask } from "../actions/tasks";
import { selectorTasksReady } from "../reducers/tasks";

import { STATUS_TASK } from "../../constant";

function* submittingTaskSaga(idTask) {
  yield put(
    changeStatusTask({ id: idTask, status: STATUS_TASK.submitting.key })
  );
  // We only have an API to submit the task to the backend, we will mock it by yield delay(2000) and random 50-50 submit successfully for failed
  yield delay(2000);
  const status =
    Math.floor(Math.random() * 2) === 1 // random 0 <-> 1
      ? STATUS_TASK.success.key
      : STATUS_TASK.error.key;

  yield put(changeStatusTask({ id: idTask, status }));
}

function* runTaskSubmittingAuto() {
  // Can get all the changes of tasks from all sources affecting to tasks data.
  while (true) {
    yield delay(700);
    const { ids } = yield select(selectorTasksReady);
    // "Ready" means "I finalized the task and want to move it to Submit Queue"
    if (ids?.length) {
      for (let i = 0, length = ids.length; i < length; i++) {
        // When Submit Queue submit task one by one in Online mode, the status change to Submitting automatically
        yield call(submittingTaskSaga, ids[i]); // one by one, block with call
      }
    }
  }
}

function* networkCheckAutoSubmitting() {
  let taskRunSubmittingAuto;
  while (true) {
    const { payload: networkConnected } = yield take(syncNetworkStatus.type);
    console.log("networkConnected", networkConnected);
    if (networkConnected && !taskRunSubmittingAuto) {
      // That's meaning in the online network, every ready task will be submitted by Submit Queue automatically, otherwise ready tasks should still be Ready until network status become Online
      taskRunSubmittingAuto = yield fork(runTaskSubmittingAuto);
    } else {
      // Submit Queue only working when the network status is Online, otherwise the Submit Queue should be pending until network status become Online
      yield cancel(taskRunSubmittingAuto);
      taskRunSubmittingAuto = undefined;
    }
  }
}

function* tasksSaga() {
  yield fork(networkCheckAutoSubmitting);
}

export default tasksSaga;
