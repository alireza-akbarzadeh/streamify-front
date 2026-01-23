import { createFileRoute } from '@tanstack/react-router'
import { ArtistProfile } from '@/domains/artists/artist.domins'

export const Route = createFileRoute('/(home)/artist/$artistid')({
    component: RouteComponent,
})

function RouteComponent() {
    return <ArtistProfile />
}
