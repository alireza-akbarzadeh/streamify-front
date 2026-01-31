import { createFileRoute, useParams } from '@tanstack/react-router'
import { UserForm } from '@/domains/users/components/user-form/user-form'
import { mockUsers } from '@/domains/users/server/users.functions'

export const Route = createFileRoute('/(admin)/dashboard/users/edit')({
    component: RouteComponent,
})

function RouteComponent() {
    const id = useParams()
    const initialData = mockUsers.find(u => u.id === id)
    return <UserForm mode='edit' initialData={initialData} />
}
