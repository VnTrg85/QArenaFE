import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import DefaultLayout from "../../Tester/Layout/DefaultLayout";
import styles from "./AuthMiddleware.module.css";
import classname from "classnames/bind";
import { verify_token } from "../../Services/AuthService";
import { useUser } from "../../Context/AuthContext";
import { get_user_by_email } from "../../Services/UserService";
import useToast from "../../CustomHook/useToast";
const cx = classname.bind(styles);

const isValidRoute = (path, validRoutes) => {
	return validRoutes.some(route => {
		if (route.includes(":")) {
			const regex = new RegExp(`^${route.replace(":id", ".*")}$`);
			return regex.test(path);
		}
		return route === path || path.startsWith(route);
	});
};

const AuthMiddleware = ({ validRoutes }) => {
	const { showToast, ToastComponent } = useToast();
	const location = useLocation();
	const currentPath = location.pathname.replace("/", ""); // Lấy route hiện tại
	const [isAuth, setIsAuth] = useState(null);
	const { getUserValue, setUserValue } = useUser();

	const validateTokenAPI = async (token, email) => {
		try {
			const response = await verify_token(token, email);
			if (response.status == "success") {
				return true;
			} else return false;
		} catch (error) {
			console.error("Token validation failed:", error);
			return false;
		}
	};
	const callApiGetUser = async () => {
		const res = await get_user_by_email(getUserValue().email);
		if (res.status == "success") {
			setUserValue(res.data);
		} else {
			showToast({
				message: "Error happen when get user information",
				type: "error",
			});
		}
	};

	useEffect(() => {
		const checkAuth = async () => {
			const token = localStorage.getItem("access_token");
			const user = getUserValue().email;
			if (!token) {
				setIsAuth(false);
				return;
			}

			const isValid = await validateTokenAPI(token, user);
			if (!isValid) {
				// localStorage.removeItem("access_token");
			} else {
				await callApiGetUser(user);
			}
			setIsAuth(isValid);
		};

		checkAuth();
	}, []);
	if (isAuth === null) {
		return <div>Loading...</div>;
	}

	// 1. Nếu có token và route hợp lệ -> render nội dung
	if (isAuth && isValidRoute(currentPath, validRoutes)) {
		if (getUserValue().role == "3" && currentPath.includes("dGVzdGVy")) {
			return (
				<DefaultLayout>
					<Outlet />
					<ToastComponent></ToastComponent>
				</DefaultLayout>
			);
		} else if (getUserValue().role == "2" && currentPath.includes("Q3VzdG9tZXI=")) {
			return <Outlet></Outlet>;
		}
	}

	// 2. Nếu không có token hoặc token không hợp lệ -> chuyển về Login
	if (!isAuth) {
		return <Navigate to="/login" />;
	}
};

export default AuthMiddleware;
