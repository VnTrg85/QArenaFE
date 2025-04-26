import styles from "./Academy.module.css";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGraduationCap,
  faChevronDown,
  faChevronUp,
} from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect } from "react";
import { get_userCourse } from "../../Service/Academy";

const cx = classNames.bind(styles);

function Academy() {
  const [openIndex, setOpenIndex] = useState(null);
  const [courses, setCourses] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await get_userCourse();
        setCourses(res);
      } catch (error) {
        setErrorMessage(error.message);
      }
    };
    fetchCourses();
  }, []);

  const toggleAccordion = (type, index) => {
    const key = `${type}-${index}`;
    setOpenIndex(openIndex === key ? null : key);
  };

  const coreCourses = courses.filter((course) => course.type === "core");
  const basicCourses = courses.filter((course) => course.type === "basic");
  const advancedCourses = courses.filter((course) => course.type === "advance");

  return (
    <section className={cx("wrapper")}>
      <div className={cx("mainForm")}>
        <div className={cx("headForm")}>
          <h1 className={cx("title")}>
            Learning Portal
            <a href="#" className={cx("academy-link")}>
              <FontAwesomeIcon icon={faGraduationCap} />
              Visit our Test IO Academy
            </a>
          </h1>
        </div>

        <div className={cx("banner-card")}>
          <div className={cx("circle")}>
            <div className={cx("circle-number")}>0/6</div>
            <div className={cx("circle-label")}>
              mandatory modules completed
            </div>
          </div>

          <div className={cx("banner-card_content-row")}>
            <div className={cx("banner-card_description")}>
              Welcome to the Learning Portal! Here, you’ll find all your
              learning materials conveniently combined in one place. The portal
              includes mandatory modules that are essential to become an
              approved tester and receive test invitations, as well as optional
              modules that offer a broader range of tasks and opportunities for
              further skill development. Dive in and enhance your testing
              expertise!
            </div>
            <div className={cx("banner-card_stats")}>
              <div className={cx("stat-item")}>
                <span className={cx("icon")}>🧩</span>
                <span>1 optional module available</span>
              </div>
              <div className={cx("stat-item")}>
                <span className={cx("icon")}>🔒</span>
                <span>7 modules locked</span>
              </div>
            </div>
          </div>
        </div>

        {coreCourses.length > 0 && (
          <div className={cx("academy-section")}>
            <div className={cx("section-header")}>
              <h3 className={cx("section-title")}>
                Onboarding modules and courses
              </h3>
            </div>
            <div className={cx("section-body")}>
              <div className={cx("grid-uncompleted-modules")}>
                <div className={cx("activities-grid")}>
                  {coreCourses.map((course, index) => {
                    const key = `core-${index}`;
                    const isDisabled = course.isBlocked;
                    const completedLessons =
                      course.lessons?.filter((lesson) => lesson.isCompleted)
                        .length || 0;
                    const totalLessons = course.lessons?.length || 0;

                    return (
                      <div
                        key={course.id}
                        className={cx("accordion-card", {
                          disable: isDisabled,
                          completed: course.isComplete,
                        })}
                      >
                        <div
                          className={cx("accordion-header")}
                          onClick={() =>
                            !isDisabled && toggleAccordion("core", index)
                          }
                        >
                          <img
                            src={course.linkImg}
                            alt={course.title}
                            className={cx("thumbnail")}
                          />
                          <div className={cx("accordion-title")}>
                            {course.title}
                            <div className={cx("accordion-description")}>
                              {course.description}
                            </div>
                            <div className={cx("lesson-progress")}>
                              {completedLessons} / {totalLessons} lessons
                              completed
                            </div>
                          </div>
                          <span className={cx("accordion-tag")}>
                            {isDisabled ? "Locked" : "Earn more money"}
                          </span>
                          <FontAwesomeIcon
                            icon={
                              openIndex === key ? faChevronUp : faChevronDown
                            }
                          />
                        </div>
                        {openIndex === key && (
                          <div className={cx("accordion-body")}>
                            {course.lessons?.length > 0 ? (
                              course.lessons.map((lesson) => (
                                <div
                                  key={lesson.id}
                                  className={cx("lesson-item")}
                                >
                                  <img
                                    src={lesson.linkImg}
                                    alt={lesson.title}
                                    className={cx("thumbnail")}
                                  />
                                  <span>{lesson.title}</span>
                                </div>
                              ))
                            ) : (
                              <div className={cx("lesson-item")}>
                                No lessons available
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
        {/* Hiển thị các khóa học core */}
        {basicCourses.length > 0 && (
          <div className={cx("academy-section")}>
            <div className={cx("section-header")}>
              <h3 className={cx("section-title")}>Activities</h3>
            </div>
            <div className={cx("section-body")}>
              <div className={cx("grid-uncompleted-modules")}>
                <div className={cx("activities-grid")}>
                  {basicCourses.map((course, index) => {
                    const key = `basic-${index}`;
                    const isDisabled = course.isBlocked;
                    const completedLessons =
                      course.lessons?.filter((lesson) => lesson.isCompleted)
                        .length || 0;
                    const totalLessons = course.lessons?.length || 0;

                    return (
                      <div
                        key={course.id}
                        className={cx("accordion-card", {
                          disable: isDisabled,
                          completed: course.isComplete,
                        })}
                      >
                        <div
                          className={cx("accordion-header")}
                          onClick={() =>
                            !isDisabled && toggleAccordion("basic", index)
                          }
                        >
                          <img
                            src={course.linkImg}
                            alt={course.title}
                            className={cx("thumbnail")}
                          />
                          <div className={cx("accordion-title")}>
                            {course.title}
                            <div className={cx("accordion-description")}>
                              {course.description}
                            </div>
                            <div className={cx("lesson-progress")}>
                              {completedLessons} / {totalLessons} lessons
                              completed
                            </div>
                          </div>
                          <span className={cx("accordion-tag")}>
                            {isDisabled ? "Locked" : "Basic Course"}
                          </span>
                          <FontAwesomeIcon
                            icon={
                              openIndex === key ? faChevronUp : faChevronDown
                            }
                          />
                        </div>
                        {openIndex === key && (
                          <div className={cx("accordion-body")}>
                            {course.lessons?.length > 0 ? (
                              course.lessons.map((lesson) => (
                                <div
                                  key={lesson.id}
                                  className={cx("lesson-item")}
                                >
                                  <img
                                    src={lesson.linkImg}
                                    alt={lesson.title}
                                    className={cx("thumbnail")}
                                  />
                                  <span>{lesson.title}</span>
                                </div>
                              ))
                            ) : (
                              <div className={cx("lesson-item")}>
                                No lessons available
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Hiển thị các khóa học advance */}
        {advancedCourses.length > 0 && (
          <div className={cx("academy-section")}>
            <div className={cx("section-header")}>
              <h3 className={cx("section-title")}>
                Get more opportunities with these courses
              </h3>
            </div>
            <div className={cx("section-body")}>
              <div className={cx("grid-uncompleted-modules")}>
                <div className={cx("activities-grid")}>
                  {advancedCourses.map((course, index) => {
                    const key = `advanced-${index}`;
                    const completedLessons =
                      course.lessons?.filter((lesson) => lesson.isCompleted)
                        .length || 0;
                    const totalLessons = course.lessons?.length || 0;

                    return (
                      <div
                        key={course.id}
                        className={cx("accordion-card", {
                          completed: course.isComplete,
                        })}
                      >
                        <div
                          className={cx("accordion-header")}
                          onClick={() => toggleAccordion("advanced", index)}
                        >
                          <img
                            src={course.linkImg}
                            alt={course.title}
                            className={cx("thumbnail")}
                          />
                          <div className={cx("accordion-title")}>
                            {course.title}
                            <div className={cx("accordion-description")}>
                              {course.description}
                            </div>
                            <div className={cx("lesson-progress")}>
                              {completedLessons} / {totalLessons} lessons
                              completed
                            </div>
                          </div>
                          <span className={cx("accordion-tag")}>
                            Advance Course
                          </span>
                          <FontAwesomeIcon
                            icon={
                              openIndex === key ? faChevronUp : faChevronDown
                            }
                          />
                        </div>
                        {openIndex === key && (
                          <div className={cx("accordion-body")}>
                            {course.lessons?.length > 0 ? (
                              course.lessons.map((lesson) => (
                                <div
                                  key={lesson.id}
                                  className={cx("lesson-item")}
                                >
                                  <img
                                    src={lesson.linkImg}
                                    alt={lesson.title}
                                    className={cx("thumbnail")}
                                  />
                                  <span>{lesson.title}</span>
                                </div>
                              ))
                            ) : (
                              <div className={cx("lesson-item")}>
                                No lessons available
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default Academy;
