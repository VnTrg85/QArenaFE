import axios from "axios";

const base_url_api = process.env.REACT_APP_API_URL;

export const get_userCourse = async () => {
  try {
    const res = await axios.get(`${base_url_api}/userCourse/getAll`);
    if (res.data && res.data.code === 1000) {
      return res.data.data;
    } else {
      throw new Error(res.data.message);
    }
  } catch (error) {
    throw error;
  }
};
