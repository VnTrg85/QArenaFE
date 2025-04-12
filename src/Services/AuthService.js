import axios from "axios";

const base_url_api = process.env.REACT_APP_API_URL;
export const verify_token = async (token, email) => {
	try {
		const res = await axios.post(`${base_url_api}/auth/verify-token`, {
			token: token,
			email: email,
		});
		return res.data;
	} catch (error) {
		if (error.response) {
			return error.response.data;
		} else {
			console.error("Unexpected error:", error);
			return {
				status: "error",
				data: "Something went wrong",
			};
		}
	}
};

export const login = async data => {
	try {
		const res = await axios.post(`${base_url_api}/auth/login`, {
			email: data.email,
			password: data.password,
		});
		return res.data;
	} catch (error) {
		if (error.response) {
			return error.response.data;
		} else {
			console.error("Unexpected error:", error);
			return {
				status: "error",
				data: "Something went wrong",
			};
		}
	}
};

export const signup = async data => {
	try {
		const res = await axios.post(`${base_url_api}/auth/register`, {
			name: data.name,
			email: data.email,
			password: data.password,
			create_at: new Date(),
			roleId: data.role,
		});
		return res.data;
	} catch (error) {
		if (error.response) {
			return error.response.data;
		} else {
			console.error("Unexpected error:", error);
			return {
				status: "error",
				data: "Something went wrong",
			};
		}
	}
};
