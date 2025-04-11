//Modules
import { createBrowserRouter, Navigate } from "react-router-dom";

//Pages
import Login from "../Page/Login/Login";
import Home from "../Page/Home/Home";
import AuthMiddleware from "./AuthMiddleware/AuthMiddleware";
import ProjectDetail from "../Page/ProjectDetail/ProjectDetail";
import Academy from "../Page/Academy/Academy";
import Dashboard from "../Page/Dashboard/Dashboard";
import ProjectPage from "../Page/Project/ProjectPage";

const validRoutes = ["", "project/:id", "ranking"];
const router = createBrowserRouter([
	{
		path: "/login",
		name: "login",
		element: <Login></Login>,
	},
	{
		path: "/",
		element: <AuthMiddleware validRoutes={validRoutes} />,
		children: [
			{
				path: "/",
				element: <Home />,
			},
			{
				name: "project-detai;",
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
			{
				path: "dashboard",
				element: <Dashboard/>,
			},
			{
				path: "project",
				element: <ProjectPage/>,
			},
		],
	},
	{
		path: "*",
		element: <Navigate to="/not-found" />, // Xử lý route không hợp lệ
	},
]);

export default router;
