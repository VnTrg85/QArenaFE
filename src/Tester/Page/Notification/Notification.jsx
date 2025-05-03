import { useEffect, useState } from "react";
import styles from "./Notification.module.css";
import classname from "classnames/bind";
import { get_noti_by_user, mark_read_noti_by_user } from "../../../Services/NotificationService.js";
import { useUser } from "../../../Context/AuthContext.jsx";
import useToast from "../../../CustomHook/useToast.js";
import { useNavigate } from "react-router-dom";
const cx = classname.bind(styles);

function Notification() {
	const [notis, setNotis] = useState([]);
	const { getUserValue } = useUser();
	const userId = getUserValue().id;
	const { showToast } = useToast();
	const navigate = useNavigate();
	useEffect(() => {
		const fetchData = async () => {
			const res = await get_noti_by_user(userId);
			if (res.status == "success") {
				console.log(res.data);
				setNotis(res.data.reverse());
			} else {
				showToast({
					message: "Something went wrong",
					type: "error",
				});
			}
		};
		fetchData();
	}, []);
	useEffect(() => {
		const markAllRead = async () => {
			const res = await mark_read_noti_by_user(userId);
			if (res.status == "success") {
			} else {
				showToast({
					message: "Something went wrong",
					type: "error",
				});
			}
		};
		markAllRead();
	}, []);
	const handleNavigate = item => {
		if (item.type == "BUG_REPORT") {
			navigate(`/dGVzdGVy/project/${item?.link_url?.split("/")[0]}/bugs/${item.link_url.split("/")[1]}`);
		}
	};

	// const data = {
	// 	type: "TEXT_INPUT",
	// 	condition: "DEFAULT",
	// 	details: [
	// 		{
	// 			user_input_text_type: "EMAIL",
	// 			actions: [
	// 				{
	// 					id: "5837e966-762c-4be7-af34-5a89db3779de",
	// 					type: "SEND_EMAIL",
	// 					email: "456@anc.com",
	// 				},
	// 				{
	// 					type: "CALL_PHONE",
	// 					phone: "12123123",
	// 				},
	// 				{
	// 					type: "START_ANOTHER_FLOW",
	// 					next_block: {
	// 						id: "5837e966-762c-4be7-af34-5a89db3779de",
	// 					},
	// 				},
	// 			],
	// 		},
	// 	],
	// };
	// const second = {
	// 	type: "BUTTON",
	// 	condition: "DEFAULT",
	// 	details: [
	// 		{
	// 			name: "abc",
	// 			actions: [
	// 				{
	// 					id: "5837e966-762c-4be7-af34-5a89db3779de",
	// 					type: "SEND_EMAIL",
	// 					email: "456@anc.com",
	// 				},
	// 				{
	// 					type: "CALL_PHONE",
	// 					phone: "12123123",
	// 				},
	// 				{
	// 					type: "START_ANOTHER_FLOW",
	// 					next_block: {
	// 						id: "5837e966-762c-4be7-af34-5a89db3779de",
	// 					},
	// 				},
	// 			],
	// 		},
	// 		{
	// 			name: "heelo",
	// 			actions: [
	// 				{
	// 					id: "5837e966-762c-4be7-af34-5a89db3779de",
	// 					type: "SEND_EMAIL",
	// 					email: "456@anc.com",
	// 				},
	// 				{
	// 					type: "CALL_PHONE",
	// 					phone: "12123123",
	// 				},
	// 				{
	// 					type: "START_ANOTHER_FLOW",
	// 					next_block: {
	// 						id: "5837e966-762c-4be7-af34-5a89db3779de",
	// 					},
	// 				},
	// 			],
	// 		},
	// 	],
	// };
	return (
		<div className={cx("noti-wrapper")}>
			<h3 class={cx("noti-label")}>Notifications</h3>
			<div class={cx("noti-ctn")}>
				{notis.map(item => (
					<div className={cx("noti-item")} key={item.id}>
						<div className={cx("noti-left")}>
							<img
								src={
									item.sender?.avatar ||
									"https://static.vecteezy.com/system/resources/thumbnails/020/271/547/small/portrait-of-a-beautiful-asian-woman-full-face-portrait-in-flat-style-avatar-female-diversity-free-vector.jpg"
								}
							></img>
							<span>{item.sender?.name}</span>
						</div>
						<div className={cx("noti-right")}>
							<span>{item.type == "BUG_REPORT" ? "BUG REPORT" : "TEST PROJECT"}</span>
							<span className={cx("noti-content")}>{item.content}</span>
							{item.type == "BUG_REPORT" && (
								<span className={cx("more-info")}>
									Project ID: #{item?.link_url?.split("/")[0]} Bug ID: #{item?.link_url?.split("/")[1]}
								</span>
							)}
							<span onClick={() => handleNavigate(item)}>More detail</span>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default Notification;
