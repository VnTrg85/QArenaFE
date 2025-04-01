import { useLocation } from "react-router-dom";
import styles from "./ArticleDetail.module.css";
import classname from "classnames/bind";
import { useState } from "react";

const cx = classname.bind(styles);
function ArticleDetail() {
	const location = useLocation();
	return (
		<div className={cx("wrapper-container")}>
			<div className={cx("container")}>
				{!location.pathname.includes("project") && (
					<div className={cx("container-header")}>
						<h1>Verification of documents and photos in the government of GRESCSS</h1>
						<div className={cx("test-btn")}>
							<span>Test now</span>
							<img src="/icons/i-chevron-white.svg"></img>
						</div>
					</div>
				)}

				<p className={cx("subtitle", location.pathname.includes("project") ? "subtitle-second" : "")}>
					{location.pathname.includes("project") && <span>EN</span>}Submit reports in EN
				</p>

				{location.pathname.includes("project") && (
					<div className={cx("information")}>
						<h2>Information</h2>
						<div className={cx("information-content")}>
							<div>
								<h5>Href : </h5>
								<span>https://localhost:8080</span>
							</div>
							<div>
								<h5>Port : </h5>
								<span>8080</span>
							</div>
							<div>
								<h5>Username : </h5>
								<span>username</span>
							</div>
							<div>
								<h5>Password :</h5>
								<span>password</span>
							</div>
						</div>
					</div>
				)}

				{!location.pathname.includes("project") && (
					<div className={cx("status")}>
						<div className={cx("status-badge")}>
							<span className={cx("label")}>Date </span>
							<span className={cx("value")}>: 18.08.24 📅</span>
						</div>
						<span className={cx("status-badge")}>🟢 Active</span>
						<span>Web Shops</span>
					</div>
				)}

				{!location.pathname.includes("project") && (
					<div className={cx("details")}>
						<div className={cx("box")}>
							<h2>Payout</h2>
							<table>
								<thead>
									<tr>
										<th>Bug Type</th>
										<th>Amount</th>
										<th>Reprod.</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td>
											<img src="/icons/i-low.svg" alt="Low" />
											<span>Low</span>
										</td>
										<td>$2.50</td>
										<td>$0.25</td>
									</tr>
									<tr>
										<td>
											<img src="/icons/i-high.svg" alt="High" />
											<span>High</span>
										</td>
										<td>$4.90</td>
										<td>$0.49</td>
									</tr>
									<tr>
										<td>
											<img src="/icons/i-critical.svg" alt="Critical" /> Critical
										</td>
										<td>$7.30</td>
										<td>$0.60</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				)}
				{!location.pathname.includes("project") && (
					<div className={cx("members")}>
						<h2>Members</h2>
						<div className={cx("avatars")}>
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
							<span className={cx("more")}>+2</span>
						</div>
					</div>
				)}

				<div className={cx("description")}>
					<h2>Description</h2>
					<p>
						We partnered with Carbon Solutions to design a modern, user-friendly web dashboard for their Upstream Project, making carbon
						reduction data clear and actionable. Looking for a design partner? Let’s create something amazing together!
					</p>
				</div>
				<div className={cx("description")}>
					<h2>Goal of this test</h2>
					<p>
						The purpose of this test is to verify the core functionalities of the website. Please focus only on the following actions:
						Account Creation – Register a new user account. Account Deletion – Delete the created account. Adding Products to Cart –
						Select and add products to the shopping cart. Editing Products – Modify product details in the cart. Duplicating Products –
						Duplicate items in the cart. Adding and Editing Addresses – Add new addresses and modify existing ones. Checkout Process –
						Proceed through the checkout process. Payment Completion – Finalize the payment successfully using all available payment
						methods. Please do not test any other features or functionalities outside of the listed actions.
					</p>
				</div>
				<div className={cx("description")}>
					<h2>Out of scope</h2>
					<p>We do block all outgoing emails.</p>
				</div>
				<div className={cx("description")}>
					<h2>Additional requirements</h2>
					<p>No information</p>
				</div>
				<div className={cx("feature-container")}>
					<h2>Test these features</h2>

					<div className={cx("feature-box")}>
						<span>Cart</span>
						<a href="#" className={cx("button")}>
							Read more
						</a>
					</div>

					<div className={cx("feature-box")}>
						<span>Configurator</span>
						<a href="#" className={cx("button")}>
							Read more
						</a>
					</div>

					<div className={cx("feature-box")}>
						<span>Guest order process</span>
						<a href="#" className={cx("button")}>
							Read more
						</a>
					</div>

					<div className={cx("feature-box")}>
						<span>Order process</span>
						<a href="#" className={cx("button")}>
							Read more
						</a>
					</div>

					<div className={cx("feature-box")}>
						<span>Registration & Account</span>
						<a href="#" className={cx("button")}>
							Read more
						</a>
					</div>
				</div>
			</div>
			{location.pathname.includes("project") && (
				<div className={cx("container-right")}>
					<div className={cx("details")}>
						<div className={cx("box")}>
							<h2>Payout</h2>
							<table>
								<thead>
									<tr>
										<th>Bug Type</th>
										<th>Amount</th>
										<th>Reprod.</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td>
											<img src="/icons/i-low.svg" alt="Low" /> Low
										</td>
										<td>$2.50</td>
										<td>$0.25</td>
									</tr>
									<tr>
										<td>
											<img src="/icons/i-high.svg" alt="High" /> High
										</td>
										<td>$4.90</td>
										<td>$0.49</td>
									</tr>
									<tr>
										<td>
											<img src="/icons/i-critical.svg" alt="Critical" /> Critical
										</td>
										<td>$7.30</td>
										<td>$0.60</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
					<div className={cx("device-ctn")}>
						<h5>Requested OS</h5>
						<div className={cx("device-item")}>
							<img src="/icons/i-computer.svg"></img>
							<div className={cx("device-item-content")}>
								<span>Window 11 and higher</span>
								<div>
									<img src="/icons/i-edge.svg"></img>
									<img src="/icons/i-edge.svg"></img>
								</div>
							</div>
						</div>
					</div>
					<div className={cx("device-ctn")}>
						<h5>Available for reproduction</h5>
						<div className={cx("device-item")}>
							<img src="/icons/i-mac.svg"></img>
							<div className={cx("device-item-content")}>
								<span>Window 11 and higher</span>
								<div>
									<img src="/icons/i-chrome.svg"></img>
									<img src="/icons/i-safari.svg"></img>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default ArticleDetail;
