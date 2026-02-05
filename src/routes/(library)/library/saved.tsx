import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(library)/library/saved')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(library)/library/saved"!</div>
}
