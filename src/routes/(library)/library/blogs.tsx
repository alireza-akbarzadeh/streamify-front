import { createFileRoute } from "@tanstack/react-router";

import { motion } from "framer-motion";
import {
	MotionPage,
	staggerContainer,
} from "@/components/motion/motion-page.tsx";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BlogCard } from "@/domains/library/components/blog-card.tsx";
import { mockBlogs } from "@/domains/library/library-mock-data.ts";

export const Route = createFileRoute("/(library)/library/blogs")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<MotionPage>
			{/* Header */}
			<section className="mb-8">
				<h1 className="text-4xl font-bold text-foreground mb-2">
					Blog & Articles
				</h1>
				<p className="text-muted-foreground">
					Deep dives into music and cinema culture
				</p>
			</section>

			{/* Tabs */}
			<Tabs defaultValue="all" className="mb-8">
				<TabsList className="bg-card">
					<TabsTrigger value="all">All</TabsTrigger>
					<TabsTrigger value="music">🎵 Music</TabsTrigger>
					<TabsTrigger value="movies">🎬 Movies</TabsTrigger>
				</TabsList>

				<TabsContent value="all" className="mt-8">
					{/* Featured */}
					<div className="mb-12">
						<BlogCard blog={mockBlogs[0]} variant="featured" />
					</div>

					{/* Grid */}
					<motion.div
						variants={staggerContainer}
						initial="initial"
						animate="animate"
						className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
					>
						{mockBlogs.slice(1).map((blog) => (
							<BlogCard key={blog.id} blog={blog} />
						))}
					</motion.div>
				</TabsContent>

				<TabsContent value="music" className="mt-8">
					<motion.div
						variants={staggerContainer}
						initial="initial"
						animate="animate"
						className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
					>
						{mockBlogs
							.filter((b) => b.category === "music")
							.map((blog) => (
								<BlogCard key={blog.id} blog={blog} />
							))}
					</motion.div>
				</TabsContent>

				<TabsContent value="movies" className="mt-8">
					<motion.div
						variants={staggerContainer}
						initial="initial"
						animate="animate"
						className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
					>
						{mockBlogs
							.filter((b) => b.category === "movies")
							.map((blog) => (
								<BlogCard key={blog.id} blog={blog} />
							))}
					</motion.div>
				</TabsContent>
			</Tabs>
		</MotionPage>
	);
}
