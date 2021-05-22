import { QuizResultStats } from "../Quiz/quiz.types";

type QuizStatsProps = {
  quizStats: QuizResultStats;
};

export default function QuizStats({ quizStats }: QuizStatsProps) {
  return (
    <div className="quiz-stats">
      <h3>Score: {quizStats.totalPercent}%</h3>
      <h3>Total Question: {quizStats.totalQuestions}</h3>
      <h3>Correct Answers: {quizStats.correctAnswers}</h3>
    </div>
  );
}
