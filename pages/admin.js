import { useContext, useState } from "react";
import QuizContext from "./context/QuizContext";

export default function Admin() {
  const {
    questions,
    addQuestions,
    removeQuestions,
    updateQuestions
} = useContext(QuizContext);

// För hantera inputvärden för att lägga till en fråga 
const [newQuestion, setNewQuestion] = useState(""); //frågetext
const [newOptions, setNewOptions] = useState(["", "", "", ""]); // alternativ till fråga
const [newAnswer, setNewAnswer] = useState(""); // Det rätta svaret

// För att hantera inputvärden för att uppdatera en fråga
const[updateQuestionId, setUpdateQuestionId] = useState(""); // Detta är id för den fråga som ska uppdateras
const[updateQuestiontext, setupdateQuestionText] = useState(""); // Ny frågetext
const[updateOptions, setUpdateOptions] = useState(["", "", "", ""]); //Uppdaterade alternativ
const[updateAnswer, setUpdateAnswer] = useState(""); // Uppdaterat rätt svar 

//Lägg till en ny fråga
const handelAddQuestion = () => {}

// Skickar ny fråga till addQuestion funktionen från context
addQuestion({
  question: newQuestion,
  option: newOptions, 
  answer: newAnswer,
});

//// Rensa inputs efter tillägg
setNewQuestion("");
setNewOptions(["", "", "", ""]);
setNewAnswer("");
};
// uppdaterar en fråga som redan finns
constHandleUpdateQuestion = () => {

  updateQuestion(updateQuestionId), {
    question: updateQuestionText, 
    option: updateOptions,
    answer: updateAnswer,
  }
};

//rensa inputs efter uppdatering
setupdateQuestionId("");
setupdateQuestionText("");
setUpdateOptions(["", "", "", ""]);
setUpdateAnswer("");

// return <div>admin</div>;