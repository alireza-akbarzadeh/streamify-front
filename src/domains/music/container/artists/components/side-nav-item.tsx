import { Link as RouterLink } from "@tanstack/react-router";
import type { LucideIcon } from "lucide-react";

export function NavItem({
    icon: Icon,
    label,
    to,
    exact = true
}: {
    icon: LucideIcon,
    label: string,
    to: string,
    exact?: boolean
}) {
    return (
        <RouterLink
            to={to}
            activeOptions={{ exact }}
            className="block group no-underline"
        >
            {({ isActive }) => (
                <div className={`
                    flex items-center gap-5 px-3 py-3 rounded-md transition-all duration-300 relative
                    ${isActive
                        ? 'text-white bg-white/5'
                        : 'text-gray-400 group-hover:text-white group-hover:bg-white/5'
                    }
                `}>
                    {/* Active Gradient Indicator */}
                    {isActive && (
                        <div className="absolute left-0 w-1 h-6 bg-linear-to-b from-purple-500 to-pink-500 rounded-r-full" />
                    )}

                    <Icon className={`w-6 h-6 transition-colors ${isActive ? 'text-pink-500' : 'group-hover:text-white'
                        }`} />

                    <span className={`font-bold transition-colors ${isActive ? 'text-white' : ''
                        }`}>
                        {label}
                    </span>
                </div>
            )}
        </RouterLink>
    );
}