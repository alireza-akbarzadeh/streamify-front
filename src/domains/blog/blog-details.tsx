import { useNavigate, useParams, useRouter } from '@tanstack/react-router';
import { useStore } from '@tanstack/react-store';
import { AnimatePresence, motion } from 'framer-motion';
import {
    ArrowLeft, Bookmark, Calendar, Eye, Facebook, Heart,
    Link2,
    Quote, Share2, Twitter
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { actions, blogStore } from '@/domains/blog/blog.store';
import { generateSlug } from '@/lib/utils';
import { MOCK_ARTICLES } from './blog-mock';
import { ArticleComments } from './components/article-commnet';

export function BlogPost() {
    const { blogslug } = useParams({ from: '/(blog)/blog/$blogslug' });
    const navigate = useNavigate();
    const router = useRouter();

    const article = MOCK_ARTICLES.find(a => generateSlug(a.title) === blogslug);

    // Global Store Subscriptions
    const isLiked = useStore(blogStore, (s) => article ? s.likes.includes(article.id) : false);
    const isSaved = useStore(blogStore, (s) => article ? s.bookmarks.includes(article.id) : false);
    const globalProgress = useStore(blogStore, (s) => article ? s.readingProgress[article.id] || 0 : 0);

    const [showShareMenu, setShowShareMenu] = useState(false);

    useEffect(() => {
        if (!article) return;
        const handleScroll = () => {
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            const scrollTop = window.scrollY;
            const progress = Math.round((scrollTop / (documentHeight - windowHeight)) * 100);

            if (progress > (blogStore.state.readingProgress[article.id] || 0)) {
                actions.updateProgress(article.id, progress);
            }
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [article]);

    const handleCopyLink = () => {
        navigator.clipboard.writeText(window.location.href);
        toast.success("Link copied to clipboard!");
        setShowShareMenu(false);
    };

    if (!article) return <div className="p-20 text-center text-white">Article not found.</div>;

    return (
        <div className="min-h-screen bg-[#050505]">
            {/* Reading Progress Bar (Still useful at top even without header) */}
            <motion.div
                className="fixed top-0 left-0 h-1 bg-gradient-to-r from-purple-600 to-pink-600 z-50"
                style={{ width: `${globalProgress}%` }}
            />

            {/* Floating Back Button */}
            <motion.button
                onClick={() => router.history.back()}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="fixed top-8 left-8 z-50 flex items-center gap-2 text-gray-400 hover:text-white transition-colors bg-black/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/5"
            >
                <ArrowLeft className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-widest">Back</span>
            </motion.button>

            {/* Hero Image */}
            <section className="relative h-[85vh] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-[#050505] z-10" />
                <motion.img
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    src={article.image}
                    className="w-full h-full object-cover opacity-60"
                />
            </section>

            <article className="max-w-4xl mx-auto px-6 -mt-64 relative z-20 pb-32">
                {/* Meta info */}
                <div className="flex items-center gap-6 mb-8">
                    <span className="px-4 py-1.5 bg-purple-500/20 backdrop-blur-xl rounded-full text-[10px] font-black text-purple-400 border border-purple-500/30 uppercase tracking-[0.2em]">
                        {article.category}
                    </span>
                    <div className="flex items-center gap-2 text-neutral-500 text-xs font-bold uppercase tracking-widest">
                        <Calendar size={14} /> {article.publishDate}
                    </div>
                    <div className="flex items-center gap-2 text-neutral-500 text-xs font-bold uppercase tracking-widest">
                        <Eye size={14} /> {article.views?.toLocaleString() || "12k"} Views
                    </div>
                </div>

                <h1 className="text-5xl md:text-8xl font-black text-white mb-8 leading-[0.9] tracking-tighter">
                    {article.title}
                </h1>

                <p className="text-xl md:text-2xl text-neutral-400 mb-12 font-medium leading-relaxed max-w-3xl">
                    {article.excerpt}
                </p>

                {/* THE INTERACTION BAR (Like, Bookmark, Share moved here) */}
                <div className="flex items-center justify-between pb-12 mb-16 border-b border-white/5">
                    <div className="flex items-center gap-4">
                        <img src={article.author.avatar} className="w-14 h-14 rounded-full border-2 border-white/10 shadow-2xl" />
                        <div>
                            <div className="text-white font-bold text-lg">{article.author.name}</div>
                            <div className="text-xs text-neutral-500 font-bold uppercase tracking-widest">{article.author.role}</div>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        {/* LIKE */}
                        <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={() => actions.toggleLike(article.id)}
                            className={`flex items-center gap-2 px-6 py-3 rounded-full border transition-all ${isLiked ? 'bg-pink-500/10 border-pink-500/50 text-pink-500' : 'bg-white/5 border-white/10 text-neutral-400 hover:text-white'
                                }`}
                        >
                            <Heart size={18} fill={isLiked ? "currentColor" : "none"} />
                            <span className="font-black text-[10px] uppercase tracking-widest">{isLiked ? 'Liked' : 'Like'}</span>
                        </motion.button>

                        {/* BOOKMARK */}
                        <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={() => actions.toggleBookmark(article.id)}
                            className={`p-3 rounded-full border transition-all ${isSaved ? 'bg-purple-500/10 border-purple-500/50 text-purple-500' : 'bg-white/5 border-white/10 text-neutral-400 hover:text-white'
                                }`}
                        >
                            <Bookmark size={18} fill={isSaved ? "currentColor" : "none"} />
                        </motion.button>

                        {/* SHARE */}
                        <div className="relative">
                            <motion.button
                                whileTap={{ scale: 0.9 }}
                                onClick={() => setShowShareMenu(!showShareMenu)}
                                className={`p-3 rounded-full border transition-all ${showShareMenu ? 'bg-white/10 text-white' : 'bg-white/5 border-white/10 text-neutral-400 hover:text-white'
                                    }`}
                            >
                                <Share2 size={18} />
                            </motion.button>

                            <AnimatePresence>
                                {showShareMenu && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        className="absolute right-0 top-14 bg-neutral-900 border border-white/10 rounded-2xl p-2 w-48 shadow-2xl z-50"
                                    >
                                        <button onClick={handleCopyLink} className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-neutral-400 hover:text-white hover:bg-white/5 transition-all text-xs font-bold uppercase tracking-wider">
                                            <Link2 size={14} /> Copy Link
                                        </button>
                                        <button className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-neutral-400 hover:text-white hover:bg-white/5 transition-all text-xs font-bold uppercase tracking-wider">
                                            <Twitter size={14} /> Twitter
                                        </button>
                                        <button className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-neutral-400 hover:text-white hover:bg-white/5 transition-all text-xs font-bold uppercase tracking-wider">
                                            <Facebook size={14} /> Facebook
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>

                {/* Article Body */}
                <div className="prose prose-invert prose-purple max-w-none mb-20">
                    <p className="text-xl text-neutral-300 leading-relaxed italic opacity-80 mb-12">
                        In the dimly lit studios of the late 1970s, something revolutionary was taking shape...
                    </p>

                    <div className="my-16 p-12 bg-white/[0.02] border-l-4 border-purple-500 rounded-2xl relative overflow-hidden group">
                        <Quote className="absolute -top-4 -left-4 w-24 h-24 text-purple-500/10 rotate-12" />
                        <blockquote className="text-3xl font-bold text-white leading-tight border-none p-0 relative z-10">
                            "The sound is not just an accompaniment; it is the soul of the visual narrative."
                        </blockquote>
                        <cite className="block mt-6 text-neutral-500 font-bold uppercase tracking-widest not-italic">— Hans Zimmer</cite>
                    </div>

                    <p className="text-lg text-neutral-300 leading-loose">
                        Vangelis's haunting score for Blade Runner wasn't just music—it was the sonic embodiment of a dystopian future. The synthesizers didn't merely accompany the visuals; they became part of the film's DNA...
                    </p>
                </div>

                <ArticleComments />

                {/* Related Articles */}
                <div className="mt-32">
                    <h3 className="text-2xl font-black text-white mb-10 uppercase tracking-widest">Keep Exploring</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        {MOCK_ARTICLES.filter(a => a.id !== article.id).slice(0, 2).map(item => (
                            <div
                                key={item.id}
                                onClick={() => navigate({ to: "/blog/$blogslug", params: { blogslug: generateSlug(item.title) } })}
                                className="group cursor-pointer"
                            >
                                <div className="aspect-[16/9] rounded-3xl overflow-hidden mb-6 bg-neutral-900 border border-white/5">
                                    <img src={item.image} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
                                </div>
                                <h4 className="font-bold text-xl text-neutral-300 group-hover:text-purple-400 transition-colors leading-tight">{item.title}</h4>
                            </div>
                        ))}
                    </div>
                </div>
            </article>
        </div>
    );
}