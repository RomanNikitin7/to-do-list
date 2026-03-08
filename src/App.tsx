import { useState } from "react";
import "./App.css";
import { TodolistItem } from "./TodolistItem";
import { Task } from "./TodolistItem";

export type FilterTypes = "all" | "active" | "completed";

const Task1: Task[] = [
  { id: 1, title: "HTML&CSS", isDone: true },
  { id: 2, title: "JS", isDone: true },
  { id: 3, title: "React", isDone: false },
  { id: 4, title: "Redux", isDone: false },
];

function App() {
  const [currentTasks, setCurrentTasks] = useState<Task[]>(Task1);
  const [currentFilter, setCurrentFilter] = useState<FilterTypes>("active");

  function handleDeleteTask(taskId: Task["id"]) {
    setCurrentTasks((cur) => cur.filter((task) => task.id !== taskId));
  }
  function handleFilterTasks(filter: FilterTypes) {
    setCurrentFilter(filter);
  }

  function getFilteredTasks() {
    switch (currentFilter) {
      case "active":
        return currentTasks.filter((task) => !task.isDone);
      case "completed":
        return currentTasks.filter((task) => task.isDone);
      default:
        return currentTasks;
    }
  }
  return (
    <div className="app">
      <TodolistItem
        title="What to learn"
        tasks={getFilteredTasks()}
        onDeleteTask={handleDeleteTask}
        date="2024-01-01"
        onFilterTasks={handleFilterTasks}
      />
    </div>
  );
}

export default App;
