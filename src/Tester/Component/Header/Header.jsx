import { useNavigate } from "react-router-dom";
import styles from "./Header.module.css";
import classname from "classnames/bind";

const cx = classname.bind(styles);

function Header() {
	const navigate = useNavigate();
	const handleNavigate = path => {
		navigate(`/dGVzdGVy/${path}`);
	};
	return (
		<div className={cx("header-ctn")}>
			<div className={cx("header-ctn-left")}>
				<img class={cx("icon-ava")} src="/icons/i-qarenalogo.svg"></img>
				<div className={cx("header-ctn-wrapper")}>
					<div class={cx("divider")}></div>

					<div className={cx("header-item")}>
						<img src="/icons/i-profile.svg" />
						<span>Your profile</span>
					</div>
					<div class={cx("divider")}></div>
					<div className={cx("header-item")}>
						<img src="/icons/i-activities.svg" />
						<span>Activities</span>
					</div>
					<div class={cx("divider")}></div>

					<div
						onClick={() => {
							handleNavigate("your-devices");
						}}
						className={cx("header-item", "active")}
					>
						<img src="/icons/i-device.svg" />
						<span>Your Devices</span>
					</div>
					<div class={cx("divider")}></div>

					<div className={cx("header-item")}>
						<img src="/icons/i-billing.svg" />
						<span>Billing</span>
					</div>
					<div class={cx("divider")}></div>

					<div className={cx("header-item")}>
						<img src="/icons/i-learn.svg" />
						<span>Learn</span>
					</div>
					<div class={cx("divider")}></div>
				</div>
			</div>
			<div className={cx("header-ctn-right")}>
				<div className={cx("header-item")}>
					<img src="/icons/i-discord.svg" />
				</div>
				<div className={cx("header-item")}>
					<img src="/icons/i-bell.svg" />
				</div>
			</div>
		</div>
	);
}

export default Header;
