import { TCreateUserForm, TLoginForm } from "@/types/form.types";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export async function signUp(data: TCreateUserForm) {
  const response = await fetch(`${apiUrl}/auth/signup`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response;
}

export async function login(user: TLoginForm) {
  const response = await fetch(`${apiUrl}/auth/login`, {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  return response;
}

export async function logout() {
  const response = await fetch(`${apiUrl}/auth/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  return response;
}

export async function refreshToken() {
  const response = await fetch(`${apiUrl}/auth/refresh`, {
    method: "GET",
    credentials: "include",
  });

  return response;
}
