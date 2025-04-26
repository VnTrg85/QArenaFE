import axios from "axios";
const base_url_api = process.env.REACT_APP_API_URL;

export const create_bug_report = async data => {
	try {
		const res = await axios.post(`${base_url_api}/bugReport/create`, data);
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

export const get_bug_reports = async id => {
	try {
		const res = await axios.get(`${base_url_api}/bugReport/get/project/${id}`);
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

export const get_bug_report_detail = async id => {
	try {
		const res = await axios.get(`${base_url_api}/bugReport/getDetail/${id}`);
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

export const get_report_sumary = async id => {
	try {
		const res = await axios.get(`${base_url_api}/bugReport/getSumary/${id}`);
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
