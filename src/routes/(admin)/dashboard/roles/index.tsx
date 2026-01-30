import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(admin)/dashboard/roles/')({
    component: RouteComponent,
})

function RouteComponent() {
    return <div>Hello "/(admin)/dashboard/roles/"!</div>
}
