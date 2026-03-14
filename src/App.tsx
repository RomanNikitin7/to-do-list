import { useState } from "react";
import "./App.css";
import { TodolistItem } from "./TodolistItem";
import { Task } from "./TodolistItem";
import { getFilteredTasks } from "./utils";
import { v1 } from "uuid";

export type FilterTypes = "all" | "active" | "completed";

const Task1: Task[] = [
  { id: v1(), title: "HTML&CSS", isDone: true },
  { id: v1(), title: "JS", isDone: true },
  { id: v1(), title: "React", isDone: false },
  { id: v1(), title: "Redux", isDone: false },
];

function App() {
  const [currentTasks, setCurrentTasks] = useState<Task[]>(Task1);
  const [currentFilter, setCurrentFilter] = useState<FilterTypes>("all");

  function handleDeleteTask(taskId: Task["id"]) {
    setCurrentTasks((cur) => cur.filter((task) => task.id !== taskId));
  }
  function handleFilterTasks(filter: FilterTypes) {
    setCurrentFilter(filter);
  }
  function handleDeleteAllTasks() {
    setCurrentTasks([]);
  }

  function handleAddTask(task: Task) {
    setCurrentTasks((cur) => [task, ...cur]);
  }

  return (
    <div className="app">
      <TodolistItem
        title="What to learn"
        tasks={getFilteredTasks(currentFilter, currentTasks)}
        onDeleteTask={handleDeleteTask}
        date="2024-01-01"
        onFilterTasks={handleFilterTasks}
        onDeleteAllTasks={handleDeleteAllTasks}
        onCreateTask={handleAddTask}
      />
    </div>
  );
}

export default App;
