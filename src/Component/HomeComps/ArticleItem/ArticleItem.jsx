import styles from "./ArticleItem.module.css";
import classname from "classnames/bind";

const cx = classname.bind(styles);

function ArticleItem({ active }) {
	return (
		<div>
			<div class={cx("task-card", active ? "active" : "")}>
				<div class={active ? cx("task-status") : ""}></div>
				<div class={cx("task-content")}>
					<div class={cx("task-header")}>
						<h3>Verification of documents and photos in the government of GRESCSS</h3>
						<p>Myanmar Kyeeonkyeewa Solar Power Plant Project</p>
					</div>
					<div class={cx("task-info")}>
						<span class={cx("badge")}>Active</span>
					</div>
					<div class={cx("task-footer")}>
						<div class={cx("avatars")}>
							<img
								src="https://static.vecteezy.com/system/resources/thumbnails/020/271/547/small/portrait-of-a-beautiful-asian-woman-full-face-portrait-in-flat-style-avatar-female-diversity-free-vector.jpg"
								alt="User"
							/>
							<img src="https://i.pinimg.com/736x/31/c4/8a/31c48a26f9f8faf14eb6822c4f35aa7f.jpg" alt="User" />
							<img
								src="https://www.shutterstock.com/image-vector/vector-bright-portrait-beautiful-brunette-600nw-2452267975.jpg"
								alt="User"
							/>
							<img
								src="https://www.shutterstock.com/image-vector/portrait-beautiful-latin-american-woman-600nw-2071168457.jpg"
								alt="User"
							/>

							<div class={cx("extra")}>+2</div>
						</div>
					</div>
				</div>
				<div class={cx("task-right-ctn")}>
					<div class={cx("task-date")}>
						<span>SUN</span>
						<strong>18</strong>
					</div>
					<div class={cx("icons")}>
						<span class={cx("icon")}>10$</span>
						<span class={cx("icon")}>-</span>
						<span class={cx("icon")}>20$</span>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ArticleItem;
