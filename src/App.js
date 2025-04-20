import { RouterProvider } from "react-router-dom";
import router from "./Router/index.js";
import useToast from "./CustomHook/useToast.js";
function App() {
	const { ToastComponent } = useToast();
	return (
		<div class="app">
			<ToastComponent></ToastComponent>
			<RouterProvider router={router}></RouterProvider>
		</div>
	);
}

export default App;
