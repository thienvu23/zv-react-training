import "./App.css";
import React from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  addTask,
  changeStatusTask,
  editTask,
  removeTask,
} from "./redux/actions/tasks";

import { STATUS_TASK } from "./constant";

function App() {
  const dispatch = useDispatch();

  const isNetworkConnection = !!useSelector(
    (state) => state.network.isConnected
  );
  const { ids: idsTask, entity: entityTasks } = useSelector(
    (state) => state.tasks.data
  );

  const [nameTask, setNameTask] = React.useState("");
  const [editTaskId, setEditTaskId] = React.useState("");

  const onChangeName = (e) => {
    setNameTask(e.target.value);
  };

  const onSaveTask = (event) => {
    event.preventDefault();
    if (!nameTask) {
      alert("Name task is require");
      return;
    }

    if (editTaskId) {
      dispatch(editTask({ id: editTaskId, name: nameTask }));
      setEditTaskId("");
    } else {
      dispatch(addTask(nameTask));
    }
    setNameTask("");
  };

  const onToReadyStatus = (id) => {
    const dataChoose = entityTasks?.[id];
    setEditTaskId("");
    const isConfirm = window.confirm(
      `Are you sure move task "${dataChoose?.name}" from ${
        STATUS_TASK[dataChoose?.status].name
      } to ${STATUS_TASK.ready.name}`
    );
    isConfirm &&
      dispatch(changeStatusTask({ id, status: STATUS_TASK.ready.key }));
  };

  const onRemoveTask = (id) => {
    const dataChoose = entityTasks?.[id];
    setEditTaskId("");
    const isConfirm = window.confirm(
      `Are you sure delete task "${dataChoose?.name}"`
    );
    isConfirm && dispatch(removeTask({ id }));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h4>Training 6 - Task 2</h4>
        <span
          className={`text-network ${
            !isNetworkConnection ? "text-network--offline" : ""
          }`}
        >
          {isNetworkConnection ? "Online" : "Offline"}
        </span>
      </header>

      <div className="content">
        {/* The app can be worked offline or online, the user can create a task without submitting immediately, every task created should get status: Draft */}
        <form className="row" onSubmit={onSaveTask}>
          <input
            className="input"
            placeholder="Enter name task"
            value={nameTask}
            onChange={onChangeName}
          />
          <button className="button-add" type="submit">
            {!!editTaskId ? "Edit Task" : "Add Task"}
          </button>
        </form>

        <div className="white-space-large" />

        <table className="table-task">
          <thead>
            <tr>
              <td className="table-task-col-name">Task name</td>
              <td className="table-task-col-status">Status</td>
              <td className="table-task-col-action">Action</td>
            </tr>
          </thead>
          <tbody>
            {!!idsTask.length ? (
              idsTask?.map((id) => {
                const { name, status } = entityTasks?.[id] ?? {};

                // User can click on the status to manually change status, please review the dashed arrow to know what status can be manually updated and the next status of them
                const isToReady = [
                  STATUS_TASK.draft.key,
                  STATUS_TASK.error.key,
                ].includes(status);

                //"Draft" means "I still want to edit and don't want to submit yet"
                // I add function, can Edit with error status
                const isEdit = [
                  STATUS_TASK.draft.key,
                  STATUS_TASK.error.key,
                ].includes(status);
                return (
                  <tr key={id}>
                    <td>{name}</td>
                    <td>{STATUS_TASK[status].name}</td>
                    <td className="table-task-col-action-body">
                      {isEdit && (
                        <>
                          <button
                            onClick={() => {
                              setEditTaskId(id);
                              setNameTask(name);
                            }}
                          >
                            Edit
                          </button>
                          <div className="black-space" />
                        </>
                      )}
                      <button onClick={() => onRemoveTask(id)}>Remove</button>
                      {isToReady && (
                        <>
                          <div className="black-space" />
                          <button onClick={() => onToReadyStatus(id)}>
                            Ready
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="3">
                  <span>Empty Task</span>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
