import { useEffect, useMemo, useState } from "react";
import styles from "./AddDeviceModal.module.css";
import classname from "classnames/bind";
import { get_category, get_devices_by_cate, get_browsers, create_user_device } from "../../../Services/DeviceService";
import useToast from "../../../CustomHook/useToast";
import { useUser } from "../../../Context/AuthContext";
const cx = classname.bind(styles);

function AddDeviceModal({ onCloseModal, onAddDevice }) {
	const [categories, setCategories] = useState(null);
	const [currentCateId, setCurrentCateId] = useState(null);
	const [devices, setDevices] = useState(null);
	const [currentDevice, setCurrentDevice] = useState(null);
	const [versions, setVersions] = useState(null);
	const [currentVersion, setCurrentVersion] = useState(null);
	const [browsers, setBrowsers] = useState(null);
	const [currentBrowser, setCurrentBrowser] = useState([]);
	const [isOpenDevicePopup, setIsOpenDevicePopup] = useState(false);
	const [isOpenVersionPopup, setIsOpenVersionPopup] = useState(false);
	const { showToast } = useToast();
	const { getUserValue } = useUser();

	useEffect(() => {
		const fetchData = async () => {
			const res = await get_category();
			if (res.status == "success") {
				setCategories(res.data);
			} else {
				showToast({
					message: res.data || "Some thing went wrong",
					type: res.status || "error",
				});
			}
		};
		fetchData();
		const fetchDataBrowser = async () => {
			const res = await get_browsers();
			if (res.status == "success") {
				setBrowsers(res.data);
			} else {
				showToast({
					message: res.data || "Some thing went wrong",
					type: res.status || "error",
				});
			}
		};
		fetchDataBrowser();
	}, []);

	useEffect(() => {
		const fetchData = async () => {
			if (currentCateId) {
				const res = await get_devices_by_cate(currentCateId);
				if (res.status == "success") {
					setDevices(res.data);
				} else {
					showToast({
						message: res.data || "Some thing went wrong",
						type: res.status || "error",
					});
				}
			}
		};
		fetchData();
	}, [currentCateId]);
	useEffect(() => {
		setVersions(currentDevice?.version);
	}, [currentDevice]);
	const handleChangeCate = item => {
		setCurrentCateId(item.id);
		setCurrentDevice(null);
		setCurrentVersion(null);
		setCurrentBrowser([]);
		setIsOpenDevicePopup(false);
	};
	const handleChangeDevice = item => {
		setCurrentDevice(item);
	};
	const handleChangeVersion = item => {
		setCurrentVersion(item);
	};
	const handleChangeBrowser = item => {
		if (currentBrowser && currentBrowser.findIndex(val => val.id == item.id) >= 0) {
			setCurrentBrowser(prev => prev.filter(val => val.id != item.id));
		} else {
			setCurrentBrowser((prev = []) => [...prev, item]);
		}
	};

	const handleAddDevice = async () => {
		if (!currentDevice || !currentBrowser.length > 0 || !currentVersion) {
			showToast({
				message: "Please fill all required field",
				type: "warning",
			});
		} else {
			const data = {
				versionSelected: currentVersion,
				browserIds: currentBrowser.map(item => item.id),
				device: { id: currentDevice.id },
				user: { id: getUserValue().id },
			};
			const res = await create_user_device(data);
			if (res.status == "success") {
				onAddDevice(res.data);
			} else {
				showToast({
					message: res.data,
					type: "error",
				});
			}
		}
	};
	const handleCloseModal = () => {
		onCloseModal();
	};
	return (
		<div className={cx("add-device-ctn")}>
			<div className={cx("modal-header")}>
				<h2 className={cx("modal-title")}>Add new device</h2>
				<button onClick={handleCloseModal} className={cx("close-button")}>
					✕
				</button>
			</div>

			{/* Phần Category */}
			<div className={cx("modal-section")}>
				<label className={cx("section-label")}>
					Category
					<span className={cx("required")}>*</span>
				</label>
				<div className={cx("category-options")}>
					{categories?.map(item => (
						<div
							onClick={() => {
								handleChangeCate(item);
							}}
							className={cx("category-item", currentCateId == item.id ? "active" : "")}
							key={item.id}
						>
							<span className={cx("category-icon")}>
								<img src={item.icon_link}></img>
							</span>
							<p>{item.name}</p>
						</div>
					))}
				</div>
			</div>

			{/* Phần Device */}
			{currentCateId && (
				<div className={cx("modal-section-second")}>
					<label className={cx("section-label")}>
						Device
						<span className={cx("required")}>*</span>
					</label>
					<div
						onClick={() => {
							setIsOpenVersionPopup(false);
							setIsOpenDevicePopup(!isOpenDevicePopup);
						}}
						className={cx("section-label-select")}
					>
						<span>{currentDevice?.name ? currentDevice?.name : "Please seclect your device"}</span>
						{!isOpenDevicePopup && <img src="/icons/i-chevron-down.svg"></img>}
						{isOpenDevicePopup && <img src="/icons/i-chevron-up.svg"></img>}
						{isOpenDevicePopup && (
							<div className={cx("device-info-ctn")}>
								{/*  */}
								{devices.map(item => (
									<div className={cx("device-info")} onClick={() => handleChangeDevice(item)}>
										<span className={cx("device-icon")}>
											<img src={item.icon_link}></img>
										</span>
										<p>{item.name}</p>
									</div>
								))}
							</div>
						)}
					</div>
				</div>
			)}

			{/* Phần OS Version */}
			{currentDevice && (
				<div className={cx("modal-section-second")}>
					<label className={cx("section-label")}>
						OS version
						<span className={cx("required")}>*</span>
					</label>
					<div
						onClick={() => {
							setIsOpenVersionPopup(!isOpenVersionPopup);
							setIsOpenDevicePopup(false);
						}}
						className={cx("section-label-select")}
					>
						<span>{currentVersion ? currentVersion : "Please seclect version"}</span>
						{!isOpenVersionPopup && <img src="/icons/i-chevron-down.svg"></img>}
						{isOpenVersionPopup && <img src="/icons/i-chevron-up.svg"></img>}
						{isOpenVersionPopup && (
							<div className={cx("device-info-ctn")}>
								{versions.map(item => (
									<div onClick={() => handleChangeVersion(item)} className={cx("os-select")} key={item.id}>
										<span>{item}</span>
									</div>
								))}
							</div>
						)}
					</div>
				</div>
			)}

			{/* Phần Browsers */}
			{currentDevice && (
				<div className={cx("modal-section-second")}>
					<label className={cx("section-label")}>
						Browsers
						<span className={cx("required")}>*</span>
					</label>
					<div className={cx("browser-options")}>
						{browsers.map(item => (
							<span
								onClick={() => handleChangeBrowser(item)}
								className={cx("browser-icon", currentBrowser?.findIndex(val => val.id == item.id) >= 0 ? "active" : "")}
								title={item.name}
							>
								<img src={item.icon_link}></img>
							</span>
						))}
					</div>
				</div>
			)}

			{/* Phần Footer */}
			{currentDevice && (
				<div className={cx("modal-footer")}>
					<button onClick={handleCloseModal} className={cx("cancel-button")}>
						✕ Cancel
					</button>
					<button onClick={handleAddDevice} className={cx("update-button")}>
						<img src="/icons/i-tick.svg"></img>
						Add device
					</button>
				</div>
			)}
		</div>
	);
}

export default AddDeviceModal;
