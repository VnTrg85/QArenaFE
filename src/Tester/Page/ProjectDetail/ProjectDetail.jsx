import styles from "./ProjectDetail.module.css";
import classname from "classnames/bind";
import ArticleDetail from "../../Component/ArticleDetail/ArticleDetail";
import { useState } from "react";
import ListBug from "./ListBug/ListBug";
import Chat from "./Chat/Chat";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
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
const cx = classname.bind(styles);

function ProjectDetail() {
	const location = useLocation();
	const navigate = useNavigate();
	const { getUserValue } = useUser();
	const { showToast } = useToast();
	const dispatch = useDispatch();
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
		{ id: 4, name: "Known Bugs", path: "known-bug" },
		{ id: 5, name: "Chat", path: "chat" },
		{ id: 6, name: "Team", path: "teams" },
	];
	const sessions = useSelector(state => state.session);
	//Side effect
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
				<div className={cx("project-content")}>
					<Outlet></Outlet>
				</div>
			</div>
			<div className={cx("project-footer")}>
				<span
					onClick={() => {
						navigate(`/dGVzdGVy/project/${location.pathname.split("/")[3]}/bug/create`);
					}}
				>
					Submit bug
				</span>
				<p>Why can I submit bug?</p>
			</div>
			{location.pathname.includes("/bug/create") && (
				<div className={cx("project-footer")}>
					<span className={cx("btn-submit")}>
						<img src="/icons/i-tick.svg"></img>
						Submit
					</span>
					<span>Cancle</span>
				</div>
			)}
		</div>
	);
}

export default ProjectDetail;
