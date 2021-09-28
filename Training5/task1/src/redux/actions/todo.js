import { createAction } from "@reduxjs/toolkit";

export const createTodo = createAction("todos/createTodo");
export const createTodoSuccess = createAction("todos/createTodoSuccess");
export const createTodoFail = createAction("todos/createTodoFail");

export const fetchTodo = createAction("todos/fetchTodo");
export const fetchTodoFail = createAction("todos/fetchTodoFail");
export const fetchTodoSuccess = createAction("todos/fetchTodoSuccess");

export const editTodo = createAction("todos/editTodo");
export const editTodoFail = createAction("todos/editTodoFail");
export const editTodoSuccess = createAction("todos/editTodoSuccess");

export const removeTodo = createAction("todos/removeTodo");
export const removeTodoSuccess = createAction("todos/removeTodoSuccess");
export const removeTodoFail = createAction("todos/removeTodoFail");

export const setStatusAction = createAction("todos/setStatusAction");
