import { combineReducers } from "redux";
import tasks from "../reducers/tasks";
import network from "../reducers/network";

export const rootReducer = combineReducers({
  tasks,
  network,
});
