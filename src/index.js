import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./main.css";
import { UserProvider } from "./Context/AuthContext";
import { Provider } from "react-redux";
import store from "./Store";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<Provider store={store}>
		<UserProvider>
			<App />
		</UserProvider>
	</Provider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
