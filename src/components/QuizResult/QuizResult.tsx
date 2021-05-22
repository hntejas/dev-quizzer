import QuizStats from "./QuizStats";

import { Answers, Question } from "../../data/data.types";
import { UserAnswers, QuizResultStats } from "../Quiz/quiz.types";
import QuizAnswersReview from "./QuizAnswersReview";
import { Link } from "react-router-dom";

type QuizResultProps = {
  questions: Array<Question>;
  quizAnswers: Answers;
  userAnswers: UserAnswers;
};

export default function QuizResult({
  questions,
  quizAnswers,
  userAnswers,
}: QuizResultProps) {
  let quizStats: QuizResultStats = getQuizStats(
    questions,
    quizAnswers,
    userAnswers
  );

  return (
    <>
      <QuizStats quizStats={quizStats} />
      <br />
      <QuizAnswersReview
        questions={questions}
        quizAnswers={quizAnswers}
        userAnswers={userAnswers}
      />
      <br />
      <Link to="/" className="btn btn-primary link-btn-fill">
        Go to Home Page and try our other quizes
      </Link>
    </>
  );
}

function getQuizStats(
  questions: Array<Question>,
  quizAnswers: Answers,
  userAnswers: UserAnswers
) {
  let stats = {
    totalPercent: 0,
    totalQuestions: questions.length,
    correctAnswers: 0,
  };
  for (let questionId in quizAnswers) {
    if (quizAnswers[questionId].correctOptionId === userAnswers[questionId]) {
      stats.correctAnswers++;
    }
  }
  stats.totalPercent = parseFloat(
    ((stats.correctAnswers / stats.totalQuestions) * 100).toFixed(2)
  );
  return stats;
}
