import { Outlet } from "react-router-dom";
import Header from "../Component/Header/Header";
import Sidebar from "../Component/Sidebar/Sidebar";
import styles from "./DefaultLayout.module.css";
import classname from "classnames/bind";

const cx = classname.bind(styles);
const DefaultLayout = () => {
	return (
		<div className={cx("main-container")}>
			<Header></Header>
			<div className={cx("content")}>
				<Sidebar></Sidebar>
				<div class={cx("main-wrapper")}>
					<Outlet></Outlet>
				</div>
			</div>
		</div>
	);
};

export default DefaultLayout;
