import styles from "./ListBug.module.css";
import classname from "classnames/bind";

const cx = classname.bind(styles);

function ListBug() {
	return (
		<div className={cx("listbug-ctn")}>
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
						<td className={cx("status-rejected")}>Bị từ chối</td>
						<td className={cx("feature")}>So sánh trang</td>
						<td>10 tháng trước</td>
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
							(Safari Mac OS 14.4.1) Lỗi khi nhấn "Mua ngay" sau khi chọn và so sánh tùy chọn{" "}
							<span className={cx("new-label")}>NEW</span>
						</td>
						<td>#2489475</td>
						<td className={cx("status-rejected")}>Bị từ chối</td>
						<td className={cx("feature")}>So sánh trang</td>
						<td>10 tháng trước</td>
						<td>
							<img
								src="https://static.vecteezy.com/system/resources/thumbnails/020/271/547/small/portrait-of-a-beautiful-asian-woman-full-face-portrait-in-flat-style-avatar-female-diversity-free-vector.jpg"
								alt="User"
							/>
							angelina_chanysheva
						</td>
					</tr>
					<tr>
						<td></td>

						<td>
							(Safari | Mac OS 14.4.1) Thiếu dấu chấm trong phần "Bề mặt ngủ" gây lỗi hiển thị{" "}
							<span className={cx("new-label")}>NEW</span>
						</td>
						<td>#2489458</td>
						<td className={cx("status-rejected")}>Bị từ chối</td>
						<td className={cx("feature")}>So sánh trang</td>
						<td>10 tháng trước</td>
						<td>
							<img
								src="https://static.vecteezy.com/system/resources/thumbnails/020/271/547/small/portrait-of-a-beautiful-asian-woman-full-face-portrait-in-flat-style-avatar-female-diversity-free-vector.jpg"
								alt="User"
							/>
							angelina_chanysheva
						</td>
					</tr>
					<tr>
						<td></td>

						<td>
							(Safari | Mac OS 14.4.1) Thiếu thanh trượt "Độ cứng" trong tùy chọn so sánh "Tốt nhất cho cặp đôi"{" "}
							<span className={cx("new-label")}>NEW</span>
						</td>
						<td>#2489447</td>
						<td className={cx("status-rejected")}>Bị từ chối</td>
						<td className={cx("feature")}>So sánh trang</td>
						<td>10 tháng trước</td>
						<td>
							<img
								src="https://static.vecteezy.com/system/resources/thumbnails/020/271/547/small/portrait-of-a-beautiful-asian-woman-full-face-portrait-in-flat-style-avatar-female-diversity-free-vector.jpg"
								alt="User"
							/>
							angelina_chanysheva
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
}

export default ListBug;
