import React from "react";

import { QuizAction, CurrentQuestion } from "../Quiz/quiz.types";
import { Option } from "../../data/data.types";

type QuestionProp = {
  submittedAnswer: number | undefined;
  quizDispatch: React.Dispatch<QuizAction>;
  currentQuestion: CurrentQuestion;
};

export default function Question({
  submittedAnswer,
  quizDispatch,
  currentQuestion,
}: QuestionProp) {
  const updateAnswer = (questionId: number, optionId: number) => {
    quizDispatch({
      type: "UPDATE_ANSWER",
      payload: {
        questionId: questionId,
        optionId: optionId,
      },
    });
  };

  const changeQuestion = (type: "BACK" | "NEXT") => {
    quizDispatch({
      type: "CHANGE_QUESTION",
      payload: {
        type: type,
      },
    });
  };

  return (
    <div className="question-container">
      <h3 className="divider">Question {currentQuestion.questionId}</h3>
      <p className="question-text">{currentQuestion.question}</p>
      <ul>
        {currentQuestion.options.map(({ optionId, optionText }: Option) => {
          const isOptionSelected = submittedAnswer === optionId;
          return (
            <li
              key={optionId}
              className={isOptionSelected ? "checked" : "unchecked"}
            >
              <input
                type="radio"
                id={`option-${optionId}`}
                value={optionId}
                checked={isOptionSelected}
                onChange={() =>
                  updateAnswer(currentQuestion.questionId, optionId)
                }
              />
              <label htmlFor={`option-${optionId}`}>
                <div className="check"></div>
                <span>{optionText}</span>
              </label>
            </li>
          );
        })}
      </ul>
      <div className="cta-container">
        {!currentQuestion.isFirstQuestion && (
          <button
            className="btn btn-primary"
            onClick={() => changeQuestion("BACK")}
          >
            Previous
          </button>
        )}

        {!currentQuestion.isLastQuestion && (
          <button
            className="btn btn-primary"
            onClick={() => changeQuestion("NEXT")}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}
