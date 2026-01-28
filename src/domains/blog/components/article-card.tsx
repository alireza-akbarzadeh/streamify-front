import { useNavigate } from '@tanstack/react-router';
import { useStore } from '@tanstack/react-store';
import { AnimatePresence, motion } from 'framer-motion';
import { Bookmark, CheckCircle2, Clock, Heart, Share2 } from 'lucide-react';
import { toast } from 'sonner';
import { generateSlug } from '@/lib/utils';
import { actions, blogStore } from '../blog.store';
import type { FeatureArticle } from '../blog-mock';

type ArticleCardProps = {
    article: FeatureArticle;
};

export function ArticleCard({ article }: ArticleCardProps) {
    const navigate = useNavigate();

    const isBookmarked = useStore(blogStore, (s) => s.bookmarks.includes(article.id));
    const isLiked = useStore(blogStore, (s) => s.likes.includes(article.id));
    const isFinished = useStore(blogStore, (s) => s.finishedArticles.includes(article.id));
    const progress = useStore(blogStore, (s) => s.readingProgress[article.id] || 0);

    const handleLike = (e: React.MouseEvent) => {
        e.stopPropagation();
        actions.toggleLike(article.id);
    };

    const handleBookmark = (e: React.MouseEvent) => {
        e.stopPropagation();
        actions.toggleBookmark(article.id);
    };

    const handleShare = (e: React.MouseEvent) => {
        e.stopPropagation();
        const slug = generateSlug(article.title);
        const url = `${window.location.origin}/blog/${slug}`;
        navigator.clipboard.writeText(url);
        toast.success("Link copied to clipboard!");
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            onClick={() => navigate({
                to: "/blog/$blogslug",
                params: { blogslug: generateSlug(article.title) }
            })}
            className={`group cursor-pointer flex flex-col h-full relative bg-white/[0.02] border border-white/[0.05] rounded-3xl p-3 transition-all duration-500 ${isFinished ? 'opacity-70 hover:opacity-100' : 'hover:bg-white/[0.04] hover:border-white/10'
                }`}
        >
            {/* Image Section */}
            <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-5 bg-neutral-900">
                <img
                    src={article.image}
                    alt={article.title}
                    className={`w-full h-full object-cover transition-all duration-700 ${isFinished ? 'grayscaleScale-[0.4] group-hover:grayscale-0' : 'group-hover:scale-105'
                        }`}
                />

                {/* --- IMPROVED PROGRESS BAR / FINISHED STATE --- */}
                <div className="absolute bottom-0 left-0 right-0 z-20">
                    <AnimatePresence mode="wait">
                        {isFinished ? (
                            <motion.div
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-green-700/10 backdrop-blur-sm  py-1 flex items-center justify-center gap-1.5"
                            >
                                <CheckCircle2 size={10} className="text-white" strokeWidth={3} />
                                <span className="text-[11px] font-black uppercase tracking-tighter text-white">Completed</span>
                            </motion.div>
                        ) : progress > 0 ? (
                            <div className="h-1 w-full bg-white/20">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progress}%` }}
                                    transition={{ type: "spring", stiffness: 50, damping: 20 }}
                                    className="h-full bg-purple-500 shadow-[0_-2px_10px_rgba(168,85,247,0.6)]"
                                />
                            </div>
                        ) : null}
                    </AnimatePresence>
                </div>

                {/* Bookmark Toggle */}
                <button
                    type="button"
                    onClick={handleBookmark}
                    className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md border transition-all z-30 ${isBookmarked
                        ? 'bg-purple-500 border-purple-400 text-white shadow-lg'
                        : 'bg-black/40 border-white/10 text-white opacity-0 group-hover:opacity-100 hover:bg-black/60'
                        }`}
                >
                    <Bookmark size={15} fill={isBookmarked ? "currentColor" : "none"} />
                </button>
            </div>

            {/* Content Section */}
            <div className="px-2 pb-2 flex-1 flex flex-col">
                <h3 className={`text-lg font-bold mb-2 leading-tight transition-colors ${isFinished ? 'text-neutral-400' : 'text-white group-hover:text-purple-400'
                    }`}>
                    {article.title}
                </h3>

                <p className="text-neutral-500 text-xs line-clamp-2 mb-4 leading-relaxed">
                    {article.excerpt}
                </p>

                {/* Interaction Bar */}
                <div className="mt-auto pt-4 border-t border-white/[0.05] flex items-center justify-between">
                    <div className="flex items-center gap-5">
                        <button
                            type="button"
                            onClick={handleLike}
                            className={`flex items-center gap-2 transition-all active:scale-90 ${isLiked ? 'text-pink-500' : 'text-neutral-500 hover:text-white'
                                }`}
                        >
                            <Heart
                                size={18}
                                fill={isLiked ? "currentColor" : "none"}
                                className={isLiked ? "drop-shadow-[0_0_8px_rgba(236,72,153,0.5)]" : ""}
                            />
                            <span className="text-[11px] font-black tracking-tighter">
                                {isLiked ? '1' : '0'}
                            </span>
                        </button>

                        <button
                            type="button"
                            onClick={handleShare}
                            className="text-neutral-500 hover:text-white transition-colors active:scale-90"
                        >
                            <Share2 size={18} />
                        </button>
                    </div>

                    <div className="flex items-center gap-1.5 text-neutral-600">
                        <Clock size={12} />
                        <span className="text-[10px] font-bold uppercase tracking-widest">
                            {article.readTime}m
                        </span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}