import { Subject } from "@/lib/Types/subjects";
import { Exam } from "@/lib/Types/exam";
export type Question = {
  answers: {
    answer: string;
    key: string;
  }[];
  type: "single_choice" | "multiple_choice";
  _id: string;
  question: string;
  correct: string;
  subject: Subject;
  exam: Exam;
} & DatabaseProperies;
