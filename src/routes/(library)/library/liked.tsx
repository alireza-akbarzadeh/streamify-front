import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(library)/library/liked')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(library)/library/liked"!</div>
}
