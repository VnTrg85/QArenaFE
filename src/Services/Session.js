import axios from "axios";
const base_url_api = process.env.REACT_APP_API_URL;
export const get_session_doing = async (userId, testProjectId) => {
	try {
		const res = await axios.get(`${base_url_api}/session/get/userId/${userId}/project/${testProjectId}/doing`);
		return res.data;
	} catch (error) {
		if (error.response) {
			return error.response.data;
		} else {
			return {
				status: "error",
				data: "Something went wrong",
			};
		}
	}
};

export const create_session = async data => {
	try {
		const res = await axios.post(`${base_url_api}/session/create`, data);
		return res.data;
	} catch (error) {
		if (error.response) {
			return error.response.data;
		} else {
			return {
				status: "error",
				data: "Something went wrong",
			};
		}
	}
};

export const end_session = async id => {
	try {
		const res = await axios.post(`${base_url_api}/session/end/${id}`);
		return res.data;
	} catch (error) {
		if (error.response) {
			return error.response.data;
		} else {
			return {
				status: "error",
				data: "Something went wrong",
			};
		}
	}
};

export const get_sessions = async (userId, testProjectId) => {
	try {
		const res = await axios.get(`${base_url_api}/session/get/userId/${userId}/project/${testProjectId}`);
		return res.data;
	} catch (error) {
		if (error.response) {
			return error.response.data;
		} else {
			return {
				status: "error",
				data: "Something went wrong",
			};
		}
	}
};
