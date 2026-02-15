/** biome-ignore-all lint/correctness/useUniqueElementIds: <explanation> */

import { useForm } from "@tanstack/react-form"; // ✅ Import directly from tanstack/react-form
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { CheckCircle2, Loader2, Mail, RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { InputPassword } from "@/components/ui/forms/input-password";
import AuthLayout from "@/domains/auth/auth-layout";
import { requestPasswordReset, resetPassword } from "@/lib/auth/auth-client";

const verifyResetSchema = z.object({
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

export const Route = createFileRoute("/(auth)/reset-password")({
    component: ResetPasswordVerifyPage,
    validateSearch: (search: Record<string, string>) => ({
        email: search.email,
        token: search.token,
    }),
});

function ResetPasswordVerifyPage() {
    const navigate = useNavigate();
    const { email, token } = Route.useSearch();
    const [isSuccess, setIsSuccess] = useState(false);
    const [resendTimer, setResendTimer] = useState(60);

    const form = useForm({
        defaultValues: {
            password: "",
            confirmPassword: "",
        },
        validators: {
            onChange: verifyResetSchema,
        },
        onSubmit: async ({ value }) => {
            const { error } = await resetPassword({
                newPassword: value.password,
                token: token || "",
            });

            if (error) {
                toast.error(error.message || "Invalid or expired code");
                return;
            }

            toast.success("Password reset successfully!");
            setIsSuccess(true);
            setTimeout(() => navigate({ to: "/login" }), 2000);
        },
    });

    // Resend reset link
    const handleResend = async () => {
        const { error } = await requestPasswordReset({
            email: email || "",
            redirectTo: "/reset-password",
        });
        if (error) {
            toast.error(error.message || "Failed to resend reset link");
            return;
        }
        toast.success("New reset link sent! Check your email.");
        setResendTimer(60);
    };

    // Timer
    useEffect(() => {
        if (resendTimer > 0) {
            const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [resendTimer]);

    if (isSuccess) {
        return (
            <AuthLayout title="Password Reset!" subtitle="Your password has been updated">
                <div className="text-center py-6">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-500/10 border border-green-500/20 mb-6"
                    >
                        <CheckCircle2 className="w-10 h-10 text-green-400" />
                    </motion.div>
                    <p className="text-gray-300 mb-8">You can now log in with your new password.</p>
                    <Button asChild>
                        <Link to="/login">Login Now</Link>
                    </Button>
                </div>
            </AuthLayout>
        );
    }

    return (
        <AuthLayout
            title="Reset your password"
            subtitle={token ? "Enter your new password below" : `We sent a reset link to ${email}`}
        >
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    form.handleSubmit();
                }}
                className="space-y-6"
            >
                {/* Email display - only show if we have email */}
                {email && (
                    <div className="flex items-center gap-3 p-4 rounded-xl bg-purple-500/10 border border-purple-500/20">
                        <Mail className="w-5 h-5 text-purple-400" />
                        <span className="text-sm text-white">{email}</span>
                    </div>
                )}

                <form.Field name="password">
                    {(field) => (
                        <InputPassword
                            id="password"
                            label="New Password"
                            placeholder="••••••••"
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                            errorMessage={field.state.meta.errors?.[0]?.message || ""}
                            isInvalid={!!field.state.meta.errors?.length && field.state.meta.isTouched}
                        />
                    )}
                </form.Field>

                <form.Field name="confirmPassword">
                    {(field) => (
                        <InputPassword
                            id="confirmPassword"
                            label="Confirm Password"
                            placeholder="••••••••"
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                            errorMessage={field.state.meta.errors?.[0]?.message || ""}
                            isInvalid={!!field.state.meta.errors?.length && field.state.meta.isTouched}
                        />
                    )}
                </form.Field>

                {/* Submit */}
                <form.Subscribe selector={(state) => [state.isSubmitting, state.isValid]}>
                    {([isSubmitting, isValid]) => (
                        <Button
                            type="submit"
                            disabled={isSubmitting || !isValid}
                            className="w-full h-12 bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                "Reset Password"
                            )}
                        </Button>
                    )}
                </form.Subscribe>

                {/* Show resend option only if we have email and no token */}
                {email && !token && (
                    <div className="text-center">
                        {resendTimer > 0 ? (
                            <p className="text-sm text-gray-500">
                                Resend link in <span className="text-purple-400 font-medium">{resendTimer}s</span>
                            </p>
                        ) : (
                            <button
                                type="button"
                                onClick={handleResend}
                                className="text-sm text-purple-400 hover:text-purple-300 font-medium transition-colors flex items-center gap-2 mx-auto"
                            >
                                <RefreshCw className="w-4 h-4" />
                                Resend reset link
                            </button>
                        )}
                    </div>
                )}

                {/* Back to forgot password */}
                <div className="text-center">
                    <Link
                        to="/forgot-password"
                        search={{ email }}
                        className="text-sm text-gray-400 hover:text-white transition-colors"
                    >
                        ← Use a different email
                    </Link>
                </div>
            </form>
        </AuthLayout>
    );
}