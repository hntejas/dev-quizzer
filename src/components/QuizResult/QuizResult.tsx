import QuizStats from "./QuizStats";

import { Answers, Question } from "../../data/data.types";
import { UserAnswers, QuizResultStats } from "../Quiz/quiz.types";
import QuizAnswersReview from "./QuizAnswersReview";
import { Link } from "react-router-dom";
import { useQuery, gql, QueryResult } from "@apollo/client";

type QuizResultProps = {
  questions: Array<Question>;
  userAnswers: UserAnswers;
  quizId: Number;
};

const GET_QUIZ_ANSWERS = gql`
  query ($quizId: Int!) {
    quiz(quizId: $quizId) {
      quizId
      answers {
        questionId
        correctOptionId
        explanation
      }
    }
  }
`;

type RESPONSE = QueryResult<
  {
    quiz: {
      answers: [
        { questionId: number; correctOptionId: number; explanation: string }
      ];
    };
  },
  { quizId: Number }
>;
export default function QuizResult({
  questions,
  userAnswers,
  quizId,
}: QuizResultProps) {
  const { data, loading }: RESPONSE = useQuery(GET_QUIZ_ANSWERS, {
    variables: {
      quizId: quizId,
    },
  });
  let answers = {} as Answers;

  if (loading) {
    return <h3>Loading...</h3>;
  }

  data?.quiz?.answers.forEach((answer) => {
    answers[answer.questionId] = {
      correctOptionId: answer.correctOptionId,
      explanation: answer.explanation,
    };
  });

  let quizStats: QuizResultStats =
    !loading && getQuizStats(questions, answers, userAnswers);

  return (
    <>
      <QuizStats quizStats={quizStats} />
      <br />
      <QuizAnswersReview
        questions={questions}
        quizAnswers={answers}
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
