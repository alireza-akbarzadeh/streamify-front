import { useQuery } from '@tanstack/react-query'
import { Outlet, useRouterState } from '@tanstack/react-router'
import { Bell, Search } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { getSidebarData } from '../server/dahboard.functions'
import { SearchSide } from './search-setting'
import { AdminSidebar } from './sidebar'

export function AppSidebarLayout() {
    const [searchOpen, setSearchOpen] = useState(false)
    const pathname = useRouterState().location.pathname

    const userRole = "admin"

    const { data: groups = [] } = useQuery({
        queryKey: ['sidebar', userRole],
        queryFn: () => getSidebarData({ data: userRole }),
        staleTime: 1000 * 60 * 10,
    })

    return (
        <div className="flex h-screen w-full overflow-hidden bg-background">
            {/* 1. Left Navigation Navigation */}
            <AdminSidebar pathname={pathname} groups={groups} onSearchOpen={() => setSearchOpen(true)} />

            {/* 2. Main Content Wrapper */}
            <div className="flex flex-1 flex-col min-w-0">
                {/* 3. Global Topbar */}
                <header className="flex h-14 items-center justify-between border-b px-6 bg-card">
                    <div className="flex items-center gap-4 flex-1">
                        <Button
                            variant="outline"
                            className="relative h-9 w-full max-w-100 justify-start text-sm text-muted-foreground bg-muted/50"
                            onClick={() => setSearchOpen(true)}
                        >
                            <Search className="mr-2 h-4 w-4" />
                            <span>Search dashboard...</span>
                            <kbd className="pointer-events-none absolute right-2 top-2 h-5 select-none items-center gap-1 rounded border bg-background px-1.5 font-mono text-[10px] font-medium opacity-100 hidden sm:flex">
                                ⌘K
                            </kbd>
                        </Button>
                    </div>

                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="relative">
                            <Bell className="h-4 w-4" />
                            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-destructive border-2 border-card" />
                        </Button>
                        <Separator orientation="vertical" className="h-6 mx-2" />
                        <div className="h-8 w-8 rounded-full bg-linear-to-br from-indigo-500 to-purple-600 shadow-sm border border-white/20" />
                    </div>
                </header>

                {/* 4. Page Content */}
                <main className="flex-1 overflow-y-auto bg-muted/30 scroll-smooth">
                    <div className="container mx-auto p-6 max-w-400">
                        <Outlet />
                    </div>
                </main>
            </div>

            {/* 5. Command Palette (Search) */}
            <SearchSide data={groups} open={searchOpen} setOpen={setSearchOpen} />
        </div>
    )
}