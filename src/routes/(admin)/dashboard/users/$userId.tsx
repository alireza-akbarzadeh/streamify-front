import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(admin)/dashboard/users/$userId')({
    component: RouteComponent,
})

function RouteComponent() {
    return <div>Hello "/(admin)/dashboard/users/$userId"!</div>
}
