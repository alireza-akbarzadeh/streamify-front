// routes/(auth)/reset-password/verify.tsx
/** biome-ignore-all lint/correctness/useUniqueElementIds: <explanation> */
import { createFileRoute, Link, Navigate, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { CheckCircle2, Loader2, Lock, Mail, RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { useForm } from "@/components/ui/forms/form";
import { Input } from "@/components/ui/input";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import AuthLayout from "@/domains/auth/auth-layout";
import { forgetPassword, resetPassword } from "@/lib/auth-client";

const verifyResetSchema = z.object({
    otp: z.string().length(6, "Enter the full 6-digit code"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

export const Route = createFileRoute("/(auth)/reset-password")({
    component: ResetPasswordVerifyPage,
    validateSearch: (search: Record<string, unknown>) => ({
        email: search.email as string,
    }),
});

function ResetPasswordVerifyPage() {
    const navigate = useNavigate();
    const { email } = Route.useSearch();
    const [isSuccess, setIsSuccess] = useState(false);
    const [resendTimer, setResendTimer] = useState(60);

    const form = useForm(verifyResetSchema, {
        defaultValues: {
            otp: "",
            password: "",
            confirmPassword: "",
        },
        validators: {
            onChange: verifyResetSchema,
        },
        onSubmit: async ({ value }) => {
            const { error } = await resetPassword({
                newPassword: value.password,
            });

            if (error) {
                toast.error(error.message || "Invalid or expired code");
                return;
            }

            toast.success("Password reset successfully!");
            setIsSuccess(true);
            navigate({ to: "/login" })
        },
    });

    // Resend OTP
    const handleResend = async () => {
        const { error } = await forgetPassword.emailOtp({ email });
        if (error) {
            toast.error(error.message || "Failed to resend code");
            return;
        }
        toast.success("New code sent!");
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

    if (!email) {
        return <Navigate to="/forgot-password" />;
    }

    return (
        <AuthLayout
            title="Reset your password"
            subtitle={`We sent a 6-digit code to ${email}`}
        >
            <form.Root
                className="space-y-6"
            >
                {/* Email display */}
                <div className="flex items-center gap-3 p-4 rounded-xl bg-purple-500/10 border border-purple-500/20">
                    <Mail className="w-5 h-5 text-purple-400" />
                    <span className="text-sm text-white">{email}</span>
                </div>

                {/* OTP Input - Using InputOTP component */}
                <form.Field name="otp">
                    {(field) => (
                        <div className="space-y-2">
                            <Label className="text-gray-300 text-sm">Verification code</Label>
                            <div className="flex justify-center">
                                <InputOTP
                                    maxLength={6}
                                    value={field.state.value}
                                    onChange={field.handleChange}
                                    onBlur={field.handleBlur}
                                    containerClassName="justify-center"
                                >
                                    <InputOTPGroup>
                                        <InputOTPSlot index={0} className="bg-white/5 border-white/10 text-white" />
                                        <InputOTPSlot index={1} className="bg-white/5 border-white/10 text-white" />
                                        <InputOTPSlot index={2} className="bg-white/5 border-white/10 text-white" />
                                        <InputOTPSlot index={3} className="bg-white/5 border-white/10 text-white" />
                                        <InputOTPSlot index={4} className="bg-white/5 border-white/10 text-white" />
                                        <InputOTPSlot index={5} className="bg-white/5 border-white/10 text-white" />
                                    </InputOTPGroup>
                                </InputOTP>
                            </div>
                            {field.state.meta.errors && field.state.meta.isTouched && (
                                <p className="text-xs text-red-400 text-center">
                                    {field.state.meta.errors[0]?.message}
                                </p>
                            )}
                        </div>
                    )}
                </form.Field>

                {/* New Password */}
                <form.Field name="password">
                    {(field) => (
                        <div className="space-y-2">
                            <Label htmlFor="password">New Password</Label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="••••••••"
                                    value={field.state.value}
                                    onBlur={field.handleBlur}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    className="pl-12 h-12 bg-white/5 border-white/10 text-white"
                                />
                            </div>
                            {field.state.meta.errors && field.state.meta.isTouched && (
                                <p className="text-xs text-red-400">{field.state.meta.errors[0]?.message}</p>
                            )}
                        </div>
                    )}
                </form.Field>

                {/* Confirm Password */}
                <form.Field name="confirmPassword">
                    {(field) => (
                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword">Confirm Password</Label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                <Input
                                    id="confirmPassword"
                                    type="password"
                                    placeholder="••••••••"
                                    value={field.state.value}
                                    onBlur={field.handleBlur}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    className="pl-12 h-12 bg-white/5 border-white/10 text-white"
                                />
                            </div>
                            {field.state.meta.errors && field.state.meta.isTouched && (
                                <p className="text-xs text-red-400">{field.state.meta.errors[0]?.message}</p>
                            )}
                        </div>
                    )}
                </form.Field>

                {/* Submit */}
                <form.Subscribe selector={(s) => s.isSubmitting}>
                    {(isSubmitting) => (
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full h-12 bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500"
                        >
                            {isSubmitting ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                "Reset Password"
                            )}
                        </Button>
                    )}
                </form.Subscribe>

                {/* Resend */}
                <div className="text-center">
                    {resendTimer > 0 ? (
                        <p className="text-sm text-gray-500">
                            Resend code in <span className="text-purple-400 font-medium">{resendTimer}s</span>
                        </p>
                    ) : (
                        <button
                            type="button"
                            onClick={handleResend}
                            className="text-sm text-purple-400 hover:text-purple-300 font-medium transition-colors flex items-center gap-2 mx-auto"
                        >
                            <RefreshCw className="w-4 h-4" />
                            Resend code
                        </button>
                    )}
                </div>

                {/* Back to forgot password */}
                <div className="text-center">
                    <Link
                        to="/forgot-password"
                        className="text-sm text-gray-400 hover:text-white transition-colors"
                    >
                        ← Use a different email
                    </Link>
                </div>
            </form.Root>
        </AuthLayout>
    );
}