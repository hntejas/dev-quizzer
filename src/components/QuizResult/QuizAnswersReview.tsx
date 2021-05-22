import { Answers, Question } from "../../data/data.types";
import { UserAnswers } from "../Quiz/quiz.types";

type QuizAnswersReviewProps = {
  questions: Array<Question>;
  quizAnswers: Answers;
  userAnswers: UserAnswers;
};

export default function QuizAnswersReview({
  questions,
  quizAnswers,
  userAnswers,
}: QuizAnswersReviewProps) {
  return (
    <>
      <h3 className="section-title">Review Your Answers</h3>
      {questions.map(({ questionId, question, options }) => {
        const userSelectedOption = userAnswers[questionId];
        const rightOption = quizAnswers[questionId].correctOptionId;
        return (
          <div key={questionId} className="question-container">
            <h3 className="divider">Question {questionId}</h3>
            <p className="question-text">{question}</p>
            <ul>
              {options.map((option) => {
                const isRightAnswer = option.optionId === rightOption;
                const isWrongAnswer =
                  userSelectedOption !== undefined &&
                  userSelectedOption === option.optionId &&
                  option.optionId !== rightOption;
                return (
                  <li
                    className={
                      isRightAnswer
                        ? "success-check"
                        : isWrongAnswer
                        ? "failure-check"
                        : ""
                    }
                  >
                    <div className="check"></div>
                    <p key={option.optionId}>{option.optionText}</p>
                  </li>
                );
              })}
            </ul>
            <div
              className={
                "question-explanation " +
                (userSelectedOption === rightOption
                  ? "success-check"
                  : "failure-check")
              }
            >
              {userSelectedOption === rightOption && (
                <p>
                  <span role="img">🥳</span> Yay! You got it right
                </p>
              )}
              {!userSelectedOption && (
                <p>
                  <span role="img">🤐</span> You skipped the question
                </p>
              )}
              {!!userSelectedOption && userSelectedOption !== rightOption && (
                <p>
                  <span role="img">😬</span> Ops! You got it wrong
                </p>
              )}
              <p>{quizAnswers[questionId].explanation}</p>
            </div>
          </div>
        );
      })}
    </>
  );
}
