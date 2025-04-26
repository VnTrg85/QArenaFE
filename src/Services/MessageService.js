import axios from "axios";
const base_url_api = process.env.REACT_APP_API_URL;

export const get_message_by_bug_report = async id => {
	try {
		const res = await axios.get(`${base_url_api}/message/get/bugReport/${id}`);
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

export const get_message_by_project = async id => {
	try {
		const res = await axios.get(`${base_url_api}/message/get/project/${id}`);
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
