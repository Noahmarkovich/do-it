import type { Task } from "./task.types";

export type Category = {
  id: string;
  name: string;
  color: string;
  userId: string;
  tasks: Task[];
  createdAt: Date;
  updatedAt: Date;
};

export type CategoryFormFields = {
  name: string;
  color: string;
};
