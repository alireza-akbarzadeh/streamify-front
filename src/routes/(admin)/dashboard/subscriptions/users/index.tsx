import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(admin)/dashboard/subscriptions/users/')(
  {
    component: RouteComponent,
  },
)

function RouteComponent() {
  return <div>Hello "/(admin)/dashboard/subscriptions/users/"!</div>
}
