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
} from "../actions/todo";

const defaultActionStartFun = (state) => {
  state.loading = true;
  state.statusAction = false;
  state.error = null;
};

const defaultActionErrorFun = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

const initialState = {
  loading: false,
  data: {},
  statusAction: false,
  error: null,
};

export const todoReducer = createReducer(initialState, {
  //Fetch
  [fetchTodo]: (state) => {
    state.loading = true;
  },
  [fetchTodoSuccess]: (state, action) => {
    state.loading = false;
    state.data = action.payload;
  },
  [fetchTodoFail]: defaultActionErrorFun,

  //Create
  [createTodo]: defaultActionStartFun,
  [createTodoSuccess]: (state) => {
    state.loading = false;
    state.statusAction = true;
  },
  [createTodoFail]: defaultActionErrorFun,

  //Edit
  [editTodo]: defaultActionStartFun,
  [editTodoSuccess]: (state) => {
    state.loading = false;
    state.statusAction = true;
  },
  [editTodoFail]: defaultActionErrorFun,

  //Remove
  [removeTodo]: defaultActionStartFun,
  [removeTodoSuccess]: (state) => {
    state.loading = false;
    state.statusAction = true;
  },
  [removeTodoFail]: defaultActionErrorFun,
});

export const selectorTodoByNameCompleteStatus = createSelector(
  [(state) => state.todos.data, (_, filter) => filter],
  (todos, filter) => {
    const { name, completed } = filter ?? {};
    const { ids, entity } = todos ?? {};

    return {
      ids: ids?.filter((id) => {
        const todoData = entity?.[id];
        const conditionCompleted =
          completed === undefined || todoData?.completed === completed;
        const conditionName = todoData?.name
          .toLowerCase()
          .includes(name?.toLowerCase());
        return conditionCompleted && conditionName;
      }),
      entity,
    };
  }
);

export default todoReducer;
