import { useContext, useState } from "react";
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
  } = useContext(QuizContext);

  const currentQ = questions[currentQuestion];

  const [nameInput, setNameInput] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (nameInput.trim()) {
        startQuiz(nameInput);
      }
    }
  };

  // If quiz is not started
  if (!isQuizStarted) {
    return (
      <div>
        <h1>Welcome to quiz master!</h1>
        <label>Enter name to start :D</label>
        <input
          className="border border-slate-500 p-2"
          placeholder="Enter name..."
          type="text"
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          onClick={() => {
            startQuiz(nameInput);
            console.log("isQuizStarted: ", isQuizStarted);
            setNameInput("");
          }}
          className="border border-slate-500 p-2 bg-green-500 text-white w-24"
        >
          Start
        </button>
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
        <button className="border p-2" onClick={restartQuiz}>Play again</button>
      </div>
    );
  }
  // Get the quiz
  return (
    <div>
      <h2>Question {currentQuestion + 1}:</h2>
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
