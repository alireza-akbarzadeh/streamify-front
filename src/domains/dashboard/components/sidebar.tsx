// components/admin-sidebar/index.tsx
import { motion } from 'framer-motion'
import { ChevronLeft, Search } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { TooltipProvider } from '@/components/ui/tooltip'
import type { SidebarGroup } from '@/config/admin-sidebar'
import { cn } from '@/lib/utils'
import { SidebarNavItem } from './sidebar-nav-item'
import { UserProfile } from './user-profile'

export function AdminSidebar({ groups, pathname, onSearchOpen }: { groups: SidebarGroup[], pathname: string, onSearchOpen: () => void }) {
    const [isCollapsed, setIsCollapsed] = useState(false)
    return (
        <TooltipProvider>
            <motion.aside
                animate={{ width: isCollapsed ? 76 : 280 }}
                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                className="relative z-30 flex h-full flex-col border-r bg-card/50 backdrop-blur-md"
            >
                {/* Header */}
                <div className="flex h-14 items-center justify-between px-4">
                    {!isCollapsed && (
                        <span className="text-sm font-black tracking-widest text-primary uppercase pl-2">
                            Vibe Staff
                        </span>
                    )}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 ml-auto"
                        onClick={() => setIsCollapsed(!isCollapsed)}
                    >
                        <ChevronLeft className={cn("h-4 w-4 transition-transform", isCollapsed && "rotate-180")} />
                    </Button>
                </div>

                {/* Quick Search Trigger */}
                <div className="px-3 mb-4">
                    <Button
                        variant="outline"
                        size="sm"
                        className={cn("w-full justify-start gap-2 bg-muted/30 border-none hover:bg-muted/50 text-muted-foreground", isCollapsed && "justify-center")}
                        onClick={onSearchOpen}
                    >
                        <Search className="h-4 w-4 shrink-0" />
                        {!isCollapsed && <span className="text-xs">Search...</span>}
                    </Button>
                </div>

                <Separator className="mx-4 w-auto mb-4 opacity-50" />

                <ScrollArea className="flex-1 px-3">
                    <div className="space-y-8 pb-10">
                        {groups.map((group) => (
                            <div key={group.group} className="space-y-1">
                                {!isCollapsed && (
                                    <h4 className="mb-2 px-3 text-[10px] font-bold text-muted-foreground/50 uppercase tracking-[0.2em]">
                                        {group.group}
                                    </h4>
                                )}
                                <div className="space-y-0.5">
                                    {group.items.map((item) => (
                                        <SidebarNavItem
                                            key={item.label}
                                            item={item}
                                            isCollapsed={isCollapsed}
                                            pathname={pathname}
                                        />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </ScrollArea>

                <div className="border-t bg-card/80">
                    <UserProfile />
                </div>
            </motion.aside>
        </TooltipProvider>
    )
}