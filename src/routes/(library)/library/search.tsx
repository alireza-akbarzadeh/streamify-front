import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(library)/library/search')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(library)/library/search"!</div>
}
