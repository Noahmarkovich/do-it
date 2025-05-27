export type Task = {
  id: string;
  title: string;
  description?: string | null | undefined;
  dueDate?: Date | null | undefined;
  isCompleted: boolean;
  categoryId: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
};

export type TaskFormFields = {
  title: string;
  description?: string | undefined;
  dueDate?: Date | null | undefined;
  isCompleted: boolean;
  categoryId: string;
};

export type UpdateTaskFormFields = {
  title?: string;
  description?: string | undefined;
  dueDate?: Date | null | undefined;
  isCompleted?: boolean;
  categoryId?: string;
};
