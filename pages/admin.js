import {useContext, useState, useRef} from "react";
import QuizContext from "./context/QuizContext";

export default function Admin() {
  const {questions, addQuestion, removeQuestion, updateQuestion} =
    useContext(QuizContext);

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

  // Ref för att skrolla till sektionen
  const updateSectionRef = useRef(null);

  // Fördefinierade kategorier
  const categories = ["All", "Geography", "Sports", "Movie", "Science"];

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
    <div className="min-h-screen bg-gray-50 p-2">
      {/* Admin Page Header with gradient text */}
      <h1 className="text-4xl font-bold text-center py-8 text-gray-800">
        Admin Page
      </h1>

      {/* Section to add a new question */}
      <div className="mb-8 max-w-2xl mx-auto bg-b rounded-xl shadow-md overflow-hidden ">
        <div className="border-b bg-gray-50 px-6 py-4 bg-gradient-to-r from-purple-600 to-blue-500 text-transparent">
          <h2 className="text-xl font-semibold text-white">Add New Question</h2>
        </div>
        <div className="p-4">
          <form onSubmit={handleAddQuestion}>
            <input
              type="text"
              placeholder="Enter question"
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              className="block w-full p-2 mb-2 border rounded"
              required
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
                required
              />
            ))}
            <input
              type="text"
              placeholder="Correct Answer"
              value={newAnswer}
              onChange={(e) => setNewAnswer(e.target.value)}
              className="block w-full p-2 mb-2 border rounded"
              required
            />

            {/* Dropdown for selecting category */}
            <select
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="block w-full p-2 mb-2 border rounded"
              required
            >
              <option value="">Select a category</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>

            <button
              type="submit"
              className="px-4 py-2 mt-5 bg-purple-600 rounded hover:bg-purple-700 text-white"
            >
              Add Question
            </button>
          </form>
        </div>
      </div>

      {/* Section to update an existing question */}
      <div
        ref={updateSectionRef}
        className="mb-8 max-w-2xl mx-auto bg-b rounded-xl shadow-md overflow-hidden"
      >
        <div className="border-b bg-gray-50 px-6 py-4 bg-gradient-to-r from-purple-600 to-blue-500">
          <h2 className="text-xl font-semibold text-white">Update Question</h2>
        </div>
        <div className="p-4">
          <form onSubmit={handleUpdateQuestion}>
            <input
              type="text"
              placeholder="Question ID"
              value={updateQuestionId}
              onChange={(e) => setUpdateQuestionId(e.target.value)}
              className="block w-full p-2 mb-2 border rounded cursor-not-allowed"
              disabled
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
              type="submit"
              className="px-4 py-2 mt-5 bg-purple-600 rounded hover:bg-purple-700 text-white"
            >
              Update Question
            </button>
          </form>
        </div>
      </div>

      {/* Section to display and remove all questions */}
      <div className="mb-12 max-w-2xl mx-auto bg-b rounded-xl shadow-md overflow-hidden">
        <div className="border-b bg-gray-50 px-6 py-4 bg-gradient-to-r from-purple-600 to-blue-500">
          <h3 className="text-xl font-semibold text-white">
            Current Questions:
          </h3>
        </div>
        {questions.length === 0 ? (
          <p className="p-5">No questions available.</p>
        ) : (
          questions.map((question) => (
            <div className="px-4">
              <div
                key={question.id}
                className="my-4 p-4 border rounded shadow-md bg-white"
              >
                <h4 className="font-semibold text-gray-900">
                  {question.question}
                </h4>
                <p className="text-gray-500">
                  Options: {question.option.join(", ")}
                </p>
                <p className="text-gray-500">Category: {question.category}</p>
                <div className="mt-3">
                  <button
                    onClick={() => {
                      //Skicka med all info till input
                      setUpdateQuestionId(String(question.id));
                      setUpdateQuestionText(question.question);
                      setUpdateOptions(question.option);
                      setUpdateAnswer(question.answer);
                      setUpdateCategory(question.category);

                      //Skroll
                      updateSectionRef.current.scrollIntoView({
                        behavior: "smooth",
                        block: "center",
                      });
                    }}
                    className="px-4 py-2 bg-purple-600 rounded hover:bg-purple-700 mr-2 text-white"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleRemoveQuestion(question.id)}
                    className="px-4 py-2 bg-red-600 rounded hover:bg-red-700 text-white"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
