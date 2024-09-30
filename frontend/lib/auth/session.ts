"use server";

import { cookies } from "next/headers";

export async function getCookie(name: string) {
  return cookies().get(name);
}

export async function setCookie(name: string, value: any) {
  return cookies().set(name, value);
}

export async function removeCookie(name: string) {
  return cookies().delete(name);
}
