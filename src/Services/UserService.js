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
