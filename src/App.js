import { RouterProvider } from "react-router-dom";
import router from "./Router/index.js";
function App() {
	return (
		<div class="app">
			<RouterProvider router={router}></RouterProvider>
		</div>
	);
}

export default App;
