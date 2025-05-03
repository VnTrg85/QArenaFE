import { useEffect, useState } from "react";
import styles from "./Team.module.css";
import classname from "classnames/bind";
import { get_member_in_project } from "../../../../Services/TestProjectService";
import { useLocation } from "react-router-dom";
import { useUser } from "../../../../Context/AuthContext";
const cx = classname.bind(styles);

function Team() {
	const { getUserValue } = useUser();
	const location = useLocation();
	const [members, setMembers] = useState([]);
	const [leader, setLeader] = useState();
	const [me, setMe] = useState();
	useEffect(() => {
		const fetchMembers = async () => {
			const res = await get_member_in_project(location.pathname.split("/")[3]);
			if (res.status == "success") {
				const lead = res.data.find(item => item.role == "4");
				setLeader(lead);
				const currentUser = res.data.find(item => item.id == getUserValue().id);
				setMe(currentUser);
				setMembers(res.data.filter(item => item.role != 4).filter(item => item.id != getUserValue().id));
			} else {
				console.log(res);
			}
		};
		fetchMembers();
	}, []);
	return (
		<div className={cx("team-container")}>
			<h1 className={cx("team-leaderboard-heading")}>Team</h1>
			<div className={cx("profile-section-container")}>
				<div className={cx("profile-card-wrapper")}>
					<img className={cx("profile-card-image")} src={leader?.avatar} alt="Profile" />
					<p className={cx("profile-card-text")}>{leader?.name}</p>
				</div>
				<div className={cx("profile-card-wrapper")}>
					<img className={cx("profile-card-image")} src={me?.avatar} alt="Profile" />
					<p className={cx("profile-card-text")}>Me</p>
				</div>
				<div className={cx("profile-card-wrapper")}>
					<p className={cx("profile-card-text")} style={{ fontSize: "24px", margin: 0, fontWeight: 600 }}>
						{members?.length + 1}
					</p>
					<p className={cx("profile-card-status")}>Testers</p>
					<p className={cx("profile-card-status")}>Total in test</p>
				</div>
			</div>
			<div className={cx("table-section-wrapper")}>
				<table className={cx("leaderboard-table")}>
					<thead>
						<tr>
							<th>ID</th>
							<th>Avatar</th>
							<th>Name</th>
						</tr>
					</thead>
					<tbody>
						{members?.map(item => (
							<tr>
								<td>{item?.id}</td>
								<td>
									<img src={item?.avatar}></img>
								</td>
								<td>{item?.name}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default Team;
