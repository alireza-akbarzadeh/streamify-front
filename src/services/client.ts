import type { AxiosError, AxiosRequestConfig } from "axios";
import Axios from "axios";

import { API_BASE_URL } from "@/config/env";
import { Http } from "@/constants/constants";

export const AXIOS_INSTANCE = Axios.create({
	baseURL: API_BASE_URL,
	headers: {
		"Content-Type": "application/json",
	},
});

// Request interceptor
AXIOS_INSTANCE.interceptors.request.use(
	(config) => {
		// Add an auth token if available
		const token = localStorage.getItem("auth_token");
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	},
);

// Response interceptor
AXIOS_INSTANCE.interceptors.response.use(
	(response) => response,
	(error: AxiosError) => {
		// Handle common errors
		if (error.response?.status === Http.UNAUTHORIZED) {
			// Unauthorized - clear token and redirect to log in
			localStorage.removeItem("auth_token");
			window.location.href = "/login";
		}

		if (error.response?.status === Http.FORBIDDEN) {
			// Forbidden
			console.error("Access forbidden");
		}

		if (Number(error?.response?.status) >= Http.SERVER_ERROR) {
			// Server error
			console.error("Server error:", error.message);
		}

		return Promise.reject(error);
	},
);

// Custom instance for Orval
export const customInstance = <T>(config: AxiosRequestConfig): Promise<T> => {
	const source = Axios.CancelToken.source();

	const promise = AXIOS_INSTANCE({
		...config,
		cancelToken: source.token,
	}).then(({ data }) => data);

	// @ts-expect-error we should add the cancel method to the promise
	promise.cancel = () => {
		source.cancel("Query was cancelled");
	};

	return promise;
};

export default customInstance;
