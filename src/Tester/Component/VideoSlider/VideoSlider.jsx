import { useState } from "react";
import styles from "./VideoSlider.module.css";
import classname from "classnames/bind";
const cx = classname.bind(styles);

const VideoSlider = ({ videos }) => {
	const [currentIndex, setCurrentIndex] = useState(0);

	const handleNext = () => {
		setCurrentIndex(prevIndex => (prevIndex + 1) % videos.length);
	};

	const handlePrev = () => {
		setCurrentIndex(prevIndex => (prevIndex - 1 + videos.length) % videos.length);
	};

	return (
		<div className={cx("sliderContainer")}>
			{videos.length > 1 && (
				<button className={cx("navBtn", "prevBtn")} onClick={handlePrev}>
					&#10094;
				</button>
			)}
			<div className={cx("videoWrapper")}>
				<video className={cx("video")} controls>
					<source src={videos[currentIndex]} type="video/mp4" />
					Your browser does not support the video tag.
				</video>
			</div>
			{videos.length > 1 && (
				<button className={cx("navBtn", "nextBtn")} onClick={handleNext}>
					&#10095;
				</button>
			)}
		</div>
	);
};

export default VideoSlider;
