import {
	type ColumnFiltersState,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	type Row,
	useReactTable,
} from "@tanstack/react-table";
import {
	UserPlus,
	Download,
	Trash2,
	ShieldAlert,
	Network,
	Activity,
	ExternalLink
} from "lucide-react";
import * as React from "react";
import { toast } from "sonner";
import { Table } from "@/components/table/data-table";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { UpdateStaffRole } from "./update-role";

const ROLES = [
	{ id: "1", name: "Administrator", color: "text-rose-400", bg: "bg-rose-400/10" },
	{ id: "2", name: "Security Officer", color: "text-amber-400", bg: "bg-amber-400/10" },
	{ id: "3", name: "Operator", color: "text-blue-400", bg: "bg-blue-400/10" },
	{ id: "4", name: "Support Tier 1", color: "text-emerald-400", bg: "bg-emerald-400/10" },
];

const SYSTEM_ROUTES = [
	{ id: "r1", label: "User Management" },
	{ id: "r2", label: "Financial Audit" },
	{ id: "r3", label: "API Configuration" },
	{ id: "r4", label: "System Logs" },
	{ id: "r5", label: "Database Access" },
	// ... rest of your routes
];

export type StaffMember = {
	id: string;
	name: string;
	email: string;
	role: string;
	status: "online" | "offline" | "flagged";
	lastActive: string;
	ipAddress: string;
	activePerms: {
		[key: string]: "read" | "write" | null;
	};
};

const INITIAL_STAFF: StaffMember[] = [
	{
		id: "1",
		name: "Alex Rivera",
		email: "a.rivera@axiom.sys",
		role: "Administrator",
		status: "online",
		lastActive: "Just now",
		ipAddress: "192.168.1.104",
		activePerms: { r1: "write", r2: "read" },
	},
	{
		id: "2",
		name: "Sarah Chen",
		email: "s.chen@axiom.sys",
		role: "Operator",
		status: "offline",
		lastActive: "4h ago",
		ipAddress: "10.0.4.82",
		activePerms: { r2: "read" },
	},
	{
		id: "3",
		name: "Marcus Thorne",
		email: "m.thorne@axiom.sys",
		role: "Security Officer",
		status: "flagged",
		lastActive: "12m ago",
		ipAddress: "172.16.254.1",
		activePerms: { r4: "write" },
	},
];

