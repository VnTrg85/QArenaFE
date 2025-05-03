import axios from "axios";

const base_url_api = process.env.REACT_APP_API_URL;

export const get_user_by_email = async email => {
	try {
		const res = await axios.get(`${base_url_api}/user/getByEmail?email=${email}`);
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

export const update_user = async data => {
	try {
		const res = await axios.put(`${base_url_api}/user/update`, data);
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

export const update_user_avatar = async data => {
	try {
		const res = await axios.put(`${base_url_api}/user/update/avatar`, data);
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

export const get_user_payout_infor = async id => {
	try {
		const res = await axios.get(`${base_url_api}/user/payoutinfo/${id}`);
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

export const update_user_payout_infor = async data => {
	try {
		const res = await axios.put(`${base_url_api}/user/payoutinfo/update`, data);
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
