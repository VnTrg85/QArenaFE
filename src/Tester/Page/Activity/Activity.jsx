import styles from "./Activity.module.css";
import classname from "classnames/bind";

const cx = classname.bind(styles);

function Activity() {
	return (
		<div className={cx("grid-stats-ctn")}>
			<h3>Activity</h3>
			<div class={cx("grid-stats")}>
				<div class={cx("box-stat")}>
					<div class={cx("box-title")}>All Activities</div>
					<div class={cx("chart-activities", "circle-chart")}>
						<div>
							<div class={cx("box-value")}>777</div>
							<img src="/icons/i-project.svg"></img>
						</div>
					</div>
				</div>

				<div class={cx("box-stat")}>
					<div class={cx("box-title")}>Bugs</div>
					<div class={cx("circle-chart chart-bugs")}>
						<div>
							<div class={cx("box-value")}>209</div>
							<div class={cx("box-desc")}>Bugs submitted</div>
						</div>
					</div>
					<button class={cx("btn-detail")}>Show details</button>
				</div>

				<div class={cx("box-stat")}>
					<div class={cx("box-title")}>Bug Reproductions</div>
					<div class={cx("circle-chart chart-repros")}>
						<div>
							<div class={cx("box-value")}>560</div>
							<div class={cx("box-desc")}>Reproductions submitted</div>
						</div>
					</div>
					<button class={cx("btn-detail")}>Show details</button>
				</div>

				<div class={cx("box-stat")}>
					<div class={cx("box-title")}>Bug Disputes</div>
					<div class={cx("circle-chart chart-disputes")}>
						<div>
							<div class={cx("box-value")}>13</div>
							<div class={cx("box-desc")}>Disputes initiated</div>
						</div>
					</div>
					<button class={cx("btn-detail")}>Show details</button>
				</div>
			</div>
		</div>
	);
}

export default Activity;
