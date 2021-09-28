import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "./reducers/todo";
import filterReducer from "./reducers/filter";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./saga";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    todos: todosReducer,
    filter: filterReducer,
  },
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);

store.subscribe(() => {
  console.log("state", store.getState());
});

export default store;
