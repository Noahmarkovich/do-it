import type { CategoryFormFields } from "../types/category.type";

const API_URL = import.meta.env.VITE_API_URL;

export async function getCategories() {
  try {
    const user = JSON.parse(sessionStorage.getItem("user") || "{}");
    const response = await fetch(`${API_URL}/categories/${user.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });

    if (!response.ok) {
      throw response;
    }

    return response.json();
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    throw error;
  }
}

export async function createCategory(category: CategoryFormFields) {
  const user = JSON.parse(sessionStorage.getItem("user") || "{}");
  const response = await fetch(`${API_URL}/categories`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.token}`,
    },
    body: JSON.stringify({
      ...category,
      userId: user.id,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to create category");
  }

  return response.json();
}

export async function updateCategory(
  category: CategoryFormFields,
  categoryId: string,
) {
  const user = JSON.parse(sessionStorage.getItem("user") || "{}");
  const response = await fetch(`${API_URL}/categories/${categoryId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.token}`,
    },
    body: JSON.stringify({
      ...category,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to update category");
  }

  return response.json();
}

export async function deleteCategory(categoryId: string) {
  const user = JSON.parse(sessionStorage.getItem("user") || "{}");
  const response = await fetch(`${API_URL}/categories/${categoryId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to delete category");
  }

  return response.json();
}
