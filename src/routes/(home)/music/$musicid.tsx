import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(home)/music/$musicid')({
    component: RouteComponent,
})

function RouteComponent() {
    return <div>
        dynamic page
    </div>
}
