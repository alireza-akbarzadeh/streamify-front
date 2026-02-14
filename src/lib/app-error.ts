/** biome-ignore-all lint/suspicious/noExplicitAny: <explanation> */

import { Http } from "@/orpc/helpers/http";
import { redirect } from "@tanstack/react-router";
import { toast } from "sonner";
export type ErrorCode =
	| "UNAUTHORIZED"
	| "FORBIDDEN"
	| "NOT_FOUND"
	| "VALIDATION_ERROR"
	| "INTERNAL_ERROR"
	| "CHECKOUT_FAILED"
	| "PAYMENT_FAILED"
	| "NETWORK_ERROR"
	| "RATE_LIMITED";

export interface AppErrorDetails {
	code: ErrorCode;
	message: string;
	status?: number;
	data?: any;
	originalError?: unknown;
}

export class AppError extends Error {
	public readonly code: ErrorCode;
	public readonly status: number;
	public readonly data?: any;
	public readonly originalError?: unknown;

	constructor(details: AppErrorDetails) {
		super(details.message);
		this.name = "AppError";
		this.code = details.code;
		this.status = details.status || 500;
		this.data = details.data;
		this.originalError = details.originalError;

		// Maintains proper stack trace for where error was thrown
		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, AppError);
		}
	}

	// Helper to check if error is unauthorized
	isUnauthorized(): boolean {
		return this.code === "UNAUTHORIZED";
	}

	// Helper to get user-friendly message
	getUserFriendlyMessage(): string {
		switch (this.code) {
			case "UNAUTHORIZED":
				return "You need an account to proceed. Please sign up or log in.";
			case "FORBIDDEN":
				return "You don't have permission to perform this action.";
			case "NOT_FOUND":
				return "The requested resource was not found.";
			case "VALIDATION_ERROR":
				return "Please check your input and try again.";
			case "CHECKOUT_FAILED":
				return "Checkout process failed. Please try again.";
			case "PAYMENT_FAILED":
				return "Payment processing failed. Please try another method.";
			case "NETWORK_ERROR":
				return "Network error. Please check your connection.";
			case "RATE_LIMITED":
				return "Too many requests. Please try again later.";
			default:
				return "Something went wrong. Please try again.";
		}
	}

	// Convert to JSON for API responses
	toJSON() {
		return {
			error: this.code,
			message: this.message,
			status: this.status,
			data: this.data,
		};
	}
}

export const Errors = {
	unauthorized: (message?: string, originalError?: unknown): AppError => {
		const msg =
			message || "You need an account to proceed. Please sign up or log in.";

		return new AppError({
			code: "UNAUTHORIZED",
			message: msg,
			status: Http.UNAUTHORIZED,
			originalError,
		});
	},

	forbidden: (message?: string, originalError?: unknown): AppError => {
		const msg = message || "Access denied.";
		return new AppError({
			code: "FORBIDDEN",
			message: message || "Access denied.",
			status: Http.FORBIDDEN,
			originalError,
		});
	},

	notFound: (resource?: string, originalError?: unknown): AppError => {
		const msg = resource ? `${resource} not found.` : "Resource not found.";

		return new AppError({
			code: "NOT_FOUND",
			message: msg,
			status: Http.NOT_FOUND,
			originalError,
		});
	},

	bad_Request: (
		message: string,
		data?: any,
		originalError?: unknown,
	): AppError => {
		return new AppError({
			code: "VALIDATION_ERROR",
			message,
			status: Http.BAD_REQUEST,
			data,
			originalError,
		});
	},

	checkoutFailed: (message?: string, originalError?: unknown): AppError => {
		const msg = message || "Checkout creation failed.";
		return new AppError({
			code: "CHECKOUT_FAILED",
			message: message || "Checkout creation failed.",
			status: Http.INTERNAL_SERVER_ERROR,
			originalError,
		});
	},

	paymentFailed: (message?: string, originalError?: unknown): AppError => {
		const msg = message || "Payment processing failed.";

		return new AppError({
			code: "PAYMENT_FAILED",
			message: msg,
			status: Http.PAYMENT_REQUIRED,
			originalError,
		});
	},
	networkError: (originalError?: unknown): AppError => {
		const msg = "Network connection error.";
		return new AppError({
			code: "NETWORK_ERROR",
			message: msg,
			status: Http.SERVICE_UNAVAILABLE,
			originalError,
		});
	},

	rateLimited: (message?: string, originalError?: unknown): AppError => {
		const msg = message || "Too many requests. Please try again later.";

		return new AppError({
			code: "RATE_LIMITED",
			message: msg,
			status: Http.TOO_MANY_REQUESTS,
			originalError,
		});
	},

	internal: (message?: string, originalError?: unknown): AppError => {
		const msg = message || "An internal error occurred.";

		return new AppError({
			code: "INTERNAL_ERROR",
			message: msg,
			status: Http.INTERNAL_SERVER_ERROR,
			originalError,
		});
	},
};

export function useErrorHandler() {
	const handleError = (
		error: unknown,
		options?: {
			showToast?: boolean;
			redirectOnUnauthorized?: boolean;
			callbackUrl?: string;
		},
	) => {
		const appError = parseError(error);

		console.error("[Error Handler]:", appError);

		// Handle unauthorized
		if (
			appError.isUnauthorized() &&
			options?.redirectOnUnauthorized !== false
		) {
			if (options?.showToast !== false) {
				toast.error("Authentication Required", {
					description: appError.getUserFriendlyMessage(),
				});
			}

			const callbackUrl = options?.callbackUrl || window.location.pathname;
			redirect({
				to: "/login",
				search: { redirectUrl: encodeURIComponent(callbackUrl) },
			});
			return;
		}

		// Show toast for other errors if enabled
		if (options?.showToast !== false) {
			toast.error(appError.code.replace("_", " "), {
				description: appError.getUserFriendlyMessage(),
			});
		}

		return appError;
	};

	return { handleError };
}

export function parseError(error: unknown): AppError {
	// If it's already our AppError, return it
	if (error instanceof AppError) {
		return error;
	}

	// Handle your specific error structure
	if (error && typeof error === "object" && "result" in error) {
		const err = error as any;
		if (err.result?.error === "UNAUTHORIZED") {
			return Errors.unauthorized(err.result?.message, error);
		}
		if (err.result?.error) {
			return new AppError({
				code: err.result.error,
				message: err.result.message || "An error occurred",
				status: err.status || 500,
				originalError: error,
			});
		}
	}

	// Handle HTTP errors
	if (error && typeof error === "object" && "status" in error) {
		const err = error as any;
		switch (err.status) {
			case Http.UNAUTHORIZED:
				return Errors.unauthorized(err.message, error);
			case Http.FORBIDDEN:
				return Errors.forbidden(err.message, error);
			case Http.NOT_FOUND:
				return Errors.notFound(undefined, error);
			case Http.TOO_MANY_REQUESTS:
				return Errors.rateLimited(err.message, error);
			default:
				if (err.status >= 500) {
					return Errors.internal(err.message, error);
				}
		}
	}

	if (error instanceof Error) {
		const message = error.message.toLowerCase();

		if (
			message.includes("unauthorized") ||
			message.includes("invalid_token") ||
			message.includes("401")
		) {
			return Errors.unauthorized(error.message, error);
		}
		if (message.includes("network") || message.includes("fetch")) {
			return Errors.networkError(error);
		}
		if (message.includes("timeout")) {
			return Errors.networkError(error);
		}
	}

	// Default to internal error
	return Errors.internal("An unexpected error occurred", error);
}
