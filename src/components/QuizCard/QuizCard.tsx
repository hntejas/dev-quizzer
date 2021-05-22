import { Link } from "react-router-dom";
import { QuizCard as QuizCardType } from "../../data/data.types";
import "./quiz-card.css";

type QuizCardProp = {
  quiz: QuizCardType;
};

export default function QuizCard({ quiz }: QuizCardProp) {
  return (
    <Link className="quiz-card" to={`/quiz/${quiz.quizId}`}>
      <img className="quiz-icon" src={quiz.quizCardIcon} alt={quiz.quizName} />
      <h3 className="quiz-name">{quiz.quizName}</h3>
      <h4>{quiz.totalQuestions} Questions</h4>
    </Link>
  );
}
