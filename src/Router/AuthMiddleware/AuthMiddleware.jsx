import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import DefaultLayout from "../../Tester/Layout/DefaultLayout";
import styles from "./AuthMiddleware.module.css";
import classname from "classnames/bind";
import { verify_token } from "../../Services/AuthService";
import { useUser } from "../../Context/AuthContext";
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
	const location = useLocation();
	const currentPath = location.pathname.replace("/", ""); // Lấy route hiện tại
	const [isAuth, setIsAuth] = useState(null);

	const validateTokenAPI = async (token, email) => {
		try {
			const response = await verify_token(token, email);
			if (response.status == "success") return true;
			else return false;
		} catch (error) {
			console.error("Token validation failed:", error);
			return false;
		}
	};

	useEffect(() => {
		const checkAuth = async () => {
			const token = localStorage.getItem("access_token");
			const user = localStorage.getItem("user");
			if (!token) {
				setIsAuth(false);
				return;
			}

			const isValid = await validateTokenAPI(token, user);
			if (!isValid) {
				// localStorage.removeItem("access_token");
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
		console.log(currentPath);
		if (localStorage.getItem("role") == "tester" && currentPath.includes("dGVzdGVy")) {
			return (
				<DefaultLayout>
					<Outlet />
				</DefaultLayout>
			);
		} else if (localStorage.getItem("role") == "customer" && currentPath.includes("Q3VzdG9tZXI=")) {
			return <Outlet></Outlet>;
		}
	}

	// 2. Nếu không có token hoặc token không hợp lệ -> chuyển về Login
	if (!isAuth) {
		return <Navigate to="/login" />;
	}
};

export default AuthMiddleware;
