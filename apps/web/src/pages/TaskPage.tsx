import { useState } from "react";
import CategoryItem from "@/components/CategoryItem";
import type { Category, CategoryFormFields } from "@/types/category.type";
import CategoryFormModal from "@/components/forms/CategoryFormModal";
import ExtraActions from "@/components/ExtraActions";
import ConfirmModal from "@/components/forms/ConfirmModal";
import Loader from "@/components/Loader";
import EmptyBoardBanner from "@/components/EmptyBoardBanner";
import type { Task } from "@/types/task.types";
import useCategoriesActions from "@/hooks/useCategoriesActions";

export default function TaskPage() {
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<
    Category | undefined
  >();
  const [search, setSearch] = useState("");
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isLoadingAddCategory, setIsLoadingAddCategory] = useState(false);
  const [isError, setIsError] = useState(false);

  const {
    categories,
    isLoading,
    createCategoryMutation,
    updateCategoryMutation,
    deleteCategoryMutation,
  } = useCategoriesActions(
    setIsLoadingAddCategory,
    setIsError,
    setErrorMessage,
    closeConfirmModal,
  );

  function setErrorMessage() {
    setIsError(true);
    setTimeout(() => {
      setIsError(false);
    }, 2000);
  }

  const filteredCategories = categories.filter((category: Category) => {
    return (
      category.name.toLowerCase().includes(search.toLowerCase()) ||
      category.tasks.some((task: Task) =>
        task.title.toLowerCase().includes(search.toLowerCase()),
      )
    );
  });

  const completedTasks = categories.reduce(
    (acc: number, category: Category) => {
      return (
        acc +
        (category.tasks?.filter((task: Task) => task.isCompleted).length || 0)
      );
    },
    0,
  );

  const totalTasks = categories.reduce((acc: number, category: Category) => {
    return acc + (category.tasks?.length || 0);
  }, 0);

  function submitCategory(category: CategoryFormFields, categoryId?: string) {
    if (categoryId) {
      updateCategoryMutation.mutate({ category: category, categoryId });
    } else {
      createCategoryMutation.mutate(category);
    }
  }

  function openCategoryMenu(category?: Category) {
    if (category) {
      setSelectedCategory(category);
    }
    setIsCategoryMenuOpen(true);
  }

  function onDeleteCategory(categoryId: string) {
    const categoryToDelete = categories.find(
      (category: Category) => category.id === categoryId,
    );
    if (categoryToDelete) {
      setSelectedCategory(categoryToDelete);
    }
    setIsConfirmModalOpen(true);
  }

  async function applyDeleteCategory() {
    if (selectedCategory?.id) {
      deleteCategoryMutation.mutate(selectedCategory.id);
    }
  }

  function closeConfirmModal() {
    setSelectedCategory(undefined);
    setIsConfirmModalOpen(false);
  }

  function closeCategoryMenu() {
    setIsCategoryMenuOpen(false);
    setSelectedCategory(undefined);
  }

  return (
    <div className="px-5 md:px-[10%] lg:px-[20%] xl:px-[30%] flex flex-col gap-5 py-10">
      <ExtraActions
        completedTasks={completedTasks}
        totalTasks={totalTasks}
        search={search}
        setSearch={setSearch}
        openCategoryMenu={() => openCategoryMenu()}
        isLoading={isLoadingAddCategory}
      />
      {isLoading && (
        <Loader size="xl" color="violet" className="h-[calc(100vh-300px)]" />
      )}
      {!isLoading && filteredCategories.length > 0 ? (
        <div className="flex flex-col gap-5">
          {isError && (
            <div className="text-center text-stone-800 bg-red-200 p-2 rounded-md">
              Something went wrong, action may not executed
            </div>
          )}
          {filteredCategories?.map((category: Category) => (
            <CategoryItem
              key={category.id}
              category={category}
              openCategoryMenu={(category) => openCategoryMenu(category)}
              onDelete={onDeleteCategory}
              categories={categories}
              setErrorMessage={setErrorMessage}
            />
          ))}
        </div>
      ) : (
        !isLoading && <EmptyBoardBanner />
      )}
      {isCategoryMenuOpen && (
        <CategoryFormModal
          isOpen={isCategoryMenuOpen}
          category={selectedCategory}
          onSubmit={submitCategory}
          onDelete={onDeleteCategory}
          closeModal={closeCategoryMenu}
        />
      )}
      {isConfirmModalOpen && (
        <ConfirmModal
          isOpen={isConfirmModalOpen}
          closeModal={closeConfirmModal}
          onConfirm={applyDeleteCategory}
          objectName={selectedCategory?.name || ""}
          objectType="category"
        />
      )}
    </div>
  );
}
