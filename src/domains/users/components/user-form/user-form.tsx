/** biome-ignore-all lint/suspicious/noExplicitAny: <explanation> */

import type { DeepKeys } from "@tanstack/react-form";
import { useNavigate } from "@tanstack/react-router";
import { Mail, MapPin, Shield, User, Users, Zap } from "lucide-react";
import React from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useForm } from "@/components/ui/forms/form";
import { Input } from "@/components/ui/input";
import { InputPhone } from "@/components/ui/input-phone";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import type { UserAccount } from "../../server/users.functions";
import { userAccountSchema } from "../../user.schema";
import UserFormHeader from "./user-form-header";

export function UserForm({ initialData, mode = "create" }: { initialData?: Partial<UserAccount>; mode?: "create" | "edit" }) {
	const navigate = useNavigate();
	const isEditMode = mode === "edit" || !!initialData?.id;

	const form = useForm(userAccountSchema, {
		defaultValues: initialData ?? {
			name: "",
			email: "",
			phone: "",
			role: "User",
			status: "active",
			country: "US",
			timezone: "UTC",
			locale: "en-US",
		},
		onSubmit: async () => {
			await new Promise((r) => setTimeout(r, 800));
			toast.success("Identity Saved Successfully");
			navigate({ to: "/dashboard/users" });
		},
	});

	return (
		<div className="min-h-screen bg-slate-950 text-slate-300 py-12 px-6">
			<div className="max-w-[1100px] mx-auto bg-slate-900/40 backdrop-blur-3xl border border-white/5 rounded-[1.5rem] overflow-hidden shadow-2xl">
				{/* Header Section */}
				<UserFormHeader isEditMode={isEditMode} />
				<form.Root className="p-8 space-y-10">
					{/* SECTION 1: CORE IDENTITY */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
						<CompactField form={form} name="name" label="Employee Name" placeholder="Enter name" icon={User} />
						<CompactField form={form} name="role" label="Designation" placeholder="Select Role" isSelect options={["Admin", "User", "Manager"]} icon={Users} />
						<CompactField form={form} name="status" label="Account Status" isSelect options={["active", "suspended", "pending"]} icon={Zap} />
						<CompactField form={form} name="plan" label="Subscription" isSelect options={["Free", "Pro", "Enterprise"]} icon={Shield} />
					</div>

					{/* SECTION 2: CONTACT DETAILS */}
					<div className="pt-8 border-t border-white/5">
						<h2 className="text-lg font-bold text-white mb-6">Contact Details</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
							<form.Field name="phone" render={(field) => (
								<field.Container label="Phone Link">
									<div className="flex bg-white/[0.03] border border-white/10 rounded-xl overflow-hidden h-11 focus-within:border-blue-500/50 transition-all">
										<InputPhone
											value={field.state.value}
											onChange={(val) => field.handleChange(val)}
											className="border-none bg-transparent h-full text-white placeholder:text-slate-600"
										/>
									</div>
								</field.Container>
							)} />

							<CompactField form={form} name="email" label="Office Email" placeholder="email@company.com" icon={Mail} />

							<div className="md:col-span-2">
								<CompactField form={form} name="country" label="Region" placeholder="Enter country" icon={MapPin} />
							</div>
						</div>
					</div>

					{/* FOOTER ACTIONS */}
					<div className="flex items-center justify-end gap-3 pt-6 border-t border-white/5">
						<Button
							type="button"
							variant="ghost"
							onClick={() => navigate({ to: ".." })}
							className="px-8 h-11 rounded-xl text-slate-400 font-bold hover:bg-white/5 hover:text-white transition-colors"
						>
							Cancel
						</Button>
						<form.Submit className="px-10 h-11 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all active:scale-95 shadow-lg shadow-blue-600/20">
							{isEditMode ? "Update Identity" : "Save Entity"}
						</form.Submit>
					</div>
				</form.Root>
			</div>
		</div>
	);
}

// --- TYPED COMPACT FIELD COMPONENT ---

interface CompactFieldProps<TFormData> {
	form: any;
	name: DeepKeys<TFormData>;
	label: string;
	placeholder?: string;
	isSelect?: boolean;
	options?: string[];
	icon?: React.ElementType;
}

function CompactField<TFormData>({
	form,
	name,
	label,
	placeholder,
	isSelect,
	options,
	icon: Icon
}: CompactFieldProps<TFormData>) {
	return (
		<form.Field name={name} render={(field: any) => (
			<field.Container label={label}>
				<div className="relative group flex">
					<div>
						{Icon && (
							<div className="absolute left-4 top-1/2 -translate-y-1/2 opacity-20 group-focus-within:opacity-60 transition-opacity pointer-events-none">
								<Icon className="w-4 h-4 text-white" />
							</div>
						)}
					</div>
					<div className="flex-1">
						{isSelect ? (
							<Select value={field.state.value} onValueChange={field.handleChange}>
								<SelectTrigger className="bg-white/3 border-white/10 h-11 rounded-xl text-white text-sm focus:ring-0 focus:ring-offset-0 focus:border-blue-500/50 transition-all">
									<SelectValue placeholder={placeholder} />
								</SelectTrigger>
								<SelectContent className="bg-slate-900 border-white/10 text-white shadow-2xl">
									{options?.map((opt: string) => (
										<SelectItem key={opt} value={opt} className="capitalize hover:bg-white/5 focus:bg-white/5 cursor-pointer">
											{opt}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						) : (
							<Input
								value={field.state.value}
								onChange={(e) => field.handleChange(e.target.value)}
								className="bg-white/3 border-white/10 h-11 rounded-xl text-white text-sm placeholder:text-slate-600 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-blue-500/50 transition-all"
								placeholder={placeholder}
							/>
						)}


					</div>
				</div>
			</field.Container>
		)} />
	);
}