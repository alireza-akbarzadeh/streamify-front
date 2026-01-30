import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(admin)/dashboard/subscriptions/plans/')(
  {
    component: RouteComponent,
  },
)

function RouteComponent() {
  return <div>Hello "/(admin)/dashboard/subscriptions/plans/"!</div>
}
