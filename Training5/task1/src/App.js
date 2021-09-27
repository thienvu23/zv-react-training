import React from "react";
import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchTodo,
  removeTodo,
  createTodo,
  editTodo,
} from "./redux/actions/todo";
import { selectorTodoByNameCompleteStatus } from "./redux/reducers/todo";

function App() {
  const dispatch = useDispatch();

  const loading = useSelector((state) => state.todos.loading);
  const error = useSelector((state) => state.todos.error);
  const statusAction = useSelector((state) => state.todos.statusAction);

  const [dataTodo, setDataTodo] = React.useState({
    completed: false,
    name: "",
  });
  const [editId, setEditId] = React.useState("");
  const [filter, setFilter] = React.useState({
    name: "",
    completed: undefined,
  });

  const todos = useSelector((state) =>
    selectorTodoByNameCompleteStatus(state, filter)
  );

  const isCreate = !editId;

  const todoEditData = todos?.entity?.[editId];

  React.useEffect(() => {
    if (editId) {
      setDataTodo(todoEditData);
    }
  }, [editId]);

  React.useEffect(() => {
    if (error) {
      alert(error);
      return;
    }
    if (statusAction) {
      setEditId("");
      dispatch(fetchTodo());
    }
  }, [statusAction, error]);

  React.useEffect(() => {
    dispatch(fetchTodo());
  }, []);

  const removeTodoClick = (id) => {
    let isConfirm = window.confirm("Are you sure delete item?");
    isConfirm && dispatch(removeTodo({ id }));
  };

  const onEditClickItem = (id) => {
    setEditId(id);
  };

  React.useEffect(() => {
    if (statusAction) {
      setDataTodo({
        completed: false,
        name: "",
      });
    }
  }, [statusAction]);

  const onChangeCompleted = (e) => {
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
      alert("Name is require");
      return;
    }
    if (isCreate) {
      dispatch(createTodo(dataTodo));
    } else {
      dispatch(editTodo(dataTodo));
    }
  };

  const onChangeTextSearch = ({ target }) => {
    setFilter((preFilter) => ({
      ...preFilter,
      name: target.value,
    }));
  };

  const onChangeValueCompletedStatus = ({ target }) => {
    console.log("onChangeValueCompletedStatus", target.value, !!target.value);
    setFilter((preFilter) => ({
      ...preFilter,
      completed: target.value != "" ? target.value === "true" : undefined,
    }));
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
            <label for="All">All</label>
            <div className="black-space" />
            <input
              type="radio"
              name="completedStatus"
              id="Completed"
              value={true}
            />
            <label for="Completed">Completed</label>
            <div className="black-space" />
            <input
              type="radio"
              name="completedStatus"
              id="UnCompleted"
              value={false}
            />
            <label for="UnCompleted">UnCompleted</label>
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
                  <button onClick={() => onEditClickItem(id)}>Edit</button>
                  <div className="black-space" />
                  <button onClick={() => removeTodoClick(id)}>Remove</button>
                </td>
              </tr>
            );
          })}
        </table>
        {loading && (
          <div className="loading-view">
            <div className="loader" />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
