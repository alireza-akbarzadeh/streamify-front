import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(admin)/dashboard/audit-logs/')(
    {
        component: RouteComponent,
    },
)

function RouteComponent() {
    return <div>Hello "/(admin)/dashboard/audit-logs/audi-logs"!</div>
}
