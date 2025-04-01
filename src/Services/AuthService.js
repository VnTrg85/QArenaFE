import axios from "axios";

const base_url_api = process.env.REACT_APP_API_URL;
export const verify_token = async (token, email) => {
	const res = await axios.post(`${base_url_api}/auth/verify-token`, {
		token: token,
		email: email,
	});
	return res.data;
};

export const login = async data => {
	const res = await axios.post(`${base_url_api}/auth/login`, {
		email: data.email,
		password: data.password,
	});
	return res.data;
};

export const signup = async data => {
	const res = await axios.post(`${base_url_api}/auth/register`, {
		name: data.name,
		email: data.email,
		password: data.password,
		roleId: data.role,
	});
	return res.data;
};
