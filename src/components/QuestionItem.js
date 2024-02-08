import React, { useState } from "react";

function QuestionItem({ question, onDeleteQuestion, setQuiz,quiz }) {
  const { id, prompt, answers, correctIndex } = question;
  const [selectedAnswer, setSelectedAnswer] = useState(correctIndex);


  const options =
    answers &&
    answers.length > 0 &&
    answers.map((answer, index) => (
      <option key={index} value={index}>
        {answer}
      </option>
    ));

  function handleDeleteClick() {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) {
          console.log("did not delete question");
        }
        onDeleteQuestion(id);
      })
      .catch((error) => {
        console.error("Error deleting question:", error);
      });
  }

  function handleCorrectAnswerChange(event) {
    const newCorrectIndex = parseInt(event.target.value);
    setSelectedAnswer(newCorrectIndex);

   
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correctIndex: newCorrectIndex }),
    })
      .then((response) => {
        if (response.ok) {
          setQuiz(quiz.map((question) => (question.id === id ? {...question, correctIndex: newCorrectIndex} : question)))
        } else {
          console.error("Failed to update correct answer index on server");
        }
      })
      .catch((error) => {
        console.error("Error updating correct answer index:", error);
      });
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex}>{options}</select>
      </label>
      <button onClick={handleDeleteClick}>Delete Question</button>
    </li>
  );
}


export default QuestionItem;