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

  // För att hantera inputvärden för att uppdatera en fråga
  const [updateQuestionId, setUpdateQuestionId] = useState(""); // Id för den fråga som ska uppdateras
  const [updateQuestionText, setUpdateQuestionText] = useState(""); // Ny frågetext
  const [updateOptions, setUpdateOptions] = useState(["", "", "", ""]); // Uppdaterade alternativ
  const [updateAnswer, setUpdateAnswer] = useState(""); // Uppdaterat rätt svar

  // Funktion för att lägga till en ny fråga
  const handleAddQuestion = () => {
    // Skickar den nya frågan till addQuestion-funktionen från context
    addQuestion({
      question: newQuestion,
      option: newOptions,
      answer: newAnswer,
    });

    // Rensar inputfält efter tillägg
    setNewQuestion("");
    setNewOptions(["", "", "", ""]);
    setNewAnswer("");
  };

  // Funktion för att uppdatera en befintlig fråga
  const handleUpdateQuestion = () => {
    updateQuestion(parseInt(updateQuestionId, 10), {
      question: updateQuestionText,
      option: updateOptions,
      answer: updateAnswer,
    });

    // Rensar inputfält efter uppdatering
    setUpdateQuestionId("");
    setUpdateQuestionText("");
    setUpdateOptions(["", "", "", ""]);
    setUpdateAnswer("");
  };

  // Funktion för att ta bort en fråga
  const handleRemoveQuestion = (id) => {
    removeQuestion(id);
  };

  // Renderar admin-gränssnittet för att hantera frågor
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Page</h1>

      {/* Sektion för att lägga till en ny fråga */}
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
        <button
          onClick={handleAddQuestion}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Add Question
        </button>
      </div>

      {/* Sektion för att uppdatera en befintlig fråga */}
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
        <button
          onClick={handleUpdateQuestion}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Update Question
        </button>
      </div>

      {/* Sektion för att visa och ta bort alla frågor */}
      <div>
        <h3 className="text-xl font-semibold mb-2">Current Questions:</h3>
        {questions.length === 0 ? (
          <p>No questions available.</p>
        ) : (
          questions.map((question) => (
            <div key={question.id} className="mb-4 p-4 border rounded">
              <h4 className="font-semibold">{question.question}</h4>
              <p>Options: {question.option.join(", ")}</p>
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