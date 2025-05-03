import styles from "./CreateBugReport.module.css";
import classname from "classnames/bind";
import { DndContext, useSensor, useSensors, PointerSensor, closestCenter } from "@dnd-kit/core";
import { SortableContext, useSortable, arrayMove, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useContext, useEffect, useMemo, useState } from "react";
import { get_feature_by_id, get_feature_by_project_id } from "../../../Services/FeatureService";
import { useLocation, useNavigate } from "react-router-dom";
import useToast from "../../../CustomHook/useToast";
import { useUser } from "../../../Context/AuthContext";
import { useSelector, useDispatch } from "react-redux";
import { get_user_device } from "../../../Services/DeviceService";
import { SubmitContext } from "../../Context/SubmitContext";
import { addNotification } from "../../../Store/notificationSlice";
import { create_bug_report } from "../../../Services/BugReportService";
import ModalSaving from "../../Component/Modal/ModalSaving/ModalSaving";
const cx = classname.bind(styles);
const CLOUD_NAME = process.env.REACT_APP_CLOUD_NAME;
const UPLOAD_PRESET = process.env.REACT_APP_UPLOAD_PRESET;
const StepItem = ({ id, index, onDelete, step, onInputChange }) => {
	const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
	};
	return (
		<div ref={setNodeRef} style={style} className={cx("step")} {...attributes}>
			<div className={cx("step-number")}>{index + 1}</div>
			<input type="text" value={step.text} onChange={e => onInputChange(index, e.target.value)} />
			<div className={cx("icon-ctn")} {...listeners}>
				<img src="/icons/i-move.svg" alt="move" />
			</div>
			<div className={cx("icon-ctn")} onClick={() => onDelete(index)}>
				<img src="/icons/i-trash.svg" alt="delete" />
			</div>
		</div>
	);
};

