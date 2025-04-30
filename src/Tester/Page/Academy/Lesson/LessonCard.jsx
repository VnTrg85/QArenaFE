import React from "react";
import styles from "../Lesson/Lesson.module.css";

const LessonCard = ({ lesson }) => {
  console.log(lesson.link);
  return (
    <div
      className={`${styles.card} ${lesson.isCompleted ? styles.completed : ""}`}
    >
      <img
        src={lesson.linkImg}
        alt={lesson.title}
        className={styles.lessonImage}
      />
      <div className={styles.content}>
        <h4>{lesson.title}</h4>

        {lesson.description && <p>{lesson.description}</p>}
    
        <button
          disabled={lesson.isBlocked}
          className={styles.button}
          onClick={() => window.open(lesson.lessonLink)}
        >
          {"Read article"}
           
        </button>
    
      </div>
    </div>
  );
};

export default LessonCard;
