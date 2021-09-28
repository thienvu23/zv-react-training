import { createReducer } from "@reduxjs/toolkit";
import { setFilter } from "../actions/filter";

const initialState = {
  completed: undefined,
  name: "",
};

export const filterReducer = createReducer(initialState, {
  [setFilter]: (state, action) => {
    state.name = action.payload.name;
    state.completed = action.payload.completed;
  },
});

export default filterReducer;
