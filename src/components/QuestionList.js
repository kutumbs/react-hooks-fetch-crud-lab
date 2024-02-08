import React from "react";
import QuestionItem from "./QuestionItem";

function QuestionList({ quiz, setQuiz }) {
  function handleDeleteQuestion(id) {
    setQuiz(quiz.filter((question) => question.id !== id));
  }

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {quiz.map((question) => (
          <QuestionItem
            key={question.id}
            question={question}
            onDeleteQuestion={handleDeleteQuestion}
            setQuiz={setQuiz}
            quiz={quiz}
          />
        ))}
      </ul>
    </section>
  );
}


export default QuestionList;