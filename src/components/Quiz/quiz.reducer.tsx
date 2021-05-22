import { QuizState, QuizAction } from "./quiz.types";

export const initialQuizState: QuizState = {
  currentQuestionIndex: 0,
  userAnswers: {},
  isSubmitted: false,
};

const changeQuestion = (
  state: QuizState,
  payload: {
    type: "NEXT" | "BACK";
  }
) => {
  const stateCopy: QuizState = { ...state };
  if (payload.type === "NEXT") {
    stateCopy.currentQuestionIndex = state.currentQuestionIndex + 1;
  } else {
    stateCopy.currentQuestionIndex = state.currentQuestionIndex - 1;
  }

  return stateCopy;
};

const updateAnswer = (
  state: QuizState,
  payload: {
    questionId: number;
    optionId: number;
  }
) => {
  const stateCopy: QuizState = { ...state };
  stateCopy.userAnswers = {
    ...state.userAnswers,
    [payload.questionId]: payload.optionId,
  };
  return stateCopy;
};

const submitQuiz = (state: QuizState): QuizState => {
  const stateCopy = { ...state };
  stateCopy.isSubmitted = true;
  return stateCopy;
};

export const quizReducer = (
  state: QuizState,
  action: QuizAction
): QuizState => {
  switch (action.type) {
    case "CHANGE_QUESTION":
      return changeQuestion(state, action.payload);
    case "UPDATE_ANSWER":
      return updateAnswer(state, action.payload);
    case "SUBMIT_QUIZ":
      return submitQuiz(state);
    default:
      return state;
  }
};
