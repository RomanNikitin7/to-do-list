import { v1 } from "uuid";
import { FilterTypes } from "./App";
import { Button } from "./Button";
import { KeyboardEvent, useState } from "react";

export type Task = {
  id: string;
  title: string;
  isDone: boolean;
};

type Props = {
  title: string;
  tasks: Task[];
  date?: string;
  onDeleteTask: (taskId: Task["id"]) => void;
  onFilterTasks: (filter: FilterTypes) => void;
  onDeleteAllTasks: () => void;
  onCreateTask: (task: Task) => void;
  onUpdateTasks: (taskId: Task["id"], isDone: boolean) => void;
  currentFilter: FilterTypes;
};

export const TodolistItem = ({
  title,
  tasks,
  date,
  onDeleteTask,
  onFilterTasks,
  onDeleteAllTasks,
  onCreateTask,
  onUpdateTasks,
  currentFilter,
}: Props) => {
  const [taskTitle, setTaskTitle] = useState("");
  const [error, setError] = useState<string | null>(null);

  const fromSymbolsLength = taskTitle.length >= 3;
  const toSymbolsLength = taskTitle.length <= 10;

  function handleCreateTask() {
    let newTitle = taskTitle.trim();
    const newTask = {
      id: v1(),
      title: newTitle,
      isDone: false,
    };
    if (newTitle.length !== 0) {
      onCreateTask(newTask);
    } else {
      setError("Title is required");
    }
    setTaskTitle("");
  }
  function handleCreateTaskKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && fromSymbolsLength && toSymbolsLength) {
      handleCreateTask();
    }
  }

  function isButtonActive() {
    if (fromSymbolsLength && toSymbolsLength) {
      return false;
    }
    return true;
  }
  function onCheckboxChange(taskId: Task["id"], isChecked: boolean) {
    onUpdateTasks(taskId, isChecked);
  }

  function handleChangeTaskTitle(e: React.ChangeEvent<HTMLInputElement>) {
    setTaskTitle(e.currentTarget.value);
    if (error) {
      setError(null);
    }
  }
  return (
    <div>
      <h3>{title}</h3>
      <div>
        <input
          placeholder="Enter task name (from 3 to 10 characters)"
          value={taskTitle}
          className={error ? "error" : ""}
          onChange={(e) => handleChangeTaskTitle(e)}
          onKeyDown={(e) => handleCreateTaskKeyDown(e)}
        />
        <Button disabled={isButtonActive()} onClick={() => handleCreateTask()}>
          +
        </Button>
        {!error && !!taskTitle.length && !fromSymbolsLength && (
          <div className="error-text">There is less than 3 characters</div>
        )}
        {!error && !toSymbolsLength && (
          <div className="error-text">There is more than 10 characters</div>
        )}
        {error && <div className="error-text">{error}</div>}
      </div>
      {tasks.length === 0 ? (
        <p>No tasks available</p>
      ) : (
        <ul>
          {tasks.map((task) => {
            return (
              <li className={task.isDone ? "is-checked" : ""} key={task.id}>
                <input
                  type="checkbox"
                  checked={task.isDone}
                  onChange={(e) =>
                    onCheckboxChange(task.id, e.currentTarget.checked)
                  }
                />
                <span>{task.title}</span>
                <button onClick={() => onDeleteTask(task.id)}>x</button>
              </li>
            );
          })}
        </ul>
      )}
      <div>
        <Button
          className={currentFilter === "all" ? "active-filter" : ""}
          onClick={() => onFilterTasks("all")}
        >
          All
        </Button>
        <Button
          className={currentFilter === "active" ? "active-filter" : ""}
          onClick={() => onFilterTasks("active")}
        >
          Active
        </Button>
        <Button
          className={currentFilter === "completed" ? "active-filter" : ""}
          onClick={() => onFilterTasks("completed")}
        >
          Completed
        </Button>
      </div>
      <div>
        <Button onClick={() => onDeleteAllTasks()}>Delete all tasks</Button>
      </div>
      <div>{date}</div>
    </div>
  );
};
