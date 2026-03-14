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
};

export const TodolistItem = ({
  title,
  tasks,
  date,
  onDeleteTask,
  onFilterTasks,
  onDeleteAllTasks,
  onCreateTask,
}: Props) => {
  const [taskTitle, setTaskTitle] = useState("");

  const fromSymbolsLength = taskTitle.length >= 3;
  const toSymbolsLength = taskTitle.length <= 10;

  function handleCreateTask() {
    const newTask = {
      id: v1(),
      title: taskTitle,
      isDone: false,
    };
    onCreateTask(newTask);
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

  return (
    <div>
      <h3>{title}</h3>
      <div>
        <input
          placeholder="Enter task name (from 3 to 10 characters)"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.currentTarget.value)}
          onKeyDown={(e) => handleCreateTaskKeyDown(e)}
        />
        <Button disabled={isButtonActive()} onClick={() => handleCreateTask()}>
          +
        </Button>
        {!!taskTitle.length && !fromSymbolsLength && (
          <div style={{ color: "red" }}>There is less than 3 characters</div>
        )}
        {!toSymbolsLength && (
          <div style={{ color: "red" }}>There is more than 10 characters</div>
        )}
      </div>
      {tasks.length === 0 ? (
        <p>No tasks available</p>
      ) : (
        <ul>
          {tasks.map((task) => {
            return (
              <li key={task.id}>
                <input type="checkbox" checked={task.isDone} />
                <span>{task.title}</span>
                <button onClick={() => onDeleteTask(task.id)}>x</button>
              </li>
            );
          })}
        </ul>
      )}
      <div>
        <Button onClick={() => onFilterTasks("all")}>All</Button>
        <Button onClick={() => onFilterTasks("active")}>Active</Button>
        <Button onClick={() => onFilterTasks("completed")}>Completed</Button>
      </div>
      <div>
        <Button onClick={() => onDeleteAllTasks()}>Delete all tasks</Button>
      </div>
      <div>{date}</div>
    </div>
  );
};
