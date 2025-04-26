import styles from "./ArticleItem.module.css";
import classname from "classnames/bind";
import { formatDate, formatMonth } from "../../../../Utils/formatTime";
const cx = classname.bind(styles);

function ArticleItem({ onClick, project, active }) {
	const getMaxPayout = () => {
		if (project.testProject.payoutBugs.length == 0) return 0;
		const max = project.testProject.payoutBugs.reduce((acc, item) => {
			return acc > item.amount ? acc : item.amount;
		}, project.testProject.payoutBugs[0].amount);
		return max;
	};
	const getMinPayout = () => {
		if (project.testProject.payoutBugs.length == 0) return 0;
		const min = project.testProject.payoutBugs.reduce((acc, item) => {
			return acc < item.amount ? acc : item.amount;
		}, project.testProject.payoutBugs[0].amount);
		return min;
	};
	return (
		<div>
			<div onClick={onClick} class={cx("task-card", active ? "active" : "")}>
				<div class={active ? cx("task-status") : ""}></div>
				<div class={cx("task-content")}>
					<div class={cx("task-header")}>
						<h3>{project.testProject.projectName}</h3>
						<p>{project.testProject.description.slice(0, 200)}...</p>
					</div>
					<div class={cx("task-info")}>
						{project.status == "Opening" && <span class={cx("badge-active")}>Available</span>}
						{project.status == "Doing" && <span class={cx("badge-progress")}>In progress</span>}
						{project.status == "Done" && <span class={cx("badge-terminated")}>Terminated</span>}
					</div>
					<div class={cx("task-footer")}>
						<div class={cx("avatars")}>
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

							<div class={cx("extra")}>+2</div>
						</div>
					</div>
				</div>
				<div class={cx("task-right-ctn")}>
					<div class={cx("task-date")}>
						<span>{formatMonth(project.testProject.end_At)}</span>
						<strong>{formatDate(project.testProject.end_At)}</strong>
					</div>
					<div class={cx("icons")}>
						<span class={cx("icon")}>{getMinPayout()}$</span>
						<span class={cx("icon")}>-</span>
						<span class={cx("icon")}>{getMaxPayout()}$</span>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ArticleItem;
