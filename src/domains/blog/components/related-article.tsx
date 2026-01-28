import { useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowUpRight, Clock } from "lucide-react";
import { generateSlug } from '@/lib/utils';
import { MOCK_ARTICLES } from '../blog-mock';

interface RelatedArticleProps {
    articleId?: number;
}

export function RelatedArticle({ articleId }: RelatedArticleProps) {
    const navigate = useNavigate();

    // Select 2 related articles
    const related = MOCK_ARTICLES.filter(a => a.id !== articleId).slice(0, 2);

    return (
        <footer className="relative bg-[#050505] border-t border-white/5 py-40 px-6 overflow-hidden">
            {/* Subtle Ambient Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-linear-to-r from-transparent via-purple-500/50 to-transparent" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
                    <div>
                        <motion.span
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="text-purple-500 text-[10px] font-black uppercase tracking-[0.4em] mb-4 block"
                        >
                            Up Next
                        </motion.span>
                        <h3 className="text-6xl md:text-8xl font-black text-white italic tracking-tighter leading-none">
                            Keep <span className="text-neutral-800 outline-text">Reading</span>
                        </h3>
                    </div>

                    <button
                        type='button'
                        onClick={() => navigate({ to: '/blog' })}
                        className="group flex items-center gap-4 bg-white/5 border border-white/10 px-8 py-4 rounded-full text-white hover:bg-white/10 transition-all duration-500"
                    >
                        <span className="text-xs font-black uppercase tracking-widest">Back to Feed</span>
                        <div className="bg-purple-500 rounded-full p-1 group-hover:rotate-45 transition-transform duration-500">
                            <ArrowUpRight size={16} />
                        </div>
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                    {related.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.8 }}
                            viewport={{ once: true }}
                            onClick={() => navigate({ to: "/blog/$blogslug", params: { blogslug: generateSlug(item.title) } })}
                            className="group cursor-pointer relative"
                        >
                            {/* Card Media Container */}
                            <div className="relative aspect-16/10 rounded-[3rem] overflow-hidden border border-white/10 mb-8 shadow-2xl">
                                {/* Image with Parallax-like scale */}
                                <motion.img
                                    src={item.image}
                                    className="w-full h-full object-cover transition-all duration-1000 ease-out group-hover:scale-110 group-hover:rotate-1"
                                    alt={item.title}
                                />

                                {/* Cinematic Overlays */}
                                <div className="absolute inset-0 bg-linear-to-t from-black via-black/20 to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-700" />
                                <div className="absolute inset-0 bg-purple-900/10 mix-blend-overlay group-hover:bg-transparent transition-all" />

                                {/* Floating Badge */}
                                <div className="absolute top-8 left-8">
                                    <div className="bg-black/40 backdrop-blur-xl border border-white/10 px-4 py-2 rounded-2xl">
                                        <span className="text-[10px] font-black text-white uppercase tracking-widest">{item.category}</span>
                                    </div>
                                </div>

                                {/* Hover Reveal: Read Time */}
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                    <div className="bg-white text-black px-6 py-3 rounded-full flex items-center gap-2 font-black text-xs uppercase tracking-tighter">
                                        Read Story <ArrowUpRight size={16} />
                                    </div>
                                </div>
                            </div>

                            {/* Content Details */}
                            <div className="px-4">
                                <div className="flex items-center gap-4 mb-4">
                                    <span className="flex items-center gap-1.5 text-neutral-500 text-[10px] font-bold uppercase tracking-widest">
                                        <Clock size={12} /> {item.readTime} min read
                                    </span>
                                    <div className="h-px w-8 bg-neutral-800" />
                                    <span className="text-neutral-500 text-[10px] font-bold uppercase tracking-widest">
                                        {item.publishDate}
                                    </span>
                                </div>
                                <h4 className="text-4xl md:text-5xl font-black text-white leading-[0.9] group-hover:text-purple-400 transition-colors duration-500 italic tracking-tighter">
                                    {item.title}
                                </h4>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Background Texture/Noise for "Premium" feel */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        </footer>
    );
}