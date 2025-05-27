import Modal from "../Modal";
import type { Task, TaskFormFields } from "@/types/task.types";
import CategorySelect from "./CategorySelect";
import type { Category } from "@/types/category.type";
import DatePicker from "./DatePicker";
import { Controller, useForm } from "react-hook-form";

type TaskFormModalProps = {
  isOpen: boolean;
  task?: Task;
  onSubmit: (task: TaskFormFields, taskId?: string) => void;
  onDelete: (taskId: string) => void;
  closeModal: () => void;
  categories: Category[];
  category?: Category;
};

export default function TaskFormModal({
  isOpen,
  task,
  onSubmit,
  onDelete,
  closeModal,
  categories,
  category,
}: TaskFormModalProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<TaskFormFields>({
    defaultValues: task
      ? {
          title: task.title,
          description: task.description || "",
          dueDate: task.dueDate ? new Date(task.dueDate) : null,
          isCompleted: task.isCompleted,
          categoryId: task.categoryId,
        }
      : {
          title: "",
          description: "",
          dueDate: null,
          isCompleted: false,
          categoryId: category?.id || "",
        },
  });

  function onSubmitForm(taskFormFields: TaskFormFields) {
    if (task) {
      onSubmit(taskFormFields, task.id);
    } else {
      onSubmit(taskFormFields);
    }
    handleCloseModal();
  }

  function handleDelete() {
    if (task) {
      onDelete(task.id);
    } else {
      handleCloseModal();
    }
  }

  function handleCloseModal() {
    reset({
      title: "",
      description: "",
      dueDate: null,
      isCompleted: false,
      categoryId: "",
    });
    closeModal();
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleCloseModal}
      title={task ? "Edit task" : "Add new task"}
      width="max-w-[350px] md:max-w-[500px]"
    >
      <form onSubmit={handleSubmit(onSubmitForm)}>
        <div className="p-5 pb-0 flex items-center justify-between gap-5 flex-wrap md:flex-nowrap">
          <label className="flex flex-col gap-1 basis-full md:basis-2/3">
            <span className="text-sm text-gray-500">Name of task</span>
            <input
              className={`border border-gray-200 rounded-md p-2 px-3 focus:outline-violet-600 ${errors.title ? "border-red-600" : ""}`}
              type="text"
              {...register("title", { required: "Enter task title" })}
              placeholder="e.g Clean the house"
            />
          </label>
          <Controller
            control={control}
            name="categoryId"
            rules={{ required: "Choose a category" }}
            render={({ field }) => (
              <CategorySelect
                categories={categories}
                category={category}
                updateSelectedCategory={(category: Category) =>
                  field.onChange(category.id)
                }
                error={errors.categoryId?.message}
              />
            )}
          />
        </div>
        <label className="flex flex-col gap-1 p-5">
          <span className="text-sm text-gray-500">Description</span>
          <textarea
            className={
              "border border-gray-200 rounded-md p-2 px-3 focus:outline-violet-600 h-30 resize-none"
            }
            {...register("description")}
            placeholder="e.g Clean the walls and the floor"
          />
        </label>
        <div className="divider border-t border-gray-200"></div>
        <div className="p-5 flex items-center justify-between gap-5">
          <div className="basis-1/2">
            <Controller
              control={control}
              name="dueDate"
              render={({ field }) => (
                <DatePicker
                  value={field.value || null}
                  onChange={(date: Date | null) => field.onChange(date)}
                />
              )}
            />
          </div>
          <div className="flex justify-between gap-2 basis-1/2">
            <button
              type="button"
              onClick={handleDelete}
              className="border border-gray-200 py-2 rounded-lg basis-1/2"
            >
              {task ? "Delete" : "Cancel"}
            </button>
            <button
              type="submit"
              className="bg-[#7446EA] hover:bg-violet-800 text-white py-2 rounded-lg basis-1/2"
            >
              {task ? "Update" : "Add"}
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
}
