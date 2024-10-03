import { getCookie } from "./session";

const serverUrl = process.env.NEXT_PUBLIC_BACKEND_URL_SERVER;
export async function verifySessionToken(tokenValue: string) {
  if (!tokenValue) return null;

  try {
    const res = await fetch(`${serverUrl}/api/auth/verify`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Cookie: `session=${tokenValue}`,
      },
      cache: "no-cache",
    });

    if (res.ok) return true;
    else return false;
  } catch (error) {
    console.error("Error getting user details:", error);
    throw new Error("No user details were found");
  }
}
