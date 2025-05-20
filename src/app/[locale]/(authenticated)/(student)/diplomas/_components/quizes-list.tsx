import { getAllExams } from "@/app/api/exams.api";
import catchError from "@/lib/utils/catch-error";
import React from "react";
import { PiExamFill } from "react-icons/pi";
import QuizDialog from "./question-dialog";
type ExamsListProps = {
  searchParams: SearchParams;
};
export default async function QuizesList({ searchParams }: ExamsListProps) {
  const subjectId = searchParams.subject;
  const [payload, error] = await catchError(getAllExams(`subject=${subjectId}`));

  return (
    <main>
      {/* Tilte */}
      <h2 className="text-lg font-medium">Front-End Quiz</h2>
      <ul>
        {payload?.exams.map((exam) => (
          <li key={exam._id} className="flex justify-between items-center bg-white p-6 rounded-lg shadow-lg my-4">
            {/* Exam */}
            <div className="flex items-center">
              <PiExamFill className="text-6xl mr-6" />
              {/* Exam description */}
              <div>
                <h3 className="font-medium">{exam.title}</h3>
                <p className="text-darkGray text-sm mt-2">{exam.numberOfQuestions} Question</p>
              </div>
            </div>

            <div className="text-center">
              <h4 className="text-sm"> {exam.duration} Minutes</h4>
              <QuizDialog searchParams={searchParams}></QuizDialog>
            </div>
          </li>
        ))}
        <li></li>
      </ul>
      {error && <p className="text-red-500 text-center">{error.message}</p>}
    </main>
  );
}
