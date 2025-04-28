import { useState, useCallback } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const toastStyles = {
	success: {
		background: "linear-gradient(135deg, #1e8057, #42b685)",
		color: "#fff",
		borderRadius: "15px",
		fontFamily: '"DM Sans", sans-serif',
		fontSize: "15px",
		fontWeight: "500",
		boxShadow: "0 8px 30px rgba(0, 0, 0, 0.15)",
		textAlign: "center",
		letterSpacing: "0.5px",
	},
	error: {
		background: "linear-gradient(135deg, #d32f2f, #f44336)",
		color: "#fff",
		borderRadius: "15px",
		fontFamily: '"DM Sans", sans-serif',
		fontSize: "15px",
		fontWeight: "500",
		boxShadow: "0 8px 30px rgba(0, 0, 0, 0.15)",
		textAlign: "center",
		letterSpacing: "0.5px",
	},
	info: {
		background: "linear-gradient(135deg, #0288d8, #09a9f4)",
		color: "#fff",
		borderRadius: "15px",
		fontFamily: '"DM Sans", sans-serif',
		fontSize: "15px",
		fontWeight: "500",
		boxShadow: "0 8px 30px rgba(0, 0, 0, 0.15)",
		textAlign: "center",
		letterSpacing: "0.5px",
	},
	warning: {
		background: "linear-gradient(135deg, #ffb300, #ffc107)",
		color: "#fff",
		borderRadius: "15px",
		fontFamily: '"DM Sans", sans-serif',
		fontSize: "15px",
		fontWeight: "500",
		boxShadow: "0 8px 30px rgba(0, 0, 0, 0.15)",
		textAlign: "center",
		letterSpacing: "0.5px",
	},
};

const useToast = () => {
	const showToast = useCallback(({ message, type = "info" }) => {
		toast[type](message, {
			position: "top-right",
			autoClose: 4000,
			hideProgressBar: true,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: false,
			style: toastStyles[type] || {},
		});
	}, []);

	const ToastComponent = () => <ToastContainer />;

	return { showToast, ToastComponent };
};

export default useToast;
