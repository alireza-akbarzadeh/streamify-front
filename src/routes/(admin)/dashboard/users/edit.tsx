import { createFileRoute } from '@tanstack/react-router'
import { UserForm } from '@/domains/users/components/user-form/user-form'
import { mockUsers } from '@/domains/users/server/users.functions'

export const Route = createFileRoute('/(admin)/dashboard/users/edit')({
    component: RouteComponent,
})

function RouteComponent() {

    const { userId } = Route.useSearch() as { userId: string }
    const initialData = mockUsers.find(u => u.id === userId)

    if (!initialData) {
        return <div className="p-10 text-white font-mono">ERR: IDENTITY_NOT_FOUND</div>
    }

    return <UserForm mode='edit' initialData={initialData} />
}