"use server";

const apiUrl = process.env.NEXT_PUBLIC_SERVER_API_URL;

export async function verifySessionToken(tokenValue: string) {
  if (!tokenValue) return null;

  try {
    const res = await fetch(`${apiUrl}/auth/verify`, {
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
