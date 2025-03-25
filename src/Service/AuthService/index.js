const login_api = async () => {
	try {
		// const data = await axios.get("https://localhost:808/api/login");
		// if (data) {
		// 	return data;
		// }
		return { username: "heelo" };
	} catch (error) {}
};

const signup_api = async () => {
	// try {
	// 	const data = await axios.post("https://localhost:808/api/login");
	// 	if (data) {
	// 		return data;
	// 	}
	// } catch (error) {}
};

export { login_api, signup_api };
