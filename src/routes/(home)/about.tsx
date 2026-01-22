import { createFileRoute } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { Film, Music, Users } from 'lucide-react'

import { toast } from 'sonner'
import { RootHeader } from '@/components/root-header'
import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/(home)/about')({
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <>
            <RootHeader />
            <div className="min-h-screen bg-linear-to-b from-[#0f0f0f] to-[#1a1a1a] text-white font-sans">
                {/* Hero Section */}
                <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        className="text-center z-10 px-4"
                    >
                        <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
                            Welcome to Vibe
                        </h1>
                        <p className="mt-4 text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
                            Stream movies, music, and more with the ultimate entertainment experience.
                            Vibe brings everything you love in one place.
                        </p>
                        <Button
                            className="mt-6 px-8 py-3 bg-linear-to-r from-purple-600 to-pink-500 hover:scale-105 transition-transform"
                            onClick={() => toast('Thanks for joining Vibe!')}
                        >
                            Get Started
                        </Button>
                    </motion.div>
                    <motion.div
                        className="absolute inset-0 bg-[url('/hero-bg.jpg')] bg-cover bg-center opacity-30"
                        initial={{ scale: 1.2 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 20, repeat: Infinity, yoyo: true }}
                    />
                </section>

                {/* Features Section */}
                <section className="py-20 px-6 md:px-20">
                    <h2 className="text-4xl font-bold text-center mb-12">Why Vibe?</h2>
                    <div className="grid md:grid-cols-3 gap-12">
                        <FeatureCard
                            icon={<Film size={40} className="text-purple-500" />}
                            title="Movies & Series"
                            description="Discover thousands of movies and series, curated for your perfect vibe."
                        />
                        <FeatureCard
                            icon={<Music size={40} className="text-pink-500" />}
                            title="Music Streaming"
                            description="Stream your favorite music anytime, anywhere, with playlists that match your mood."
                        />
                        <FeatureCard
                            icon={<Users size={40} className="text-indigo-500" />}
                            title="Community & Sharing"
                            description="Connect with friends, share playlists, and see what’s trending in real-time."
                        />
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-20 bg-linear-to-r from-purple-800 to-pink-600 text-white text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className="text-4xl md:text-5xl font-bold mb-6"
                    >
                        Ready to feel the vibe?
                    </motion.h2>
                    <Button
                        className="px-8 py-4 bg-white text-black font-bold rounded-xl hover:scale-105 transition-transform"
                        onClick={() => toast('Welcome to the Vibe!')}
                    >
                        Join Now
                    </Button>
                </section>
            </div>
        </>
    )
}


function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
    return (
        <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-[#111111] rounded-xl p-8 flex flex-col items-center text-center shadow-xl hover:shadow-2xl transition-shadow"
        >
            <div className="mb-4">{icon}</div>
            <h3 className="text-2xl font-semibold mb-2">{title}</h3>
            <p className="text-gray-400">{description}</p>
        </motion.div>
    )
}