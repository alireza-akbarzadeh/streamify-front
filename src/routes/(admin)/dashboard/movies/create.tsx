import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(admin)/dashboard/movies/create')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(admin)/dashboard/movies/create"!</div>
}
