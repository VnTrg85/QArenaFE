import axiosClient from '../axiosClients';

export const getBugReportsByProject = async (projectId) => {
  try {
    const res = await axiosClient.get(`/bugReport/project/${projectId}`);
    return res.data;
  } catch (error) {
    return handleError(error);
  }
};

export const getBugReportDetail = async (bugId) => {
  try {
    const res = await axiosClient.get(`/bugReport/${bugId}`);
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