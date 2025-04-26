import styles from "./Chat.module.css";
import classname from "classnames/bind";
import ChatSocket from "../../../../Socket/ChatSocket";
import { useUser } from "../../../../Context/AuthContext";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ProjectChatSocket from "../../../../Socket/ProjectChatSocket";
import { get_message_by_project } from "../../../../Services/MessageService";
import useToast from "../../../../CustomHook/useToast";
import { formatDateTimeFunc } from "../../../../Utils/formatTime";
const cx = classname.bind(styles);
function Chat() {
	const [input, setInput] = useState("");
	const { getUserValue } = useUser();
	const location = useLocation();
	const userId = getUserValue().id;
	const [messages, setMessages] = useState([]);
	const projectId = location.pathname.split("/")[3];
	const { showToast } = useToast();
	const { sendMessageProject } = ProjectChatSocket({
		projectId,
		onMessage: msg => setMessages(prev => [...prev, msg]),
	});

	useEffect(() => {
		const fetchData = async () => {
			const res = await get_message_by_project(projectId);
			if (res.status == "success") {
				setMessages(res.data);
			} else {
				showToast({
					message: "Something went wrong",
					type: "error",
				});
			}
		};
		fetchData();
	}, []);
	const handleSend = () => {
		sendMessageProject({
			content: input,
			user: { id: userId },
			testProjectId: projectId,
			time_created: Date.now(),
		});
		setInput("");
	};
	return (
		<div className={cx("chat-ctn")}>
			<div class={cx("chat-header")}>
				<img src="/icons/i-chatbot.svg" alt="ChatBot Icon" class={cx("chat-icon")} />
				<p class={cx("chat-title")}>
					"Welcome to the discussion area! This is where testers and team leaders discuss, report bugs and find solutions quickly. Let's
					work together effectively and improve product quality!"
				</p>
			</div>
			<h3 className={cx("chat-label")}>Chat</h3>
			<div class={cx("chat-box")}>
				{messages?.map(item => (
					<div class={cx("message")}>
						<div>
							<img
								src={
									item.user.avatar ||
									"https://static.vecteezy.com/system/resources/thumbnails/020/271/547/small/portrait-of-a-beautiful-asian-woman-full-face-portrait-in-flat-style-avatar-female-diversity-free-vector.jpg"
								}
								alt="User"
							/>
							<p class={cx("user-name")}>
								{formatDateTimeFunc(item.time_created)} <strong>{item.user.name}</strong>
							</p>
						</div>
						<p class={cx("message-text")}>{item.content}</p>
					</div>
				))}
			</div>

			<div class={cx("chat-input")}>
				<input
					onInput={e => {
						setInput(e.target.value);
					}}
					value={input}
					type="text"
					placeholder="Send a message to the chat"
				/>
				<div onClick={handleSend} class={cx("send-btn")}>
					<img src="/icons/i-send.svg"></img>
				</div>
			</div>
		</div>
	);
}

export default Chat;
