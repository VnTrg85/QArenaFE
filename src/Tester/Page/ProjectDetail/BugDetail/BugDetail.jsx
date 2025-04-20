import { useEffect, useState } from "react";
import styles from "./BugDetail.module.css";
import classname from "classnames/bind";
import { useLocation } from "react-router-dom";
import { get_bug_report_detail } from "../../../../Services/BugReportService";
import useToast from "../../../../CustomHook/useToast";
import { formatDateTimeFunc } from "../../../../Utils/formatTime";
import VideoSlider from "../../../Component/VideoSlider/VideoSlider";
import ChatSocket from "../../../../Socket/ChatSocket";
import { useUser } from "../../../../Context/AuthContext";
import { get_message_by_bug_report } from "../../../../Services/MessageService";
const cx = classname.bind(styles);

function BugDetail() {
	const location = useLocation();
	const bugId = location.pathname.split("/")[5];
	const { getUserValue } = useUser();
	const { showToast } = useToast();
	const [bugDetail, setBugDetail] = useState(null);
	const [messages, setMessages] = useState([]);
	const [input, setInput] = useState("");
	const userId = getUserValue().id;
	const { sendMessageBug } = ChatSocket({
		bugId,
		userId,
		onMessage: msg => setMessages(prev => [...prev, msg]),
		onNotify: msg => alert(msg),
	});
	const handleSend = () => {
		sendMessageBug({
			content: input,
			user: { id: userId },
			bugReport: { id: bugId },
			testProject: null,
			time_created: Date.now(),
		});
		setInput("");
	};
	useEffect(() => {
		const fetchData = async () => {
			if (bugId) {
				const res = await get_bug_report_detail(bugId);
				if (res.status == "success") {
					setBugDetail(res.data);
					console.log(res.data);
				} else {
					showToast({
						message: "Some thing went wrong",
						type: "error",
					});
				}
			}
		};
		fetchData();
	}, [bugId]);

	useEffect(() => {
		const fetchMessage = async () => {
			const res = await get_message_by_bug_report(bugId);
			if (res.status == "success") {
				setMessages(res.data);
			} else {
				showToast({
					message: "Something went wrong",
					type: "error",
				});
			}
		};
		fetchMessage();
	}, []);
	return (
		<div className={cx("bug-wrapper")}>
			<div>
				<h2 className={cx("bug-title")}>After scroll down and click on the options in Quick Comparison, it is not highlighted on the top.</h2>
				<div className={cx("bug-report")}>
					<div className={cx("section")}>
						<p className={cx("label")}>Status</p>
						<p className={cx("status", "rejected")}>{bugDetail?.status}</p>
					</div>
					<div className={cx("section", "tester")}>
						<p className={cx("label")}>Tester</p>
						<div className={cx("tester-info")}>
							<img
								src={
									bugDetail?.user.avatart ||
									"https://static.vecteezy.com/system/resources/thumbnails/020/271/547/small/portrait-of-a-beautiful-asian-woman-full-face-portrait-in-flat-style-avatar-female-diversity-free-vector.jpg"
								}
								alt="User"
							/>
							<p>{bugDetail?.user?.name}</p>
						</div>
					</div>
					<div className={cx("section")}>
						<p className={cx("label")}>Feature</p>
						<p>{bugDetail?.testFeature?.name}</p>
					</div>
					<div className={cx("section")}>
						<p className={cx("label")}>Bug Type</p>
						<p className={cx("icon")}>
							<img src={bugDetail?.bugType.icon_link}></img>
							{bugDetail?.bugType.name}
						</p>
					</div>
					<div className={cx("section")}>
						<p className={cx("label")}>Bug ID</p>
						<p>#{bugDetail?.id}</p>
					</div>
					<div className={cx("section")}>
						<p className={cx("label")}>Reported on</p>
						<p>{formatDateTimeFunc(bugDetail?.reported_at)}</p>
					</div>

					<div className={cx("section")}>
						<p className={cx("label")}>Test ID</p>
						<p>#{bugDetail?.testProject.id}</p>
					</div>

					<div className={cx("section", "devices")}>
						<p className={cx("label")}>Devices</p>
						<div className={cx("device-info")}>
							<img src={bugDetail?.device.icon_link} alt="Mac OS" />
							<p>
								{bugDetail?.device.name} {bugDetail?.versionSelected}
							</p>
						</div>
					</div>
					<div className={cx("section", "browswe")}>
						<p className={cx("label")}>Browsers</p>
						<div className={cx("device-info")}>
							<img src={bugDetail?.browser.icon_link} alt="Chrome" />
							<p>{bugDetail?.browser.name}</p>
						</div>
					</div>
					<div className={cx("section")}>
						<p className={cx("label")}>Known Bug</p>
						<p>No</p>
					</div>
				</div>
			</div>
			<div className={cx("bug-wrapper-body")}>
				<div className={cx("left-column")}>
					<div className={cx("bug-container")}>
						<div className={cx("url")}>
							<h3>URL: </h3>
							<p>{bugDetail?.url_test}</p>
						</div>
						<div className={cx("results")}>
							<h3>Actual Result</h3>
							<p className={cx("actual-result")}>{bugDetail?.actual_result}</p>
							<h3>Expected Result</h3>
							<p className={cx("expected-result")}>{bugDetail?.expected_result}</p>
						</div>
						<div className={cx("comment-section")}>
							<div className={cx("comment-header")}>
								<span className={cx("active-tab")}>
									Comments <span className={cx("count")}>(1)</span>
								</span>
							</div>
							<div className={cx("comment-box")}>
								<input
									onInput={e => {
										setInput(e.target.value);
									}}
									value={input}
									placeholder="Write a comment..."
								/>
								<button onClick={handleSend} className={cx("send-button")}>
									<img src="/icons/i-send.svg" alt="Send" />
								</button>
							</div>
							<div className={cx("comment-wrapper")}>
								{messages?.map((item, index) => (
									<div className={cx("comment")}>
										<div className={cx("comment-avatar")}>
											<img
												src={
													item.user.avatar ||
													"https://static.vecteezy.com/system/resources/thumbnails/020/271/547/small/portrait-of-a-beautiful-asian-woman-full-face-portrait-in-flat-style-avatar-female-diversity-free-vector.jpg"
												}
												alt="User"
											/>
											<span className={cx("comment-time")}>
												<strong>{item.user.name}</strong>
												{formatDateTimeFunc(item.time_created)}
											</span>
										</div>
										<div className={cx("comment-content")}>{item.content}</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
				<div className={cx("right-column")}>
					<div className={cx("bug-container")}>
						<div className={cx("attachments")}>
							<h3>Attachments</h3>
							<div className={cx("video-container")}>
								{bugDetail?.screenshotUrl.length > 0 && <VideoSlider videos={bugDetail?.screenshotUrl}> </VideoSlider>}
							</div>
						</div>
						<div className={cx("steps")}>
							<h3>Steps</h3>
							<ol>
								{bugDetail?.reproductionSteps.map((item, index) => (
									<li key={index}>{item}</li>
								))}
							</ol>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default BugDetail;
