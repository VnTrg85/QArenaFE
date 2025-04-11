import axios from "axios";
const base_url_api = process.env.REACT_APP_API_URL;

export const get_feature_by_project_id = async id => {
	try {
		const res = await axios.get(`${base_url_api}/testFeature/get/project/${id}`);
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

export const get_feature_by_id = async id => {
	try {
		const res = await axios.get(`${base_url_api}/testFeature/get/${id}`);
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
