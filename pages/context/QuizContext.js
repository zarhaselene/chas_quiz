import {createContext, useState, useEffect} from "react";

// Create context to share quiz data across components
const QuizContext = createContext();

export function QuizProvider({children}) {
  // Default questions to be used if no questions exist in localStorage
  const defaultQuestions = [
    // Question objects here...
  ];

  // State to hold the list of questions
  const [questions, setQuestions] = useState([]);

  // Load questions from localStorage or use default questions if not found
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Retrieve stored questions from localStorage or default to empty array
      const storedQuestions = JSON.parse(
        localStorage.getItem("questions") || []
      );

      // Merge default and stored questions, ensuring no duplicates
      const mergedQuestions = [...defaultQuestions, ...storedQuestions].reduce(
        (acc, curr) => {
          if (!acc.find((q) => q.question === curr.question)) {
            acc.push(curr); // Add unique questions to accumulator
          }
          return acc;
        },
        []
      );
      setQuestions(mergedQuestions); // Update state with merged questions
    }
  }, []);

  // Save questions back to localStorage whenever they change
  useEffect(() => {
    if (typeof window !== "undefined" && questions.length > 0) {
      localStorage.setItem("questions", JSON.stringify(questions)); // Save questions to localStorage
    }
  }, [questions]);

  // States for tracking quiz progress and data
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
  const [leaderboards, setLeaderboards] = useState({});

  // Load leaderboards from localStorage on initial load
  useEffect(() => {
    const storedLeaderboards = localStorage.getItem("leaderboards");
    if (storedLeaderboards) {
      setLeaderboards(JSON.parse(storedLeaderboards)); // Update leaderboards state
    }
  }, []);

  // Save score to leaderboards in localStorage
  const saveScore = (playerName, score, category) => {
    if (!playerName) return;

    const currentDate = new Date().toLocaleString("en-SE", {
      timeZone: "Europe/Stockholm",
    });
    const newEntry = {name: playerName, score, date: currentDate};

    // Update leaderboard for the specified category
    setLeaderboards((prevLeaderboards) => {
      const categoryLeaderboard = prevLeaderboards[category] || [];
      const existingPlayerIndex = categoryLeaderboard.findIndex(
        (entry) => entry.name === playerName
      );

      if (existingPlayerIndex !== -1) {
        // Update existing player's score if it's higher
        if (categoryLeaderboard[existingPlayerIndex].score < score) {
          categoryLeaderboard[existingPlayerIndex] = newEntry;
        }
      } else {
        // Add new player to leaderboard
        categoryLeaderboard.push(newEntry);
      }

      // Sort leaderboard and keep only top 10 players
      const sortedLeaderboard = [...categoryLeaderboard]
        .sort((a, b) => b.score - a.score)
        .slice(0, 10);

      return {...prevLeaderboards, [category]: sortedLeaderboard};
    });
  };

  // Store updated leaderboards in localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("leaderboards", JSON.stringify(leaderboards)); // Save leaderboards to localStorage
  }, [leaderboards]);

  // Start the quiz with selected player name and category
  const startQuiz = (name, category) => {
    setPlayerName(name);
    setIsQuizStarted(true);
    setIsQuizFinished(false);
    setCurrentScore(0);
    setCurrentQuestion(0);
    setUserAnswer(null);
    setSelectedCategory(category);

    // Filter questions based on selected category
    let newFilteredQuestions =
      category === "All"
        ? questions
        : questions.filter((q) => q.category === category);
    setFilteredQuestions(newFilteredQuestions); // Update filtered questions
  };

  // Handle answer selection and update score
  const handleAnswer = (option) => {
    if (isAnswerSelected) return; // Prevent selecting more than one answer

    setIsAnswerSelected(true); // Mark answer as selected
    setUserAnswer(option); // Store the selected answer

    const correct = option === filteredQuestions[currentQuestion].answer; // Check if the selected answer is correct
    if (correct) {
      setCurrentScore((prevScore) => prevScore + 1); // Increase score if correct
    }

    // Log answer history for review
    setAnswerHistory((prev) => [
      ...prev,
      {
        question: filteredQuestions[currentQuestion].question,
        selected: option,
        correctAnswer: filteredQuestions[currentQuestion].answer,
        isCorrect: correct,
      },
    ]);

    // Move to next question after a short delay
    setTimeout(() => {
      nextQuestion();
      setIsAnswerSelected(false);
    }, 1000);
  };

  // Move to the next question or finish the quiz if it's the last question
  const nextQuestion = () => {
    if (currentQuestion + 1 < filteredQuestions.length) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setIsQuizFinished(true);
      if (saveScore && playerName) {
        saveScore(playerName, currentScore, selectedCategory);
      } else {
        console.log("error");
      }
    }
  };

  // Save score after quiz finishes
  useEffect(() => {
    if (isQuizFinished && playerName && currentScore !== undefined) {
      saveScore(playerName, currentScore, selectedCategory);
    }
  }, [isQuizFinished, currentScore, playerName, selectedCategory]);

  // Restart the quiz by resetting all states
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

  // Add a new question to the quiz
  const addQuestion = (newQuestion) => {
    setQuestions((prevQuestions) => [
      ...prevQuestions,
      {
        id: prevQuestions.length + 1,
        ...newQuestion,
      },
    ]);
  };

  // Remove a question from the quiz
  const removeQuestion = (id) => {
    setQuestions((prevQuestion) => prevQuestion.filter((q) => q.id !== id));
  };

  // Update an existing question
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
        leaderboards,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}
export default QuizContext;
