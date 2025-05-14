import { Button } from "@/components/ui/button";
import { ExamHistory } from "@/lib/Types/exam";

type Props = {
  historyData: ExamHistory[];
  examMap: Record<string, string>; // examId => examTitle
};

export default function QuizHistory({ historyData, examMap }: Props) {
  const groupedByExam = historyData.reduce((acc, item) => {
    const examId = item.QID.exam;
    if (!acc[examId]) {
      acc[examId] = [];
    }
    acc[examId].push(item);
    return acc;
  }, {} as Record<string, ExamHistory[]>);

  return (
    <div className="space-y-6">
      {Object.entries(groupedByExam).map(([examId, examHistory]) => {
        const examTitle = examMap[examId] || "Unknown Exam";
        const totalQuestions = examHistory.length;
        const correctAnswers = examHistory.filter((h) => h.checkAnswer === "correct").length;
        const totalTime = examHistory.reduce((sum, item) => sum + Number(item.avgAnswerTime), 0);

        return (
          <div key={examId} className="flex justify-between items-center bg-white py-4 px-9 rounded-lg shadow-lg my-4 w-full">
            <div>
              <h3 className="font-semibold text-lg ">{examTitle}</h3>
              <p className="text-gray-600 mb-4">{totalQuestions} Question</p>
              <p className="text-blue-600">
                {correctAnswers} Corrected answeres in {totalTime} mins
              </p>
            </div>
            <div className="text-center">
              <h4 className="text-sm"> 20 Minutes</h4>
              <Button variant="outline" className="bg-main-color text-white py-1 px-7 rounded-xl mt-2 border-main-color">
                Answers
              </Button>
              {/* <QuizDialog searchParams={searchParams}></QuizDialog> */}
            </div>
          </div>
        );
      })}
    </div>
  );
}
