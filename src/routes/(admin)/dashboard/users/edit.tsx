import { createFileRoute } from '@tanstack/react-router'
import { UserForm } from '@/domains/users/components/user-form'

export const Route = createFileRoute('/(admin)/dashboard/users/edit')({
    component: RouteComponent,
})

function RouteComponent() {
    return <UserForm />
}
