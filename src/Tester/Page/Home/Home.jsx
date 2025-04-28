import styles from "./Home.module.css";
import classname from "classnames/bind";
import ArticleItem from "../../Component/HomeComps/ArticleItem/ArticleItem";
import ArticleDetail from "../../Component/ArticleDetail/ArticleDetail";
import { useUser } from "../../../Context/AuthContext";
import { useEffect, useMemo, useState } from "react";
import { get_test_projects } from "../../../Services/TestProjectService";
import { useDispatch, useSelector } from "react-redux";
import { addNotification } from "../../../Store/notificationSlice";
import useToast from "../../../CustomHook/useToast";
const cx = classname.bind(styles);

function Home() {
	//HOOKS
	const { getUserValue } = useUser();
	const { showToast } = useToast();
	//STATE
	const [testProjects, setTestProjects] = useState([]);
	const [tabActive, setTabActive] = useState("OPENING");
	const [selectedArticle, setSelectedArticle] = useState(null);
	//SIDE EFFECT
	useEffect(() => {
		async function fetchData() {
			const res = await get_test_projects(getUserValue().id);
			if (res.status == "success") {
				setTestProjects(res.data);
			}
		}
		fetchData();
	}, []);
	const listTestProjects = useMemo(() => {
		let list = [];
		if (tabActive == "OPENING") {
			list = testProjects.filter(item => item.status == "Opening");
		} else if (tabActive == "DONE") {
			list = testProjects.filter(item => item.status == "Done");
		} else if (tabActive == "DOING") {
			list = testProjects.filter(item => item.status == "Doing");
		}
		setSelectedArticle(list[0]);
		return list;
	}, [tabActive, testProjects]);
	//METHODS

	const handleChangeActiveTab = tab => {
		setTabActive(tab);
	};

	const handleClickOnArticle = item => {
		console.log(1);
		setSelectedArticle(item);
	};

	return (
		<div className={cx("home-container")}>
			<div className={cx("home-container-label")}>
				<div class={cx("label-container")}>
					<div class={cx("progress-circle")}>
						<span class={cx("progress-text")}>4/13</span>
					</div>
					<div class={cx("text-content")}>
						<h2>Optional onboarding modules available</h2>
						<p>
							Discover our optional onboarding modules tailored to enhance your skills and prepare you for a diverse range of tasks and
							opportunities. Embrace the opportunity ahead and get ready to make your mark—your journey carries on!
						</p>
						<a href="#" class={cx("button")}>
							Go to learning portal
						</a>
					</div>
				</div>
			</div>
			<div className={cx("home-container-content")}>
				<div className={cx("navbar")}>
					<div
						onClick={() => {
							handleChangeActiveTab("OPENING");
						}}
						className={cx("navbar-item", tabActive == "OPENING" ? "active" : "")}
					>
						Opening
					</div>
					<div
						onClick={() => {
							handleChangeActiveTab("DOING");
						}}
						className={cx("navbar-item", tabActive == "DOING" ? "active" : "")}
					>
						Doing
					</div>
					<div
						onClick={() => {
							handleChangeActiveTab("DONE");
						}}
						className={cx("navbar-item", tabActive == "DONE" ? "active" : "")}
					>
						Done
					</div>
				</div>
				<div className={cx("home-container-content-left")}>
					{listTestProjects.map(item => (
						<ArticleItem
							key={item.id}
							project={item}
							active={selectedArticle?.id == item.id ? true : false}
							onClick={() => {
								handleClickOnArticle(item);
							}}
						></ArticleItem>
					))}
					{/* <ArticleItem active="true"></ArticleItem>
					<ArticleItem></ArticleItem>
					<ArticleItem></ArticleItem>
					<ArticleItem></ArticleItem>
					<ArticleItem></ArticleItem>
					<ArticleItem></ArticleItem> */}
				</div>
				<div className={cx("home-container-content-right")}>
					<ArticleDetail testUserProject={selectedArticle} project={selectedArticle?.testProject}></ArticleDetail>
				</div>
			</div>
		</div>
	);
}

export default Home;
