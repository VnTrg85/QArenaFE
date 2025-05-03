import React from "react";
import styles from "../../Academy/Question/Question.module.css";

const QuestionCard = ({ question, index, selectedAnswer, onAnswerChange, submitted }) => {
  return (
    <div className={styles.card}>
      <h3 className={styles.question}>
        {index}: {question.content}
      </h3>
      <ul className={styles.answerList}>
        {question.answers.map((answer) => (
          <li key={answer.id} className={styles.answerItem}>
            <label>
              <input
                type="radio"
                name={`question-${question.id}`}
                value={answer.id}
                checked={selectedAnswer === answer.id}
                onChange={() => onAnswerChange(question.id, answer.id)}
                disabled={submitted}
              />
              {answer.content}
              {submitted && (
                <span className={answer.isCorrect ? styles.correct : styles.incorrect}>
                  {answer.isCorrect ? " ✅" : selectedAnswer === answer.id ? " ❌" : ""}
                </span>
              )}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuestionCard;
