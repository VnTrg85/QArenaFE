import { useEffect, useMemo, useState } from "react";
import styles from "./DeviceManager.module.css";
import classname from "classnames/bind";
import Modal from "../../Component/Modal/Modal";
import AddDeviceModal from "../../Component/AddDeviceModal/AddDeviceModal";
import { get_user_device, update_user_device, delete_user_device } from "../../../Services/DeviceService";
import { useUser } from "../../../Context/AuthContext";
import useToast from "../../../CustomHook/useToast";
const cx = classname.bind(styles);
function DeviceManager() {
	const [showModalEdit, setShowModalEdit] = useState(false);
	const [showModalAdd, setShowModalAdd] = useState(false);
	const [currentVersion, setCurrentVersion] = useState(null);
	const [currentBrowser, setCurrentBrowser] = useState([]);
	const [isOpenVersionPopup, setIsOpenVersionPopup] = useState(false);
	const [devices, setDevices] = useState([]);
	const [selectedDevice, setSelectedDevice] = useState(null);
	const { getUserValue } = useUser();
	const { showToast } = useToast();

	useEffect(() => {
		const fetchData = async () => {
			const res = await get_user_device(getUserValue().id);
			if (res.status == "success") {
				setDevices(res.data);
			} else {
				showToast({
					message: res.data,
					type: "error",
				});
			}
		};

		fetchData();
	}, []);
	const handleAddDevice = device => {
		setDevices((prev = []) => [...prev, device]);
		setShowModalAdd(false);
	};
	const handleCloseAddModal = () => {
		setShowModalAdd(false);
	};
	const listComputerDevice = useMemo(() => {
		return devices.filter(item => item.devices.categoryDevice.id == 1);
	}, [devices]);
	const listSmartphoneDevice = useMemo(() => {
		return devices.filter(item => item.devices.categoryDevice.id == 2);
	}, [devices]);
	const listTabletDevice = useMemo(() => {
		return devices.filter(item => item.devices.categoryDevice.id == 3);
	}, [devices]);
	const handleSelectedDevice = item => {
		setSelectedDevice(item);
		setCurrentVersion(item.versionSelected);
		setCurrentBrowser(item.browserIds.map(val => item.browsers.find(temp => temp.id == val)));
		setShowModalEdit(true);
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

	const handleEditDevice = async () => {
		if (!currentVersion || currentBrowser.length <= 0) {
			console.log(currentBrowser.length <= 0, currentVersion);
			showToast({
				message: "Please fill all required field",
				type: "warning",
			});
		} else {
			const data = {
				id: selectedDevice.id,
				selectedVersion: currentVersion,
				browserIds: currentBrowser.map(item => item.id),
			};
			const res = await update_user_device(data);
			if (res.status == "success") {
				setDevices(prev => prev.map(device => (device.id === res.data.id ? { ...device, ...res.data } : device)));
				showToast({
					message: "Update successfully",
					type: "success",
				});
				setShowModalEdit(false);
			} else {
				showToast({
					message: res.data,
					type: "error",
				});
			}
		}
	};
	const handleDeleteUserDevice = async item => {
		const result = window.confirm("Do you want to delete?");
		if (result) {
			const res = await delete_user_device(item.id);
			if (res.status == "success") {
				setDevices(prev => prev.filter(val => val.id != item.id));
			} else {
				showToast({
					message: res.data,
					type: "error",
				});
			}
		}
	};
	return (
		<div className={cx("devices-container")}>
			<h1 className={cx("devices-heading")}>
				Devices
				<div className={cx("add-device-button")} onClick={() => setShowModalAdd(true)}>
					+ Add a device
				</div>
			</h1>

			<div className={cx("device-category")}>
				<h2 className={cx("category-heading")}>Computers</h2>
				<div className={cx("device-list")}>
					{listComputerDevice.map(item => (
						<div className={cx("device-card")}>
							<div className={cx("device-info")}>
								<span className={cx("device-icon", "icon-desktop")}></span>
								<div className={cx("device-details")}>
									<div className={cx("device-name")}>
										<img src={item.devices.icon_link}></img>
										<div className={cx("device-infor")}>
											<span>
												{item.devices.categoryDevice.name} | {item.devices.name} {item.versionSelected}
											</span>
											<div className={cx("device-specs")}>
												{item.browserIds
													.map(val => item.browsers.find(val2 => val2.id == val))
													.map(brow => (
														<span className={cx("icon-browser")} title={brow.name}>
															<img src={brow.icon_link}></img>
														</span>
													))}
											</div>
										</div>
										<div className={cx("device-actions")}>
											<button onClick={() => handleSelectedDevice(item)} className={cx("action-button", "icon-edit")}>
												<img src="/icons/i-pen.svg"></img>
											</button>
											<button onClick={() => handleDeleteUserDevice(item)} className={cx("action-button", "icon-delete")}>
												<img src="/icons/i-trash.svg"></img>
											</button>
										</div>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>

			<div className={cx("device-category")}>
				<h2 className={cx("category-heading")}>Smartphones</h2>
				<div className={cx("device-list")}>
					{listSmartphoneDevice.map(item => (
						<div className={cx("device-card")}>
							<div className={cx("device-info")}>
								<span className={cx("device-icon", "icon-desktop")}></span>
								<div className={cx("device-details")}>
									<div className={cx("device-name")}>
										<img src={item.devices.icon_link}></img>
										<div className={cx("device-infor")}>
											<span>
												{item.devices.categoryDevice.name} | {item.devices.name} {item.versionSelected}
											</span>
											<div className={cx("device-specs")}>
												{item.browserIds
													.map(val => item.browsers.find(val2 => val2.id == val))
													.map(brow => (
														<span className={cx("icon-browser")} title={brow.name}>
															<img src={brow.icon_link}></img>
														</span>
													))}
											</div>
										</div>
										<div className={cx("device-actions")}>
											<button onClick={() => handleSelectedDevice(item)} className={cx("action-button", "icon-edit")}>
												<img src="/icons/i-pen.svg"></img>
											</button>
											<button onClick={() => handleDeleteUserDevice(item)} className={cx("action-button", "icon-delete")}>
												<img src="/icons/i-trash.svg"></img>
											</button>
										</div>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>

			<div className={cx("device-category")}>
				<h2 className={cx("category-heading")}>Tablets</h2>
				<div className={cx("device-list")}>
					{listTabletDevice.map(item => (
						<div className={cx("device-card")}>
							<div className={cx("device-info")}>
								<span className={cx("device-icon", "icon-desktop")}></span>
								<div className={cx("device-details")}>
									<div className={cx("device-name")}>
										<img src={item.devices.icon_link}></img>
										<div className={cx("device-infor")}>
											<span>
												{item.devices.categoryDevice.name} | {item.devices.name} {item.versionSelected}
											</span>
											<div className={cx("device-specs")}>
												{item.browserIds
													.map(val => item.browsers.find(val2 => val2.id == val))
													.map(brow => (
														<span className={cx("icon-browser")} title={brow.name}>
															<img src={brow.icon_link}></img>
														</span>
													))}
											</div>
										</div>
										<div className={cx("device-actions")}>
											<button onClick={() => handleSelectedDevice(item)} className={cx("action-button", "icon-edit")}>
												<img src="/icons/i-pen.svg"></img>
											</button>
											<button onClick={() => handleDeleteUserDevice(item)} className={cx("action-button", "icon-delete")}>
												<img src="/icons/i-trash.svg"></img>
											</button>
										</div>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>

			{showModalEdit && (
				<Modal>
					<div className={cx("modal-header")}>
						<h2 className={cx("modal-title")}>Edit device</h2>
						<button onClick={() => setShowModalEdit(false)} className={cx("close-button")}>
							✕
						</button>
					</div>

					{/* Phần Category */}
					<div className={cx("modal-section-second")}>
						<label className={cx("section-label")}>Category</label>
						<div className={cx("category-options")}>
							<div className={cx("category-item", "active")}>
								<span className={cx("category-icon")}>
									<img src={selectedDevice.devices.categoryDevice.icon_link}></img>
								</span>
								<p>Computers</p>
							</div>
						</div>
					</div>

					{/* Phần Device */}
					<div className={cx("modal-section-second")}>
						<label className={cx("section-label")}>Device</label>
						<div className={cx("device-info")}>
							<span className={cx("device-icon")}>
								<img src={selectedDevice.devices.icon_link}></img>
							</span>
							<p>{selectedDevice.devices.name}</p>
						</div>
					</div>

					{/* Phần OS Version */}
					<div className={cx("modal-section-second")}>
						<label className={cx("section-label")}>
							OS version
							<span className={cx("required")}>*</span>
						</label>
						<div
							onClick={() => {
								setIsOpenVersionPopup(!isOpenVersionPopup);
							}}
							className={cx("section-label-select")}
						>
							<span>{currentVersion ? currentVersion : "Please seclect version"}</span>
							{!isOpenVersionPopup && <img src="/icons/i-chevron-down.svg"></img>}
							{isOpenVersionPopup && <img src="/icons/i-chevron-up.svg"></img>}
							{isOpenVersionPopup && (
								<div className={cx("device-info-ctn")}>
									{selectedDevice.devices.version.map(item => (
										<div onClick={() => handleChangeVersion(item)} className={cx("os-select")} key={item.id}>
											<span>{item}</span>
										</div>
									))}
								</div>
							)}
						</div>
					</div>

					{/* Phần Browsers */}
					<div className={cx("modal-section-second")}>
						<label className={cx("section-label")}>
							Browsers
							<span className={cx("required")}>*</span>
						</label>
						<div className={cx("browser-options")}>
							{selectedDevice.browsers.map(item => (
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

					{/* Phần Footer */}
					<div className={cx("modal-footer")}>
						<button onClick={() => setShowModalEdit(false)} className={cx("cancel-button")}>
							✕ Cancel
						</button>
						<button onClick={handleEditDevice} className={cx("update-button")}>
							<img src="/icons/i-tick.svg"></img>
							Update Device
						</button>
					</div>
				</Modal>
			)}

			{showModalAdd && (
				<Modal>
					<AddDeviceModal onCloseModal={handleCloseAddModal} onAddDevice={handleAddDevice}></AddDeviceModal>
				</Modal>
			)}
		</div>
	);
}

export default DeviceManager;
