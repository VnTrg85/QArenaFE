import axios from "axios";

const base_url_api = process.env.REACT_APP_API_URL;
export const get_test_projects = async userId => {
	try {
		const res = await axios.get(`${base_url_api}/testProjectUser/get/user/${userId}`, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem("access_token")}`, // gửi token
				Email: JSON.parse(localStorage.getItem("user")).email,
			},
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

export const get_test_project_detail = async testProjectId => {
	try {
		const res = await axios.get(`${base_url_api}/testProject/getDetail/${testProjectId}`, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem("access_token")}`, // gửi token
				Email: JSON.parse(localStorage.getItem("user")).email,
			},
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

export const update_testproject_user_status = async data => {
	try {
		const res = await axios.post(`${base_url_api}/testProjectUser/update`, data, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem("access_token")}`, // gửi token
				Email: JSON.parse(localStorage.getItem("user")).email,
			},
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

export const get_member_in_project = async id => {
	try {
		const res = await axios.get(`${base_url_api}/testProjectUser/getUser/project/${id}`, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem("access_token")}`, // gửi token
				Email: JSON.parse(localStorage.getItem("user")).email,
			},
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
