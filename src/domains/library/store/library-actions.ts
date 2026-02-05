// Actions
import { appStore } from "@/domains/library/store/library-store.ts";
import type {
	Podcast,
	Track,
} from "@/domains/library/store/library-store-types.ts";

export const libraryActions = {
	// Player actions
	playTrack: (track: Track) => {
		appStore.setState((state) => ({
			...state,
			player: {
				...state.player,
				isPlaying: true,
				currentTrack: track,
				currentPodcast: null,
				progress: 0,
			},
			history: {
				...state.history,
				tracks: [
					track.id,
					...state.history.tracks.filter((id) => id !== track.id),
				].slice(0, 50),
			},
		}));
	},

	playPodcast: (podcast: Podcast) => {
		appStore.setState((state) => ({
			...state,
			player: {
				...state.player,
				isPlaying: true,
				currentPodcast: podcast,
				currentTrack: null,
				progress: 0,
			},
			history: {
				...state.history,
				podcasts: [
					podcast.id,
					...state.history.podcasts.filter((id) => id !== podcast.id),
				].slice(0, 50),
			},
		}));
	},

	togglePlay: () => {
		appStore.setState((state) => ({
			...state,
			player: {
				...state.player,
				isPlaying: !state.player.isPlaying,
			},
		}));
	},

	setVolume: (volume: number) => {
		appStore.setState((state) => ({
			...state,
			player: {
				...state.player,
				volume: Math.max(0, Math.min(1, volume)),
			},
		}));
	},

	setProgress: (progress: number) => {
		appStore.setState((state) => ({
			...state,
			player: {
				...state.player,
				progress,
			},
		}));
	},

	toggleShuffle: () => {
		appStore.setState((state) => ({
			...state,
			player: {
				...state.player,
				shuffle: !state.player.shuffle,
			},
		}));
	},

	toggleRepeat: () => {
		appStore.setState((state) => {
			const modes: Array<"off" | "all" | "one"> = ["off", "all", "one"];
			const currentIndex = modes.indexOf(state.player.repeat);
			const nextMode = modes[(currentIndex + 1) % modes.length];
			return {
				...state,
				player: {
					...state.player,
					repeat: nextMode,
				},
			};
		});
	},

	addToQueue: (track: Track) => {
		appStore.setState((state) => ({
			...state,
			player: {
				...state.player,
				queue: [...state.player.queue, track],
			},
		}));
	},

	// Like actions
	toggleLike: (
		type: "tracks" | "videos" | "blogs" | "podcasts",
		id: string,
	) => {
		appStore.setState((state) => {
			const likes = state.likes[type];
			const isLiked = likes.includes(id);
			return {
				...state,
				likes: {
					...state.likes,
					[type]: isLiked ? likes.filter((l) => l !== id) : [...likes, id],
				},
			};
		});
	},

	// Bookmark actions
	toggleBookmark: (
		type: "tracks" | "videos" | "blogs" | "podcasts",
		id: string,
	) => {
		appStore.setState((state) => {
			const bookmarks = state.bookmarks[type];
			const isBookmarked = bookmarks.includes(id);
			return {
				...state,
				bookmarks: {
					...state.bookmarks,
					[type]: isBookmarked
						? bookmarks.filter((b) => b !== id)
						: [...bookmarks, id],
				},
			};
		});
	},

	// History actions
	addToHistory: (
		type: "tracks" | "videos" | "blogs" | "podcasts",
		id: string,
	) => {
		appStore.setState((state) => ({
			...state,
			history: {
				...state.history,
				[type]: [id, ...state.history[type].filter((h) => h !== id)].slice(
					0,
					50,
				),
			},
		}));
	},

	// UI actions
	toggleSidebar: () => {
		appStore.setState((state) => ({
			...state,
			sidebarOpen: !state.sidebarOpen,
		}));
	},

	setSidebarOpen: (open: boolean) => {
		appStore.setState((state) => ({
			...state,
			sidebarOpen: open,
		}));
	},
};
