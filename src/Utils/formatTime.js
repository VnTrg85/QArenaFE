export const formatDate = dateString => {
	const date = new Date(dateString);

	// Lấy ngày trong tháng và tháng
	const day = date.getDate();
	const month = date.toLocaleString("default", { month: "short" });

	return `${day}`;
};

export const formatMonth = dateString => {
	const date = new Date(dateString);
	const month = date.toLocaleString("default", { month: "short" });

	return `${month}`;
};
