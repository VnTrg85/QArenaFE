import React, { useState, useEffect } from "react";
import { get_Lesson } from "../Service/Lesson";
import Lessonstyles from "../Lesson/Lesson.module.css";
import LessonCard from "../Lesson/LessonCard";
import {  useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';

const Lesson = () => {
  const [lessons, setLessons] = useState([]);
  // const [usserId,setUserId]=useState();
  const navigate = useNavigate();
  const location = useLocation();
  const { courseId } = location.state || {};
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const res = await get_Lesson(courseId);
        setLessons(res);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch lessons:", error.message);
        setLoading(false);
      }
    };

    fetchLessons();
  }, [courseId]);

  const handleNavigateToQuestion = (courseId, questionId) => {
    navigate(`/academy/question`, { state: { courseId, questionId } });
  };

  return (
    <div>
    {loading ? (
      <div className={Lessonstyles.loading}>Loading Lesson...</div>
    ) : (
    <div className={Lessonstyles.container}>
      <div className={Lessonstyles.intro}>
        <a href="/academy" className={Lessonstyles.backButton}>
          ← Back to Exploratory Testing Course
        </a>
        <h1>Welcome to Your QArena</h1>
        <p>
          In this course, you’ll explore a series of lessons designed to help
          you grow your skills step by step. Each module is crafted to provide
          you with practical knowledge, interactive activities, and assessments
          that reinforce your understanding.
        </p>
        <p>
          Whether you’re learning about testing, software development, design,
          or any other topic — this platform will guide you through structured
          lessons while giving you room to learn at your own pace.
        </p>
        <p>
          You’ll gain hands-on experience through practical tasks and receive
          feedback as you complete each lesson. By the end of the course, you
          will have:
        </p>
        <ul>
          <li>✔️ Understood key concepts from each lesson</li>
          <li>✔️ Practiced real-world tasks relevant to your course</li>
          <li>✔️ Tracked your progress through completed modules</li>
          <li>✔️ Prepared for applying your knowledge in real scenarios</li>
        </ul>
        <p>
          Each module takes around 10–20 minutes, and you can always take a
          break and return anytime. Let’s start exploring — your learning
          journey awaits!
        </p>
      </div>
      <div className={Lessonstyles.grid}>
        {lessons.map((lesson) => (
          <LessonCard key={lesson.id} lesson={lesson} />
        ))}
      </div>
      <div className={Lessonstyles.footerBar}>
      <button className={Lessonstyles.quizButton} onClick={() => handleNavigateToQuestion(courseId)}>Go to Quiz</button>
      </div>
        </div>
      )}
    </div>
  );
};

export default Lesson;
