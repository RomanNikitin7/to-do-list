import { FilterTypes } from "./App";
import { Task } from "./TodolistItem";

export function getFilteredTasks(filter: FilterTypes, tasks: Task[]): Task[] {
  switch (filter) {
    case "active":
      return tasks.filter((task) => !task.isDone);
    case "completed":
      return tasks.filter((task) => task.isDone);
    default:
      return tasks;
  }
}
