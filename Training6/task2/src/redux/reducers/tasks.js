import { createReducer } from "@reduxjs/toolkit";

import { createSelector } from "reselect";

import {
  addTask,
  changeStatusTask,
  editTask,
  removeTask,
} from "../actions/tasks";

import { STATUS_TASK } from "../../constant";

const initialState = {
  data: { ids: [], entity: {} },
};

const tasksReducer = createReducer(initialState, {
  [addTask]: (state, action) => {
    const payload = action.payload;
    state.data.entity[payload.id] = payload;
    state.data.ids.push(payload.id);
  },
  [changeStatusTask]: (state, action) => {
    const { id, status } = action.payload;
    if (state.data.entity[id]) {
      state.data.entity[id].status = status;
    }
  },
  [removeTask]: (state, action) => {
    const { id } = action.payload;
    if (state.data.entity[id]) {
      delete state.data.entity[id];
      state.data.ids = state.data.ids.filter((_id) => _id !== id);
    }
  },
  [editTask]: (state, action) => {
    const { id } = action.payload;
    if (state.data.entity[id]) {
      state.data.entity[id] = {
        ...state.data.entity[id],
        ...action.payload,
      };
    }
  },
});

export const selectorTasksReady = createSelector(
  (state) => state.tasks.data,
  ({ entity, ids }) => {
    return {
      ids: ids.filter((id) => {
        const task = entity?.[id];
        return task.status === STATUS_TASK.ready.key;
      }),
      entity,
    };
  }
);

export default tasksReducer;
