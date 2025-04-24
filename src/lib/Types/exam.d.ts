export type Exam={
            _id: string,
            title: string,
            duration: number,
            subject: string,
            numberOfQuestions: number,
            active: boolean,
}


export type ExamHistory = {
  _id: string;
  checkAnswer: string;
  QID: {
    _id: string;
    question: string;
    answers: { key: string; answer: string }[];
    correct: string;
    exam:string
  };
  chosenAnswer: string;
  avgAnswerTime: string;
};