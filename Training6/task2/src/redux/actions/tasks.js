import { createAction, nanoid } from "@reduxjs/toolkit";

import { STATUS_TASK } from "../../constant";

export const addTask = createAction("tasks/addTask", (name) => {
  return {
    payload: {
      id: nanoid(),
      name,
      status: STATUS_TASK.draft.key,
    },
  };
});
export const removeTask = createAction("tasks/removeTask");
export const editTask = createAction("tasks/editTask");

export const changeStatusTask = createAction("tasks/changeStatus");
