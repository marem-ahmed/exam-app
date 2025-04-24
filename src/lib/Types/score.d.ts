export type ScoreData = {
  message: string;
  correct: number;
  wrong: number;
  total: string;
  WrongQuestions: {
    QID: string;
    Question: string;
    inCorrectAnswer: string;
    correctAnswer: string;
    answers: Record<string, string>;
  }[];
  correctQuestions: {
    QID: string;
    Question: string;
    correctAnswer: string;
    answers: Record<string, string>;
  }[];
};