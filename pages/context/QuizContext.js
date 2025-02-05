import { createContext, useState, useEffect, use } from "react";

const QuizContext = createContext();

/*
TODO torsdag:
- highscore - localStorage
- kategorier (tags)
- admin
- design

*/

export function QuizProvider({ children }) {
  const [questions, setQuestions] = useState([
    {
      id: 1,
      question: "The captial city of Spain?",
      option: ["Stockholm", "Madrid", "Santiago", "Malmo"],
      answer: "Madrid",
    },
    {
      id: 2,
      question: "The captial city of Sweden?",
      option: ["Stockholm", "Madrid", "Santiago", "Malmo"],
      answer: "Stockholm",
    },
  ]);

  const [currentScore, setCurrentScore] = useState(0);
  const [playerName, setPlayerName] = useState("");
  const [userAnswer, setUserAnswer] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [isAnswerSelected, setIsAnswerSelected] = useState(false);
  const [answerHistory, setAnswerHistory] = useState([]);

  const startQuiz = (name) => {
    setPlayerName(name);
    setIsQuizStarted(true);
    setIsQuizFinished(false);
    setCurrentScore(0);
    setCurrentQuestion(0);
    setUserAnswer(null);
  };

  // Handle answer
  const handleAnswer = (option) => {
    if (isAnswerSelected) return;

    setIsAnswerSelected(true);
    setUserAnswer(option);

    const correct = option === questions[currentQuestion].answer;

    if (correct) {
      setCurrentScore((prevScore) => prevScore + 1);
    }
    setAnswerHistory((prev) => [
      ...prev,
      {
        question: questions[currentQuestion].question,
        selected: option,
        correctAnswer: questions[currentQuestion].answer,
        isCorrect: correct,
      },
    ]);

    //timeout
    setTimeout(() => {
      nextQuestion();
      setIsAnswerSelected(false);
    }, 2000);
  };
  // Next question
  const nextQuestion = () => {
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setIsQuizFinished(true);
    }
  };
  // Restart Quiz
  const restartQuiz = () => {
    setCurrentScore(0);
    setCurrentQuestion(0);
    setPlayerName("");
    setUserAnswer(null);
    setIsQuizStarted(false);
    setIsQuizFinished(false);
  };
  // Add new question
  const addQuestion = (newQuestion) => {
    setQuestions((prevQuestions) => [
      ...prevQuestions,
      {
        id: prevQuestions.length + 1,
        ...newQuestion,
      },
    ]);
  };
  // Remove question
  const removeQuestion = (id) => {
    setQuestions((prevQuestion) => prevQuestion.filter((q) => q.id !== id));
  };
  // Update question
  const updateQuestion = (id, updateQuestion) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) => (q.id === id ? { ...q, ...updateQuestion } : q))
    );
  };

  return (
    <QuizContext.Provider
      value={{
        questions,
        currentScore,
        playerName,
        userAnswer,
        currentQuestion,
        handleAnswer,
        nextQuestion,
        restartQuiz,
        addQuestion,
        removeQuestion,
        updateQuestion,
        startQuiz,
        isQuizStarted,
        isQuizFinished,
        answerHistory,
        isAnswerSelected,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}
export default QuizContext;
