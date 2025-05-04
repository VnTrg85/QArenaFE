export const getAccessToken = () => localStorage.getItem("access_token");

export const getUserEmail = () => {
	const user = JSON.parse(localStorage.getItem("user"));
	return user?.email || "";
};

export const clearStorage = () => {
	localStorage.removeItem("access_token");
	localStorage.removeItem("user");
};
