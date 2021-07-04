export type Quiz = {
  quizId: number;
  quizName: String;
  questions: Array<Question>;
  answers: Answers;
};

export type QuizCatalog = Array<QuizCard>;

export type QuizCard = {
  quizId: number;
  quizName: string;
  totalQuestions: number;
  quizCardIcon: string;
};

export type Question = {
  questionId: number;
  question: string;
  options: Array<Option>;
};

export type Option = {
  optionId: number;
  optionText: string;
};

export type Answers = {
  [questionId: number]: {
    correctOptionId: number;
    explanation: string;
  };
};
