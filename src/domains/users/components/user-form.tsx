import { useNavigate } from "@tanstack/react-router";
import {
	Globe, KeyRound,
	Lock, Mail,
	ShieldCheck, User
} from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { useForm } from "@/components/ui/forms/form";
import { Input } from "@/components/ui/input";
import {
	Select, SelectContent, SelectItem,
	SelectTrigger, SelectValue
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import type { UserAccount } from "../server/users.functions";

const userAccountSchema = z.object({
	name: z.string().min(2, "Name is required"),
	email: z.email("Invalid work email"),
	role: z.enum(["Admin", "Moderator", "User"]),
	status: z.enum(["active", "pending", "suspended"]),
	twoFactorEnabled: z.boolean().default(false),
	phone: z.string().optional(),
	country: z.string().min(1, "Country is required"),
	timezone: z.string().default("UTC"),
	accountBalance: z.number().default(0),
});

type UserAccountFormData = z.infer<typeof userAccountSchema>;
type AdvancedUserCRUDProps = {
	initialData?: Partial<UserAccount>;
};

export function UserForm({ initialData }: AdvancedUserCRUDProps) {
	const navigate = useNavigate()
	const form = useForm(userAccountSchema, {
		defaultValues: initialData ?? {
			name: "",
			email: "",
			role: "User",
			status: "active",
			twoFactorEnabled: false,
			country: "United States",
			timezone: "UTC",
			accountBalance: 0,
		},
		onSubmit: async ({ value }) => {
			await new Promise((r) => setTimeout(r, 1000));
			console.log("Saving User Account:", value);
			toast.success("Account updated successfully");
			navigate({ to: "/dashboard/users" });

		},
	});

	return (
		<form.Root className="max-w-4xl mx-auto space-y-12">

			{/* SECTION: IDENTITY & STATUS */}
			<section className="space-y-6">
				<div className="flex items-center gap-3 pb-2 border-b border-border/40">
					<div className="p-2 bg-primary/10 rounded-lg">
						<User className="h-4 w-4 text-primary" />
					</div>
					<h2 className="text-sm font-black uppercase tracking-widest">Core Identity</h2>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<form.Field name="name" render={(field) => (
						<field.Container label="Full Name" detail="Publicly visible profile name">
							<Input
								{...field.Controller}
								onChange={(e) => field.handleChange(e.target.value)}
								className="h-12 rounded-xl bg-muted/5"
							/>
						</field.Container>
					)} />

					<form.Field name="email" render={(field) => (
						<field.Container label="Email Address" detail="Primary login identifier">
							<div className="relative">
								<Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/40" />
								<Input
									{...field.Controller}
									onChange={(e) => field.handleChange(e.target.value)}
									className="pl-10 h-12 rounded-xl bg-muted/5"
								/>
							</div>
						</field.Container>
					)} />
				</div>

				<div className="grid grid-cols-2 md:grid-cols-3 gap-6">
					<form.Field name="role" render={(field) => (
						<field.Container label="Access Level">
							<Select onValueChange={field.handleChange} defaultValue={field.state.value}>
								<SelectTrigger className="h-12 rounded-xl bg-muted/5"><SelectValue /></SelectTrigger>
								<SelectContent className="rounded-xl">
									<SelectItem value="User">Standard User</SelectItem>
									<SelectItem value="Moderator">Moderator</SelectItem>
									<SelectItem value="Admin">Administrator</SelectItem>
								</SelectContent>
							</Select>
						</field.Container>
					)} />

					<form.Field name="status" render={(field) => (
						<field.Container label="Account Status">
							<Select onValueChange={field.handleChange} defaultValue={field.state.value}>
								<SelectTrigger className="h-12 rounded-xl bg-muted/5"><SelectValue /></SelectTrigger>
								<SelectContent className="rounded-xl">
									<SelectItem value="active">Active</SelectItem>
									<SelectItem value="pending">Pending Review</SelectItem>
									<SelectItem value="suspended">Suspended</SelectItem>
								</SelectContent>
							</Select>
						</field.Container>
					)} />
				</div>
			</section>

			{/* SECTION: SECURITY & COMPLIANCE */}
			<section className="p-6 rounded-[2rem] bg-amber-500/3 border border-amber-500/10 space-y-6">
				<div className="flex items-center gap-3">
					<div className="p-2 bg-amber-500/10 rounded-lg">
						<ShieldCheck className="h-4 w-4 text-amber-600" />
					</div>
					<div>
						<h2 className="text-sm font-black uppercase tracking-widest text-amber-900">Security Layers</h2>
						<p className="text-[10px] text-amber-600 font-medium italic">Enforce multi-factor authentication requirements</p>
					</div>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					<form.Field name="twoFactorEnabled" render={(field) => (
						<field.Container
							label="2FA Requirement"
							detail="Mandatory 2FA challenge via authenticator app"
							className="flex flex-row items-center justify-between space-y-0 gap-4"
						>
							<Switch
								checked={field.state.value}
								onCheckedChange={field.handleChange}
								className="data-[state=checked]:bg-amber-500"
							/>
						</field.Container>
					)} />

					<div className="flex items-center gap-4 p-4 rounded-xl bg-background border border-amber-500/10">
						<Lock className="h-8 w-8 text-amber-500/20 shrink-0" />
						<div>
							<p className="text-[11px] font-bold text-amber-900">Account Hardening</p>
							<p className="text-[10px] text-muted-foreground leading-tight">Last password reset: 14 days ago.</p>
						</div>
					</div>
				</div>
			</section>

			{/* SECTION: REGIONAL & LOCALIZATION */}
			<section className="space-y-6">
				<div className="flex items-center gap-3 pb-2 border-b border-border/40">
					<div className="p-2 bg-emerald-500/10 rounded-lg">
						<Globe className="h-4 w-4 text-emerald-600" />
					</div>
					<h2 className="text-sm font-black uppercase tracking-widest">Regional Settings</h2>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<form.Field name="country" render={(field) => (
						<field.Container label="Country / Territory">
							<Input
								{...field.Controller}
								onChange={(e) => field.handleChange(e.target.value)}
								placeholder="e.g. United Kingdom"
								className="h-12 rounded-xl bg-muted/5"
							/>
						</field.Container>
					)} />

					<form.Field name="timezone" render={(field) => (
						<field.Container label="Timezone">
							<Select onValueChange={field.handleChange} defaultValue={field.state.value}>
								<SelectTrigger className="h-12 rounded-xl bg-muted/5"><SelectValue /></SelectTrigger>
								<SelectContent className="rounded-xl">
									<SelectItem value="UTC">UTC (London)</SelectItem>
									<SelectItem value="EST">EST (New York)</SelectItem>
									<SelectItem value="PST">PST (Los Angeles)</SelectItem>
								</SelectContent>
							</Select>
						</field.Container>
					)} />
				</div>
			</section>

			<form.Submit className="h-16 rounded-[1.5rem] bg-foreground text-background hover:bg-foreground/90 transition-all shadow-2xl">
				<div className="flex items-center justify-center gap-3">
					<KeyRound className="h-4 w-4" />
					Synchronize Account Changes
				</div>
			</form.Submit>

		</form.Root>
	);
}