import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from "../services/category.service";
import type { Category, CategoryFormFields } from "@/types/category.type";
import { useNavigate } from "react-router-dom";

export default function useCategoriesActions(
  setIsLoadingAddCategory: (isLoading: boolean) => void,
  setIsError: (isError: boolean) => void,
  setErrorMessage: () => void,
  closeConfirmModal: () => void,
) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {
    data: categories = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  if (error) {
    if (error instanceof Response && error.status === 401) {
      navigate("/login");
    } else {
      setErrorMessage();
    }
  }

  const createCategoryMutation = useMutation({
    mutationFn: createCategory,
    onMutate: async (newCategory: CategoryFormFields) => {
      setIsLoadingAddCategory(true);
      await queryClient.cancelQueries({ queryKey: ["categories"] });
      const previousCategories = queryClient.getQueryData(["categories"]);
      queryClient.setQueryData(["categories"], (old: Category[] = []) => [
        ...old,
        { id: "temp-id", ...newCategory, tasks: [] },
      ]);
      return { previousCategories };
    },
    onError: (err, newCategory, context) => {
      setIsError(true);
      queryClient.setQueryData(["categories"], context?.previousCategories);
      setErrorMessage();
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      setIsLoadingAddCategory(false);
    },
  });

  const updateCategoryMutation = useMutation({
    mutationFn: ({
      category,
      categoryId,
    }: {
      category: CategoryFormFields;
      categoryId: string;
    }) => updateCategory(category, categoryId),
    onMutate: async ({
      category,
      categoryId,
    }: {
      category: CategoryFormFields;
      categoryId: string;
    }) => {
      await queryClient.cancelQueries({ queryKey: ["categories"] });
      const previousCategories = queryClient.getQueryData(["categories"]);
      queryClient.setQueryData(["categories"], (old: Category[] = []) =>
        old.map((cat: Category) =>
          cat.id === categoryId ? { ...cat, ...category } : cat,
        ),
      );

      return { previousCategories };
    },
    onError: (err, newCategory, context) => {
      setIsError(true);
      queryClient.setQueryData(["categories"], context?.previousCategories);
      setErrorMessage();
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  const deleteCategoryMutation = useMutation({
    mutationFn: deleteCategory,
    onMutate: async (categoryId: string) => {
      await queryClient.cancelQueries({ queryKey: ["categories"] });
      const previousCategories = queryClient.getQueryData(["categories"]);
      queryClient.setQueryData(["categories"], (old: Category[] = []) =>
        old.filter((category: Category) => category.id !== categoryId),
      );

      return { previousCategories };
    },
    onError: (err, categoryId, context) => {
      setIsError(true);
      queryClient.setQueryData(["categories"], context?.previousCategories);
      setErrorMessage();
    },
    onSettled: () => {
      closeConfirmModal();
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  return {
    categories,
    isLoading,
    createCategoryMutation,
    updateCategoryMutation,
    deleteCategoryMutation,
  };
}
