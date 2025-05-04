import axiosClient from "../axiosClients";
import { getAccessToken, getUserEmail, clearStorage } from "../../../Utils/storageUtils";

const handleError = error => {
	if (error.response) {
		return error.response.data;
	} else {
		console.error("Unexpected error:", error);
		return {
			status: "error",
			data: "Something went wrong",
		};
	}
};

export const getBugReports = async projectId => {
	try {
		const response = await axiosClient.get(`/bugReport/get/project/${projectId}`);
		return response.data.data;
	} catch (error) {
		const errorResponse = handleError(error);
		throw errorResponse;
	}
};

export const getBugFixRate = async userId => {
	try {
		const response = await axiosClient.get(`/bugReport/getSumary/${userId}`);
		return response.data.data;
	} catch (error) {
		const errorResponse = handleError(error);
		throw errorResponse;
	}
};

export const getSeverityBugCounts = async userId => {
	try {
		const response = await axiosClient.get(`/bugReport/getSumary/${userId}`);
		return response.data.data;
	} catch (error) {
		const errorResponse = handleError(error);
		throw errorResponse;
	}
};

export const getBugReportSummary = async userId => {
	try {
		const response = await axiosClient.get(`/bugReport/getSumary/${userId}`);
		return response.data.data;
	} catch (error) {
		const errorResponse = handleError(error);
		throw errorResponse;
	}
};

export const getPayoutBugsByTestProject = async testProjectId => {
	try {
		const response = await axiosClient.get(`/get/${testProjectId}/testproject`);
		return response.data.data;
	} catch (error) {
		const errorResponse = handleError(error);
		throw errorResponse;
	}
};

export const getNotifications = async () => {
	try {
		const res = await axiosClient.get("/notifications");
		return res.data;
	} catch (err) {
		console.error(err);
		return [];
	}
};

export const getTestProjectsByUser = async userId => {
	try {
		const res = await axiosClient.get(`/testProject/user/${userId}`);
		console.log("API Response:", res);
		return res.data;
	} catch (error) {
		console.error("API Error:", error);
		return handleError(error);
	}
};

export const getTestProjectDetail = async testProjectId => {
	try {
		const res = await axiosClient.get(`/testProject/getDetail/${testProjectId}`);
		return res.data;
	} catch (error) {
		return handleError(error);
	}
};

export const createTestProject = async data => {
	try {
		const res = await axiosClient.post("/testProject/create", data);
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

export const deleteTestProject = async projectId => {
	try {
		const res = await axiosClient.delete(`/testProject/delete/${projectId}`);
		return res.data;
	} catch (error) {
		return handleError(error);
	}
};

export const createTestFeature = async featureData => {
	try {
		const res = await axiosClient.post("/testFeature/create", featureData);
		return res.data;
	} catch (error) {
		console.error("Error creating feature:", error);
		return handleError(error);
	}
};

export const getAllBugTypes = async () => {
	try {
		const res = await axiosClient.get(`/bugType/getAll`);
		return res.data;
	} catch (error) {
		return handleError(error);
	}
};

export const getPayoutBugByProjectId = async projectId => {
	try {
		const res = await axiosClient.get(`/payoutBug/get/${projectId}/testproject`);
		return res.data;
	} catch (error) {
		console.error("Lỗi khi lấy danh sách PayoutBug:", error);
		return handleError(error);
	}
};

export const createPayoutBug = async payload => {
	try {
		const res = await axiosClient.post(`/payoutBug/create`, payload);
		return res.data;
	} catch (error) {
		console.error("Lỗi khi tạo PayoutBug:", error);
		return handleError(error);
	}
};
export const getBugsByProject = async projectId => {
	try {
		const res = await axiosClient.get(`/bugReport/get/project/${projectId}`);
		return res.data;
	} catch (error) {
		return handleError(error);
	}
};

export const exportBugsToExcel = async projectId => {
	try {
		return await axiosClient.get(`/bugreport/export/${projectId}`, {
			responseType: "blob",
		});
	} catch (error) {
		return handleError(error);
	}
};

export const getTestFeatureByProjectId = projectId => {
	return axiosClient.get(`/test-feature/get/project/${projectId}`);
};
