import catchError from "@/lib/utils/catch-error";
import { logOut } from "../../auth.api";

export async function GET() {
  const [response, error] = await catchError(logOut());
  console.log(response || error, error ? "Something went wrong" : "Logout successful");

  if (error) {
    return new Response("Something went wrong", { status: 500 });
  }

  return new Response("Failed to log out", { status: 500 });
}
