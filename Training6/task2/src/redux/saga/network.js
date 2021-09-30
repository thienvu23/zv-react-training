import { take, put, fork } from "redux-saga/effects";
import { eventChannel } from "redux-saga";
import { syncNetworkStatus } from "../actions/network";

function* startChannelNetwork() {
  // Move the network status listener to redux-saga using even channel
  const channelNetwork = eventChannel((listener) => {
    window.addEventListener("offline", function () {
      listener(false);
    });

    window.addEventListener("online", function () {
      listener(true);
    });

    return () => {
      window.removeEventListener("online");
      window.removeEventListener("offline");
    };
  });

  while (true) {
    const connectionInfo = yield take(channelNetwork);
    yield put(syncNetworkStatus(connectionInfo));
  }
}

function* networkSaga() {
  try {
    yield fork(startChannelNetwork);
  } catch (e) {
    console.log("networkSaga error", e);
  }
}

export default networkSaga;
