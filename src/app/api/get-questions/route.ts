import { NextRequest, NextResponse } from "next/server";
import { getAuthHeader } from "@/lib/utils/auth-header";
import { Question } from "@/lib/Types/question";

// GET handler
export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams.toString();
    const headers = await getAuthHeader();

    const res = await fetch(`${process.env.API}/questions?${searchParams}`, {
      headers: {
        ...headers,
      },
    });

    const payload: APIResponse<PaginatedResponse<{ questions: Question[] }>> =
      await res.json();

    return NextResponse.json(payload);
  } catch (error) {
    console.error("Error in /api/get-questions:", error);
    return NextResponse.json(
      { error: "Failed to fetch questions" },
      { status: 500 }
    );
  }
}
