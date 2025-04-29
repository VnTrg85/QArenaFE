import axiosClient from '../axiosClients';

export const getTestProjectsByUser = async (userId) => {
  try {
    const res = await axiosClient.get(`/testProject/user/${userId}`);
    console.log("API Response:", res);
    return res.data;
  } catch (error) {
    console.error("API Error:", error);
    return handleError(error);
  }
};

export const getTestProjectDetail = async (testProjectId) => {
  try {
    const res = await axiosClient.get(`/testProject/getDetail/${testProjectId}`);
    return res.data;
  } catch (error) {
    return handleError(error);
  }
};

export const createTestProject = async (data) => {
  try {
    const res = await axiosClient.post('/testProject/create', data);
    return res.data;
  } catch (error) {
    return handleError(error);
  }
};

export const updateTestProject = async (projectId, data) => {
  try {
    const res = await axiosClient.put(`/testProject/update/${projectId}`, data);
    return res.data;
  } catch (error) {
    return handleError(error);
  }
};

export const deleteTestProject = async (projectId) => {
  try {
    const res = await axiosClient.delete(`/testProject/delete/${projectId}`);
    return res.data;
  } catch (error) {
    return handleError(error);
  }
};

const handleError = (error) => {
  if (error.response) {
    return error.response.data;
  } else {
    console.error('Unexpected error:', error);
    return {
      status: 'error',
      data: 'Something went wrong',
    };
  }
};
