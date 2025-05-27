import type { Category, CategoryFormFields } from "@/types/category.type";
import Modal from "../Modal";
import NameIcon from "/photos/name.png";
import ColorPickerInput from "./ColorPickerInput";
import { Controller, useForm } from "react-hook-form";

type CategoryFormModalProps = {
  isOpen: boolean;
  category?: Category;
  onSubmit: (category: CategoryFormFields, categoryId?: string) => void;
  onDelete: (categoryId: string) => void;
  closeModal: () => void;
};

export default function CategoryFormModal({
  isOpen,
  category,
  onSubmit,
  onDelete,
  closeModal,
}: CategoryFormModalProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CategoryFormFields>({
    defaultValues: category
      ? {
          name: category.name,
          color: category.color,
        }
      : {
          name: "",
          color: "#A54CE1",
        },
  });

  function onSubmitForm(categoryFormFields: CategoryFormFields) {
    if (category) {
      onSubmit(categoryFormFields, category.id);
    } else {
      onSubmit(categoryFormFields);
    }
    closeModal();
  }

  function handleDelete() {
    if (category) {
      onDelete(category.id);
    }
    closeModal();
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={closeModal}
      title={category ? "Edit project" : "New project"}
      width="max-w-[350px]"
    >
      <form onSubmit={handleSubmit(onSubmitForm)}>
        <div className="p-5 pb-0">
          <label className="flex flex-col gap-1">
            <span className="text-sm text-gray-500">Name</span>
            <input
              className={
                "border border-gray-200 bg-no-repeat rounded-md p-2 pl-8 bg-size-[20px] bg-position-[5px] focus:outline-violet-600"
              }
              style={{ backgroundImage: `url(${NameIcon})` }}
              type="text"
              {...register("name")}
              placeholder="e.g Homework"
            />
            {errors.name?.message && (
              <p className="mt-2 text-sm text-gray-400">
                {errors.name?.message}
              </p>
            )}
          </label>
          <Controller
            control={control}
            name="color"
            rules={{ required: "Choose a color" }}
            render={({ field }) => (
              <ColorPickerInput
                value={field.value}
                onChange={(color) => field.onChange(color)}
                label="Color"
                error={errors.color?.message}
                className="mt-4"
              />
            )}
          />
          <p className="text-sm text-stone-600 mt-4 pb-20">
            Choose a color so you don't lose the category among others. This
            will help you to navigate and divide tasks.
          </p>
        </div>
        <div className="divider border-t border-gray-200"></div>
        <div className="flex justify-between p-5">
          <button
            onClick={handleDelete}
            className="border border-gray-200 py-2 rounded-lg w-[150px]"
          >
            {category ? "Delete" : "Cancel"}
          </button>
          <button
            type="submit"
            className="bg-[#7446EA] hover:bg-violet-800 text-white py-2 rounded-lg w-[150px]"
          >
            {category ? "Update" : "Create"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
