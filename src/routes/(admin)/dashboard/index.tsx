import { createFileRoute } from '@tanstack/react-router'
import DashboardMainPage from '@/domains/dashboard/container/dashboard-main'
import { adminMiddleware, authMiddleware } from '@/middleware/auth'

export const Route = createFileRoute('/(admin)/dashboard/')({
    component: RouteComponent,
    server: {
        middleware: [
            authMiddleware,
            adminMiddleware,
        ],
    },
})

function RouteComponent() {
    return <DashboardMainPage />
}
