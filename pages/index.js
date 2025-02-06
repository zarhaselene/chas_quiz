import {useContext, useState} from "react";
import QuizContext from "./context/QuizContext";

export default function Home() {
  const {
    questions,
    currentQuestion,
    handleAnswer,
    restartQuiz,
    isQuizStarted,
    startQuiz,
    isQuizFinished,
    currentScore,
    isAnswerSelected,
    answerHistory,
    selectedCategory,
    filteredQuestions,
  } = useContext(QuizContext);

  const currentQ = filteredQuestions[currentQuestion];

  const [nameInput, setNameInput] = useState("");
  const [category, setCategory] = useState("All");

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (nameInput.trim()) {
        startQuiz(nameInput, category);
      }
    }
  };

  // If quiz is not started
  if (!isQuizStarted) {
    return (
      <div>
        <h1>Welcome to quiz master!</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (nameInput.trim()) {
              startQuiz(nameInput, category);
              setNameInput("");
            }
          }}
        >
          <select
            onChange={(e) => setCategory(e.target.value)}
            value={category}
            className="p-2"
            defaultValue="All categories"
            required
          >
            <option value="All categories">All categories</option>
            <option value="Geography">Geography</option>
            <option value="Sports">Sports</option>
            <option value="Movie">Movie</option>
            <option value="Science">Science</option>
          </select>
          <label>Enter name to start :D</label>

          <input
            className="border border-slate-500 p-2"
            placeholder="Enter name..."
            type="text"
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            onKeyDown={handleKeyDown}
            required
          />

          <button
            type="submit"
            className="border border-slate-500 p-2 bg-green-500 text-white w-24"
          >
            Start
          </button>
        </form>
      </div>
    );
  }
  //If quiz is finished
  if (isQuizFinished) {
    return (
      <div>
        <h1>End of quiz</h1>
        <p>Points: {currentScore} </p>
        <p>Result:</p>
        {answerHistory.map((answer, index) => {
          return (
            <div key={index}>
              <p>Q: {answer.question} </p>{" "}
              <p
                className={answer.isCorrect ? "text-green-500" : "text-red-500"}
              >
                Your answer:
                {answer.selected}
              </p>
              {!answer.isCorrect && (
                <p>Correct Answer: {answer.correctAnswer}</p>
              )}
            </div>
          );
        })}
        <button className="border p-2" onClick={restartQuiz}>
          Play again
        </button>
      </div>
    );
  }
  // Get the quiz
  return (
    <div>
      <div className="flex items-center justify-between">
        <h2>Question {currentQuestion + 1}:</h2>
        <p>{currentQ.category}</p>
      </div>

      <p>{currentQ.question}</p>
      {currentQ.option.map((opt, index) => (
        <button
          className={`border border-slate-500 my-2 p-2 ${
            isAnswerSelected
              ? opt === currentQ.answer
                ? "bg-green-500 text-white"
                : opt === answerHistory[answerHistory.length - 1]?.selected
                ? "bg-red-500 text-white"
                : ""
              : ""
          }`}
          key={index}
          onClick={() => handleAnswer(opt)}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}
