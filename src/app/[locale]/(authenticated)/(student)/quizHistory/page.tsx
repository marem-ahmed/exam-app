

import { getAllExams, getExamHistory } from "@/app/api/exams.api";
import QuizHistory from "./_components/quiz-history";
import catchError from "@/lib/utils/catch-error";

export default async function QuizHistoryPage() {
const [historyRes] = await catchError(() => getExamHistory());
const historyData = historyRes?.history
  ? Array.isArray(historyRes.history)
    ? historyRes.history
    : [historyRes.history]
  : [];

  const [examList] = await catchError(() => getAllExams(""));

  const examMap = Object.fromEntries(
    examList?.exams?.map((exam) => [exam._id, exam.title]) || []
  );

  console.log(historyData);

  return (
    <main className="p-6 ">
      <h1 className="text-2xl font-bold mb-6 ">
        Front-End Quiz
      </h1>
      <QuizHistory historyData={historyData} examMap={examMap} />
    </main>
  );
}
