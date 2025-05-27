import type { LoginFormFields } from "../types/user.types";

const API_URL = import.meta.env.VITE_API_URL;

export async function login(formFields: LoginFormFields) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formFields),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message);
  }
  const user = { ...data.user, token: data.access_token };
  sessionStorage.setItem("user", JSON.stringify(user));
  return user;
}

export async function register(formFields: LoginFormFields) {
  const response = await fetch(`${API_URL}/auth`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formFields),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message);
  }
  const user = { ...data.user, token: data.access_token };
  sessionStorage.setItem("user", JSON.stringify(user));
  return user;
}

export function getSessionUser() {
  const user = sessionStorage.getItem("user");
  return user ? JSON.parse(user) : null;
}