function CreateBugReport() {
	//State
	const { submitTrigger, setSubmitTrigger } = useContext(SubmitContext);
	const location = useLocation();
	const dispatch = useDispatch();
	const session = useSelector(state =>
		state.session.find(element => element?.testProject?.id == location.pathname.split("/")[3] && element.status == "doing"),
	);
	const navigate = useNavigate();

	const { getUserValue } = useUser();
	const [isCollapse, setIsCollapse] = useState(false);
	const [features, setFeatures] = useState([]);
	const [bugTypes, setBugTypes] = useState([]);
	const [title, setTitle] = useState("");
	const [url, setUrl] = useState("");
	const [description, setDescription] = useState("");
	const [expectedResult, setExpectedResult] = useState("");
	const [selectedFeature, setSelectedFeature] = useState("");
	const [selectedBugType, setSelectedBugType] = useState("");
	const [devices, setDevices] = useState([]);
	const [currentDevice, setCurrentDevice] = useState();
	const [files, setFiles] = useState([]);
	const [currentBrowser, setCurrentBrowser] = useState(null);
	const [isSaving, setIsSaving] = useState(false);
	const { showToast } = useToast();
	const sessionDoing = useSelector(state =>
		state.session?.find(element => element?.testProject?.id == location.pathname.split("/")[3] && element.status == "doing"),
	);
	//More
	const sensors = useSensors(useSensor(PointerSensor));
	const [steps, setSteps] = useState([
		{ id: "step-1", text: "" },
		{ id: "step-2", text: "" },
	]);
	const checkValidData = () => {
		if (!selectedFeature) {
			showToast({
				message: "Please select feature",
				type: "error",
			});
			return false;
		}
		if (!selectedBugType) {
			showToast({
				message: "Please select bug type",
				type: "error",
			});
			return false;
		}
		if (title == "") {
			showToast({
				message: "Please fill title",
				type: "error",
			});
			return false;
		}
		if (description == "") {
			showToast({
				message: "Please fill description",
				type: "error",
			});
			return false;
		}
		if (expectedResult == "") {
			showToast({
				message: "Please fill expected results",
				type: "error",
			});
			return false;
		}
		if (steps.length <= 0 || steps.some(item => item.text == "")) {
			showToast({
				message: "Step must not be empty",
				type: "error",
			});
			return false;
		}
		if (url == "") {
			showToast({
				message: "Please fill url",
				type: "error",
			});
			return false;
		}
		if (files.length == 0) {
			showToast({
				message: "Please select file bug",
				type: "error",
			});
			return false;
		}
		if (!currentBrowser) {
			showToast({
				message: "Please select browser",
				type: "error",
			});
			return false;
		}
		return true;
	};
	useEffect(() => {
		if (submitTrigger == true) {
			const handleSubmitBugReport = async () => {
				if (!checkValidData()) {
					setSubmitTrigger(false);
					return;
				}
				setIsSaving(true);
				const stepString = steps.map(item => item.text);
				const fileList = await uploadToCloudinary();
				if (!fileList) {
					showToast({
						message: "Error when upload file",
						type: "error",
					});
				}
				const data = {
					title: title,
					url_test: url,
					actual_result: description,
					expected_result: expectedResult,
					reproductionSteps: stepString,
					screenshotUrl: fileList,
					status: "awaiting",
					reported_at: Date.now(),
					browser: { id: currentBrowser },
					bugType: { id: selectedBugType },
					testProject: { id: Number(location.pathname.split("/")[3]) },
					testFeature: { id: selectedFeature.id },
					user: { id: getUserValue().id },
					session: { id: sessionDoing.id },
					device: { id: Number(devices.find(item => item.id == currentDevice).devices.id) },
					versionSelected: devices.find(item => item.id == currentDevice).versionSelected,
				};
				const res = await create_bug_report(data);
				if (res.status == "success") {
					navigate(`/dGVzdGVy/project/${location.pathname.split("/")[3]}/bugs/${res.data.id}`);
				} else {
					showToast({
						message: "Something went wrong",
						type: "error",
					});
				}
				setIsSaving(false);
				setSubmitTrigger(false);
			};
			handleSubmitBugReport();
		}
	}, [submitTrigger]);
	useEffect(() => {
		if (!session) {
			navigate(`/dGVzdGVy/project/${location.pathname.split("/")[3]}`);
		}
	}, [session]);

	useEffect(() => {
		const fetchDataDevice = async () => {
			const res = await get_user_device(getUserValue().id);
			if (res.status == "success") {
				setDevices(res.data);
				setCurrentDevice(res.data[0].id);
			} else {
				dispatch(
					addNotification({
						message: res.data | "Something went wrong",
						type: "error",
					}),
				);
			}
		};

		fetchDataDevice();
	}, []);

	//METHOD
	async function uploadToCloudinary() {
		const cloudName = CLOUD_NAME;
		const uploadPreset = UPLOAD_PRESET;

		const uploadPromises = Array.from(files).map(file => {
			const formData = new FormData();
			formData.append("file", file);
			formData.append("upload_preset", uploadPreset);

			return fetch(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, {
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
		});

		try {
			const results = await Promise.all(uploadPromises);
			return results;
		} catch (err) {
			console.error("Lỗi upload:", err);
		}
	}
	const handleAddStep = () => {
		setSteps(prev => [
			...prev,
			{
				id: `step-${prev.length + 1}`,
				text: "",
			},
		]);
	};
	const handleChangeFeature = e => {
		const getFeature = async () => {
			if (e.target.value >= 0) {
				const res = await get_feature_by_id(e.target.value);
				if (res.status == "success") {
					setSelectedFeature(res.data);
					setBugTypes(res.data.bugType);
					setSelectedBugType(res.data.bugType[0].id);
				} else {
					dispatch(addNotification({ message: res.data || "Some thing went wrong", type: res.status || "error" }));
				}
			} else {
				setBugTypes([]);
				setSelectedFeature(null);
			}
		};
		getFeature();
	};

	const handleDragEnd = event => {
		const { active, over } = event;
		if (active.id !== over?.id) {
			const oldIndex = steps.findIndex(step => step.id === active.id);
			const newIndex = steps.findIndex(step => step.id === over.id);
			setSteps(steps => arrayMove(steps, oldIndex, newIndex));
		}
	};

	const handleDelete = index => {
		const updated = [...steps];
		updated.splice(index, 1);
		setSteps(updated);
	};

	const handleInputChange = (index, value) => {
		const updated = [...steps];
		updated[index].text = value;
		setSteps(updated);
	};

	useEffect(() => {
		const fetchData = async () => {
			const res = await get_feature_by_project_id(location.pathname.split("/")[3]);
			if (res.status == "success") {
				setFeatures(res.data);
			} else {
				showToast({
					message: res.data || "Some thing went wrong",
					type: res.status || "error",
				});
			}
		};

		fetchData();
	}, []);
	const listBrowsers = useMemo(() => {
		if (currentDevice) {
			const de = devices.find(item => item.id == currentDevice);
			const listBr = de.browsers?.reduce((acc, item) => {
				for (let i = 0; i < de.browserIds.length; i++) {
					const element = de.browserIds[i];
					if (element == item.id) acc.push(item);
				}
				return acc;
			}, []);
			return listBr;
		}
	}, [currentDevice]);
	const handleChangeFile = e => {
		setFiles(prev => [...prev, e.target.files[0]]);
		e.target.files = null;
	};

	const handleDeleteFile = index => {
		setFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
	};
	return (
		<div className={cx("create-bug-ctn")}>
			{isSaving && (
				<ModalSaving>
					<div className={cx("saving")}>
						<img src="/icons/i-loading.svg"></img>
					</div>
				</ModalSaving>
			)}
			<div className={cx("container-left")}>
				<div className={cx("container-left-header")}>Submit a bug</div>
				<div className={cx("form-group")}>
					<label htmlFor="feature">Feature</label>
					<select id="feature" onChange={handleChangeFeature}>
						<option value="-1">Choose feature</option>
						{features?.map((item, index) => (
							<option key={item.id} value={item.id}>
								{item.name}
							</option>
						))}
					</select>
				</div>

				<div className={cx("form-group")}>
					<label htmlFor="bug-type">Bug type</label>
					<select
						onChange={e => {
							setSelectedBugType(e.target.value);
						}}
						id="bug-type"
					>
						{bugTypes.map((item, index) => (
							<option key={item.id} value={item.id}>
								{item.name}
							</option>
						))}
					</select>
				</div>

				<div className={cx("form-group")}>
					<label htmlFor="title">Title</label>
					<input
						onInput={e => {
							setTitle(e.target.value);
						}}
						type="text"
						id="title"
					/>
				</div>

				<div className={cx("form-group")}>
					<label htmlFor="url">Url</label>
					<input
						onInput={e => {
							setUrl(e.target.value);
						}}
						type="text"
						id="url"
					/>
				</div>

				<div className={cx("form-group-second")}>
					<label>Steps</label>
					<DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
						<SortableContext items={steps.map(s => s.id)} strategy={verticalListSortingStrategy}>
							{steps.map((step, index) => (
								<StepItem
									key={step.id}
									id={step.id}
									index={index}
									step={step}
									onDelete={handleDelete}
									onInputChange={handleInputChange}
								/>
							))}
						</SortableContext>
					</DndContext>

					<div className={cx("add-step")} onClick={handleAddStep}>
						+ Add a step
					</div>
				</div>

				<div className={cx("form-group-second")}>
					<label htmlFor="result">Result description</label>
					<textarea
						onInput={e => {
							setDescription(e.target.value);
						}}
						id="result"
						rows="4"
					></textarea>
					<a href="#" className={cx("preview")}>
						Preview
					</a>
				</div>

				<div className={cx("form-group-second")}>
					<label htmlFor="expected">Expected result</label>
					<textarea
						onInput={e => {
							setExpectedResult(e.target.value);
						}}
						id="expected"
						rows="4"
					></textarea>
					<a href="#" className={cx("preview")}>
						Preview
					</a>
				</div>

				<div className={cx("form-group")}>
					<label>Upload attachment(s)</label>
					<label for="source" className={cx("add-attachment")}>
						+ Add attachment
					</label>
					<input onChange={e => handleChangeFile(e)} type="file" hidden id="source"></input>
				</div>
				<div className={cx("files-ctn")}>
					{files.map((item, index) => (
						<div className={cx("file-item")}>
							<span>{item.name}</span>
							<img
								onClick={() => {
									handleDeleteFile(index);
								}}
								src="/icons/i-close.svg"
							></img>
						</div>
					))}
				</div>

				<div className={cx("form-group")}>
					<label>Browsers used</label>
					<div>
						<select
							onChange={e => {
								setCurrentDevice(e.target.value);
							}}
						>
							{devices.map(val => (
								<option key={val.id} value={val.id}>
									{val.devices.name}
								</option>
							))}
						</select>
					</div>
					{currentDevice && (
						<div className={cx("browser-ctn")}>
							<div className={cx("browsers")}>
								{listBrowsers.map(val => (
									<img
										key={val.id}
										onClick={() => setCurrentBrowser(val.id)}
										className={cx(currentBrowser == val.id ? "active" : "")}
										src={val.icon_link}
										title={val.name}
									/>
								))}
							</div>
						</div>
					)}
				</div>
			</div>
			<div className={cx("container-right", isCollapse ? "is-collapse" : "")}>
				<div class={cx("collapse-ctn")}>
					{!isCollapse && (
						<img
							onClick={() => {
								setIsCollapse(true);
							}}
							src="/icons/i-collapse-right.svg"
						></img>
					)}
					{isCollapse && (
						<img
							onClick={() => {
								setIsCollapse(false);
							}}
							src="/icons/i-collapse-left.svg"
						></img>
					)}
				</div>
				{!isCollapse && (
					<div class={cx("content-ctn")}>
						<label>This feature focuses on:</label>
						<span className={cx("feature-value")}>{selectedFeature?.input}</span>
					</div>
				)}
				{!isCollapse && (
					<div class={cx("content-ctn")}>
						<label>What should be right:</label>
						<span className={cx("feature-value")}>{selectedFeature?.output}</span>
					</div>
				)}
			</div>
		</div>
	);
}

export default CreateBugReport;
