import axios from "axios";
const base_url_api = process.env.REACT_APP_API_URL;
export const get_category = async () => {
	try {
		const res = await axios.get(`${base_url_api}/categoryDevice/getAll`);
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

export const get_devices_by_cate = async id => {
	try {
		const res = await axios.get(`${base_url_api}/device/get/category/${id}`);
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

export const get_browsers = async () => {
	try {
		const res = await axios.get(`${base_url_api}/browser/getAll`);
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

//////////////////////////// --- USER DEVICE ---/////////////////////////////////
export const create_user_device = async data => {
	try {
		const res = await axios.post(`${base_url_api}/userDevice/create`, data);
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

export const get_user_device = async id => {
	try {
		const res = await axios.get(`${base_url_api}/userDevice/get/user/${id}`);
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

export const update_user_device = async data => {
	try {
		const res = await axios.put(`${base_url_api}/userDevice/update`, data);
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

export const delete_user_device = async id => {
	try {
		const res = await axios.delete(`${base_url_api}/userDevice/delete/${id}`);
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

///////////////////////////////////////////////////////V
