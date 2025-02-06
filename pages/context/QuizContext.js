import {createContext, useState, useEffect} from "react";

const QuizContext = createContext();

/*
TODO fredag:
- olika leaderboards för kategori och att högsta highscore sparas för en användare
- spara nya quiz till localstorage och lägga till kategori i admin
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
  const [filteredQuestions, setFilteredQuestions] = useState(questions);
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    // Load leaderboard from localStorage on initial load
    const storedLeaderboard = localStorage.getItem("leaderboard");
    if (storedLeaderboard) {
      setLeaderboard(JSON.parse(storedLeaderboard));
    }
  }, []);

  // save score and time to leaderboard
  const saveScore = (playerName, score) => {
    if (!playerName) return;

    const currentDate = new Date().toLocaleString("en-SE", {
      timeZone: "Europe/Stockholm",
    });

    const newEntry = {name: playerName, score, date: currentDate};

    setLeaderboard((prevLeaderboard) => {
      const existingPlayerIndex = prevLeaderboard.findIndex(
        (entry) => entry.name === playerName
      );
      if (existingPlayerIndex !== -1) {
        const updatedLeaderboard = prevLeaderboard.map((entry, index) => {
          if (index === existingPlayerIndex) {
            return {...entry, score, currentDate};
          }
          return entry;
        });
        return updatedLeaderboard
          .sort((a, b) => b.score - a.score)
          .slice(0, 10);
      } else {
        const newEntry = {name: playerName, score, currentDate};
        return [...prevLeaderboard, newEntry]
          .sort((a, b) => b.score - a.score)
          .slice(0, 10);
      }
    });
  };

  // Store leaderboard in localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
  }, [leaderboard]);

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

    const correct = option === filteredQuestions[currentQuestion].answer;

    if (correct) {
      setCurrentScore((prevScore) => prevScore + 1);
    }
    setAnswerHistory((prev) => [
      ...prev,
      {
        question: filteredQuestions[currentQuestion].question,
        selected: option,
        correctAnswer: filteredQuestions[currentQuestion].answer,
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

      if (saveScore && playerName) {
        saveScore(playerName, currentScore);
      } else {
        console.log("error");
      }
    }
  };

  useEffect(() => {
    if (isQuizFinished && playerName && currentScore !== undefined) {
      saveScore(playerName, currentScore);
    }
  }, [isQuizFinished, currentScore, playerName]);

  // Restart Quiz
  const restartQuiz = () => {
    setCurrentScore(0);
    setCurrentQuestion(0);
    setPlayerName("");
    setUserAnswer(null);
    setIsQuizStarted(false);
    setIsQuizFinished(false);
    setSelectedCategory("All");
    setAnswerHistory([]);
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
        saveScore,
        leaderboard,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}
export default QuizContext;
