import { useEffect, useState } from "react";
import styles from "./ListBug.module.css";
import classname from "classnames/bind";
import BugDetail from "../BugDetail/BugDetail";
import { useLocation, useNavigate } from "react-router-dom";
import { get_bug_reports } from "../../../../Services/BugReportService";
import useToast from "../../../../CustomHook/useToast";
import { formatDateTimeFunc } from "../../../../Utils/formatTime";
const cx = classname.bind(styles);

function ListBug() {
	const projectId = useLocation().pathname.split("/")[3];
	const [listBugs, setListBugs] = useState([]);
	const { showToast } = useToast();
	const navigate = useNavigate();
	useEffect(() => {
		const fetchData = async () => {
			const res = await get_bug_reports(projectId);
			if (res.status == "success") {
				setListBugs(res.data);
			} else {
				showToast({
					message: res.data || "Something went wrong",
					type: "error",
				});
			}
		};
		fetchData();
	}, []);
	const handleToBugDetail = id => {
		navigate(`/dGVzdGVy/project/${projectId}/bugs/${id}`);
	};
	return (
		<div className={cx("listbug-ctn")}>
			{
				<table>
					<thead>
						<tr>
							<th>Type</th>
							<th>Title</th>
							<th>ID</th>
							<th>Status</th>
							<th>Feature</th>
							<th>When</th>
							<th>Tester</th>
						</tr>
					</thead>
					<tbody>
						{listBugs.map((item, index) => (
							<tr onClick={() => handleToBugDetail(item.id)}>
								<td>
									<img src={item.bugTypeIcon}></img>
								</td>
								<td>
									{item.title}
									<span className={cx("new-label")}>NEW</span>
								</td>
								<td>#{item.id}</td>
								<td
									className={cx(
										item.status == "awaiting" && "status-awaiting",
										item.status == "rejected" && "status-rejected",
										item.status == "accepted" && "status-accepted",
									)}
								>
									{item.status}
								</td>
								<td className={cx("feature")}>{item.feature}</td>
								<td>{formatDateTimeFunc(item.reported_at)}</td>
								<td>
									<img
										src={
											item.user.avatar ||
											"https://static.vecteezy.com/system/resources/thumbnails/020/271/547/small/portrait-of-a-beautiful-asian-woman-full-face-portrait-in-flat-style-avatar-female-diversity-free-vector.jpg"
										}
										alt="User"
									/>
									<span>{item.user.name}</span>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			}
		</div>
	);
}

export default ListBug;
