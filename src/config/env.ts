export const API_BASE_URL =
	typeof import.meta !== "undefined" && import.meta.env
		? import.meta.env.VITE_API_BASE_URL
		: "http://localhost:4000";
