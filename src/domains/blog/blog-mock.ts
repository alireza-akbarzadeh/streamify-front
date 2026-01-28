import { Film, Headphones, Music, Play, Sparkles, User } from "lucide-react";

export const BLOG_CATEGORIES = [
	{ id: "all", label: "All Stories", icon: Sparkles },
	{ id: "music", label: "Music Stories", icon: Music },
	{ id: "movies", label: "Movie Reviews", icon: Film },
	{ id: "artists", label: "Artist Spotlights", icon: User },
	{ id: "behind", label: "Behind the Scenes", icon: Play },
	{ id: "playlists", label: "Playlists", icon: Headphones },
];
export type FeatureArticle = {
	id: number;
	title: string;
	excerpt: string;
	category: string;
	image?: string;
	author: {
		name: string;
		avatar: string;
		role?: string;
	};
	readTime: number;
	publishDate: string;
	views?: number;
	likes?: number;
};
export const FEATURED_ARTICLE: FeatureArticle = {
	id: 1,
	title: "The Evolution of Sound: How Electronic Music Shaped Modern Cinema",
	excerpt:
		"From Vangelis to Hans Zimmer, explore the profound relationship between electronic soundscapes and visual storytelling.",
	category: "music",
	image:
		"https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&q=80",
	author: {
		name: "Elena Rodriguez",
		avatar:
			"https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
		role: "Music Curator",
	},
	readTime: 8,
	publishDate: "Jan 25, 2026",
	views: 4,
	likes: 56,
};
export const MOCK_ARTICLES: FeatureArticle[] = [
	{
		id: 2,
		title: "Midnight Jazz: A Deep Dive into the Blue Note Era",
		excerpt:
			"From the cigarette-stained keys of Bill Evans to the experimental structures of Miles Davis, we explore why the 1950s jazz scene remains the definitive blueprint for late-night atmosphere. This isn't just background noise; it's a historical masterclass in mood and melancholy.",
		category: "playlists",
		image:
			"https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&q=80",
		author: {
			name: "Marcus Chen",
			avatar:
				"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
		},
		readTime: 12,
		publishDate: "Jan 24, 2026",
		views: 1420,
		likes: 342,
	},
	{
		id: 3,
		title:
			"The Death of the Major Label? How 2026 Became the Year of the Indie",
		excerpt:
			"Distribution used to be the gatekeeper. Now, with decentralized streaming and AI-driven discovery, artists are keeping 90% of their royalties. We sat down with three breakout musicians who turned down seven-figure contracts to stay independent and own their masters.",
		category: "music",
		image:
			"https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80",
		author: {
			name: "Sophie Lee",
			avatar:
				"https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=100&q=80",
		},
		readTime: 6,
		publishDate: "Jan 23, 2026",
		views: 2840,
		likes: 512,
	},
	{
		id: 4,
		title: "Hans Zimmer vs. The Machine: The Ethics of AI Film Scoring",
		excerpt:
			"As generative audio tools begin to mimic the 'BWAHHH' of modern blockbusters, movie composers are facing an existential crisis. Is a score truly 'original' if it's optimized by an algorithm to trigger dopamine? Liam Patel investigates the shifting landscape of cinematic sound.",
		category: "behind",
		image:
			"https://images.unsplash.com/photo-1464983953574-0892a716854b?w=800&q=80",
		author: {
			name: "Liam Patel",
			avatar:
				"https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=100&q=80",
		},
		readTime: 15,
		publishDate: "Jan 22, 2026",
		views: 8902,
		likes: 1204,
	},
	{
		id: 5,
		title: "The Analog Resurgence: Why Gen Z is Buying 8-Track Tapes",
		excerpt:
			"First it was vinyl, then cassettes. Now, the clunky 8-track is making a bizarre comeback in the underground scenes of Berlin and Brooklyn. We explore the tactile obsession with 'perfectly imperfect' sound and the rejection of the digital clean-cut aesthetic.",
		category: "culture",
		image:
			"https://images.unsplash.com/photo-1514525253344-f2105156a00c?w=800&q=80",
		author: {
			name: "Ava Johnson",
			avatar:
				"https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&q=80",
		},
		readTime: 8,
		publishDate: "Jan 21, 2026",
		views: 3120,
		likes: 89,
	},
	{
		id: 6,
		title: "Beyond the Neon: The Darker Side of Synthwave Revival",
		excerpt:
			"While most associate the genre with 'Stranger Things' and 80s nostalgia, a new wave of producers is taking the sound into brutalist, industrial territory. Forget palm trees and Ferraris; this is the soundtrack to a cyberpunk dystopia you actually live in.",
		category: "music",
		image:
			"https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=800&q=80",
		author: {
			name: "Noah Kim",
			avatar:
				"https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&q=80",
		},
		readTime: 4,
		publishDate: "Jan 20, 2026",
		views: 340,
		likes: 12,
	},
	{
		id: 7,
		title: "Sonic Brutalism: The Rise of Industrial Techno",
		excerpt:
			"In the basements of East London and the warehouses of Detroit, a new sound is emerging. It's harsh, uncompromising, and designed for a generation that finds beauty in the mechanical grind of urban life. This isn't music for dancing; it's music for survival.",
		category: "underground",
		image:
			"https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=800&q=80",
		author: {
			name: "David Vane",
			avatar:
				"https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80",
		},
		readTime: 10,
		publishDate: "Jan 19, 2026",
		views: 5200,
		likes: 890,
	},
];

export interface Comment {
	id: number;
	author: {
		name: string;
		avatar: string;
		role: "Editor" | "Member" | "Admin";
	};
	content: string;
	likes: number;
	timestamp: string;
	isAdmin: boolean;
	parentId: number | null;
}

export const INITIAL_COMMENTS: Comment[] = [
	{
		id: 1,
		author: {
			name: "Alex Turner",
			avatar:
				"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
			role: "Editor",
		},
		content:
			"This article perfectly captures the essence of the new sonic era. The layering in the production is phenomenal.",
		likes: 24,
		timestamp: "2h ago",
		isAdmin: true,
		parentId: null,
	},
	{
		id: 2,
		author: {
			name: "Sarah Chen",
			avatar:
				"https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
			role: "Member",
		},
		content:
			"Totally agree! I've been experimenting with similar textures in my own home studio setup. Any tips for the low-end clarity?",
		likes: 12,
		timestamp: "1h ago",
		isAdmin: false,
		parentId: 1,
	},
];
