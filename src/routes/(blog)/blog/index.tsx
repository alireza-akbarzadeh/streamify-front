import { createFileRoute } from '@tanstack/react-router'
import Blog from '@/domains/blog/blog.domain'
import { BlogLayout } from '@/domains/blog/blog-layout'

export const Route = createFileRoute('/(blog)/blog/')({
    component: RouteComponent,
})

function RouteComponent() {
    return <BlogLayout><Blog /></BlogLayout >
}
