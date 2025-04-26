import axios from "axios";
const base_url_api = process.env.REACT_APP_API_URL;

export const get_unread_noti = async id => {
	try {
		const res = await axios.get(`${base_url_api}/notification/get/unread/${id}`);
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

export const get_noti_by_user = async id => {
	try {
		const res = await axios.get(`${base_url_api}/notification/get/user/${id}`);
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

export const mark_read_noti_by_user = async id => {
	try {
		const res = await axios.post(`${base_url_api}/notification/mark/user/${id}`);
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
