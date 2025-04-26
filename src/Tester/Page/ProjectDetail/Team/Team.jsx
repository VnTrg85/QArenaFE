import { useEffect, useState } from "react";
import styles from "./Team.module.css";
import classname from "classnames/bind";

const cx = classname.bind(styles);

function Team() {
	return (
		<div className={cx("team-container")}>
			<h1 className={cx("team-leaderboard-heading")}>Team</h1>
			<div className={cx("profile-section-container")}>
				<div className={cx("profile-card-wrapper")}>
					<img className={cx("profile-card-image")} src="https://via.placeholder.com/50" alt="Profile" />
					<p className={cx("profile-card-text")}>vn_testerio</p>
					<p className={cx("profile-card-status")}>OFFLINE</p>
					<button className={cx("profile-card-badge-button")}>Give a badge</button>
				</div>
				<div className={cx("profile-card-wrapper")}>
					<img className={cx("profile-card-image")} src="https://via.placeholder.com/50" alt="Profile" />
					<p className={cx("profile-card-text")}>Me</p>
					<p className={cx("profile-card-status")}>13th in ranking - 2pts</p>
				</div>
				<div className={cx("profile-card-wrapper")}>
					<p className={cx("profile-card-text")} style={{ fontSize: "24px", margin: 0, fontWeight: 600 }}>
						50
					</p>
					<p className={cx("profile-card-status")}>Active testers</p>
					<p className={cx("profile-card-status")}>Total in test</p>
				</div>
			</div>
			<div className={cx("table-section-wrapper")}>
				<table className={cx("leaderboard-table")}>
					<thead>
						<tr>
							<th>Position</th>
							<th>Team member</th>
							<th>Status</th>
							<th>Ranking points</th>
							<th>Badge</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>1</td>
							<td>
								<img className={cx("leaderboard-table-member-image")} src="https://via.placeholder.com/30" alt="Profile" />{" "}
								congbinhdbk
							</td>
							<td className={cx("status-offline-text")}>OFFLINE</td>
							<td>86pts</td>
							<td>
								<button className={cx("table-badge-button")}>Give a badge</button>
							</td>
						</tr>
						<tr>
							<td>2</td>
							<td>
								<img className={cx("leaderboard-table-member-image")} src="https://via.placeholder.com/30" alt="Profile" />{" "}
								sergo.skarbek
							</td>
							<td className={cx("status-offline-text")}>OFFLINE</td>
							<td>46pts</td>
							<td>
								<button className={cx("table-badge-button")}>Give a badge</button>
							</td>
						</tr>
						<tr>
							<td>3</td>
							<td>
								<img className={cx("leaderboard-table-member-image")} src="https://via.placeholder.com/30" alt="Profile" />{" "}
								trinhantunggau
							</td>
							<td className={cx("status-offline-text")}>OFFLINE</td>
							<td>41pts</td>
							<td>
								<button className={cx("table-badge-button")}>Give a badge</button>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default Team;
