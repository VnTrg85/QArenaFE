import styles from "./Home.module.css";
import classname from "classnames/bind";
import ArticleItem from "../../Component/HomeComps/ArticleItem/ArticleItem";
import ArticleDetail from "../../Component/ArticleDetail/ArticleDetail";
const cx = classname.bind(styles);
function Home() {
	return (
		<div className={cx("home-container")}>
			<div className={cx("home-container-label")}>
				<div class={cx("label-container")}>
					<div class={cx("progress-circle")}>
						<span class={cx("progress-text")}>4/13</span>
					</div>
					<div class={cx("text-content")}>
						<h2>Optional onboarding modules available</h2>
						<p>
							Discover our optional onboarding modules tailored to enhance your skills and prepare you for a diverse range of tasks and
							opportunities. Embrace the opportunity ahead and get ready to make your mark—your journey carries on!
						</p>
						<a href="#" class={cx("button")}>
							Go to learning portal
						</a>
					</div>
				</div>
			</div>
			<div className={cx("home-container-content")}>
				<div className={cx("home-container-content-left")}>
					<ArticleItem active="true"></ArticleItem>
					<ArticleItem></ArticleItem>
					<ArticleItem></ArticleItem>
					<ArticleItem></ArticleItem>
					<ArticleItem></ArticleItem>
					<ArticleItem></ArticleItem>
				</div>
				<div className={cx("home-container-content-right")}>
					<ArticleDetail></ArticleDetail>
				</div>
			</div>
		</div>
	);
}

export default Home;