export default function StaffAccessPage() {
	const [staff, setStaff] = React.useState(INITIAL_STAFF);
	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
	const [selectedId, setSelectedId] = React.useState<string | null>(null);
	const [rowSelection, setRowSelection] = React.useState({});

	const activeStaff = staff.find((s) => s.id === selectedId);

	const handleExport = () => {
		const blob = new Blob([JSON.stringify(staff, null, 2)], { type: "application/json" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = "personnel-manifest.json";
		a.click();
		toast.success("Identity manifest exported");
	};

	const handleBulkDelete = () => {
		const selectedIndices = Object.keys(rowSelection).map(Number);
		const idsToDelete = selectedIndices.map(idx => table.getRowModel().rows[idx].original.id);
		setStaff(prev => prev.filter(s => !idsToDelete.includes(s.id)));
		setRowSelection({});
		toast.error(`${idsToDelete.length} personnel records purged`);
	};

	const handlePermissionToggle = (routeId: string, type: "read" | "write") => {
		setStaff((prev) =>
			prev.map((s) => {
				if (s.id !== selectedId) return s;
				const current = s.activePerms[routeId];
				let newValue: "read" | "write" | null = null;
				if (type === "read") newValue = current === "read" ? null : "read";
				else newValue = current === "write" ? null : "write";
				return { ...s, activePerms: { ...s.activePerms, [routeId]: newValue } };
			}),
		);
	};

	const columns = React.useMemo(() => [
		{
			accessorKey: "name",
			header: "Personnel Identifier",
			cell: ({ row }: { row: Row<StaffMember> }) => (
				<div className="flex items-center gap-4">
					<div className="relative">
						<div className="size-9 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center font-black text-xs text-blue-400">
							{row.original.name.charAt(0)}
						</div>
						<div className={cn(
							"absolute -bottom-1 -right-1 size-3 rounded-full border-2 border-[#020617]",
							row.original.status === "online" ? "bg-emerald-500" :
								row.original.status === "flagged" ? "bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.6)]" : "bg-slate-600"
						)} />
					</div>
					<div className="flex flex-col">
						<span className="font-bold text-white uppercase tracking-tight text-[11px]">{row.original.name}</span>
						<span className="text-[9px] text-slate-500 lowercase font-medium">{row.original.email}</span>
					</div>
				</div>
			),
		},
		{
			accessorKey: "role",
			header: "Clearance",
			cell: ({ row }: { row: Row<StaffMember> }) => {
				const role = ROLES.find((r) => r.name === row.original.role);
				return (
					<div className="flex items-center gap-2">
						<span className={cn("px-2.5 py-0.5 rounded-md text-[9px] font-black uppercase tracking-widest border border-current/20", role?.color, role?.bg)}>
							{row.original.role}
						</span>
					</div>
				);
			},
		},
		{
			accessorKey: "network",
			header: "Network Identity",
			cell: ({ row }: { row: Row<StaffMember> }) => (
				<div className="flex flex-col gap-1">
					<div className="flex items-center gap-1.5">
						<Network className="size-3 text-slate-600" />
						<span className="text-[10px] font-mono text-emerald-500/80">{row.original.ipAddress}</span>
					</div>
					<div className="flex items-center gap-1.5 text-[9px] text-slate-500 font-bold uppercase">
						<Activity className="size-3" /> {row.original.lastActive}
					</div>
				</div>
			)
		},
		{
			id: "actions",
			header: "",
			cell: ({ row }: { row: Row<StaffMember> }) => (
				<Button
					variant="ghost"
					size="icon"
					className="size-8 hover:bg-white/5 text-slate-600 hover:text-white"
					onClick={(e) => {
						e.stopPropagation();
						setSelectedId(row.original.id);
					}}
				>
					<ExternalLink className="size-4" />
				</Button>
			)
		}
	], []);

	const table = useReactTable({
		data: staff,
		columns,
		state: { columnFilters, rowSelection },
		onColumnFiltersChange: setColumnFilters,
		onRowSelectionChange: setRowSelection,
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
	});

	return (
		<div className="flex h-screen bg-[#020617] text-slate-200 overflow-hidden">
			<Table.Root table={table}>
				<div className="flex flex-col w-full">

					{/* ENHANCED TOP BAR */}
					<div className="p-8 border-b border-white/5 space-y-8 bg-gradient-to-b from-blue-500/[0.02] to-transparent">
						<div className="flex justify-between items-start">
							<div>
								<h1 className="text-4xl font-black italic uppercase tracking-tighter text-white">
									Personnel Command
								</h1>
								<div className="flex items-center gap-4 mt-2">
									<div className="flex items-center gap-1.5 text-[10px] font-black text-emerald-500 uppercase tracking-widest">
										<div className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
										System Operational
									</div>
									<div className="h-3 w-px bg-white/10" />
									<p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">
										Total Identities: {staff.length}
									</p>
								</div>
							</div>

							<div className="flex items-center gap-3">
								<Button variant="outline" className="rounded-xl border-white/5 bg-white/5 h-11 px-4 text-[10px] font-black uppercase tracking-widest hover:bg-white/10" onClick={handleExport}>
									<Download className="mr-2 size-4" /> Export
								</Button>
								<Button className="rounded-xl bg-blue-600 hover:bg-blue-500 h-11 px-6 font-black uppercase text-[10px] tracking-widest shadow-lg shadow-blue-900/20">
									<UserPlus className="mr-2 size-4" /> Grant Access
								</Button>
							</div>
						</div>

						{/* FILTER & BULK ACTIONS */}
						<div className="flex items-center gap-4">
							<div className="flex-1">
								<Table.Search columnId="name" placeholder="SEARCH BY NAME, EMAIL, OR IP..." />
							</div>
							<Table.FilterTabs columnId="role" options={["All", ...ROLES.map((r) => r.name)]} />

							{Object.keys(rowSelection).length > 0 && (
								<AlertDialog>
									<AlertDialogTrigger asChild>
										<Button variant="destructive" className="h-10 rounded-xl px-4 text-[10px] font-black uppercase animate-in zoom-in-95">
											<Trash2 className="mr-2 size-4" /> Purge {Object.keys(rowSelection).length}
										</Button>
									</AlertDialogTrigger>
									<AlertDialogContent className="bg-[#0d1117] border-white/10 text-white">
										<AlertDialogHeader>
											<AlertDialogTitle className="uppercase italic font-black">Confirm Purge</AlertDialogTitle>
											<AlertDialogDescription className="text-slate-400">
												This will immediately revoke access and wipe selected personnel records from the core manifest.
											</AlertDialogDescription>
										</AlertDialogHeader>
										<AlertDialogFooter>
											<AlertDialogCancel className="bg-white/5 border-none hover:bg-white/10">Cancel</AlertDialogCancel>
											<AlertDialogAction onClick={handleBulkDelete} className="bg-rose-600 hover:bg-rose-500">Confirm Revocation</AlertDialogAction>
										</AlertDialogFooter>
									</AlertDialogContent>
								</AlertDialog>
							)}
						</div>
					</div>

					{/* TABLE AREA */}
					<div className="flex-1 p-6 overflow-hidden">
						<Table.Body
							columnsCount={4}
							onRowDoubleClick={(row: Row<StaffMember>) => setSelectedId(row.original.id)}
						/>
					</div>

					{/* STATUS FOOTER */}
					<div className="px-8 py-4 border-t border-white/5 bg-black/20 flex items-center justify-between">
						<Table.Pagination />
						<div className="flex items-center gap-6">
							<div className="flex items-center gap-2">
								<ShieldAlert className="size-4 text-rose-500" />
								<span className="text-[10px] font-black text-slate-500 uppercase tracking-tighter">
									{staff.filter(s => s.status === 'flagged').length} Anomalies Detected
								</span>
							</div>
						</div>
					</div>
				</div>
			</Table.Root>

			<UpdateStaffRole
				activeStaff={activeStaff as StaffMember}
				handlePermissionToggle={handlePermissionToggle}
				selectedId={selectedId}
				setSelectedId={setSelectedId}
				setStaff={setStaff}
			/>
		</div>
	);
}