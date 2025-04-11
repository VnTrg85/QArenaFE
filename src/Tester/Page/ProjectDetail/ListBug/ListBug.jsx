import { useState } from "react";
import styles from "./ListBug.module.css";
import classname from "classnames/bind";
import BugDetail from "../../../Component/BugDetail/BugDetail";

const cx = classname.bind(styles);

function ListBug() {
	const [isOpenBugDetail, setIsOpenBugDetail] = useState(true);
	return (
		<div className={cx("listbug-ctn")}>
			{!isOpenBugDetail && (
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
						<tr>
							<td></td>
							<td>
								Sau khi cuộn và chọn tùy chọn trong So sánh nhanh, nó không được đánh dấu trên đầu{" "}
								<span className={cx("new-label")}>NEW</span>
							</td>
							<td>#2489533</td>
							<td className={cx("status-rejected")}>Rejected</td>
							<td className={cx("feature")}>Page Compare</td>
							<td>10 month ago</td>
							<td>
								<img
									src="https://static.vecteezy.com/system/resources/thumbnails/020/271/547/small/portrait-of-a-beautiful-asian-woman-full-face-portrait-in-flat-style-avatar-female-diversity-free-vector.jpg"
									alt="User"
								/>
								truongddh85
							</td>
						</tr>
						<tr>
							<td></td>
							<td>
								Sau khi cuộn và chọn tùy chọn trong So sánh nhanh, nó không được đánh dấu trên đầu{" "}
								<span className={cx("new-label")}>NEW</span>
							</td>
							<td>#2489533</td>
							<td className={cx("status-rejected")}>Rejected</td>
							<td className={cx("feature")}>Page Compare</td>
							<td>10 month ago</td>
							<td>
								<img
									src="https://static.vecteezy.com/system/resources/thumbnails/020/271/547/small/portrait-of-a-beautiful-asian-woman-full-face-portrait-in-flat-style-avatar-female-diversity-free-vector.jpg"
									alt="User"
								/>
								truongddh85
							</td>
						</tr>
						<tr>
							<td></td>
							<td>
								Sau khi cuộn và chọn tùy chọn trong So sánh nhanh, nó không được đánh dấu trên đầu{" "}
								<span className={cx("new-label")}>NEW</span>
							</td>
							<td>#2489533</td>
							<td className={cx("status-rejected")}>Rejected</td>
							<td className={cx("feature")}>Page Compare</td>
							<td>10 month ago</td>
							<td>
								<img
									src="https://static.vecteezy.com/system/resources/thumbnails/020/271/547/small/portrait-of-a-beautiful-asian-woman-full-face-portrait-in-flat-style-avatar-female-diversity-free-vector.jpg"
									alt="User"
								/>
								truongddh85
							</td>
						</tr>
						<tr>
							<td></td>
							<td>
								Sau khi cuộn và chọn tùy chọn trong So sánh nhanh, nó không được đánh dấu trên đầu{" "}
								<span className={cx("new-label")}>NEW</span>
							</td>
							<td>#2489533</td>
							<td className={cx("status-rejected")}>Rejected</td>
							<td className={cx("feature")}>Page Compare</td>
							<td>10 month ago</td>
							<td>
								<img
									src="https://static.vecteezy.com/system/resources/thumbnails/020/271/547/small/portrait-of-a-beautiful-asian-woman-full-face-portrait-in-flat-style-avatar-female-diversity-free-vector.jpg"
									alt="User"
								/>
								truongddh85
							</td>
						</tr>
						<tr>
							<td></td>
							<td>
								Sau khi cuộn và chọn tùy chọn trong So sánh nhanh, nó không được đánh dấu trên đầu{" "}
								<span className={cx("new-label")}>NEW</span>
							</td>
							<td>#2489533</td>
							<td className={cx("status-rejected")}>Rejected</td>
							<td className={cx("feature")}>Page Compare</td>
							<td>10 month ago</td>
							<td>
								<img
									src="https://static.vecteezy.com/system/resources/thumbnails/020/271/547/small/portrait-of-a-beautiful-asian-woman-full-face-portrait-in-flat-style-avatar-female-diversity-free-vector.jpg"
									alt="User"
								/>
								truongddh85
							</td>
						</tr>
						<tr>
							<td></td>
							<td>
								Sau khi cuộn và chọn tùy chọn trong So sánh nhanh, nó không được đánh dấu trên đầu{" "}
								<span className={cx("new-label")}>NEW</span>
							</td>
							<td>#2489533</td>
							<td className={cx("status-rejected")}>Rejected</td>
							<td className={cx("feature")}>Page Compare</td>
							<td>10 month ago</td>
							<td>
								<img
									src="https://static.vecteezy.com/system/resources/thumbnails/020/271/547/small/portrait-of-a-beautiful-asian-woman-full-face-portrait-in-flat-style-avatar-female-diversity-free-vector.jpg"
									alt="User"
								/>
								truongddh85
							</td>
						</tr>
					</tbody>
				</table>
			)}

			{isOpenBugDetail && <BugDetail></BugDetail>}
		</div>
	);
}

export default ListBug;
