import styles from "./ProjectDetail.module.css";
import classname from "classnames/bind";
import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import Modal from "../../Component/Modal/Modal";
import { create_session, end_session, get_session_doing } from "../../../Services/Session";
import { useUser } from "../../../Context/AuthContext";
import useToast from "../../../CustomHook/useToast";
import { useSelector, useDispatch } from "react-redux";
import { addSession, markSessionDone } from "../../../Store/sessionSlice.js";
import { SubmitContext } from "../../Context/SubmitContext.jsx";
import { addNotification, removeNotification } from "../../../Store/notificationSlice.js";
import { current } from "@reduxjs/toolkit";
import { formatDate, formatDateTimeFunc } from "../../../Utils/formatTime.js";
import { setCurrentProject } from "../../../Store/testProjectSlice";
import { get_test_project_detail } from "../../../Services/TestProjectService.js";

const cx = classname.bind(styles);
function ProjectDetail() {
	const location = useLocation();
	const navigate = useNavigate();
	const { getUserValue } = useUser();
	const { showToast } = useToast();
	const dispatch = useDispatch();
	const projectId = location.pathname.split("/")[3];
	//state
	const [isReady, setIsReady] = useState(false);
	const [isOpenSessionPopup, setIsOpenSessionPopup] = useState(false);
	const [isEndSessionPopup, setIsEndSessionPopup] = useState(false);
	const [currentSession, setCurrentSession] = useState(null);
	const [timeLeft, setTimeLeft] = useState(null);
	const [currentTimeRange, setCurrentTimeRange] = useState("");
	const [currentTab, setCurrentTab] = useState("");
	const [submitTrigger, setSubmitTrigger] = useState(false);
	const [expired, setExpired] = useState(false);
	const currentProject = useSelector(state => state.currentProject);

	const header = [
		{ id: 1, name: "Overview", path: "" },
		{ id: 2, name: "Test Sessions", path: "session" },
		{ id: 3, name: "Bugs", path: "bugs" },
		{ id: 4, name: "Chat", path: "chat" },
		{ id: 5, name: "Team", path: "teams" },
	];
	const sessions = useSelector(state => state.session);
	//Side effect
	useEffect(() => {
		if (projectId) {
			const fetchData = async () => {
				const res = await get_test_project_detail(projectId);
				if (res.status == "success") {
					dispatch(setCurrentProject(res.data));
				} else {
					showToast({
						message: res.data || "Something went wrong",
						type: "error",
					});
				}
			};
			fetchData();
		}
	}, [projectId]);
	useEffect(() => {
		const endSessionFuc = async () => {
			await handleEndSession();
		};
		if (timeLeft && timeLeft <= 0) {
			endSessionFuc();
			return;
		}

		const intervalId = setInterval(() => {
			setTimeLeft(prev => prev - 1);
		}, 1000);

		return () => clearInterval(intervalId); // cleanup khi component unmount hoặc re-render
	}, [timeLeft]);

	useEffect(() => {
		const fetchSession = async () => {
			const res = await get_session_doing(getUserValue().id, location.pathname.split("/")[3]);
			if (res.status == "success") {
				if (res.data) {
					setCurrentSession(res.data);
					dispatch(addSession(res.data));
				}
			} else {
				showToast({
					message: res.data | "Something went wrong",
					type: "error",
				});
			}
			setIsReady(true);
		};
		fetchSession();
	}, []);
	useEffect(() => {
		if (currentSession) {
			setTimeLeft((new Date(currentSession.endAt) - new Date()) / 1000);
		}
	}, [currentSession]);
	useEffect(() => {
		setExpired(checkExpiredProject(currentProject?.end_At));
	}, [currentProject]);
	//Method
	const checkExpiredProject = dateProject => {
		const dateFirst = new Date(dateProject);
		const dateSecond = new Date(Date.now());
		if (dateFirst.getTime() < dateSecond.getTime()) {
			return true;
		}
		return false;
	};
	const formatTime = seconds => {
		const mins = Math.floor(seconds / 60);
		const secs = Math.floor(seconds % 60);

		return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
	};
	const handleClosePopup = () => {
		setIsOpenSessionPopup(false);
	};
	const handleCloseEndPopup = () => {
		setIsEndSessionPopup(false);
	};
	const handleChangeTab = item => {
		setCurrentTab(item.path);
		navigate(`/dGVzdGVy/project/${location.pathname.split("/")[3]}/${item.path}`);
	};
	const handleSelect = e => {
		setCurrentTimeRange(e.target.value);
	};
	const handleCreateSession = async () => {
		const now = new Date(); // thời gian hiện tại
		let endAt;
		if (currentTimeRange == "30minutes") {
			endAt = new Date(now.getTime() + 30 * 60000);
		} else if (currentTimeRange == "60minutes") {
			endAt = new Date(now.getTime() + 60 * 60000);
		}
		if (currentTimeRange == "120minutes") {
			endAt = new Date(now.getTime() + 120 * 60000);
		}

		const data = {
			startAt: now,
			endAt: endAt,
			status: "doing",
			testProject: { id: location.pathname.split("/")[3] },
			user: { id: getUserValue().id },
		};
		const res = await create_session(data);
		if (res.status == "success") {
			setCurrentSession(res.data);
			dispatch(addSession(res.data));
			showToast({
				message: "Create session successfully",
				type: "success",
			});
			setIsOpenSessionPopup(false);
		} else {
			showToast({
				message: res.data | "Something went wrong",
				type: "error",
			});
		}
	};

	const handleEndSession = async () => {
		if (currentSession) {
			const res = await end_session(currentSession?.id);
			if (res.status == "success") {
				dispatch(markSessionDone(res.data));
				setCurrentSession(null);
				handleCloseEndPopup();
			}
		}
	};

	const handleSubmitBug = () => {
		setSubmitTrigger(prev => !prev);
	};
	return (
		<SubmitContext.Provider value={{ submitTrigger, setSubmitTrigger }}>
			<div className={cx("project-ctn")}>
				<div className={cx("project-header")}>
					<h3 className={cx("project-header-label")}>
						<div className={cx("project-header-label-ctn")}>
							{currentProject?.projectName}
							<span className={cx("end-at-label")}>End at: {formatDateTimeFunc(currentProject?.end_At)}</span>
						</div>
						{currentSession && (
							<div className={cx("progress-bar-ctn")}>
								<span>End in {formatTime(timeLeft)}</span>
								<div className={cx("progress-bar")}></div>
							</div>
						)}
						{!expired && (
							<div className={cx("session-section")}>
								{!currentSession && <img onClick={() => setIsOpenSessionPopup(true)} src="/icons/i-session.svg"></img>}
								{currentSession && <img onClick={() => setIsEndSessionPopup(true)} src="/icons/i-session-end.svg" />}
								{isOpenSessionPopup && (
									<Modal closeModal={handleClosePopup}>
										<div className={cx("session-popup")}>
											<div className={cx("close-icon")}>
												<img onClick={handleClosePopup} src="/icons/i-close.svg"></img>
											</div>
											<div className={cx("modal-header")}>New Test Session</div>
											<div className={cx("modal-body")}>
												<div className={cx("form-group")}>
													<label>Estimated time I will test</label>
													<select onChange={e => handleSelect(e)}>
														<option value="">Please select</option>
														<option value="30minutes">30 minutes</option>
														<option value="60minutes">1 hour</option>
														<option value="120minute">2 hours</option>
													</select>
												</div>
											</div>
											<div className={cx("modal-footer")}>
												<button onClick={handleClosePopup} className={cx("btn", "btn-cancel")}>
													Cancel
												</button>
												<button
													onClick={handleCreateSession}
													className={cx("btn", "btn-start", currentTimeRange ? "" : "disable")}
												>
													Start session
												</button>
											</div>
										</div>
									</Modal>
								)}
								{isEndSessionPopup && (
									<Modal closeModal={handleCloseEndPopup}>
										<div className={cx("session-popup")}>
											<div className={cx("close-icon")}>
												<img onClick={handleCloseEndPopup} src="/icons/i-close.svg"></img>
											</div>
											<div className={cx("modal-header")}>End your session</div>
											<div className={cx("modal-body")}>
												<div className={cx("form-group")}>
													<label>Do your want to end your session?</label>
												</div>
											</div>
											<div className={cx("modal-footer")}>
												<button onClick={handleCloseEndPopup} className={cx("btn", "btn-cancel")}>
													Cancel
												</button>
												<button onClick={handleEndSession} className={cx("btn", "btn-start")}>
													End session
												</button>
											</div>
										</div>
									</Modal>
								)}
							</div>
						)}
					</h3>

					<div className={cx("project-header-sub")}>
						{header.map(item => (
							<div
								onClick={() => handleChangeTab(item)}
								key={item.id}
								className={cx("header-item", item.path == currentTab ? "active" : "")}
							>
								{item.name}
							</div>
						))}
					</div>
					{isReady && (
						<div className={cx("project-content")}>
							<Outlet></Outlet>
						</div>
					)}
				</div>
				<div className={cx("project-footer")}>
					<span
						onClick={() => {
							navigate(`/dGVzdGVy/project/${location.pathname.split("/")[3]}/bug/create`);
						}}
						className={cx(currentSession ? "" : "disable")}
					>
						Submit bug
					</span>
					{!currentSession && <p>Please create a session before test by clicking on the RED button on the top right !</p>}
				</div>
				{location.pathname.includes("/bug/create") && (
					<div className={cx("project-footer")}>
						<span onClick={handleSubmitBug} className={cx("btn-submit")}>
							<img src="/icons/i-tick.svg"></img>
							Submit
						</span>
						<span
							onClick={() => {
								navigate(`/dGVzdGVy/project/${location.pathname.split("/")[3]}`);
							}}
						>
							Cancle
						</span>
					</div>
				)}
			</div>
		</SubmitContext.Provider>
	);
}

export default ProjectDetail;
