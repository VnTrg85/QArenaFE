import axios from "axios";
const base_url_api = process.env.REACT_APP_API_URL;

export const create_reproduction = async data => {
	try {
		const res = await axios.post(`${base_url_api}/reproduction/create`, data);
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

export const get_all_reproduction_by_bugreport = async id => {
	try {
		const res = await axios.get(`${base_url_api}/reproduction/bugreport/${id}`);
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

export const get_all_reproduction_by_user = async id => {
	try {
		const res = await axios.get(`${base_url_api}/reproduction/user/${id}`);
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

export const accept_repr = async id => {
	try {
		const res = await axios.post(`${base_url_api}/reproduction/accept/${id}`);
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

export const reject_repr = async id => {
	try {
		const res = await axios.post(`${base_url_api}/reproduction/reject/${id}`);
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
