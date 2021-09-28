import { createReducer } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
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
  setStatusAction,
} from "../actions/todo";

import { STATUS_ACTION } from "../../constant";

const initialState = {
  data: {},
  statusActionDefault: { status: STATUS_ACTION.idle, error: null }, // {status: STATUS_ACTION, error: null}
  statusAction: {}, // {[id]: {status: STATUS_ACTION, error: null}}
};

export const todoReducer = createReducer(initialState, {
  //Fetch
  [fetchTodo]: (state) => {
    state.statusActionDefault.status = STATUS_ACTION.loading;
  },
  [fetchTodoSuccess]: (state, action) => {
    state.data = action.payload;
    state.statusActionDefault.status = STATUS_ACTION.idle;
  },
  [fetchTodoFail]: (state, action) => {
    state.statusActionDefault.status = STATUS_ACTION.fail;
    state.statusActionDefault.error = action.payload;
  },

  //Create
  [createTodo]: (state) => {
    state.statusActionDefault.status = STATUS_ACTION.loading;
  },
  [createTodoSuccess]: (state, action) => {
    state.data.ids.push(action.payload?.id);
    state.data.entity[action.payload?.id] = action.payload;
    state.statusActionDefault.status = STATUS_ACTION.idle;
  },
  [createTodoFail]: (state, action) => {
    state.statusActionDefault.status = STATUS_ACTION.fail;
    state.statusActionDefault.error = action.payload;
  },

  //Edit
  [editTodo]: (state, action) => {
    state.statusAction[action.payload.id] = { status: STATUS_ACTION.loading };
  },
  [editTodoSuccess]: (state, action) => {
    const { id, data } = action.payload ?? {};
    state.statusAction[id] = { status: STATUS_ACTION.success };
    state.data.entity[id] = data;
  },
  [editTodoFail]: (state, action) => {
    state.statusAction[action.payload.id] = {
      status: STATUS_ACTION.fail,
      error: action.payload.error,
    };
  },

  //Remove
  [removeTodo]: (state, action) => {
    state.statusAction[action.payload.id] = { status: STATUS_ACTION.loading };
  },
  [removeTodoSuccess]: (state, action) => {
    const { id } = action.payload ?? {};
    delete state.data.entity[id];
    state.data.ids = state.data.ids.filter((_id) => _id !== id);
    state.statusAction[id] = { status: STATUS_ACTION.success };
  },
  [removeTodoFail]: (state, action) => {
    state.statusAction[action.payload.id] = {
      status: STATUS_ACTION.fail,
      error: action.payload.error,
    };
  },

  [setStatusAction]: (state, action) => {
    state.statusAction[action.payload.id] = action.payload;
  },
});

export default todoReducer;
