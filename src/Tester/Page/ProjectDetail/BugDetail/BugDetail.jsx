import { useEffect, useMemo, useRef, useState } from "react";
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
import { update_status_of_bug_report } from "../../../../Services/BugReportService";
import Modal from "../../../Component/Modal/Modal";
import { get_browsers, get_user_device } from "../../../../Services/DeviceService";
import { create_reproduction, get_all_reproduction_by_bugreport } from "../../../../Services/ReproductionService";
const CLOUD_NAME = process.env.REACT_APP_CLOUD_NAME;
const UPLOAD_PRESET = process.env.REACT_APP_UPLOAD_PRESET;
const cx = classname.bind(styles);

function BugDetail() {
	const location = useLocation();
	const bugId = location.pathname.split("/")[5];
	const testProjectId = location.pathname.split("/")[3];
	const { getUserValue } = useUser();
	const { showToast } = useToast();
	const [bugDetail, setBugDetail] = useState(null);
	const [messages, setMessages] = useState([]);
	const [input, setInput] = useState("");
	const [isOpenReproduction, setIsOpenReproduction] = useState(false);
	const [browsers, setBrowsers] = useState([]);
	const [devices, setDevices] = useState([]);
	const [currentBrowser, setCurrentBrowser] = useState();
	const [currentDevice, setCurrentDevice] = useState();
	const [file, setFile] = useState(null);
	const [reproduction, setReproduction] = useState([]);
	const inputEl = useRef();
	const userId = getUserValue().id;
	const { sendMessageBug } = ChatSocket({
		bugId,
		userId,
		onMessage: msg => setMessages(prev => [msg, ...prev]),
		onNotify: msg => alert(msg),
	});
	async function uploadToCloudinary(file) {
		const cloudName = CLOUD_NAME;
		const uploadPreset = UPLOAD_PRESET;
		const formData = new FormData();
		formData.append("file", file);
		formData.append("upload_preset", uploadPreset);

		try {
			const res = fetch(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, {
				method: "POST",
				body: formData,
			})
				.then(res => res.json())
				.then(data => {
					return data.secure_url;
				})
				.catch(e => {
					console.log(e);
				});
			return res;
		} catch (error) {}
	}
	const handleSend = () => {
		sendMessageBug({
			content: input,
			user: { id: userId },
			bugReportId: bugId,
			testProjectId: testProjectId,
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
				setMessages(res.data.reverse());
			} else {
				showToast({
					message: "Something went wrong",
					type: "error",
				});
			}
		};
		fetchMessage();
	}, []);

	const handleChangeStatus = async status => {
		const data = {
			id: bugDetail.id,
			status: status,
		};
		const res = await update_status_of_bug_report(data);
		if (res.status == "success") {
			showToast({
				message: "Successfully",
				type: "success",
			});
		} else {
			showToast({
				message: "Something went wrong",
				type: "error",
			});
		}
	};

	useEffect(() => {
		const fetchDevices = async () => {
			if (isOpenReproduction) {
				const res = await get_user_device(getUserValue().id);
				if (res.status == "success") {
					console.log(res.data);
					setDevices(res.data);
				} else {
					console.log(res);
				}
			}
		};
		fetchDevices();
	}, [isOpenReproduction]);
	useEffect(() => {
		const fetchReproduction = async () => {
			if (bugDetail?.id) {
				const res = await get_all_reproduction_by_bugreport(bugDetail.id);
				if (res.status == "success") {
					console.log(res.data);
					setReproduction(res.data);
				} else {
					console.log(res);
				}
			}
		};
		fetchReproduction();
	}, [bugDetail]);
	const listBrowsers = useMemo(() => {
		if (currentDevice) {
			const de = devices.find(item => item.id == currentDevice);
			const listBr = de.browsers?.reduce((acc, item) => {
				for (let i = 0; i < de.browserIds.length; i++) {
					const element = de.browserIds[i];
					if (element == item.id) acc.push(item);
				}
				return acc;
			}, []);
			return listBr;
		}
	}, [currentDevice]);
	const handleSubmitReproduction = async () => {
		const proofLink = await uploadToCloudinary(file);
		const data = {
			proofLink: proofLink,
			time_created: new Date(),
			bugReport: { id: bugDetail.id },
			device: {
				id: Number(devices.find(item => item.id == currentDevice).devices.id),
			},
			browser: {
				id: currentBrowser,
			},
			user: {
				id: getUserValue().id,
			},
		};
		const res = await create_reproduction(data);
		if (res.status == "success") {
			showToast({
				message: "Successfully",
				type: "success",
			});
			setIsOpenReproduction(false);
		} else {
			showToast({
				message: "Something went wrong",
				type: "error",
			});
		}
	};

	const availableReproduction = useMemo(() => {
		if (
			reproduction?.length >= 3 ||
			reproduction.find(item => item.userId == getUserValue().id) ||
			getUserValue().id == bugDetail?.user.id ||
			getUserValue().role == "4"
		) {
			return false;
		}
		return true;
	}, [reproduction]);
	return (
		<div className={cx("bug-wrapper")}>
			<div>
				<h2 className={cx("bug-title")}>{bugDetail?.title}</h2>
				<div className={cx("bug-report")}>
					<div className={cx("section")}>
						<p className={cx("label")}>Status</p>
						<p
							className={cx(
								"status",
								bugDetail?.status == "awaiting" ? "awaiting" : "",
								bugDetail?.status == "rejected" ? "rejected" : "",
								bugDetail?.status == "accepted" ? "accepted" : "",
							)}
						>
							{bugDetail?.status}
						</p>
					</div>
					<div className={cx("section", "tester")}>
						<p className={cx("label")}>Tester</p>
						<div className={cx("tester-info")}>
							<img
								src={
									bugDetail?.user.avatar ||
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
					{/* <div className={cx("section")}>
						<p className={cx("label")}>Bug ID</p>
						<p>#{bugDetail?.id}</p>
					</div> */}
					<div className={cx("section")}>
						<p className={cx("label")}>Reported on</p>
						<p>{formatDateTimeFunc(bugDetail?.reported_at)}</p>
					</div>

					<div className={cx("section")}>
						<p className={cx("label")}>Test Project ID</p>
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
				</div>
			</div>
			<div className={cx("bug-wrapper-body")}>
				<div className={cx("right-column")}>
					<div className={cx("bug-container")}>
						<div className={cx("attachments")}>
							<div className={cx("attachments-header")}>
								<h3>Attachments</h3>
							</div>
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
						{getUserValue().role == "4" && (
							<div className={cx("action-test-leader")}>
								<span>Action: </span>
								<div>
									<span onClick={() => handleChangeStatus("rejected")} className={cx("action-test-leader-btn", "reject")}>
										Reject
									</span>
									<span onClick={() => handleChangeStatus("accepted")} className={cx("action-test-leader-btn", "accept")}>
										Accept
									</span>
								</div>
							</div>
						)}
						{isOpenReproduction && (
							<div
								onClick={() => {
									setCurrentBrowser(null);
									setCurrentDevice(null);
									setIsOpenReproduction(false);
									setFile(null);
								}}
							>
								<Modal>
									<div className={cx("reprod-container")}>
										<div className={cx("reproducted-ctn")}>
											<div className={cx("reproducted-ctn-header")}>
												<h3>Can be reproduction</h3>
												<img
													onClick={() => {
														setCurrentBrowser(null);
														setCurrentDevice(null);
														setIsOpenReproduction(false);
														setFile(null);
													}}
													src="/icons/i-close.svg"
												></img>
											</div>
											{reproduction?.length <= 0 && <div className={cx("reproducted-item-ctn")}>Empty</div>}
											{reproduction?.map(u => (
												<div className={cx("reproducted-item-ctn")}>
													<div className={cx("reproducted-item")}>
														<span>Time: </span>
														<span>{formatDateTimeFunc(u.time_created)}</span>
													</div>
													<div className={cx("reproducted-item")}>
														<span>Proof: </span>
														<a target="_blank" href={u.proofLink}>
															{u.proofLink}
														</a>
													</div>
													<div className={cx("reproducted-item")}>
														<span>Device: </span>
														<span>{u.device}</span>
													</div>
													<div className={cx("reproducted-item")}>
														<span>Browser: </span>
														<span>{u.browswer.name}</span>
													</div>
												</div>
											))}
										</div>
										{availableReproduction && (
											<div>
												<h3>Submbit your reproduction</h3>
												<div>
													<label>Devices used</label>
													<select
														onChange={e => {
															setCurrentDevice(e.target.value);
														}}
													>
														<option>Choose device</option>
														{devices.map(val => (
															<option key={val.id} value={val.id}>
																{val.devices.name}
															</option>
														))}
													</select>
												</div>
												{currentDevice && (
													<div className={cx("browser-container")}>
														<label>Browsers used</label>
														<div className={cx("browsers")}>
															{listBrowsers.map(val => (
																<img
																	key={val.id}
																	onClick={() => setCurrentBrowser(val.id)}
																	className={cx(currentBrowser == val.id ? "active" : "")}
																	src={val.icon_link}
																	title={val.name}
																/>
															))}
														</div>
													</div>
												)}
												<div>
													<label>Proof</label>
													<span
														style={{
															border: "1px solid var(--primary-color)",
															fontSize: "12px",
															padding: "5px",
															borderRadius: "5px",
															cursor: "pointer",
														}}
														onClick={() => {
															inputEl.current.click();
														}}
													>
														Upload file
													</span>
													<span
														style={{
															fontSize: "12px",
															marginLeft: "10px",
														}}
													>
														{file?.name}
													</span>
													<input
														onChange={e => {
															setFile(e.target.files[0]);
														}}
														ref={inputEl}
														type="file"
													></input>
												</div>
												<div className={cx("reprod-btn-group")}>
													<button
														onClick={() => {
															setCurrentBrowser(null);
															setCurrentDevice(null);
															setIsOpenReproduction(false);
															setFile(null);
														}}
													>
														Cancle
													</button>
													<button onClick={handleSubmitReproduction}>Submit</button>
												</div>
											</div>
										)}
									</div>
								</Modal>
							</div>
						)}
					</div>
				</div>
				<div className={cx("left-column")}>
					<div className={cx("bug-container")}>
						<div className={cx("url")}>
							<div style={{ display: "flex", alignItems: "center" }}>
								<h3>URL: </h3>
								{
									<div className={cx("action-test-leader")}>
										<div>
											<span onClick={() => setIsOpenReproduction(true)} className={cx("action-test-leader-btn", "accept")}>
												Reproduction
											</span>
										</div>
									</div>
								}
							</div>
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
									Comments <span className={cx("count")}></span>
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
			</div>
		</div>
	);
}

export default BugDetail;
