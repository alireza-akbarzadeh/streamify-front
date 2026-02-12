/**
 * Production-Ready Input Sanitization
 * - XSS prevention
 * - SQL injection prevention (already handled by Prisma)
 * - Input validation and sanitization
 */

import { z } from "zod";

/**
 * Sanitize HTML to prevent XSS
 */
export function sanitizeHtml(input: string): string {
	return input
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&#x27;")
		.replace(/\//g, "&#x2F;");
}

/**
 * Sanitize user input strings
 */
export function sanitizeString(input: string): string {
	return input
		.trim()
		.replace(/[\r\n\t]/g, " ") // Remove control characters
		.replace(/\s+/g, " ") // Normalize whitespace
		.substring(0, 10000); // Prevent huge strings
}

/**
 * Email schema with validation
 */
export const emailSchema = z
	.string()
	.email()
	.toLowerCase()
	.transform((val) => val.trim());

/**
 * URL schema with validation
 */
export const urlSchema = z
	.string()
	.url()
	.refine((url) => {
		const parsed = new URL(url);
		return ["http:", "https:"].includes(parsed.protocol);
	}, "Only HTTP/HTTPS URLs are allowed");

/**
 * Search query schema with sanitization
 */
export const searchQuerySchema = z
	.string()
	.min(1)
	.max(200)
	.transform(sanitizeString);

/**
 * ID schema (CUID validation)
 */
export const cuidSchema = z.string().cuid();

/**
 * Pagination schema with limits
 */
export const paginationSchema = z.object({
	page: z.number().int().min(1).max(1000).default(1),
	limit: z.number().int().min(1).max(100).default(20),
});

/**
 * File upload schema
 */
export const fileUploadSchema = z.object({
	filename: z
		.string()
		.min(1)
		.max(255)
		.regex(/^[a-zA-Z0-9._-]+$/),
	mimetype: z.enum([
		"image/jpeg",
		"image/png",
		"image/webp",
		"video/mp4",
		"audio/mpeg",
	]),
	size: z
		.number()
		.int()
		.min(1)
		.max(100 * 1024 * 1024), // Max 100MB
});
