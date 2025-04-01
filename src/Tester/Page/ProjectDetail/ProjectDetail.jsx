import styles from "./ProjectDetail.module.css";
import classname from "classnames/bind";
import ArticleDetail from "../../Component/ArticleDetail/ArticleDetail";
import { useState } from "react";
import ListBug from "../../Component/Project/ListBug/ListBug";
import Chat from "../../Component/Project/Chat/Chat";
const cx = classname.bind(styles);

function ProjectDetail() {
	const [currentTab, setCurrentTab] = useState(1);

	const header = [
		{ id: 1, name: "Overview" },
		{ id: 2, name: "Test Sessions" },
		{ id: 3, name: "Bugs" },
		{ id: 4, name: "Known Bugs" },
		{ id: 5, name: "Chat" },
		{ id: 6, name: "Team" },
	];
	return (
		<div className={cx("project-ctn")}>
			<div className={cx("project-header")}>
				<h3>NEUFFER FENSTER + TÜREN GMBH</h3>

				<div className={cx("project-header-sub")}>
					{header.map(item => (
						<div
							onClick={() => {
								setCurrentTab(item.id);
							}}
							key={item.id}
							className={cx("header-item", item.id == currentTab ? "active" : "")}
						>
							{item.name}
						</div>
					))}
				</div>
				<div className={cx("project-content")}>
					{currentTab == 1 && <ArticleDetail></ArticleDetail>}
					{currentTab == 3 && <ListBug></ListBug>}
					{currentTab == 5 && <Chat></Chat>}
				</div>
			</div>
		</div>
	);
}

export default ProjectDetail;
