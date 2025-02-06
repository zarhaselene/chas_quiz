import {createContext, useState, useEffect, use} from "react";

const QuizContext = createContext();

/*
TODO torsdag:
- score / highscore - localStorage
- admin
- design

*/

export function QuizProvider({children}) {
  const [questions, setQuestions] = useState([
    {
      id: 1,
      question: "The captial city of Spain?",
      option: ["Stockholm", "Madrid", "Santiago", "Malmo"],
      answer: "Madrid",
      category: "Geography",
    },
    {
      id: 2,
      question: "The captial city of Sweden?",
      option: ["Stockholm", "Madrid", "Santiago", "Malmo"],
      answer: "Stockholm",
      category: "Geography",
    },
    {
      id: 3,
      question: "Who played the joker in The dark knight?",
      option: ["Bruce Lee", "Eddie Murphy", "Julia Roberts", "Heath Ledger"],
      answer: "Heath Ledger",
      category: "Movie",
    },
    {
      id: 4,
      question: "How tall is Zlatan Ibrahimovic?",
      option: ["190cm", "188cm", "199cm", "195cm"],
      answer: "195cm",
      category: "Sports",
    },
    {
      id: 5,
      question: "How many Ballon d'Or awards has Cristiano Ronaldo won?",
      option: ["5", "7", "3", "8"],
      answer: "5",
      category: "Sports",
    },
    {
      id: 6,
      question: "The boiling point of water?",
      option: ["50 celsius", "70 celsius", "95 celsius", "100 celsius"],
      answer: "100 celsius",
      category: "Science",
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
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredQuestions, setFilteredQuestions] = useState([questions]);

  const startQuiz = (name, category) => {
    setPlayerName(name);
    setIsQuizStarted(true);
    setIsQuizFinished(false);
    setCurrentScore(0);
    setCurrentQuestion(0);
    setUserAnswer(null);
    setSelectedCategory(category);

    // Filter by category
    let newFilteredQuestions =
      category === "All"
        ? questions
        : questions.filter((q) => q.category === category);
    setFilteredQuestions(newFilteredQuestions);
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
    }, 1000);
  };
  // Next question
  const nextQuestion = () => {
    if (currentQuestion + 1 < filteredQuestions.length) {
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
    setSelectedCategory("All");
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
      prevQuestions.map((q) => (q.id === id ? {...q, ...updateQuestion} : q))
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
        selectedCategory,
        filteredQuestions,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}
export default QuizContext;
