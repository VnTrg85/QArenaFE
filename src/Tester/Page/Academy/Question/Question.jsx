import React, { useEffect, useState } from "react";
import { get_Question } from "../../Academy/Service/Question/index";
import QuestionCard from "../../Academy/Question/QuestionCard";
import styles from "../../Academy/Question/Question.module.css";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const Question = () => {
  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState(600);
  const navigate = useNavigate();
  const location = useLocation();
  const { courseId } = location.state || {};

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(intervalId);
          handleSubmit();
        }
        return Math.max(prevTime - 1, 0);
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await get_Question(courseId);
        setQuestions(data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch questions", err);
        setLoading(false);
      }
    };

    fetchData();
  }, [courseId]);

  const handleAnswerChange = (questionId, answerId) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: answerId,
    }));
  };

  const handleSubmit = async () => {
    setSubmitted(true);

    const correctSelectedAnswers = questions.flatMap((q) =>
      q.answers
        .filter((ans) => selectedAnswers[q.id] === ans.id && ans.isCorrect)
        .map((ans) => ans.id)
    );

    try {
      const res = await axios.put(
        `${process.env.REACT_APP_API_URL}/userCourse/complete/${courseId}`,
        correctSelectedAnswers,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const { status, message, score } = res.data.data;
      if (status === "pass") {
        alert(`${message} ✅\nScore: ${score}%`);
      } else if (status === "fail") {
        alert(`${message} ❌\nScore: ${score}%`);
      } else {
        alert("No quiz available.");
      }
      navigate("/academy");
    } catch (error) {
      console.error("Error submitting answers", error);
      alert("Submission failed");
    }
  };

  const handleBack = () => {
    navigate("/academy/Lesson", { state: { courseId } });
  };

  // Organize the questions into rows of 2
  const rows = [];
  for (let i = 0; i < questions.length; i += 2) {
    rows.push(questions.slice(i, i + 2));
  }

  return (
    <div className={styles.container}>
      {loading && <div className={styles.loading}>Loading questions...</div>}

      {!loading && (
        <>
          <span
            onClick={handleBack}
            className={styles.backButton}
            role="button"
            tabIndex={0}
          >
            ← Back to Exploratory Testing Course
          </span>

          <div className={styles.timer}>
            Time Left: {Math.floor(timeLeft / 60)}:
            {String(timeLeft % 60).padStart(2, "0")}
          </div>

          <div className={styles.answersTable}>
            <h3>Your Answer</h3>
            <table>
              <thead>
                <tr>
                  <th>Question</th>
                  <th>Status</th>
                  <th>Question</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {row.map((question, colIndex) => {
                      const globalIndex = rowIndex * 2 + colIndex + 1;
                      return (
                        <React.Fragment key={question.id}>
                          <td>{globalIndex}</td>
                          <td className={styles.statusCell}>
                            {selectedAnswers[question.id] ? (
                              <span className={styles.dot} />
                            ) : (
                              ""
                            )}
                          </td>
                        </React.Fragment>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {questions.map((question, index) => (
            <QuestionCard
              key={question.id}
              index={index + 1}
              question={question}
              selectedAnswer={selectedAnswers[question.id]}
              onAnswerChange={handleAnswerChange}
              submitted={submitted}
            />
          ))}

          <div className={styles.footerBar}>
            <button className={styles.submitBtn} onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Question;
