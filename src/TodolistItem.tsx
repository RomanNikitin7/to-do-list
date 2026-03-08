import { FilterTypes } from "./App";
import { Button } from "./Button";

export type Task = {
  id: number;
  title: string;
  isDone: boolean;
};

type Props = {
  title: string;
  tasks: Task[];
  date?: string;
  onDeleteTask: (taskId: number) => void;
  onFilterTasks: (filter: FilterTypes) => void;
};

export const TodolistItem = ({
  title,
  tasks,
  date,
  onDeleteTask,
  onFilterTasks,
}: Props) => {
  return (
    <div>
      <h3>{title}</h3>
      <div>
        <input />
        <Button>+</Button>
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
      <div>{date}</div>
    </div>
  );
};
