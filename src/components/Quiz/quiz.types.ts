import { Question } from "../../data/data.types";

export type QuizState = {
  currentQuestionIndex: number;
  userAnswers: UserAnswers;
  isSubmitted: false | true;
};

export type UserAnswers = {
  [questionId: number]: number;
};

export interface CurrentQuestion extends Question {
  isFirstQuestion?: boolean;
  isLastQuestion?: boolean;
}

export type QuizResultStats = {
  totalPercent: number;
  totalQuestions: number;
  correctAnswers: number;
};

export type QuizAction =
  | {
      type: "CHANGE_QUESTION";
      payload: {
        type: "NEXT" | "BACK";
      };
    }
  | {
      type: "UPDATE_ANSWER";
      payload: {
        questionId: number;
        optionId: number;
      };
    }
  | {
      type: "SUBMIT_QUIZ";
    };
