import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(admin)/dashboard/payments/$paymentId')({
    component: RouteComponent,
})

function RouteComponent() {
    return <div>Hello "/(admin)/dashboard/payment/$paymentId"!</div>
}
