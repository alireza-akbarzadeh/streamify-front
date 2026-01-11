import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(home)/licenses')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(home)/licences"!</div>
}
