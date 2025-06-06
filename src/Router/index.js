//Modules
import { createBrowserRouter, Navigate } from "react-router-dom";

//Pages
import Login from "../Pages/Login/Login";
import Home from "../Tester/Page/Home/Home";
import Dashboard from "../Customer/Page/Dashboard/Dashboard";
import ProjectPage from "../Customer/Page/Project/ProjectPage";
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
import Notification from "../Tester/Page/Notification/Notification";
import Team from "../Tester/Page/ProjectDetail/Team/Team";
import Profile from "../Tester/Page/Profile/Profile";
import Activity from "../Tester/Page/Activity/Activity";
import Billing from "../Tester/Page/Billing/Billing";
import DashboardLayout from "../Customer/Layout/Dashboard/DashboardLayout";
import ProjectDetailPage from "../Customer/Page/ProjectDetail/ProjectDetailPage";
import ProjectModal from "../Customer/Component/ProjectModal/ProjectModal";
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
						element: <Team></Team>,
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
				element: <Profile />,
			},
			{
				path: "activities",
				element: <Activity />,
			},
			{
				path: "your-devices",
				element: <DeviceManager />,
			},
			{
				path: "billing",
				element: <Billing />,
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
				path: "notification",
				element: <Notification />,
			},
		],
	},
	{
		path: "/Q3VzdG9tZXI=",
		element: <AuthMiddleware validRoutes={validRoutes} />,
		children: [
			{
				path: "",
				element: <DashboardLayout />,
				children: [
					{
						path: "",
						element: <Dashboard />,
					},
					{
						path: "project",
						element: <ProjectPage />,
					},
					{
						path: "project/:id",
						element: <ProjectDetailPage />,
					},
					{
						path: "project/create",
						element: <ProjectModal />,
					},
				],
			},
		],
	},
	{
		path: "*",
		element: <Navigate to="/not-found" />, // Xử lý route không hợp lệ
	},
]);

export default router;
