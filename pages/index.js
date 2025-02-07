import {useContext, useState} from "react";
import QuizContext from "./context/QuizContext";
import Link from "next/link";
import {BookOpen, Trophy} from "lucide-react";

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
    saveScore,
    leaderboard,
  } = useContext(QuizContext);

  const currentQ = filteredQuestions?.[currentQuestion] ?? {};

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
      <div className="min-h-screen flex flex-col items-center justify-center py-10 px-4 bg-gray-100">
        <div className="bg-white border-2 p-8 md:p-12 rounded-3xl shadow-md max-w-md w-full transform transition-all hover:shadow-xl">
          <div className="flex items-center gap-3 mb-8">
            <BookOpen className="w-8 h-8 text-purple-600" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              QuizMaster
            </h1>
          </div>

          <form
            className="flex flex-col gap-6"
            onSubmit={(e) => {
              e.preventDefault();
              if (nameInput.trim()) {
                startQuiz(nameInput, category);
                setNameInput("");
              }
            }}
          >
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Select Category
              </label>
              <select
                onChange={(e) => setCategory(e.target.value)}
                value={category}
                className="w-full p-3 border border-gray-200 rounded-xl bg-gray-50 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all outline-none"
                defaultValue="All"
                required
              >
                <option value="All">All categories</option>
                <option value="Geography">Geography</option>
                <option value="Sports">Sports</option>
                <option value="Movie">Movie</option>
                <option value="Science">Science</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Enter your name to begin
              </label>
              <input
                className="w-full p-3 border border-gray-200 rounded-xl bg-gray-50 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all outline-none"
                placeholder="Your name..."
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                onKeyDown={handleKeyDown}
                required
              />
            </div>

            <button
              type="submit"
              className="mt-4 w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium py-3 px-4 rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-150 focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              Start Quiz
            </button>
          </form>
        </div>
      </div>
    );
  }
  //If quiz is finished
  if (isQuizFinished) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center py-10 px-4 bg-gray-100">
        <div className="bg-white p-10 border border-gray-300 rounded-2xl shadow-lg flex flex-col gap-6 items-center w-full max-w-lg">
          <div className="flex gap-3 items-center">
            <BookOpen className="w-10 h-10 text-purple-600" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              QuizMaster
            </h1>
          </div>
          <h2 className="text-2xl font-semibold text-gray-800">End of Quiz</h2>
          <p className="text-lg text-gray-700 font-medium">
            Points: {currentScore}
          </p>
          <div className="w-full border-t border-gray-300"></div>
          <p className="font-semibold text-lg text-gray-800">Your Answers:</p>
          <div className="w-full space-y-4">
            {answerHistory.map((answer, index) => (
              <div
                key={index}
                className="bg-gray-50 p-4 rounded-lg shadow-sm w-full"
              >
                <p className="text-lg font-semibold text-gray-900">
                  Q: {answer.question}
                </p>
                <p
                  className={`text-lg font-medium ${
                    answer.isCorrect ? "text-green-600" : "text-red-600"
                  }`}
                >
                  Your answer: {answer.selected}
                </p>
                {!answer.isCorrect && (
                  <p className="text-gray-700">
                    Correct Answer: {answer.correctAnswer}
                  </p>
                )}
              </div>
            ))}
          </div>
          <div className="flex gap-6 mt-6">
            <button
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg shadow-md hover:shadow-lg font-medium transition-all duration-150 focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              onClick={restartQuiz}
            >
              Play Again
            </button>
            <Link href="/leaderboard">
              <button className="px-6 py-3 border border-gray-300 rounded-lg bg-gray-200 hover:bg-gray-300 transition-all duration-150 flex gap-2 items-center text-black">
                Leaderboard <Trophy className="text-orange-400" size={20} />
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Get the quiz
  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-10 px-4 bg-gray-50">
      <div className="bg-white shadow-lg rounded-xl p-6 max-w-2xl w-full space-y-6">
        {/* Question Number & Category */}
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-500">
            Question {currentQuestion + 1}/{filteredQuestions.length}
          </span>
          <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-bold">
            {currentQ?.category || "Unknown Category"}
          </span>
        </div>

        {/* Question Text */}
        <h2 className="text-xl font-medium text-gray-800 text-center">
          {currentQ.question}
        </h2>

        {/* Answer Options */}
        <div className="grid grid-cols-1 gap-4">
          {currentQ.option.map((opt, index) => {
            const letter = String.fromCharCode(65 + index); // A, B, C, D
            const isSelected =
              answerHistory[answerHistory.length - 1]?.selected === opt;
            const isCorrect = opt === currentQ.answer;

            return (
              <button
                key={index}
                onClick={() => handleAnswer(opt)}
                disabled={isAnswerSelected}
                className={`flex items-center justify-between p-4 border-2 rounded-lg transition-all duration-300 
              ${
                isAnswerSelected
                  ? isCorrect
                    ? "bg-green-100 border-green-500 text-green-700"
                    : isSelected
                    ? "bg-red-100 border-red-500 text-red-700"
                    : "opacity-50"
                  : "border-gray-200 hover:border-purple-500 hover:bg-purple-50 hover:shadow-md"
              }`}
              >
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 font-medium text-gray-700">
                    {letter}
                  </span>
                  <span className="font-bold">{opt}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
