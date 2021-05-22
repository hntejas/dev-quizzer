import { useReducer, useState } from "react";
import { useParams } from "react-router";

import Question from "../Question/Question";
import QuizResult from "../QuizResult/QuizResult";
import Modal from "../Modal/Modal";

import { quizReducer, initialQuizState } from "./quiz.reducer";
import { useQuizContext } from "../../context/QuizContext";

import { Quiz as QuizType } from "../../data/data.types";
import { CurrentQuestion } from "./quiz.types";

import "./quiz.css";

export default function Quiz() {
  const [quiz, quizDispatch] = useReducer(quizReducer, initialQuizState);
  const [showSubmitConfirmModal, setShowSubmitConfirmModal] = useState(false);

  const { quizId } = useParams();
  const { getQuiz } = useQuizContext();
  const currentQuiz: QuizType = getQuiz(parseInt(quizId));
  if (!currentQuiz) {
    return <h2>Quiz Not found</h2>;
  }

  const { quizName, questions, answers } = currentQuiz;
  const currentQuestion: CurrentQuestion = questions[quiz.currentQuestionIndex];
  currentQuestion.isFirstQuestion = quiz.currentQuestionIndex === 0;
  currentQuestion.isLastQuestion =
    quiz.currentQuestionIndex === questions.length - 1;

  const submittedAnswer: number | undefined =
    quiz.userAnswers[currentQuestion.questionId];

  const handleSubmit = () => {
    quizDispatch({
      type: "SUBMIT_QUIZ",
    });
    setShowSubmitConfirmModal(false);
  };

  const handleSubmitConfirmModalClose = () => {
    setShowSubmitConfirmModal(false);
  };

  const handleSubmitConfirmModalOpen = () => {
    setShowSubmitConfirmModal(true);
  };

  return (
    <div className="container">
      <h3 className="quiz-title">{quizName}</h3>
      {!quiz.isSubmitted ? (
        <>
          <Question
            currentQuestion={currentQuestion}
            submittedAnswer={submittedAnswer}
            quizDispatch={quizDispatch}
          />
          <h3 className="divider">Finish Quiz</h3>
          <button
            className="btn btn-secondary"
            onClick={handleSubmitConfirmModalOpen}
          >
            Submit
          </button>
        </>
      ) : (
        <QuizResult
          questions={questions}
          quizAnswers={answers}
          userAnswers={quiz.userAnswers}
        />
      )}

      <Modal
        isOpen={showSubmitConfirmModal}
        closeModal={handleSubmitConfirmModalClose}
      >
        <div className="quiz-confirm-form">
          <h4>Are you sure?</h4>
          <p>
            Please review your questions and make sure you've answered on all of
            them! There is no going back!
          </p>
          <div>
            <button
              onClick={handleSubmitConfirmModalClose}
              className="btn btn-primary"
            >
              Go Back
            </button>
            <button onClick={handleSubmit} className="btn btn-secondary">
              Submit Quiz
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
