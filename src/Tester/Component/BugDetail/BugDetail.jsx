import styles from "./BugDetail.module.css";
import classname from "classnames/bind";
const cx = classname.bind(styles);

function BugDetail() {
	return (
		<div className={cx("bug-wrapper")}>
			<div className={cx("bug-container")}>
				<h2>After scroll down and click on the options in Quick Comparison, it is not highlighted on the top.</h2>
				<div className={cx("attachments")}>
					<h3>Attachments</h3>
					<video controls>
						<source src="https://www.youtube.com/watch?v=ITn5Q6W9RQY" type="video/mp4" />
					</video>
				</div>
				<div className={cx("url")}>
					<strong>URL: </strong>
					<a>https://coresite-stage.tsc-starts-coding.com/coresite/mattresses/compare</a>
				</div>
				<div className={cx("steps")}>
					<h3>Steps</h3>
					<ol>
						<li>Go to the link above</li>
						<li>Scroll down</li>
						<li>Click on "Back pain" in the "Quick Comparison"</li>
						<li>Observe</li>
					</ol>
				</div>
				<div className={cx("results")}>
					<h3>Actual Result</h3>
					<p className={cx("actual-result")}>
						After clicking on "Back pain" in the "Quick Comparison" section, the user is back to the top of the page but the "Back pain"
						option is not highlighted.
					</p>
					<h3>Expected Result</h3>
					<p className={cx("expected-result")}>
						The "Back pain" option will be highlighted after the user clicks on it after scrolling down.
					</p>
				</div>
				<div className={cx("comment-section")}>
					<div className={cx("comment-header")}>
						<span className={cx("active-tab")}>
							Comments <span className={cx("count")}>1</span>
						</span>
					</div>

					<div className={cx("comment-box")}>
						<input placeholder="Write a comment..."></input>
						<button className={cx("send-button")}>
							<img src="/icons/i-send.svg" alt="Send" />
						</button>
					</div>

					<div className={cx("comment")}>
						<div className={cx("comment-avatar")}>
							<img
								src="https://static.vecteezy.com/system/resources/thumbnails/020/271/547/small/portrait-of-a-beautiful-asian-woman-full-face-portrait-in-flat-style-avatar-female-diversity-free-vector.jpg"
								alt="User"
							/>
						</div>
						<div className={cx("comment-content")}>
							<p>
								<strong>Hi,</strong>
							</p>
							<p>This bug has already been submitted in the same test (duplicate bug) and this is why it cannot be accepted.</p>
							<p>
								<strong>Reference ID of the original report:</strong> 2489297
							</p>
							<p>Same underlying issue - The selected option won't be synced between those sections.</p>
							<p>
								Please note that each bug may only be submitted once. If two bugs have the same root cause, only the first report gets
								approved since fixing the bug will fix both problems altogether.
							</p>
							<p>
								To avoid submitting duplicates, please always pay close attention to the <strong>“Similar bugs”</strong> list on the
								right-hand side of the bug submission form and the list of already submitted bugs in your test. Thank you.
							</p>
							<span className={cx("comment-time")}>
								May 3, 2024 10:30 PM by <strong>Victor (TL)</strong>
							</span>
						</div>
					</div>
				</div>
			</div>
			<div className={cx("bug-report")}>
				<div className={cx("section")}>
					<p className={cx("label")}>Status</p>
					<p className={cx("status rejected")}>✖ Rejected by test IO</p>
				</div>

				<div className={cx("section")}>
					<p className={cx("label")}>Known Bug</p>
					<p>No</p>
				</div>

				<div className={cx("section")}>
					<p className={cx("label")}>Bug Type</p>
					<p className={cx("icon")}>▼ Functional</p>
				</div>

				<div className={cx("section")}>
					<p className={cx("label")}>Severity</p>
					<p className={cx("icon-severity")}>▼ Low</p>
				</div>

				<div className={cx("section")}>
					<p className={cx("label")}>Bug ID</p>
					<p>#2489533</p>
				</div>

				<div className={cx("section")}>
					<p className={cx("label")}>Test ID</p>
					<p>#128486</p>
				</div>

				<div className={cx("section")}>
					<p className={cx("label")}>Reported on</p>
					<p>May 3, 2024 10:06 PM</p>
				</div>

				<div className={cx("section")}>
					<p className={cx("label")}>Feature</p>
					<p>Compare Page</p>
				</div>

				<div className={cx("section", "tester")}>
					<p className={cx("label")}>Tester</p>
					<div className={cx("tester-info")}>
						<img
							src="https://static.vecteezy.com/system/resources/thumbnails/020/271/547/small/portrait-of-a-beautiful-asian-woman-full-face-portrait-in-flat-style-avatar-female-diversity-free-vector.jpg"
							alt="User"
						/>
						<span>You</span>
					</div>
				</div>

				<div className={cx("section", "devices")}>
					<p className={cx("label")}>Devices</p>
					<div className={cx("device-info")}>
						<img src="/icons/i-mac.svg" alt="Mac OS" />
						<span>Mac OS 13.2</span>
					</div>
					<div className={cx("device-info")}>
						<img src="/icons/i-chrome.svg" alt="Chrome" />
						<span>Chrome</span>
					</div>
				</div>
			</div>
		</div>
	);
}

export default BugDetail;
