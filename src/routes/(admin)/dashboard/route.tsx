import { createFileRoute, Outlet } from '@tanstack/react-router'
import { AppSidebarLayout } from '@/domains/dashboard/components/app-sidebar-layout'

export const Route = createFileRoute('/(admin)/dashboard')({
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <div className="flex h-screen w-full overflow-hidden bg-background">
            <AppSidebarLayout />
            <div className="flex flex-1 flex-col min-w-0">
                {/* <AdminTopbar /> */}
                <main className="flex-1 overflow-y-auto bg-muted/20">
                    <div className="container mx-auto p-6 max-w-7xl">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    )
}