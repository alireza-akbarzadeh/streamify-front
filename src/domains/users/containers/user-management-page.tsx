import { Download, Plus, X } from "lucide-react";
import * as React from "react";
import { toast } from "sonner";
import { AppDialog } from "@/components/app-dialog";
import { Button } from "@/components/ui/button";
import { InviteUserForm } from "../components/invite-user-form";
import { UserStatCard } from "../components/user-status-card";
import { UserManagementTable } from "./user-table";

export default function UserManagementPage() {
    const [isInviteOpen, setIsInviteOpen] = React.useState(false);

    const handleExport = () => {
        toast.promise(new Promise((res) => setTimeout(res, 1500)), {
            loading: 'Preparing CSV export...',
            success: 'User directory exported successfully',
            error: 'Export failed',
        });
    };

    return (
        <div className="relative space-y-6 p-4 md:p-8 min-h-screen">
            {/* 1. Page Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black tracking-tight italic uppercase">User Directory</h1>
                    <p className="text-sm text-muted-foreground font-medium">Manage, verify, and monitor your global user base.</p>
                </div>

                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        onClick={handleExport}
                        className="rounded-xl font-bold uppercase tracking-wider text-[10px] h-10 border-border/60"
                    >
                        <Download className="mr-2 h-3.5 w-3.5" /> Export
                    </Button>

                    <AppDialog
                        open={isInviteOpen}
                        onOpenChange={setIsInviteOpen}
                        component="drawer"
                        title="Invite New Member"
                        description="Send an invitation link to a new user to join your organization."
                        trigger={
                            <Button className="rounded-xl font-bold uppercase tracking-wider text-[10px] h-10 px-6 shadow-lg shadow-primary/20">
                                <Plus className="mr-2 h-4 w-4" /> Invite User
                            </Button>
                        }
                    >
                        <InviteUserForm onSuccess={() => setIsInviteOpen(false)} />
                    </AppDialog>
                </div>
            </div>

            {/* 2. Quick Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <UserStatCard label="Total Users" value="12,842" change="+12%" />
                <UserStatCard label="Active Now" value="1,203" pulse />
                <UserStatCard label="Churn Rate" value="0.8%" color="text-emerald-500" />
                <UserStatCard label="Flagged" value="14" color="text-destructive" />
            </div>

            {/* 3. The Main Table Area */}
            <div className="rounded-[2.5rem] border border-border/40 bg-card/30 backdrop-blur-xl overflow-hidden shadow-2xl shadow-black/5">
                <UserManagementTable />
            </div>
        </div>
    );
}
