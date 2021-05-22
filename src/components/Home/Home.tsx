import Particles from "react-particles-js";

import QuizCard from "../QuizCard/QuizCard";
import { quizCatalog } from "../../data/data";

import "./home.css";

const particleConfig = {
  fpsLimit: 60,
  particles: {
    number: {
      value: window.screen.width > 600 ? 45 : 15,
    },
    size: {
      value: 3,
    },
    move: {
      speed: 3,
    },
  },
  interactivity: {
    events: {
      onhover: {
        enable: false,
        mode: "repulse",
      },
    },
  },
};

export default function Home() {
  return (
    <>
      <div className="banner">
        <Particles height="40vh" params={particleConfig} />
        <div className="banner-text">
          <h2 className="banner-text-heading">Welcome to Dev Quizzer</h2>
          <p className="banner-text-para">
            Test your skills with our top topics with a variety of questions
          </p>
        </div>
      </div>
      <div className=" quiz-card-container">
        {quizCatalog.map((quiz) => (
          <QuizCard key={quiz.quizId} quiz={quiz} />
        ))}
      </div>
    </>
  );
}
