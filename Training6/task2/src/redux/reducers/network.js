import { createReducer } from "@reduxjs/toolkit";

import { syncNetworkStatus } from "../actions/network";

const initialState = {
  isConnected: false,
};

const tasksReducer = createReducer(initialState, {
  [syncNetworkStatus]: (state, action) => {
    state.isConnected = action.payload;
  },
});

export default tasksReducer;
