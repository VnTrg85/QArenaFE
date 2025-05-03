import { useNavigate } from "react-router-dom";
import styles from "./Header.module.css";
import classname from "classnames/bind";
import NotificationSocket from "../../../Socket/NotificationSocket";
import { useUser } from "../../../Context/AuthContext";
import { useEffect, useState } from "react";
import { get_unread_noti } from "../../../Services/NotificationService.js";
import useToast from "../../../CustomHook/useToast";
import { useNavigate } from "react-router-dom";
const cx = classname.bind(styles);

function Header() {
	const navigate = useNavigate();

	const [currentItem, setCurrentItem] = useState("");
	const handleNavigate = path => {
		navigate(`/dGVzdGVy/${path}`);
	};
	const [number, setNumber] = useState();
	const { showToast } = useToast();
	const { getUserValue } = useUser();
	const userId = getUserValue().id;
	const notis = NotificationSocket({
		userId,
		onNotify: noti => setNumber(prev => prev + 1),
	});

	useEffect(() => {
		const fetchData = async () => {
			const res = await get_unread_noti(userId);
			if (res.status == "success") {
				setNumber(res.data);
			} else {
				showToast({
					message: "Something went wrong",
					type: "error",
				});
			}
		};
		fetchData();
	}, []);

	return (
		<div className={cx("header-ctn")}>
			<div className={cx("header-ctn-left")}>
				<img class={cx("icon-ava")} src="/icons/i-qarenalogo.svg"></img>
				<div className={cx("header-ctn-wrapper")}>
					<div class={cx("divider")}></div>

					<div
						onClick={() => {
							handleNavigate("profile");
							setCurrentItem("profile");
						}}
						className={cx("header-item", currentItem == "profile" ? "active" : "")}
					>
						<img src="/icons/i-profile.svg" />
						<span>Your profile</span>
					</div>
					<div class={cx("divider")}></div>
					<div
						onClick={() => {
							handleNavigate("activities");
							setCurrentItem("activities");
						}}
						className={cx("header-item", currentItem == "activities" ? "active" : "")}
					>
						<img src="/icons/i-activities.svg" />
						<span>Activities</span>
					</div>
					<div class={cx("divider")}></div>

					<div
						onClick={() => {
							handleNavigate("your-devices");
							setCurrentItem("your-devices");
						}}
						className={cx("header-item", currentItem == "your-devices" ? "active" : "")}
					>
						<img src="/icons/i-device.svg" />
						<span>Your Devices</span>
					</div>
					<div class={cx("divider")}></div>

					<div
						onClick={() => {
							handleNavigate("billing");
							setCurrentItem("billing");
						}}
						className={cx("header-item", currentItem == "billing" ? "active" : "")}
					>
						<img src="/icons/i-billing.svg" />
						<span>Billing</span>
					</div>
					<div class={cx("divider")}></div>

					<div
						onClick={() => {
							handleNavigate("academy");
							setCurrentItem("academy");
						}}
						className={cx("header-item", currentItem == "academy" ? "active" : "")}
					>
						<img src="/icons/i-learn.svg" />
						<span>Learn</span>
					</div>
					<div class={cx("divider")}></div>
				</div>
			</div>
			<div className={cx("header-ctn-right")}>
				<div className={cx("header-item")}>
					<img src="/icons/i-discord.svg" />
				</div>
				<div
					onClick={() => {
						handleNavigate("notification");
						setNumber(0);
					}}
					className={cx("header-item")}
				>
					<img src="/icons/i-bell.svg" />
					<span className={cx("noti-bell")}>{number}</span>
				</div>
			</div>
		</div>
	);
}

export default Header;
