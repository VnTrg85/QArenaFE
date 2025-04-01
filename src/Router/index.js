//Modules
import { createBrowserRouter, Navigate } from "react-router-dom";

//Pages
import Login from "../Pages/Login/Login";
import Home from "../Tester/Page/Home/Home";
import HomeCustomer from "../Customer/Pages/HomeCustomer/HomeCustomer";

import AuthMiddleware from "./AuthMiddleware/AuthMiddleware";
import ProjectDetail from "../Tester/Page/ProjectDetail/ProjectDetail";
import Academy from "../Tester/Page/Academy/Academy";

const validRoutes = ["", "dGVzdGVy/"];
const router = createBrowserRouter([
	{
		path: "/login",
		name: "login",
		element: <Login></Login>,
	},
	{
		path: "/dGVzdGVy",
		element: <AuthMiddleware validRoutes={validRoutes} />,
		children: [
			{
				path: "",
				element: <Home />,
			},
			{
				name: "project-detail",
				path: "project/:id",
				element: <ProjectDetail />,
			},
			{
				path: "ranking",
				element: <Home />,
			},
			{
				path: "profile",
				element: <Home />,
			},
			{
				path: "activities",
				element: <Home />,
			},
			{
				path: "your-devices",
				element: <Home />,
			},
			{
				path: "billing",
				element: <Home />,
			},
			{
				path: "learn",
				element: <Home />,
			},
			{
				path: "notices",
				element: <Home />,
			},
			{
				path: "academy",
				element: <Academy />,
			},
		],
	},
	{
		path: "/Q3VzdG9tZXI=",
		element: <AuthMiddleware validRoutes={validRoutes} />,
		children: [
			{
				path: "",
				element: <HomeCustomer />,
			},
		],
	},
	{
		path: "*",
		element: <Navigate to="/not-found" />, // Xử lý route không hợp lệ
	},
]);

export default router;
