import { useEffect, useRef, useState } from "react";
import styles from "./Profile.module.css";
import classname from "classnames/bind";
import CalendarHeatmap from "react-calendar-heatmap";
import Modal from "../../Component/Modal/Modal";
import "react-calendar-heatmap/dist/styles.css";
import ModalEditProfile from "../../Component/Modal/ModalEditProfile/ModalEditProfile";
import { useUser } from "../../../Context/AuthContext";
import { formatDateBirth } from "../../../Utils/formatTime";
import { update_user_avatar } from "../../../Services/UserService";
import { get_report_sumary } from "../../../Services/BugReportService";
import useToast from "../../../CustomHook/useToast";
const CLOUD_NAME = process.env.REACT_APP_CLOUD_NAME;
const UPLOAD_PRESET = process.env.REACT_APP_UPLOAD_PRESET;
const cx = classname.bind(styles);

function Profile() {
	const [isOpenModalEdit, setIsOpenModalEdit] = useState(false);
	const { getUserValue, setUserValue } = useUser();
	const [user, setUser] = useState(getUserValue());
	const [frequency, setFrequency] = useState([]);
	const inputEl = useRef(null);
	const { showToast } = useToast();
	const updateUser = val => {
		setUser(val);
	};
	async function uploadToCloudinary(file) {
		const cloudName = CLOUD_NAME;
		const uploadPreset = UPLOAD_PRESET;
		const formData = new FormData();
		formData.append("file", file);
		formData.append("upload_preset", uploadPreset);

		try {
			const res = fetch(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, {
				method: "POST",
				body: formData,
			})
				.then(res => res.json())
				.then(data => {
					return data.secure_url;
				})
				.catch(e => {
					console.log(e);
				});
			return res;
		} catch (error) {}
	}

	const onFileChange = async e => {
		if (e.target.files[0]) {
			const linkImg = await uploadToCloudinary(e.target.files[0]);
			const data = {
				id: getUserValue().id,
				avatar: linkImg,
			};
			const res = await update_user_avatar(data);
			if (res.status == "success") {
				setUserValue(prev => ({ ...prev, avatar: linkImg }));
				setUser(prev => ({ ...prev, avatar: linkImg }));
			} else {
				showToast({
					message: "Something went wrong",
					type: "error",
				});
			}
		}
	};

	useEffect(() => {
		const fetchSumary = async () => {
			const res = await get_report_sumary(user.id);
			if (res.status == "success") {
				console.log(res.data);
				setFrequency(res.data);
			} else {
				console.log("Error happened");
			}
		};
		fetchSumary();
	}, []);
	return (
		<div className={cx("employee-profile")}>
			<h3 className={cx("employee-profile-label")}>Profile</h3>
			<div className={cx("employee-profile-container")}>
				<div className={cx("employee-profile-left-section")}>
					<div className={cx("employee-profile-header")}>
						<img
							className={cx("employee-profile-image")}
							src={
								user.avatar
									? user.avatar
									: "https://static.vecteezy.com/system/resources/thumbnails/020/271/547/small/portrait-of-a-beautiful-asian-woman-full-face-portrait-in-flat-style-avatar-female-diversity-free-vector.jpg"
							}
							alt="Profile"
						/>

						<span className={cx("img-change-ava")}>
							<img
								onClick={() => {
									inputEl.current.click();
								}}
								src="/icons/i-plus.svg"
								alt="Profile"
							/>
							<input onChange={e => onFileChange(e)} type="file" ref={inputEl} style={{ display: "none" }}></input>
						</span>
						<div className={cx("employee-profile-info")}>
							<h2>{user.name}</h2>
							<p>#{user.id}</p>
						</div>
						<div onClick={() => setIsOpenModalEdit(true)} className={cx("icon-more")}>
							Edit
						</div>
					</div>
					<div className={cx("employee-profile-section")}>
						<h3>About</h3>
						<p>
							<img src="/icons/i-phone.svg"></img>
							<span>Phone:</span> {user.phone ? user.phone : "None"}
						</p>
						<p>
							<img src="/icons/i-email.svg"></img>
							<span>Email:</span>
							{user.email ? user.email : "None"}
						</p>
					</div>
					<div className={cx("employee-profile-section")}>
						<h3>Address</h3>
						<p>
							<img src="/icons/i-address.svg"></img>
							<span>Address:</span>
							{user.address ? user.address : "None"}
						</p>
						<p>
							<img src="/icons/i-city.svg"></img>
							<span>City, state:</span> {user.city ? user.city : "None"}
						</p>
					</div>
					<div className={cx("employee-profile-section")}>
						<h3>Employee details</h3>
						<p>
							<img src="/icons/i-birth.svg"></img>
							<span>Date of birth:</span> {user.dateOfBirth ? formatDateBirth(user.dateOfBirth) : "None"}
						</p>
						<p>
							<img src="/icons/i-role.svg"></img>
							<span>Role:</span> {user.role == "3" ? "Tester" : "None"}
						</p>
						<p>
							<img src="/icons/i-calendar.svg"></img>
							<span>Join Date:</span> {user.createAt ? formatDateBirth(user.createAt) : "None"}
						</p>
					</div>
				</div>
				<div className={cx("employee-profile-right-section")}>
					<div className={cx("employee-activity-compensation")}>
						<div className={cx("employee-activity-section")}>
							<div className={cx("employee-activity-label")}>
								<h3>Activity</h3>
								<div className={cx("employee-view-all")}>
									<a href="#">View all</a>
								</div>
							</div>
							<div className={cx("stat-card-ctn")}>
								<div class={cx("stat-card")}>
									<div class={cx("stat-icon")}>
										<img src="/icons/i-project.svg"></img>
									</div>
									<div class={cx("stat-number")}>1</div>
									<div class={cx("stat-label")}>Projects</div>
								</div>
								<div class={cx("stat-card")}>
									<div class={cx("stat-icon")}>
										<img src="/icons/i-bugs.svg"></img>
									</div>
									<div class={cx("stat-number")}>9</div>
									<div class={cx("stat-label")}>Bugs</div>
								</div>
								<div class={cx("stat-card")}>
									<div class={cx("stat-icon")}>
										<img src="/icons/i-reprod.svg"></img>
									</div>
									<div class={cx("stat-number")}>86</div>
									<div class={cx("stat-label")}>Reproductions</div>
								</div>
							</div>
						</div>
						<div className={cx("employee-compensation-section")}>
							<div className={cx("employee-activity-label")}>
								<h3>Income</h3>
								<div className={cx("employee-view-all")}>
									<a href="#">View all</a>
								</div>
							</div>
							<div className={cx("employee-compensation-item")}>
								<p>862.00 USD</p>
								<p>
									<span>Effective date on May 10, 2015</span>
								</p>
							</div>
							<div className={cx("employee-compensation-item")}>
								<p>1560.00 USD</p>
								<p>
									<span>Effective date on Jun 08, 2022</span>
								</p>
							</div>
							<div className={cx("employee-compensation-item")}>
								<p>378.00 USD</p>
								<p>
									<span>Effective date on Jun 08, 2022</span>
								</p>
							</div>
						</div>
					</div>
					<div className={cx("employee-job-info")}>
						<div>
							<h2>Frequency of operation</h2>
							<CalendarHeatmap
								startDate={new Date("2024-01-01")}
								endDate={new Date()}
								gutterSize={3}
								values={frequency}
								classForValue={value => {
									if (!value || value.count === 0) {
										return cx("calendar-heatmap__square", "color-empty");
									}
									const level = Math.min(value.count, 5); // max level: 5
									return cx("calendar-heatmap__square", `color-level-${level}`);
								}}
								showWeekdayLabels={true}
							/>
						</div>
					</div>
				</div>
			</div>
			{isOpenModalEdit && (
				<ModalEditProfile
					closeModal={() => {
						setIsOpenModalEdit(false);
					}}
					updateUser={updateUser}
				></ModalEditProfile>
			)}
		</div>
	);
}

export default Profile;
