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

export const formatDateTimeFunc = time => {
	const date = new Date(time);

	const hours = String(date.getHours()).padStart(2, "0");
	const minutes = String(date.getMinutes()).padStart(2, "0");
	const day = String(date.getDate()).padStart(2, "0");
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const year = date.getFullYear();

	const formatted = `${hours}h-${minutes}m ${day}-${month}-${year}`;
	return formatted;
};

export const formatDateBirth = time => {
	const date = new Date(time);
	const options = { month: "short", day: "2-digit", year: "numeric" };
	const formattedDate = date.toLocaleDateString("en-US", options);

	return formattedDate;
};

export function formatDateToYMD(dateStr) {
	const date = new Date(dateStr);
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, "0"); // tháng bắt đầu từ 0
	const day = String(date.getDate()).padStart(2, "0");
	return `${year}-${month}-${day}`;
}
