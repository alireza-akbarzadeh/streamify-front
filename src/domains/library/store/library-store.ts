// Custom hook to use store with selector
import { Store, useStore } from "@tanstack/react-store";
import type { AppState } from "@/domains/library/store/library-store-types.ts";

// Initial state
const initialState: AppState = {
	user: {
		id: "user-1",
		name: "Alex Rivera",
		email: "alex@streamflow.app",
		avatar:
			"https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop",
		joinedAt: "2024-01-15",
	},
	player: {
		isPlaying: false,
		currentTrack: null,
		currentPodcast: null,
		queue: [],
		volume: 0.8,
		progress: 0,
		shuffle: false,
		repeat: "off",
	},
	likes: {
		tracks: [],
		videos: [],
		blogs: [],
		podcasts: [],
	},
	bookmarks: {
		tracks: [],
		videos: [],
		blogs: [],
		podcasts: [],
	},
	history: {
		tracks: [],
		videos: [],
		blogs: [],
		podcasts: [],
	},
	sidebarOpen: true,
};

// Create the store
export const appStore = new Store<AppState>(initialState);

export const useLibraryStore = <T>(selector: (state: AppState) => T): T => {
	return useStore(appStore, selector);
};
