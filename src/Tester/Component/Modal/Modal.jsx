// Modal.js
import ReactDOM from "react-dom";
import styles from "./Modal.module.css";
import classname from "classnames/bind";
const cx = classname.bind(styles);
const Modal = ({ closeModal = () => {}, children }) => {
	return ReactDOM.createPortal(
		<div
			onClick={() => {
				closeModal();
			}}
			className={cx("modal-overlay")}
		>
			<div onClick={event => event.stopPropagation()} className={cx("modal-content")}>
				{children}
			</div>
		</div>,
		document.getElementById("root"), // bên ngoài root chính
	);
};

export default Modal;
