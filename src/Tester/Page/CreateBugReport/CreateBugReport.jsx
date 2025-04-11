import styles from "./CreateBugReport.module.css";
import classname from "classnames/bind";
import { DndContext, useSensor, useSensors, PointerSensor, closestCenter } from "@dnd-kit/core";
import { SortableContext, useSortable, arrayMove, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useEffect, useState } from "react";
import { get_feature_by_id, get_feature_by_project_id } from "../../../Services/FeatureService";
import { useLocation } from "react-router-dom";
import useToast from "../../../CustomHook/useToast";

const cx = classname.bind(styles);

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
	const { showToast, ToastComponent } = useToast();
	//State
	const [isCollapse, setIsCollapse] = useState(false);
	const [features, setFeatures] = useState([]);
	const [bugTypes, setBugTypes] = useState([]);
	const [selectedFeature, setSelectedFeature] = useState("");
	const location = useLocation();
	const [steps, setSteps] = useState([
		{ id: "step-1", text: "" },
		{ id: "step-2", text: "" },
	]);
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
				} else {
					showToast({
						message: res.data || "Some thing went wrong",
						type: res.status || "error",
					});
				}
			} else {
				setBugTypes([]);
				setSelectedFeature(null);
			}
		};
		getFeature();
	};
	const sensors = useSensors(useSensor(PointerSensor));

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
	return (
		<div className={cx("create-bug-ctn")}>
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
					<select id="bug-type">
						{bugTypes.map((item, index) => (
							<option key={item.id}>{item.name}</option>
						))}
					</select>
				</div>

				<div className={cx("form-group")}>
					<label htmlFor="title">Title</label>
					<input type="text" id="title" />
				</div>

				<div className={cx("form-group")}>
					<label htmlFor="url">Url</label>
					<input type="text" id="url" />
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
					<textarea id="result" rows="4"></textarea>
					<a href="#" className={cx("preview")}>
						Preview
					</a>
				</div>

				<div className={cx("form-group-second")}>
					<label htmlFor="expected">Expected result</label>
					<textarea id="expected" rows="4"></textarea>
					<a href="#" className={cx("preview")}>
						Preview
					</a>
				</div>

				<div className={cx("form-group")}>
					<label>Upload attachment(s)</label>
					<a href="#" className={cx("add-attachment")}>
						+ Add attachment
					</a>
				</div>

				<div className={cx("form-group")}>
					<label>Browsers used</label>
					<div className={cx("browser-ctn")}>
						<p>Apple iPhone 12 | iOS 17.0.1</p>

						<div className={cx("browsers")}>
							<img src="/icons/i-safari.svg" alt="Safari" />
							<img src="/icons/i-google.svg" alt="Chrome" />
							<img src="/icons/i-fire-fox.svg" alt="Firefox" />
						</div>
					</div>
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
