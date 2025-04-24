import { Question } from "@/lib/Types/question";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

export default function useQuestions() {
  // Navigation
  const searchParams = useSearchParams();
  // Queries
  const { error, isLoading, data } = useQuery({
    queryKey: ["questions"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API}/questions?${searchParams.toString()}`
      );
      const payload: APIResponse<{ questions: Question[] }> =
        await res.json();
      if ("code" in payload) {
        throw new Error(payload.message)
      };
      console.log(payload.questions.map((q)=>q._id) )
      return payload;
    },
  });

  return { isLoading, error, payload: data };
}
