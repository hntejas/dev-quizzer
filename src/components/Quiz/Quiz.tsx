import { useReducer, useState } from "react";
import { useParams } from "react-router";

import Question from "../Question/Question";
import QuizResult from "../QuizResult/QuizResult";
import Modal from "../Modal/Modal";

import { quizReducer, initialQuizState } from "./quiz.reducer";

import { Quiz as QuizType } from "../../data/data.types";
import { CurrentQuestion } from "./quiz.types";

import "./quiz.css";
import { useQuery, gql } from "@apollo/client";

const GET_QUIZ = gql`
  query ($quizId: Int!) {
    quiz(quizId: $quizId) {
      quizId
      quizName
      questions {
        questionId
        question
        options {
          optionId
          optionText
        }
      }
    }
  }
`;

export default function Quiz() {
  const [quiz, quizDispatch] = useReducer(quizReducer, initialQuizState);
  const [showSubmitConfirmModal, setShowSubmitConfirmModal] = useState(false);
  const { quizId } = useParams();
  const { loading, data } = useQuery(GET_QUIZ, {
    variables: {
      quizId: parseInt(quizId),
    },
  });
  const currentQuiz: QuizType | undefined = { ...data?.quiz };

  if (loading) {
    return <h2>Loading Quiz</h2>;
  }
  if (!currentQuiz) {
    return <h2>Quiz Not found</h2>;
  }

  const { quizName, questions } = currentQuiz;
  const currentQuestion: CurrentQuestion = questions && {
    ...questions[quiz.currentQuestionIndex],
  };
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
            quizSubmitHandler={() => setShowSubmitConfirmModal(true)}
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
          quizId={parseInt(quizId)}
          questions={questions}
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
