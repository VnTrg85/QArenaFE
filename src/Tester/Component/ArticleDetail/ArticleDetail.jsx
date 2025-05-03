import { useLocation, useNavigate } from "react-router-dom";
import styles from "./ArticleDetail.module.css";
import classname from "classnames/bind";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { get_test_project_detail, update_testproject_user_status } from "../../../Services/TestProjectService";
import { useDispatch } from "react-redux";
import useToast from "../../../CustomHook/useToast";
import Modal from "../Modal/Modal";
import { setCurrentProject } from "../../../Store/testProjectSlice";
import { formatDate, formatDateTimeFunc } from "../../../Utils/formatTime";
const cx = classname.bind(styles);
function ArticleDetail({ testUserProject, project }) {
	const location = useLocation();
	const navigate = useNavigate();
	const { id } = useParams();
	const [article, setArticle] = useState(project);
	const { showToast } = useToast();
	const [selectedFeature, setSelectedFeature] = useState(null);
	const [isOpenConfirmPopup, setIsOpenConfirmPopup] = useState(false);
	const dispatch = useDispatch();
	useEffect(() => {
		setArticle(project);
	}, [project]);

	useEffect(() => {
		if (id) {
			const fetchData = async () => {
				const res = await get_test_project_detail(id);
				if (res.status == "success") {
					setArticle(res.data);
					console.log(res.data);
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
	}, [id]);

	const handleNavigateToBugDetail = () => {
		if (testUserProject?.status == "Opening") setIsOpenConfirmPopup(true);
		else {
			navigate(`/dGVzdGVy/project/${article.id}`);
		}
	};

	const handleConfirmProject = async () => {
		const data = {
			id: testUserProject.id,
			status: "Doing",
		};
		const res = await update_testproject_user_status(data);
		if (res.status == "success") {
			navigate(`/dGVzdGVy/project/${article.id}`);
		} else {
			showToast({
				message: "Something went wrong",
				type: "error",
			});
		}
	};

	const handleOpenReadMore = item => {
		if (item.id == selectedFeature?.id) {
			setSelectedFeature(null);
		} else setSelectedFeature(item);
	};
	return (
		<div>
			{article && (
				<div className={cx("wrapper-container")}>
					<div className={cx("container")}>
						{!location.pathname.includes("project") && (
							<div className={cx("container-header")}>
								<h1>{article?.projectName}</h1>
								<div onClick={handleNavigateToBugDetail} className={cx("test-btn")}>
									{testUserProject?.status == "Opening" && <span>Test now</span>}
									{testUserProject?.status == "Doing" && <span>Open</span>}
									{testUserProject?.status == "Done" && <span>Open</span>}
									<img src="/icons/i-chevron-white.svg"></img>
								</div>
							</div>
						)}

						<p className={cx("subtitle", location.pathname.includes("project") ? "subtitle-second" : "")}>
							{location.pathname.includes("project") && <span>EN</span>}Submit reports in {article.language.join(" - ")}
						</p>

						{location.pathname.includes("project") && (
							<div className={cx("information")}>
								<h2>Information</h2>
								<div className={cx("information-content")}>
									<div>
										<h5>Href : </h5>
										<span>{article.link ? article.link : "https://localhost:8080"}</span>
									</div>
									<div>
										<h5>Port : </h5>
										<span>8080</span>
									</div>
									<div>
										<h5>Username : </h5>
										<span>username</span>
									</div>
									<div>
										<h5>Password :</h5>
										<span>password</span>
									</div>
								</div>
							</div>
						)}

						{!location.pathname.includes("project") && (
							<div className={cx("status")}>
								<div className={cx("status-badge")}>
									<span className={cx("label")}>Date </span>
									<span className={cx("value")}>: {formatDateTimeFunc(article?.end_At)}</span>
								</div>
								<span className={cx("status-badge")}>🟢 Active</span>
							</div>
						)}

						{!location.pathname.includes("project") && (
							<div className={cx("details")}>
								<div className={cx("box")}>
									<h2>Payout</h2>
									<table>
										<thead>
											<tr>
												<th>Bug Type</th>
												<th>Amount</th>
												<th>Reprod.</th>
											</tr>
										</thead>
										<tbody>
											{article.payoutBugs.map(item => (
												<tr>
													<td>
														<img src={item.icon_link ? item.icon_link : "/icons/i-low.svg"} alt="Low" />
														<span>{item.name}</span>
													</td>
													<td>${item.amount}</td>
													<td>${(item.amount * 20) / 100}</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>
							</div>
						)}
						{!location.pathname.includes("project") && (
							<div className={cx("members")}>
								<h2>Members</h2>
								<div className={cx("avatars")}>
									<img
										src="https://static.vecteezy.com/system/resources/thumbnails/020/271/547/small/portrait-of-a-beautiful-asian-woman-full-face-portrait-in-flat-style-avatar-female-diversity-free-vector.jpg"
										alt="User"
									/>
									<img src="https://i.pinimg.com/736x/31/c4/8a/31c48a26f9f8faf14eb6822c4f35aa7f.jpg" alt="User" />
									<img
										src="https://www.shutterstock.com/image-vector/vector-bright-portrait-beautiful-brunette-600nw-2452267975.jpg"
										alt="User"
									/>
									<img
										src="https://www.shutterstock.com/image-vector/portrait-beautiful-latin-american-woman-600nw-2071168457.jpg"
										alt="User"
									/>
									<span className={cx("more")}>+2</span>
								</div>
							</div>
						)}

						<div className={cx("description")}>
							<h2>Description</h2>
							<p>{article.description ? article.description : "No information"}</p>
						</div>
						<div className={cx("description")}>
							<h2>Goal of this test</h2>
							<p>{article.goal ? article.goal : "No information"}</p>
						</div>
						<div className={cx("description")}>
							<h2>Out of scope</h2>
							<p>{article.outScope ? article.outScope : "No information"}</p>
						</div>
						<div className={cx("description")}>
							<h2>Additional requirements</h2>
							<p>{article.additionalRequirement ? article.additionalRequirement : "No information"}</p>
						</div>
						<div className={cx("feature-container")}>
							<h2>Test these features</h2>
							{article.testFeatures.map(item => (
								<div className={cx("feature-box")} key={item.id}>
									<div className={cx("feature-box-header")}>
										<span>{item.name}</span>
										<div
											onClick={() => handleOpenReadMore(item)}
											className={cx("button-read", location.pathname.includes("project") ? "button" : "")}
										>
											{selectedFeature?.id != item.id ? "Read more" : "Show less"}
										</div>
									</div>
									{item.id == selectedFeature?.id && (
										<div className={cx("feature-wrapper")}>
											{/* Bug Types Section */}
											<div className={cx("feature-section")}>
												<h2>BUG TYPES</h2>
												<div className={cx("bug-types")}>
													{item.bugType.map(val => (
														<div className={cx("bug-item")}>
															<img src={val.icon_link}></img>
															<span>{val.name}</span>
														</div>
													))}
												</div>
											</div>

											{/* Where You Can Find This Feature Section */}
											<div className={cx("section")}>
												<h2>WHERE YOU CAN FIND THIS FEATURE:</h2>
												<div className={cx("content-box")}>
													<p>{item.input}</p>
												</div>
											</div>

											{/* What You Should Find There/Test For Section */}
											<div className={cx("section")}>
												<h2>WHAT YOU SHOULD FIND THERE/TEST FOR:</h2>
												<div className={cx("content-box")}>
													<p>{item.output}</p>
												</div>
											</div>
										</div>
									)}
								</div>
							))}
						</div>
					</div>
					{location.pathname.includes("project") && (
						<div className={cx("container-right")}>
							<div className={cx("details")}>
								<div className={cx("box")}>
									<h2>Payout</h2>
									<table>
										<thead>
											<tr>
												<th>Bug Type</th>
												<th>Amount</th>
												<th>Reprod.</th>
											</tr>
										</thead>
										<tbody>
											{article.payoutBugs.map(item => (
												<tr>
													<td>
														<img src={item.icon_link ? item.icon_link : "/icons/i-low.svg"} alt="Low" />
														<span>{item.name}</span>
													</td>
													<td>${item.amount}</td>
													<td>${(item.amount * 20) / 100}</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>
							</div>
							{/* <div className={cx("device-ctn")}>
								<h5>Requested OS</h5>
								<div className={cx("device-item")}>
									<img src="/icons/i-computer.svg"></img>
									<div className={cx("device-item-content")}>
										<span>Window 11 and higher</span>
										<div>
											<img src="/icons/i-edge.svg"></img>
											<img src="/icons/i-edge.svg"></img>
										</div>
									</div>
								</div>
							</div> */}
							{/* <div className={cx("device-ctn")}>
								<h5>Available for reproduction</h5>
								<div className={cx("device-item")}>
									<img src="/icons/i-mac.svg"></img>
									<div className={cx("device-item-content")}>
										<span>Window 11 and higher</span>
										<div>
											<img src="/icons/i-chrome.svg"></img>
											<img src="/icons/i-safari.svg"></img>
										</div>
									</div>
								</div>
							</div> */}
						</div>
					)}
				</div>
			)}
			{isOpenConfirmPopup && (
				<Modal>
					<h3 className={cx("confirm-label")}>Confirm</h3>
					<div className={cx("confirm-title")}>Do you read carefully and accept the project?</div>
					<div className={cx("confirm-btn")}>
						<button onClick={() => setIsOpenConfirmPopup(false)} className={cx("confirm-btn-cancle")}>
							Cancle
						</button>
						<button onClick={handleConfirmProject} className={cx("confirm-btn-accept")}>
							Confirm
						</button>
					</div>
				</Modal>
			)}
			{isOpenConfirmPopup && (
				<Modal>
					<h3 className={cx("confirm-label")}>Confirm</h3>
					<div className={cx("confirm-title")}>Do you read carefully and accept the project?</div>
					<div className={cx("confirm-btn")}>
						<button onClick={() => setIsOpenConfirmPopup(false)} className={cx("confirm-btn-cancle")}>
							Cancle
						</button>
						<button onClick={handleConfirmProject} className={cx("confirm-btn-accept")}>
							Confirm
						</button>
					</div>
				</Modal>
			)}
		</div>
	);
}

export default ArticleDetail;
