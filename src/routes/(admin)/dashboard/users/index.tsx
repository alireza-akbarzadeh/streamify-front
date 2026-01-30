import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(admin)/dashboard/users/')({
    component: RouteComponent,
})

function RouteComponent() {
    return <div>Hello "/(admin)/users/"!</div>
}
