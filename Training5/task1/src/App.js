import React from "react";
import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  fetchTodo,
  removeTodo,
  createTodo,
  editTodo,
  setStatusAction,
} from "./redux/actions/todo";
import { setFilter } from "./redux/actions/filter";

import { STATUS_ACTION } from "./constant";

export const selectorTodoByNameCompleteStatus = createSelector(
  [(state) => state.todos.data, (state) => state.filter],
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

function debounce(func, timeout = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}

function App() {
  const dispatch = useDispatch();

  const filter = useSelector((state) => state.filter);
  const statusActionDefault = useSelector(
    (state) => state.todos.statusActionDefault
  );
  const statusAction = useSelector((state) => state.todos.statusAction);

  const [dataTodo, setDataTodo] = React.useState({
    completed: false,
    name: "",
  });
  const [editId, setEditId] = React.useState("");

  const todos = useSelector((state) =>
    selectorTodoByNameCompleteStatus(state, filter)
  );
  const isCreate = !editId;

  const todoEditData = todos?.entity?.[editId];

  React.useEffect(() => {
    dispatch(fetchTodo());
  }, []);

  React.useEffect(() => {
    switch (statusActionDefault.status) {
      case STATUS_ACTION.fail:
        toast(statusActionDefault.error);
        break;
      case STATUS_ACTION.idle:
        setDataTodo({
          completed: false,
          name: "",
        });
        break;
      default:
        break;
    }
  }, [statusActionDefault]);

  React.useEffect(() => {
    if (editId && statusAction[editId]?.status === STATUS_ACTION.success) {
      dispatch(setStatusAction({ id: editId, status: STATUS_ACTION.idle }));
      setEditId("");
      setDataTodo({ completed: false, name: "" });
    }
  }, [statusAction, editId]);

  const removeTodoClick = (id) => {
    let isConfirm = window.confirm("Are you sure delete item?");
    isConfirm && dispatch(removeTodo({ id }));
  };

  const onChangeCompleted = () => {
    setDataTodo({
      ...dataTodo,
      completed: !dataTodo.completed,
    });
  };

  const onChangeName = (e) => {
    setDataTodo({
      ...dataTodo,
      name: e.target.value,
    });
  };

  const onClickContinue = () => {
    if (!dataTodo.name) {
      toast.error("Name is require");
      return;
    }
    if (isCreate) {
      dispatch(createTodo(dataTodo));
    } else {
      dispatch(editTodo(dataTodo));
    }
  };

  const onClickCancel = () => {
    setEditId("");
    setDataTodo({ completed: false, name: "" });
  };

  const debounceChangeName = React.useCallback(
    debounce((name) => {
      dispatch(
        setFilter({
          ...filter,
          name,
        })
      );
    }, 500),
    []
  );

  const onChangeTextSearch = (e) => {
    e.persist();
    debounceChangeName(e.target.value);
  };

  const onChangeValueCompletedStatus = ({ target }) => {
    dispatch(
      setFilter({
        ...filter,
        completed: target.value != "" ? target.value === "true" : undefined,
      })
    );
  };

  return (
    <div className="App">
      <header className="App-header">
        <p>Todo App</p>
      </header>
      <div className="white-space" />
      {/* Create Edit Todo */}
      <div className="container">
        <h3>
          {isCreate ? "Create" : "Edit"}{" "}
          {todoEditData?.name ? `"${todoEditData.name}"` : "Todo"}
        </h3>
        <div className="group-create-info">
          <input
            className="input-name"
            placeholder="Enter todo name"
            value={dataTodo?.name}
            onChange={onChangeName}
          />
          <div className="completed-container">
            <input
              type={"checkbox"}
              onChange={onChangeCompleted}
              checked={dataTodo?.completed}
            />
            <div className="black-space" />
            <h5>Completed</h5>
          </div>
        </div>

        <button type="button" className="button" onClick={onClickContinue}>
          Continue
        </button>
        <div className="white-space" />
        {!!editId && (
          <button type="button" className="button" onClick={onClickCancel}>
            Cancel
          </button>
        )}

        <div className="white-space-large" />
        <div className="white-space-large" />
        <div className="separator" />
        <div className="white-space-large" />

        {/* List Todo */}
        <h3>List Todo</h3>
        <div className="container-search">
          <input
            className="input-search"
            placeholder="Enter name to search"
            onChange={onChangeTextSearch}
          />
          <div
            className="group-completed-status"
            onChange={onChangeValueCompletedStatus}
          >
            <h4>Completed Status: </h4>
            <input
              type="radio"
              name="completedStatus"
              id="All"
              value={""}
              defaultChecked="true"
            />
            <label htmlFor="All">All</label>
            <div className="black-space" />
            <input
              type="radio"
              name="completedStatus"
              id="Completed"
              value={true}
            />
            <label htmlFor="Completed">Completed</label>
            <div className="black-space" />
            <input
              type="radio"
              name="completedStatus"
              id="UnCompleted"
              value={false}
            />
            <label htmlFor="UnCompleted">UnCompleted</label>
          </div>
        </div>
        <div className="white-space" />
        <table className="table-container">
          <tr>
            <td className="td-col-name">Name</td>
            <td className="td-col-status">Completed</td>
            <td className="td-col-action">Actions</td>
          </tr>
          {todos?.ids?.map((id) => {
            const dataById = todos.entity[id];
            return (
              <tr key={id}>
                <td>{dataById.name}</td>
                <td>
                  <input
                    type="checkbox"
                    checked={dataById.completed}
                    readOnly
                  />
                </td>
                <td className="td-col-action-content">
                  <button
                    onClick={() => {
                      setEditId(id);
                      setDataTodo(dataById);
                    }}
                  >
                    Edit
                  </button>
                  <div className="black-space" />
                  <button onClick={() => removeTodoClick(id)}>Remove</button>
                  {statusAction[id]?.status === STATUS_ACTION.loading && (
                    <div className="loading-view">
                      <div className="loader-small" />
                    </div>
                  )}
                </td>
              </tr>
            );
          })}
        </table>
        {statusActionDefault.status == STATUS_ACTION.loading && (
          <div className="loading-view">
            <div className="loader" />
          </div>
        )}
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;
