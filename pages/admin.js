import { useContext, useState } from "react";
import QuizContext from "./context/QuizContext";

export default function Admin() {
  const {
    questions,
    addQuestion,
    removeQuestion,
    updateQuestion
  } = useContext(QuizContext);

  // För att hantera inputvärden för att lägga till en fråga
  const [newQuestion, setNewQuestion] = useState(""); // Frågetext
  const [newOptions, setNewOptions] = useState(["", "", "", ""]); // Alternativ till fråga
  const [newAnswer, setNewAnswer] = useState(""); // Rätt svar
  const [newCategory, setNewCategory] = useState(""); // Kategori

  // För att hantera inputvärden för att uppdatera en fråga
  const [updateQuestionId, setUpdateQuestionId] = useState(""); // Id för den fråga som ska uppdateras
  const [updateQuestionText, setUpdateQuestionText] = useState(""); // Ny frågetext
  const [updateOptions, setUpdateOptions] = useState(["", "", "", ""]); // Uppdaterade alternativ
  const [updateAnswer, setUpdateAnswer] = useState(""); // Uppdaterat rätt svar
  const [updateCategory, setUpdateCategory] = useState(""); // Uppdaterad kategori

  // Fördefinierade kategorier
  const categories = ["Geography", "Sports", "Movie", "Science"];

  // Funktion för att lägga till en ny fråga
  const handleAddQuestion = () => {
    // Skickar den nya frågan till addQuestion-funktionen från context
    addQuestion({
      question: newQuestion,
      option: newOptions,
      answer: newAnswer,
      category: newCategory,
    });

    // Rensar inputfält efter tillägg
    setNewQuestion("");
    setNewOptions(["", "", "", ""]);
    setNewAnswer("");
    setNewCategory("");
  };

  // Funktion för att uppdatera en fråga
  const handleUpdateQuestion = () => {
    updateQuestion(parseInt(updateQuestionId, 10), {
      question: updateQuestionText,
      option: updateOptions,
      answer: updateAnswer,
      category: updateCategory,
    });

    // Rensar inputfält efter uppdatering
    setUpdateQuestionId("");
    setUpdateQuestionText("");
    setUpdateOptions(["", "", "", ""]);
    setUpdateAnswer("");
    setUpdateCategory("");
  };

  // Funktion för att ta bort en fråga
  const handleRemoveQuestion = (id) => {
    removeQuestion(id);
  };

  // Render the admin UI to manage questions
  return (
    <div className="container mx-auto p-4">
      {/* Admin Page Header with gradient text */}
      <h1 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
        Admin Page
      </h1>

      {/* Section to add a new question */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Add New Question</h2>
        <input
          type="text"
          placeholder="Enter question"
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
          className="block w-full p-2 mb-2 border rounded"
        />
        {newOptions.map((option, index) => (
          <input
            key={index}
            type="text"
            placeholder={`Option ${index + 1}`}
            value={option}
            onChange={(e) =>
              setNewOptions((prev) => {
                const updatedOptions = [...prev];
                updatedOptions[index] = e.target.value;
                return updatedOptions;
              })
            }
            className="block w-full p-2 mb-2 border rounded"
          />
        ))}
        <input
          type="text"
          placeholder="Correct Answer"
          value={newAnswer}
          onChange={(e) => setNewAnswer(e.target.value)}
          className="block w-full p-2 mb-2 border rounded"
        />

        {/* Dropdown for selecting category */}
        <select
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          className="block w-full p-2 mb-2 border rounded"
        >
          <option value="">Select a category</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>

        <button
          onClick={handleAddQuestion}
          className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
        >
          Add Question
        </button>
      </div>

      {/* Section to update an existing question */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Update Question</h2>
        <input
          type="text"
          placeholder="Enter Question ID to Update"
          value={updateQuestionId}
          onChange={(e) => setUpdateQuestionId(e.target.value)}
          className="block w-full p-2 mb-2 border rounded"
        />
        <input
          type="text"
          placeholder="Enter new question text"
          value={updateQuestionText}
          onChange={(e) => setUpdateQuestionText(e.target.value)}
          className="block w-full p-2 mb-2 border rounded"
        />
        {updateOptions.map((option, index) => (
          <input
            key={index}
            type="text"
            placeholder={`Option ${index + 1}`}
            value={option}
            onChange={(e) =>
              setUpdateOptions((prev) => {
                const updatedOptions = [...prev];
                updatedOptions[index] = e.target.value;
                return updatedOptions;
              })
            }
            className="block w-full p-2 mb-2 border rounded"
          />
        ))}
        <input
          type="text"
          placeholder="Correct Answer"
          value={updateAnswer}
          onChange={(e) => setUpdateAnswer(e.target.value)}
          className="block w-full p-2 mb-2 border rounded"
        />

        {/* Dropdown for selecting category */}
        <select
          value={updateCategory}
          onChange={(e) => setUpdateCategory(e.target.value)}
          className="block w-full p-2 mb-2 border rounded"
        >
          <option value="">Select a category</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>

        <button
          onClick={handleUpdateQuestion}
          className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
        >
          Update Question
        </button>
      </div>

      {/* Section to display and remove all questions */}
      <div>
        <h3 className="text-xl font-semibold mb-2">Current Questions:</h3>
        {questions.length === 0 ? (
          <p>No questions available.</p>
        ) : (
          questions.map((question) => (
            <div key={question.id} className="mb-4 p-4 border rounded">
              <h4 className="font-semibold">{question.question}</h4>
              <p>Options: {question.option.join(", ")}</p>
              <p>Category: {question.category}</p>
              <button
                onClick={() => handleRemoveQuestion(question.id)}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}