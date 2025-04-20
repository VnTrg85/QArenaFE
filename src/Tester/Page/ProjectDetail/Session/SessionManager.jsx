import { useEffect, useMemo, useState } from "react";
import styles from "./SessionManager.module.css";
import classname from "classnames/bind";
import { useUser } from "../../../../Context/AuthContext";
import { get_sessions } from "../../../../Services/Session";
import { useLocation } from "react-router-dom";
import useToast from "../../../../CustomHook/useToast";
const cx = classname.bind(styles);

function SessionManager() {
	const { getUserValue } = useUser();
	const [sessions, setSessions] = useState([]);
	const location = useLocation();
	const { showToast } = useToast();
	const [popupOpen, setPopupOpen] = useState([]);
	useEffect(() => {
		const fetchData = async () => {
			const res = await get_sessions(getUserValue().id, location.pathname.split("/")[3]);
			console.log(res);
			if (res.status == "success") {
				setSessions(res.data);
			} else {
				showToast({
					message: res.data || "Some thing went wrong!",
					type: "error",
				});
			}
		};
		fetchData();
	}, []);
	const formatDate = dateString => {
		const date = new Date(dateString);
		const hours = date.getHours().toString().padStart(2, "0");
		const minutes = date.getMinutes().toString().padStart(2, "0");
		const day = date.getDate().toString().padStart(2, "0");
		const month = (date.getMonth() + 1).toString().padStart(2, "0"); // month starts at 0
		const year = date.getFullYear();

		return `${hours}:${minutes} ${day}/${month}/${year}`;
	};

	const formatMinute = (timeStart, timeEnd) => {
		const timeS = new Date(timeStart);
		const timeE = new Date(timeEnd);
		const diffMs = timeE - timeS; // hiệu số thời gian (milliseconds)
		const diffMinutes = Math.floor(diffMs / 60000); // chia cho 60,000 để ra phút

		return diffMinutes;
	};

	return (
		<div className={cx("session-manager-ctn")}>
			<h1 className={cx("title")}>Test Sessions</h1>

			{/* Session #1 */}
			<div className={cx("session-ctn")}>
				{sessions.map((item, index) => (
					<div className={cx("session")} key={item.id}>
						<div className={cx("sessionHeader")}>
							<div class={cx("session-label")}>
								<span className={cx("sessionTitle")}>Session #{index + 1}</span>
								<span className={cx("sessionTime")}>{formatMinute(item.startAt, item.endAt)} minutes</span>
							</div>
							<div className={cx("sessionIcons")}>
								<div className={cx("iconGroup")}>
									<div className={cx("bugIcon")}>
										<img src="/icons/i-triangle.svg" />
									</div>
									<span>{item.bugs?.length ? item.bugs.length : 0}</span>
								</div>
								<div className={cx("dropdown")}>
									{popupOpen.find(val => val.id == item.id) ? (
										<img
											onClick={() => {
												setPopupOpen(prev => prev.filter(val => val.id != item.id));
											}}
											src="/icons/i-chevron-up.svg"
										></img>
									) : (
										<img
											onClick={() => {
												setPopupOpen(prev => [...prev, item]);
												console.log(popupOpen);
											}}
											src="/icons/i-chevron-down.svg"
										></img>
									)}
								</div>
							</div>
						</div>
						{popupOpen.find(val => val.id == item.id) && (
							<div className={cx("sessionContent")}>
								<div class={cx("sessionContent-item")}>
									<div className={cx("sectionLabel")}>Bugs found</div>
									<div className={cx("sessionContent-body")}>
										<span className={cx("bugIcon")}>{/* <img src="/icons/i-find.svg" /> */}</span>
										<span className={cx("session-text")}>{item.bugs ? item.bug.length : 0}</span>
									</div>
								</div>
								<div class={cx("sessionContent-item")}>
									<div className={cx("sectionLabel")}>Start at</div>
									<div className={cx("sessionContent-body")}>
										<span className={cx("bugIcon")}>{/* <img src="/icons/i-time-start.svg" /> */}</span>
										<span className={cx("session-text")}>{formatDate(item.startAt)}</span>
									</div>
								</div>
								<div class={cx("sessionContent-item")}>
									<div className={cx("sectionLabel")}>End at</div>
									<div className={cx("sessionContent-body")}>
										<span className={cx("bugIcon")}>{/* <img src="/icons/i-time-end.svg" /> */}</span>
										<span className={cx("session-text")}>{formatDate(item.endAt)}</span>
									</div>
								</div>
							</div>
						)}
					</div>
				))}
			</div>
		</div>
	);
}

export default SessionManager;
