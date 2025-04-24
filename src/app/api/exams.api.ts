import { Exam, ExamHistory } from "@/lib/Types/exam"
import { getAuthHeader } from "@/lib/utils/auth-header"

export async function  getAllExams(searchParams:string){
 
 try {
      const res = await fetch(`${process.env.API}/exams?${searchParams}`, {
        headers: {
          ...(await getAuthHeader()),
        },
        cache: "no-store",
      }); 
const payload:APIResponse<PaginatedResponse<{exams:Exam[]}>>=await res.json()
return payload  
} catch {
    
throw new Error("Failed to fetch exams")

}
 
}
export async function getExamHistory() {
  try {
    const res = await fetch(`${process.env.API}/questions/history`, {
      headers: {
        ...(await getAuthHeader()),
      },
      cache: "no-store", 
    });

    
    const payload: APIResponse<{ history: ExamHistory[] }> = await res.json();
    return payload
  } catch  {
    throw new Error("Failed to fetch quiz history");
  }
}