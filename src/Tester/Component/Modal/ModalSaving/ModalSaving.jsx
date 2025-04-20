// Modal.js
import ReactDOM from "react-dom";
import styles from "./ModalSaving.module.css";
import classname from "classnames/bind";
const cx = classname.bind(styles);
const ModalSaving = ({ closeModal = () => {}, children }) => {
	return ReactDOM.createPortal(
		<div
			onClick={() => {
				closeModal();
			}}
			className={cx("modal-overlay")}
		>
			{children}
		</div>,
		document.getElementById("root"), // bên ngoài root chính
	);
};

export default ModalSaving;
