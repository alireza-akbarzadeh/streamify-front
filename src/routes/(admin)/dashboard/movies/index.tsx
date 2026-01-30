import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(admin)/dashboard/movies/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(admin)/dashboard/movies/"!</div>
}
