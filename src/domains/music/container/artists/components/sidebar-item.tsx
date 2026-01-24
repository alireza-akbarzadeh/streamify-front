import { useLocation, useNavigate } from '@tanstack/react-router'; // Adjust import based on your router
import { motion } from 'framer-motion';
import { Pin } from 'lucide-react';

interface LibraryItem {
    id: string | number;
    title: string;
    subtitle: string;
    image: string;
    type: 'artist' | 'playlist' | 'album';
    isPinned?: boolean;
}

export function SidebarItem({ item }: { item: LibraryItem }) {
    const navigate = useNavigate();
    const location = useLocation();

    // Check if the current route matches this item's ID
    const isActive = location.pathname === `/music/${item.id}`;

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.08)" }}
            // Apply active background and transition
            className={`flex items-center gap-3 p-2 rounded-md cursor-pointer group transition-colors ${isActive ? 'bg-white/10' : ''
                }`}
            onClick={() => navigate({ to: `/music/${item.id}` })}
        >
            <div className="relative">
                <img
                    alt={item.title}
                    src={item.image}
                    className={`w-12 h-12 object-cover transition-transform duration-300 ${isActive ? 'scale-90' : 'scale-100'
                        } ${item.type === 'artist' ? 'rounded-full' : 'rounded-md shadow-lg'}`}
                />
                {/* Optional: Active indicator dot */}
                {isActive && (
                    <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-1 h-4 bg-linear-to-b from-purple-500 to-pink-500 rounded-r-full" />
                )}
            </div>

            <div className="flex-1 min-w-0">
                <h4 className={`text-sm font-medium truncate transition-colors ${isActive ? 'text-pink-400' : 'text-white'
                    }`}>
                    {item.title}
                </h4>
                <p className="text-xs text-gray-400 truncate flex items-center gap-1.5">
                    {item.isPinned && (
                        <Pin className="w-3 h-3 text-purple-500 fill-purple-500 rotate-45" />
                    )}
                    <span className={isActive ? 'text-purple-300/80' : ''}>
                        {item.subtitle}
                    </span>
                </p>
            </div>
        </motion.div>
    );
}