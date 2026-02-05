import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(library)/library/history')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(library)/library/history"!</div>
}
