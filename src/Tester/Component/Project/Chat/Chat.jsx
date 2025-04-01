import styles from "./Chat.module.css";
import classname from "classnames/bind";

const cx = classname.bind(styles);

function Chat() {
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
				<div class={cx("message")}>
					<div>
						<img
							src="https://static.vecteezy.com/system/resources/thumbnails/020/271/547/small/portrait-of-a-beautiful-asian-woman-full-face-portrait-in-flat-style-avatar-female-diversity-free-vector.jpg"
							alt="User"
						/>
						<p class={cx("user-name")}>
							11 months ago by <strong>Victor (TL)</strong>
						</p>
					</div>
					<p class={cx("message-text")}>@angelina_chanysheva You should delete the duplicated bugs.</p>
				</div>

				<div class={cx("message")}>
					<div>
						<img
							src="https://static.vecteezy.com/system/resources/thumbnails/020/271/547/small/portrait-of-a-beautiful-asian-woman-full-face-portrait-in-flat-style-avatar-female-diversity-free-vector.jpg"
							alt="User"
						/>
						<p class={cx("user-name")}>
							11 months ago by <strong>Victor (TL)</strong>
						</p>
					</div>
					<p class={cx("message-text")}>
						@teamleader Please note, by some bug of the test io platform I can see 4 duplication of (Safari Mac OS 14.4.1) Error occurs
						when clicking "Shop Now" button after selecting and comparing options.
					</p>
				</div>

				<div class={cx("message")}>
					<div>
						<img
							src="https://static.vecteezy.com/system/resources/thumbnails/020/271/547/small/portrait-of-a-beautiful-asian-woman-full-face-portrait-in-flat-style-avatar-female-diversity-free-vector.jpg"
							alt="User"
						/>
						<p class={cx("user-name")}>
							11 months ago by <strong>Victor (TL)</strong>
						</p>
					</div>
					<p class={cx("message-text")}>
						@teamleader Please note, by some bug of the test io platform I can see 4 duplication of (Safari Mac OS 14.4.1) Error occurs
						when clicking "Shop Now" button after selecting and comparing options.
					</p>
				</div>
				<div class={cx("message")}>
					<div>
						<img
							src="https://static.vecteezy.com/system/resources/thumbnails/020/271/547/small/portrait-of-a-beautiful-asian-woman-full-face-portrait-in-flat-style-avatar-female-diversity-free-vector.jpg"
							alt="User"
						/>
						<p class={cx("user-name")}>
							11 months ago by <strong>Victor (TL)</strong>
						</p>
					</div>
					<p class={cx("message-text")}>
						@teamleader Please note, by some bug of the test io platform I can see 4 duplication of (Safari Mac OS 14.4.1) Error occurs
						when clicking "Shop Now" button after selecting and comparing options.
					</p>
				</div>
				<div class={cx("message")}>
					<div>
						<img
							src="https://static.vecteezy.com/system/resources/thumbnails/020/271/547/small/portrait-of-a-beautiful-asian-woman-full-face-portrait-in-flat-style-avatar-female-diversity-free-vector.jpg"
							alt="User"
						/>
						<p class={cx("user-name")}>
							11 months ago by <strong>Victor (TL)</strong>
						</p>
					</div>
					<p class={cx("message-text")}>
						@teamleader Please note, by some bug of the test io platform I can see 4 duplication of (Safari Mac OS 14.4.1) Error occurs
						when clicking "Shop Now" button after selecting and comparing options.
					</p>
				</div>
			</div>

			<div class={cx("chat-input")}>
				<input type="text" placeholder="Send a message to the chat" />
				<div class={cx("send-btn")}>
					<img src="/icons/i-send.svg"></img>
				</div>
			</div>
		</div>
	);
}

export default Chat;
