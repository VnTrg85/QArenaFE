import styles from "./ProjectDetail.module.css";
import classname from "classnames/bind";
import ArticleDetail from "../../Component/ArticleDetail/ArticleDetail";
import { useState } from "react";
import ListBug from "./ListBug/ListBug";
import Chat from "./Chat/Chat";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
const cx = classname.bind(styles);

function ProjectDetail() {
	const location = useLocation();
	const navigate = useNavigate();
	const [currentTab, setCurrentTab] = useState(location.pathname.split("/")[4]);
	const header = [
		{ id: 1, name: "Overview", path: "" },
		{ id: 2, name: "Test Sessions", path: "session" },
		{ id: 3, name: "Bugs", path: "bugs" },
		{ id: 4, name: "Known Bugs", path: "known-bug" },
		{ id: 5, name: "Chat", path: "chat" },
		{ id: 6, name: "Team", path: "teams" },
	];
	const handleChangeTab = item => {
		setCurrentTab(item.path);
		navigate(`/dGVzdGVy/project/${location.pathname.split("/")[3]}/${item.path}`);
	};
	return (
		<div className={cx("project-ctn")}>
			<div className={cx("project-header")}>
				<h3>NEUFFER FENSTER + TÜREN GMBH</h3>

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
