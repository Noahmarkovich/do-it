import type { Category } from "@/types/category.type";
import type {
  Task,
  TaskFormFields,
  UpdateTaskFormFields,
} from "@/types/task.types";
import { useState, useEffect, useRef } from "react";
import TaskItem from "./TaskItem";
import TaskFormModal from "./forms/TaskFormModal";
import ConfirmModal from "./forms/ConfirmModal";
import DropdownMenu from "./DropdownMenu";
import { createTask, deleteTask, updateTask } from "@/services/task.service";
import { FaAngleDown, FaAngleUp, FaPlus } from "react-icons/fa6";
import { MdDelete, MdModeEditOutline, MdMoreHoriz } from "react-icons/md";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type CategoryItemProps = {
  category: Category;
  openCategoryMenu: (category: Category) => void;
  onDelete: (categoryId: string) => void;
  categories: Category[];
  setErrorMessage: () => void;
};

export default function CategoryItem({
  category,
  openCategoryMenu,
  onDelete,
  categories,
  setErrorMessage,
}: CategoryItemProps) {
  const [isOpenCategory, setIsOpenCategory] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
  const shouldShowClearBtn =
    (category?.tasks.length &&
      category?.tasks.some((task) => task.isCompleted)) ||
    false;
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | undefined>();
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const queryClient = useQueryClient();

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(
        isOpenCategory ? contentRef.current.scrollHeight + 20 : 0,
      );
    }
  }, [isOpenCategory, category?.tasks.length]);

  function handleToggleComplete(task: Task) {
    updateTaskMutation.mutate({
      updatedTask: { isCompleted: !task.isCompleted },
      taskId: task.id,
    });
  }

  const updateTaskMutation = useMutation({
    mutationFn: ({
      updatedTask,
      taskId,
    }: {
      updatedTask: UpdateTaskFormFields;
      taskId: string;
    }) => updateTask(updatedTask, taskId),
    onMutate: async ({ updatedTask, taskId }) => {
      await queryClient.cancelQueries({ queryKey: ["categories"] });
      const previousCategories = queryClient.getQueryData<Category[]>([
        "categories",
      ]);

      queryClient.setQueryData<Category[]>(["categories"], (old = []) => {
        return old.map((cat) => {
          if (cat.id === updatedTask.categoryId) {
            return {
              ...cat,
              tasks: cat.tasks.map((task) =>
                task.id === taskId ? { ...task, ...updatedTask } : task,
              ),
            };
          }
          return cat;
        });
      });

      closeTaskForm();

      return { previousCategories };
    },
    onError: (err, variables, context) => {
      if (context?.previousCategories) {
        queryClient.setQueryData(["categories"], context.previousCategories);
      }
      setErrorMessage();
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  const createTaskMutation = useMutation({
    mutationFn: createTask,
    onMutate: async (newTask) => {
      await queryClient.cancelQueries({ queryKey: ["categories"] });
      const previousCategories = queryClient.getQueryData<Category[]>([
        "categories",
      ]);
      const tempId = `temp-${Date.now()}`;
      queryClient.setQueryData<Category[]>(["categories"], (old = []) => {
        return old.map((cat) => {
          if (cat.id === newTask.categoryId) {
            return {
              ...cat,
              tasks: [
                ...cat.tasks,
                {
                  id: tempId,
                  title: newTask.title,
                  description: newTask.description || "",
                  isCompleted: false,
                  categoryId: newTask.categoryId,
                  userId: "",
                  createdAt: new Date(),
                  updatedAt: new Date(),
                },
              ],
            };
          }
          return cat;
        });
      });

      closeTaskForm();

      return { previousCategories };
    },
    onError: (err, newTask, context) => {
      if (context?.previousCategories) {
        queryClient.setQueryData(["categories"], context.previousCategories);
      }
      setErrorMessage();
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  async function handleSubmitTask(task: TaskFormFields, taskId?: string) {
    if (taskId) {
      updateTaskMutation.mutate({ updatedTask: task, taskId });
    } else {
      createTaskMutation.mutate(task);
    }
  }

  function onDeleteTask(taskId: string) {
    const taskToDelete = category.tasks.find(
      (task: Task) => task.id === taskId,
    );
    if (taskToDelete) {
      setTaskToEdit(taskToDelete);
      setIsConfirmModalOpen(true);
    }
  }

  const deleteTaskMutation = useMutation({
    mutationFn: deleteTask,
    onMutate: async (taskId) => {
      await queryClient.cancelQueries({ queryKey: ["categories"] });
      const previousCategories = queryClient.getQueryData<Category[]>([
        "categories",
      ]);
      queryClient.setQueryData<Category[]>(["categories"], (old = []) => {
        return old.map((cat) => {
          if (category.id === category.id) {
            return {
              ...cat,
              tasks: category.tasks.filter((task) => task.id !== taskId),
            };
          }
          return category;
        });
      });

      closeConfirmModal();
      return { previousCategories };
    },
    onError: (err, taskId, context) => {
      if (context?.previousCategories) {
        queryClient.setQueryData(["categories"], context.previousCategories);
      }
      setErrorMessage();
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      closeConfirmModal();
    },
  });

  const clearCompletedMutation = useMutation({
    mutationFn: async () => {
      const updatePromises = category.tasks
        .filter((task) => task.isCompleted)
        .map((task) => updateTask({ isCompleted: false }, task.id));

      return Promise.all(updatePromises);
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["categories"] });
      const previousCategories = queryClient.getQueryData<Category[]>([
        "categories",
      ]);

      queryClient.setQueryData<Category[]>(["categories"], (old = []) => {
        return old.map((tempCategory) => {
          if (tempCategory.id === category.id) {
            return {
              ...tempCategory,
              tasks: tempCategory.tasks.map((task) =>
                task.isCompleted ? { ...task, isCompleted: false } : task,
              ),
            };
          }
          return tempCategory;
        });
      });

      return { previousCategories };
    },
    onError: (err, variables, context) => {
      if (context?.previousCategories) {
        queryClient.setQueryData(["categories"], context.previousCategories);
      }
      setErrorMessage();
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  function closeConfirmModal() {
    setTaskToEdit(undefined);
    setIsConfirmModalOpen(false);
    closeTaskForm();
  }

  function openTaskFormModal(task: Task) {
    setTaskToEdit(task);
    setIsTaskFormOpen(true);
  }

  function closeTaskForm() {
    setTaskToEdit(undefined);
    setIsTaskFormOpen(false);
  }

  return (
    <div
      className="border border-gray-200 rounded-lg border-l-4 p-5"
      style={{ borderLeftColor: category.color }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-gray-200 w-5 h-5 flex items-center justify-center">
            <span className="text-sm font-semibold text-gray-400">
              {category?.tasks.length}
            </span>
          </div>
          <h3 className="font-bold">{category.name}</h3>
        </div>
        <div className="flex items-center gap-4">
          {shouldShowClearBtn && (
            <button
              onClick={() => clearCompletedMutation.mutate()}
              className="text-violet-600 text-sm font-medium"
            >
              Clear completed
            </button>
          )}
          <button
            onClick={() => setIsOpenCategory(!isOpenCategory)}
            className="text-gray-500 text-sm font-semibold hover:text-gray-700"
          >
            {isOpenCategory ? <FaAngleUp /> : <FaAngleDown />}
          </button>
          <div className="relative">
            <button
              onClick={() => setIsCategoryMenuOpen(!isCategoryMenuOpen)}
              className="text-gray-500 text-sm font-semibold hover:text-gray-700"
            >
              <MdMoreHoriz />
            </button>
            <DropdownMenu
              options={[
                { label: "Edit", value: "edit", icon: <MdModeEditOutline /> },
                { label: "Delete", value: "delete", icon: <MdDelete /> },
              ]}
              selected={""}
              onChange={(value) => {
                if (value === "edit") {
                  openCategoryMenu(category);
                } else if (value === "delete") {
                  onDelete(category.id);
                }
              }}
              isOpen={isCategoryMenuOpen}
              setIsOpen={(value: boolean) => setIsCategoryMenuOpen(value)}
              align="right"
            />
          </div>
        </div>
      </div>

      <div
        ref={contentRef}
        className="border-t border-gray-200 mt-4 overflow-hidden transition-all duration-300 ease-in-out"
        style={{
          maxHeight: `${contentHeight}px`,
          opacity: isOpenCategory ? 1 : 0,
          borderTopWidth: isOpenCategory ? "1px" : "0px",
          marginTop: isOpenCategory ? "1rem" : "0rem",
        }}
      >
        <div className="py-4">
          {category.tasks.map((task) => (
            <TaskItem
              task={task}
              key={task.id}
              categoryColor={category.color}
              onToggleComplete={handleToggleComplete}
              openTaskFormModal={openTaskFormModal}
              onDeleteTask={onDeleteTask}
            />
          ))}
        </div>
        <div className="mt-2">
          <button
            onClick={() => setIsTaskFormOpen(true)}
            className="text-gray-500 text-sm flex items-center gap-2 hover:text-violet-600 group"
          >
            <div className="rounded-full w-5 h-5 flex items-center justify-center group-hover:bg-violet-600 group-hover:text-white">
              <FaPlus />
            </div>
            <span className="inter-tight">Add Task</span>
          </button>
        </div>
      </div>
      {isTaskFormOpen && (
        <TaskFormModal
          isOpen={isTaskFormOpen}
          task={taskToEdit}
          onSubmit={handleSubmitTask}
          onDelete={onDeleteTask}
          closeModal={closeTaskForm}
          categories={categories}
          category={category}
        />
      )}
      {isConfirmModalOpen && (
        <ConfirmModal
          isOpen={isConfirmModalOpen}
          closeModal={closeConfirmModal}
          onConfirm={() => deleteTaskMutation.mutate(taskToEdit?.id || "")}
          objectName={taskToEdit?.title || ""}
          objectType="task"
        />
      )}
    </div>
  );
}
