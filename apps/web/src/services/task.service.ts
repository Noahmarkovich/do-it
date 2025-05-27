import type {
  Task,
  TaskFormFields,
  UpdateTaskFormFields,
} from "../types/task.types";

const API_URL = import.meta.env.VITE_API_URL;

export async function createTask(task: TaskFormFields) {
  const user = JSON.parse(sessionStorage.getItem("user") || "{}");
  const response = await fetch(`${API_URL}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.token}`,
    },
    body: JSON.stringify({
      ...task,
      userId: user.id,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to create task");
  }

  return response.json();
}
export async function updateTask(
  task: UpdateTaskFormFields,
  taskId: string,
): Promise<Task> {
  const user = JSON.parse(sessionStorage.getItem("user") || "{}");
  const response = await fetch(`${API_URL}/tasks/${taskId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.token}`,
    },
    body: JSON.stringify({
      ...task,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to update task");
  }

  return response.json();
}

export async function deleteTask(taskId: string) {
  const user = JSON.parse(sessionStorage.getItem("user") || "{}");
  const response = await fetch(`${API_URL}/tasks/${taskId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to delete task");
  }

  return response.json();
}
