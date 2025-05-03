import { useEffect, useState } from "react";
import styles from "./Activity.module.css";
import classname from "classnames/bind";
import { get_test_projects } from "../../../Services/TestProjectService";
import { useUser } from "../../../Context/AuthContext";
import { get_all_payout_by_project } from "../../../Services/UserPayout";
import { formatDateToYMD } from "../../../Utils/formatTime";
import { get_bug_report_by_user } from "../../../Services/BugReportService";
import { get_all_reproduction_by_user } from "../../../Services/ReproductionService";
const cx = classname.bind(styles);

function Activity() {
	const [isOpenProject, setIsOpenProject] = useState(false);
	const [isOpenBugReport, setIsOpenBugReport] = useState(false);
	const [isOpenReproduction, setIsOpenReproduction] = useState(false);
	const [projects, setProjects] = useState([]);
	const [bugReports, setBugReports] = useState([]);
	const [reprods, setReprods] = useState([]);
	const { getUserValue } = useUser();
	useEffect(() => {
		const fetchProject = async () => {
			const res = await get_test_projects(getUserValue().id);
			if (res.status == "success") {
				const listRes = res.data.map(async item => ({
					...item,
					payout: (await get_all_payout_by_project(item.testProject.id)).data,
				}));
				const listData = await Promise.all(listRes);
				setProjects(listData);
			} else {
				console.log(res);
			}
		};
		fetchProject();
	}, []);
	useEffect(() => {
		const fetchBugReports = async () => {
			const res = await get_bug_report_by_user(getUserValue().id);
			if (res.status == "success") {
				setBugReports(res.data);
			} else {
				console.log(res);
			}
		};
		fetchBugReports();
	}, []);
	useEffect(() => {
		const fetchReproductions = async () => {
			const res = await get_all_reproduction_by_user(getUserValue().id);
			if (res.status == "success") {
				setReprods(res.data);
			} else {
				console.log(res);
			}
		};
		fetchReproductions();
	}, []);
	return (
		<div className={cx("grid-stats-ctn")}>
			<h3>Activity</h3>
			<div class={cx("grid-stats")}>
				<div class={cx("box-stat")}>
					<div class={cx("box-title")}>All test projects</div>
					<div class={cx("circle-chart chart-bugs")}>
						<div>
							<div class={cx("box-value")}>{projects?.length}</div>
							<div class={cx("box-desc")}>Projects joined</div>
						</div>
					</div>
					<button
						class={cx("btn-detail")}
						onClick={() => {
							setIsOpenProject(true);
							setIsOpenBugReport(false);
							setIsOpenReproduction(false);
						}}
					>
						Show details
					</button>
				</div>

				<div class={cx("box-stat")}>
					<div class={cx("box-title")}>Bugs</div>
					<div class={cx("circle-chart chart-bugs")}>
						<div>
							<div class={cx("box-value")}>{bugReports?.length}</div>
							<div class={cx("box-desc")}>Bugs submitted</div>
						</div>
					</div>
					<button
						onClick={() => {
							setIsOpenBugReport(true);
							setIsOpenReproduction(false);
							setIsOpenProject(false);
						}}
						class={cx("btn-detail")}
					>
						Show details
					</button>
				</div>

				<div class={cx("box-stat")}>
					<div class={cx("box-title")}>Bug Reproductions</div>
					<div class={cx("circle-chart chart-repros")}>
						<div>
							<div class={cx("box-value")}>{reprods?.length}</div>
							<div class={cx("box-desc")}>Reproductions submitted</div>
						</div>
					</div>
					<button
						onClick={() => {
							setIsOpenReproduction(true);
							setIsOpenBugReport(false);
							setIsOpenProject(false);
						}}
						class={cx("btn-detail")}
					>
						Show details
					</button>
				</div>
			</div>
			<div className={cx("activity-table")}>
				{isOpenProject && (
					<table>
						<thead>
							<tr>
								<th>ID</th>
								<th>Name</th>
								<th>Date created</th>
								<th>Date end</th>
								<th>Status</th>
								<th>Payout($)</th>
							</tr>
						</thead>
						<tbody>
							{projects.map(item => (
								<tr>
									<td>{item?.testProject.id}</td>
									<td>{item?.testProject?.projectName}</td>
									<td>{formatDateToYMD(item?.testProject?.create_At)}</td>
									<td>{formatDateToYMD(item?.testProject?.end_At)}</td>
									<td>{item?.status}</td>
									<td>{item?.payout}</td>
								</tr>
							))}
						</tbody>
					</table>
				)}
				{isOpenBugReport && (
					<table>
						<thead>
							<tr>
								<th>ID</th>
								<th>Bug type</th>
								<th>Bug icon</th>
								<th>Title</th>
								<th>Reported at</th>
								<th>Status</th>
							</tr>
						</thead>
						<tbody>
							{bugReports.map(item => (
								<tr>
									<td>{item?.id}</td>
									<td>
										<img src={item?.bugTypeIcon}></img>
									</td>
									<td>{item?.bugTypeName}</td>
									<td>{item?.title}</td>
									<td>{formatDateToYMD(item?.reported_at)}</td>
									<td>{item?.status}</td>
								</tr>
							))}
						</tbody>
					</table>
				)}
				{isOpenReproduction && (
					<table>
						<thead>
							<tr>
								<th>ID</th>
								<th>Device</th>
								<th>Proof link</th>
								<th>Time created</th>
								<th>Bug report</th>
							</tr>
						</thead>
						<tbody>
							{reprods.map(item => (
								<tr>
									<td>{item?.id}</td>
									<td>{item?.device}</td>
									<td>{item?.proofLink}</td>
									<td>{formatDateToYMD(item?.time_created)}</td>
									<td>{item?.bugReportId}</td>
								</tr>
							))}
						</tbody>
					</table>
				)}
			</div>
		</div>
	);
}

export default Activity;
