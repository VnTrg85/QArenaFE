import styles from "./Academy.module.css";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGraduationCap,
  faChevronDown,
  faChevronUp,
} from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect } from "react";
import { get_userCourse } from "../Academy/Service/Academy/index";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);
function Academy() {
  const navigate = useNavigate();
  const [openIndex, setOpenIndex] = useState(null);
  const [courses, setCourses] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const coreCourses = courses.filter((course) => course.type === "core");
  const basicCourses = courses.filter((course) => course.type === "basic");
  const advancedCourses = courses.filter((course) => course.type === "advance");
  const totalCourComplete = courses.filter(
    (course) => course.isCompleted
  ).length;
  const courseAvail = courses.filter(
    (course) => !course.isBlocked && !course.isCompleted
  ).length;
  const totalcourse = courses.length;
  const courseLocked = courses.filter((course) => course.isBlocked).length;
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await get_userCourse();
        setCourses(res);
        setLoading(false);
      } catch (error) {
        setErrorMessage(error.message);
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const handleSendata = (courseId) => {
    navigate(`/academy/lesson`, { state: { courseId } });
  };

  const toggleAccordion = (type, index) => {
    const key = `${type}-${index}`;
    setOpenIndex(openIndex === key ? null : key);
  };

  return (
    <div>
      {loading ? (
        <div className={styles.loading}>Loading Academy...</div>
      ) : (
        <section className={cx("wrapper")}>
          <div className={cx("mainForm")}>
            <div className={cx("headForm")}>
              <h1 className={cx("title")}>Learning Portal</h1>
            </div>

            <div className={cx("banner-card")}>
              <div className={cx("circle")}>
                <div className={cx("circle-number")}>
                  {totalCourComplete}/{totalcourse}
                </div>
                <div className={cx("circle-label")}>
                  mandatory modules completed
                </div>
              </div>

              <div className={cx("banner-card_content-row")}>
                <div className={cx("banner-card_description")}>
                  Welcome to QArenna Learning Portal! Here, you’ll find all your
                  learning materials conveniently combined in one place,
                  designed specifically for testers at all stages of their
                  journey. Whether you're just starting out or looking to expand
                  your skill set, QArenna offers a comprehensive selection of
                  courses to suit your needs. The portal includes mandatory
                  modules that are essential to becoming an approved tester and
                  receiving test invitations, as well as optional modules that
                  offer a broader range of tasks and opportunities for further
                  skill development. Our platform is continuously updated with
                  new content to ensure that you stay on top of the latest
                  industry trends and tools. Dive in and enhance your testing
                  expertise with QArenna, where your learning experience is just
                  as important as your success in the field!
                </div>
                <div className={cx("banner-card_stats")}>
                  <div className={cx("stat-item")}>
                    <img className={cx("icon")} src="/icons/i-module.svg"></img>
                    <span>{courseAvail} optional module available</span>
                  </div>
                  <div className={cx("stat-item")}>
                    <img className={cx("icon")} src="/icons/i-lock.svg"></img>
                    <span>{courseLocked} modules locked</span>
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
                        const isComplete = course.isCompleted;
                        return (
                          <div
                            key={course.id}
                            className={cx("accordion-card", {
                              disable: isDisabled,
                              completed: isComplete,
                            })}
                          >
                            <div
                              className={cx("accordion-header")}
                              onClick={() =>
                                !isDisabled &&
                                !isComplete &&
                                toggleAccordion("core", index)
                              }
                              onMouseEnter={() => setShowMessage(true)} // Hiển thị thông báo khi hover
                              onMouseLeave={() => setShowMessage(false)} // Ẩn thông báo khi bỏ qua
                            >
                              <img
                                src={course.linkImg}
                                alt={course.title}
                                onClick={() => handleSendata(course.id)}
                                className={cx("thumbnail")}
                              />
                              <div className={cx("accordion-title")}>
                                {course.title}
                                <div className={cx("accordion-description")}>
                                  {course.description}
                                </div>
                              </div>
                              <span className={cx("accordion-tag")}>
                                {isDisabled ? "Locked" : "Earn more money"}
                              </span>
                              {isComplete && showMessage  &&(
                                <div className={cx("completed-message")}>
                                  You completed this course!
                                </div>
                              )}
                              <FontAwesomeIcon
                                icon={
                                  openIndex === key
                                    ? faChevronUp
                                    : faChevronDown
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
                                        onClick={() => handleSendata(course.id)}
                                        className={cx("thumbnail")}
                                      />
                                      <div className={cx("lesson-content")}>
                                        <span className={cx("lesson-title")}>
                                          {lesson.title}
                                        </span>
                                        <span
                                          className={cx("lesson-description")}
                                        >
                                          {lesson.description}
                                        </span>
                                      </div>
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
                                onClick={() => handleSendata(course.id)}
                                className={cx("thumbnail")}
                              />
                              <div className={cx("accordion-title")}>
                                {course.title}
                                <div className={cx("accordion-description")}>
                                  {course.description}
                                </div>
                              </div>
                              <span className={cx("accordion-tag")}>
                                {isDisabled ? "Locked" : "Basic Course"}
                              </span>
                              <FontAwesomeIcon
                                icon={
                                  openIndex === key
                                    ? faChevronUp
                                    : faChevronDown
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
                                        onClick={() => handleSendata(course.id)}
                                        className={cx("thumbnail")}
                                      />
                                      <div className={cx("lesson-content")}>
                                        <span className={cx("lesson-title")}>
                                          {lesson.title}
                                        </span>
                                        <span
                                          className={cx("lesson-description")}
                                        >
                                          {lesson.description}
                                        </span>
                                      </div>
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
                        const isDisabled = course.isBlocked;
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
                              onClick={() => {
                                if (!isDisabled) {
                                  toggleAccordion("advanced", index);
                                }
                              }}
                            >
                              <img
                                src={course.linkImg}
                                alt={course.title}
                                onClick={() => handleSendata(course.id)}
                                className={cx("thumbnail")}
                              />
                              <div className={cx("accordion-title")}>
                                {course.title}
                                <div className={cx("accordion-description")}>
                                  {course.description}
                                </div>
                              </div>
                              <span className={cx("accordion-tag")}>
                                {isDisabled ? "Locked" : "Basic Course"}
                              </span>
                              <FontAwesomeIcon
                                icon={
                                  openIndex === key
                                    ? faChevronUp
                                    : faChevronDown
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
                                        onClick={() => handleSendata(course.id)}
                                        alt={lesson.title}
                                        className={cx("thumbnail")}
                                      />
                                      <div className={cx("lesson-content")}>
                                        <span className={cx("lesson-title")}>
                                          {lesson.title}
                                        </span>
                                        <span
                                          className={cx("lesson-description")}
                                        >
                                          {lesson.description}
                                        </span>
                                      </div>
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
      )}
    </div>
  );
}

export default Academy;
