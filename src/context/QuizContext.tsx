import { createContext, useContext } from "react";
import { quizdb } from "../data/data";
import { Quiz } from "../data/data.types";
const getQuiz = (quizId: number) => {
  return quizdb.find((quiz) => quiz.quizId === quizId);
};

export const QuizContext = createContext<QuizContextType>({
  quizdb: quizdb,
  getQuiz: getQuiz,
});

type QuizContextType = {
  quizdb?: Array<Quiz>;
  getQuiz?: (quizId: number) => Quiz | undefined;
};

type QuizContextProviderProps = {
  children?: React.ReactChild;
};

export default function QuizContextProvider({
  children,
}: QuizContextProviderProps) {
  return (
    <QuizContext.Provider value={{ quizdb: quizdb, getQuiz: getQuiz }}>
      {children}
    </QuizContext.Provider>
  );
}

export const useQuizContext = (): QuizContextType => {
  return useContext(QuizContext);
};
