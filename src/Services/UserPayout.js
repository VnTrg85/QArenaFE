import axios from "axios";

const base_url_api = process.env.REACT_APP_API_URL;
export const get_all_user_payout_bug = async userId => {
	try {
		const res = await axios.get(`${base_url_api}/userPayoutBug/user/${userId}`, {
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

export const get_all_payout_by_project = async id => {
	try {
		const res = await axios.get(`${base_url_api}/userPayoutBug/project/${id}`, {
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
