// components/admin-sidebar/nav-item.tsx
import { Link } from '@tanstack/react-router'
import { ChevronDown } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { ICON_MAP, type SidebarItem } from '@/config/admin-sidebar'
import { cn } from '@/lib/utils'

export function SidebarNavItem({ item, isCollapsed, pathname }: { item: SidebarItem, isCollapsed: boolean, pathname: string }) {
    const hasChildren = !!(item.children && item.children.length > 0)

    const isChildActive = hasChildren && item.children?.some((c) => pathname.startsWith(c.href || ''))
    const [isOpen, setIsOpen] = useState(!!isChildActive)

    useEffect(() => {
        if (isChildActive) setIsOpen(true)
    }, [isChildActive])

    const Icon = item.icon ? (ICON_MAP as any)[item.icon] : null
    const isActive = pathname === item.href || isChildActive

    const itemClasses = cn(
        'group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all outline-none mb-0.5',
        isActive
            ? 'bg-primary text-primary-foreground shadow-sm shadow-primary/20'
            : 'text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground'
    )

    // Sub-item link (for nested menus)
    const renderChild = (child: SidebarItem) => (
        <Link
            key={child.href}
            to={child.href}
            className={cn(
                "block rounded-md px-3 py-1.5 text-xs transition-colors relative",
                pathname === child.href
                    ? "text-primary font-bold before:absolute before:left-[-17px] before:top-1/2 before:-translate-y-1/2 before:w-1.5 before:h-1.5 before:bg-primary before:rounded-full"
                    : "text-muted-foreground hover:text-foreground"
            )}
        >
            {child.label}
        </Link>
    )

    if (hasChildren && !isCollapsed) {
        return (
            <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
                <CollapsibleTrigger asChild>
                    <button className={cn(itemClasses, "w-full justify-between cursor-pointer")}>
                        <div className="flex items-center gap-3">
                            {Icon && <Icon className="h-4 w-4 shrink-0" />}
                            <span>{item.label}</span>
                        </div>
                        <ChevronDown className={cn("h-3 w-3 transition-transform duration-200 opacity-50", isOpen && "rotate-180")} />
                    </button>
                </CollapsibleTrigger>
                <CollapsibleContent className="ml-4 mt-1 border-l border-muted-foreground/20 pl-4 space-y-1">
                    {item.children?.map(renderChild)}
                </CollapsibleContent>
            </Collapsible>
        )
    }

    return (
        <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
                <Link
                    to={item.href || '#'}
                    className={cn(itemClasses, isCollapsed && "justify-center px-0 h-10 w-10 mx-auto")}
                >
                    {Icon && <Icon className={cn("h-4 w-4 shrink-0", isActive ? "text-primary-foreground" : "text-muted-foreground group-hover:text-accent-foreground")} />}
                    {!isCollapsed && <span className="flex-1 truncate">{item.label}</span>}
                </Link>
            </TooltipTrigger>
            {isCollapsed && (
                <TooltipContent side="right" sideOffset={10} className="font-semibold">
                    {item.label}
                </TooltipContent>
            )}
        </Tooltip>
    )
}