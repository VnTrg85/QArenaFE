//Modules
import { createBrowserRouter, Navigate } from "react-router-dom";

//Pages
import Login from "../Pages/Login/Login";
import Home from "../Tester/Page/Home/Home";
import HomeCustomer from "../Customer/Pages/HomeCustomer/HomeCustomer";

import AuthMiddleware from "./AuthMiddleware/AuthMiddleware";
import ProjectDetail from "../Tester/Page/ProjectDetail/ProjectDetail";
import Academy from "../Tester/Page/Academy/Academy";
import ArticleDetail from "../Tester/Component/ArticleDetail/ArticleDetail";
import ListBug from "../Tester/Page/ProjectDetail/ListBug/ListBug";
import Chat from "../Tester/Page/ProjectDetail/Chat/Chat";
import CreateBugReport from "../Tester/Page/CreateBugReport/CreateBugReport";
import DeviceManager from "../Tester/Page/DeviceManager/DeviceManager";
import SessionManager from "../Tester/Page/ProjectDetail/Session/SessionManager";
import BugDetail from "../Tester/Page/ProjectDetail/BugDetail/BugDetail";
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
				children: [
					{
						name: "overview",
						path: "",
						element: <ArticleDetail></ArticleDetail>,
					},
					{
						name: "session",
						path: "session",
						element: <SessionManager></SessionManager>,
					},
					{
						name: "bugs",
						path: "bugs",
						element: <ListBug></ListBug>,
					},
					{
						name: "known-bug",
						path: "known-bug",
						element: <ListBug></ListBug>,
					},
					{
						name: "chat",
						path: "chat",
						element: <Chat></Chat>,
					},
					{
						name: "teams",
						path: "teams",
						element: <ListBug></ListBug>,
					},
					{
						name: "bug-create",
						path: "bug/create",
						element: <CreateBugReport></CreateBugReport>,
					},
					{
						name: "bug-detail",
						path: "bugs/:id",
						element: <BugDetail></BugDetail>,
					},
				],
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
				element: <DeviceManager />,
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
