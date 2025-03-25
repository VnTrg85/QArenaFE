import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import DefaultLayout from "../../Layout/DefaultLayout";
import styles from "./AuthMiddleware.module.css";
import classname from "classnames/bind";

const cx = classname.bind(styles);
const validateTokenAPI = async token => {
	// try {
	// 	const response = await fetch("https://your-api.com/auth/validate-token", {
	// 		method: "POST",
	// 		headers: {
	// 			"Content-Type": "application/json",
	// 			Authorization: `Bearer ${token}`,
	// 		},
	// 	});

	// 	if (!response.ok) return false;

	// 	const data = await response.json();
	// 	return data.valid; // API trả về true nếu token hợp lệ
	// } catch (error) {
	// 	console.error("Token validation failed:", error);
	// 	return false;
	// }
	return false;
};

const isValidRoute = (path, validRoutes) => {
	return validRoutes.some(route => {
		if (route.includes(":")) {
			// Convert "project/:id" into a regex pattern
			const regex = new RegExp(`^${route.replace(":id", ".*")}$`);
			return regex.test(path);
		}
		return route === path || path.startsWith(route);
	});
};

const AuthMiddleware = ({ validRoutes }) => {
	const location = useLocation();
	const currentPath = location.pathname.replace("/", ""); // Lấy route hiện tại
	const [isAuth, setIsAuth] = useState(null);
	useEffect(() => {
		const checkAuth = async () => {
			const token = localStorage.getItem("access_token");
			if (!token) {
				setIsAuth(true);
				return;
			}

			const isValid = await validateTokenAPI(token);
			if (!isValid) {
				localStorage.removeItem("access_token");
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
		return (
			<DefaultLayout>
				<Outlet />
			</DefaultLayout>
		);
	}

	// 2. Nếu không có token hoặc token không hợp lệ -> chuyển về Login
	if (!isAuth) {
		return <Navigate to="/login" />;
	}
};

export default AuthMiddleware;
