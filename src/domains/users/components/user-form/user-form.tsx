/** biome-ignore-all lint/suspicious/noExplicitAny: <explanation> */

import { useNavigate } from "@tanstack/react-router";
import { motion } from 'framer-motion';
import {
	CheckCircle2,
	Mail,
	Phone,
	Shield,
	Sparkles,
	Tag,
	User
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useForm } from "@/components/ui/forms/form";
import { Textarea } from "@/components/ui/forms/textarea";
import { Input } from "@/components/ui/input";
import { InputPhone } from "@/components/ui/input-phone";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

import type { UserAccount } from "../../server/users.functions";
import { userAccountSchema } from "../../user.schema";
import UserFormHeader from "./user-form-header";

type AdvancedUserCRUDProps = {
	initialData?: Partial<UserAccount>;
	mode?: "create" | "edit";
};

export function UserForm({ initialData, mode = "create" }: AdvancedUserCRUDProps) {
	const navigate = useNavigate();
	const isEditMode = mode === "edit" || !!initialData?.id;

	const form = useForm(userAccountSchema, {
		defaultValues: initialData ?? {
			name: "",
			email: "",
			phone: "",
			role: "User",
			status: "active",
			plan: "Free",
			twoFactorEnabled: false,
			emailVerified: false,
			phoneVerified: false,
			country: "US",
			timezone: "UTC",
			locale: "en-US",
			billingStatus: "active",
			accountBalance: 0,
			credits: 0,
			profileComplete: 0,
			notes: "",
		},
		onSubmit: async ({ value }) => {
			await new Promise((resolve) => setTimeout(resolve, 1000));
			toast.success(isEditMode ? "Account Updated" : "User Created");
			navigate({ to: "/dashboard/users" });
		},
	});

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
			<div className="max-w-[1200px] mx-auto py-12 px-6">
				<motion.div
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
				>
					<UserFormHeader isEditMode={isEditMode} />
				</motion.div>

				<form.Root className="space-y-8 mt-12 pb-32">

					{/* SECTION 1: CORE IDENTITY */}
					<motion.section
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.1 }}
						className="relative group"
					>
						<div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-[2rem] blur-xl group-hover:blur-2xl transition-all duration-500" />
						<div className="relative p-8 rounded-[2rem] bg-slate-900/90 backdrop-blur-xl border border-white/10 shadow-2xl space-y-8">
							<div className="flex items-center gap-4 pb-6 border-b border-white/10">
								<div className="p-3.5 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 shadow-lg">
									<User className="h-6 w-6 text-white" />
								</div>
								<div>
									<h2 className="text-2xl font-bold text-white">Core Identity</h2>
									<p className="text-sm text-gray-400 mt-0.5">Essential user information</p>
								</div>
							</div>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<form.Field name="name" render={(field) => (
									<field.Container label="Full Name">
										<Input
											value={field.state.value}
											onChange={(e) => field.handleChange(e.target.value)}
											className="h-14 rounded-xl bg-slate-800/50 border border-white/10 px-6 text-white placeholder:text-gray-500 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all"
											placeholder="John Doe"
										/>
									</field.Container>
								)} />

								<form.Field name="email" render={(field) => (
									<field.Container label="Email Address">
										<div className="relative">
											<Mail className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
											<Input
												value={field.state.value}
												onChange={(e) => field.handleChange(e.target.value)}
												className="pl-14 h-14 rounded-xl bg-slate-800/50 border border-white/10 px-6 text-white placeholder:text-gray-500 focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all"
												placeholder="john@example.com"
											/>
										</div>
									</field.Container>
								)} />
							</div>
						</div>
					</motion.section>

					{/* SECTION 2: CONTACT */}
					<motion.section
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.2 }}
						className="relative group"
					>
						<div className="absolute inset-0 bg-gradient-to-r from-emerald-600/10 to-teal-600/10 rounded-[2rem] blur-xl group-hover:blur-2xl transition-all duration-500" />
						<div className="relative p-8 rounded-[2rem] bg-slate-900/90 backdrop-blur-xl border border-white/10 shadow-2xl space-y-8">
							<div className="flex items-center gap-4 pb-6 border-b border-white/10">
								<div className="p-3.5 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-600 shadow-lg">
									<Phone className="h-6 w-6 text-white" />
								</div>
								<div>
									<h2 className="text-2xl font-bold text-white">Contact Information</h2>
									<p className="text-sm text-gray-400 mt-0.5">Communication preferences</p>
								</div>
							</div>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<form.Field name="phone" render={(field) => (
									<field.Container label="Mobile Number" detail="Used for 2FA and notifications">
										<InputPhone
											value={field.state.value}
											onChange={(value) => field.handleChange(value)}
											onBlur={field.handleBlur}
											className={cn(
												"h-14 rounded-xl overflow-hidden bg-slate-800/50 border border-white/10 focus-within:border-emerald-500/50 focus-within:ring-2 focus-within:ring-emerald-500/20 transition-all",
												field.state.meta.errors.length > 0 && "ring-2 ring-red-500/50"
											)}
										/>
									</field.Container>
								)} />

								<div className="flex flex-col gap-4">
									<form.Field name="emailVerified" render={(field) => (
										<div className="flex items-center justify-between p-5 rounded-xl bg-slate-800/50 border border-white/10 hover:bg-slate-800/70 transition-colors">
											<div className="flex items-center gap-3">
												<div className={cn(
													"w-2 h-2 rounded-full",
													field.state.value ? "bg-green-500 shadow-lg shadow-green-500/50" : "bg-gray-600"
												)} />
												<field.Label className="text-sm font-medium text-white">Email Verified</field.Label>
											</div>
											<Switch checked={field.state.value} onCheckedChange={field.handleChange} />
										</div>
									)} />
									<form.Field name="phoneVerified" render={(field) => (
										<div className="flex items-center justify-between p-5 rounded-xl bg-slate-800/50 border border-white/10 hover:bg-slate-800/70 transition-colors">
											<div className="flex items-center gap-3">
												<div className={cn(
													"w-2 h-2 rounded-full",
													field.state.value ? "bg-green-500 shadow-lg shadow-green-500/50" : "bg-gray-600"
												)} />
												<field.Label className="text-sm font-medium text-white">Phone Verified</field.Label>
											</div>
											<Switch checked={field.state.value} onCheckedChange={field.handleChange} />
										</div>
									)} />
								</div>
							</div>
						</div>
					</motion.section>

					{/* SECTION 3: SECURITY */}
					<motion.section
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.3 }}
						className="relative group"
					>
						<div className="absolute inset-0 bg-gradient-to-r from-orange-600/10 to-red-600/10 rounded-[2rem] blur-xl group-hover:blur-2xl transition-all duration-500" />
						<div className="relative p-8 rounded-[2rem] bg-slate-900/90 backdrop-blur-xl border border-white/10 shadow-2xl space-y-6">
							<div className="flex items-center gap-4 pb-6 border-b border-white/10">
								<div className="p-3.5 rounded-2xl bg-gradient-to-br from-orange-600 to-red-600 shadow-lg">
									<Shield className="h-6 w-6 text-white" />
								</div>
								<div>
									<h2 className="text-2xl font-bold text-white">Security Protocol</h2>
									<p className="text-sm text-gray-400 mt-0.5">Account protection settings</p>
								</div>
							</div>

							<form.Field name="twoFactorEnabled" render={(field) => (
								<div className="flex items-center justify-between p-6 rounded-xl bg-slate-800/50 border border-white/10 hover:bg-slate-800/70 transition-colors">
									<div className="space-y-1">
										<field.Label className="text-base font-semibold text-white flex items-center gap-2">
											<Sparkles className="w-4 h-4 text-orange-400" />
											Two-Factor Authentication
										</field.Label>
										<field.Detail className="text-sm text-gray-400">Enhanced security with biometric verification</field.Detail>
									</div>
									<Switch checked={field.state.value} onCheckedChange={field.handleChange} />
								</div>
							)} />
						</div>
					</motion.section>

					{/* SECTION 4: METADATA */}
					<motion.section
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.4 }}
						className="relative group"
					>
						<div className="absolute inset-0 bg-gradient-to-r from-amber-600/10 to-yellow-600/10 rounded-[2rem] blur-xl group-hover:blur-2xl transition-all duration-500" />
						<div className="relative p-8 rounded-[2rem] bg-slate-900/90 backdrop-blur-xl border border-white/10 shadow-2xl space-y-6">
							<div className="flex items-center gap-4 pb-6 border-b border-white/10">
								<div className="p-3.5 rounded-2xl bg-gradient-to-br from-amber-600 to-yellow-600 shadow-lg">
									<Tag className="h-6 w-6 text-white" />
								</div>
								<div>
									<h2 className="text-2xl font-bold text-white">Metadata</h2>
									<p className="text-sm text-gray-400 mt-0.5">Additional information and notes</p>
								</div>
							</div>

							<form.Field name="notes" render={(field) => (
								<field.Container label="Internal Notes">
									<Textarea
										value={field.state.value || ""}
										onChange={(e) => field.handleChange(e.target.value)}
										className="min-h-[140px] rounded-xl bg-slate-800/50 border border-white/10 p-6 text-white placeholder:text-gray-500 focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/20 transition-all resize-none"
										placeholder="Add internal notes, tags, or special instructions..."
									/>
								</field.Container>
							)} />
						</div>
					</motion.section>

					{/* FLOATING ACTION BAR */}
					<motion.div
						initial={{ opacity: 0, y: 50 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.5 }}
						className="fixed bottom-8 left-1/2 -translate-x-1/2 w-full max-w-[600px] px-6 z-50"
					>
						<div className="relative group">
							<div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
							<div className="relative bg-slate-900/95 backdrop-blur-2xl border border-white/20 shadow-2xl rounded-3xl p-4 flex gap-4">
								<Button
									variant="ghost"
									type="button"
									onClick={() => navigate({ to: ".." })}
									className="flex-1 rounded-2xl h-14 font-semibold text-sm text-gray-400 hover:text-white hover:bg-white/10 transition-all"
								>
									Cancel
								</Button>
								<form.Submit className="flex-[2] h-14 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold text-sm shadow-xl shadow-blue-500/30 transition-all hover:scale-[1.02]">
									<div className="flex items-center justify-center gap-2">
										<CheckCircle2 className="h-5 w-5" />
										{isEditMode ? "Save Changes" : "Create User"}
									</div>
								</form.Submit>
							</div>
						</div>
					</motion.div>

				</form.Root>
			</div>
		</div>
	);
}