import { useNavigate } from "react-router-dom";
import styles from "./Sidebar.module.css";
import classname from "classnames/bind";
import { useUser } from "../../../Context/AuthContext";
const cx = classname.bind(styles);

function Sidebar() {
	const navigate = useNavigate();
	const { getUserValue } = useUser();
	const handleSignout = () => {
		localStorage.removeItem("access_token");
		localStorage.removeItem("user");
		navigate("/login");
	};
	return (
		<div className={cx("sidebar-ctn")}>
			<div className={cx("sidebar-divider")}>
				<div
					onClick={() => {
						navigate("/dGVzdGVy");
					}}
					className={cx("sidebar-item", "active")}
				>
					<div className={cx("sidebar-item-img")}>
						<img src="/icons/i-dashboard-active.svg"></img>
					</div>
					<span>Projects</span>
				</div>
				{/* <div className={cx("sidebar-item")}>
					<div className={cx("sidebar-item-img")}>
						<img src="/icons/i-ranking.svg"></img>
					</div>
					<span>Ranking</span>
				</div> */}
			</div>
			<div className={cx("sidebar-divider")}>
				<div className={cx("sidebar-header")}>
					<div className={cx("sidebar-header-left")}>
						<img
							src={
								getUserValue().avatar
									? getUserValue().avatar
									: "https://media.istockphoto.com/id/470100848/vector/male-profile-icon-white-on-the-blue-background.jpg?s=612x612&w=0&k=20&c=2Z3As7KdHqSKB6UDBpSIbMkwOgYQtbhSWrF1ZHX505E="
							}
						></img>
						<span>{getUserValue().name}</span>
					</div>
					<div onClick={handleSignout} className={cx("sidebar-header-right")}>
						<img src="/icons/i-out.svg"></img>
						{/* <img src="/icons/i-chevron-right.svg"></img> */}
					</div>
					{/* <div className={cx("user-popup")}>
						<span onClick={handleSignout}>Sign out</span>
					</div> */}
				</div>
			</div>
		</div>
	);
}

export default Sidebar;
