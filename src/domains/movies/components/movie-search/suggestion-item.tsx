import { generateSlug } from "@/lib/utils";
import type { MediaList } from "@/orpc/models/media.schema";
import { Link } from "@tanstack/react-router";



export function SuggestionItem({ item }: { item: MediaList }) {
    const slug = generateSlug(item.title);
    return (
        <Link
            to="/movies/$movieId"
            params={{ movieId: slug }}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl hover:bg-white/10 text-left transition-colors group"
        >
            <div className="w-12 h-[72px] shrink-0 rounded-lg overflow-hidden bg-white/10">
                <img
                    src={item.thumbnail}
                    alt=""
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="min-w-0 flex-1">
                <p className="text-white font-medium truncate group-hover:text-purple-300 transition-colors">
                    {item.title}
                </p>
                <p className="text-xs text-gray-400">{item.releaseYear}</p>
            </div>
        </Link>
    );
}