import { Route, Routes } from "react-router-dom";
import Quiz from "./components/Quiz/Quiz";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import QuizContextProvider from "./context/QuizContext";

function App() {
  return (
    <div className="App">
      <Header />
      <QuizContextProvider>
        <Routes>
          <Route path="quiz/:quizId" element={<Quiz />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </QuizContextProvider>
    </div>
  );
}

export default App;
