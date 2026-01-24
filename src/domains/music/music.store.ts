import { Store } from "@tanstack/react-store";

export interface Song {
	id: number;
	title: string;
	artist: string;
	album: string;
	albumArt: string;
	duration: number;
}
export interface LibraryItem {
	id: string;
	title: string;
	subtitle: string;
	type: "playlist" | "artist";
	image: string;
	isPinned?: boolean;
}
// Initial Data
const initialLibrary: LibraryItem[] = [
	{
		id: "liked",
		title: "Liked Songs",
		subtitle: "Playlist • 492 songs",
		type: "playlist",
		image:
			"https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&q=80",
		isPinned: true,
	},
	{
		id: "ellie",
		title: "Ellie Goulding",
		subtitle: "Artist",
		type: "artist",
		image:
			"https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&q=80",
		isPinned: true,
	},
	{
		id: "haamim",
		title: "Haamim",
		subtitle: "Artist",
		type: "artist",
		image:
			"https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&q=80",
	},
	{
		id: "relaxing",
		title: "Relaxing",
		subtitle: "Playlist • Alirezas",
		type: "playlist",
		image:
			"https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&q=80",
	},
	{
		id: "yas-mix",
		title: "Yas Mix",
		subtitle: "Playlist • Spotify",
		type: "playlist",
		image:
			"https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&q=80",
	},
];

export const musicStore = new Store({
	currentSong: {
		id: 1,
		title: "Blinding Lights",
		artist: "The Weeknd",
		album: "After Hours",
		albumArt:
			"https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&q=80",
		duration: 245,
	} as Song | null,
	isPlaying: false,
	currentTime: 0,
	library: initialLibrary,
	searchQuery: "",
	activeFilter: "All" as "All" | "Playlists" | "Artists",
});

// Action helpers
export const setCurrentSong = (song: Song) => {
	musicStore.setState((state) => ({
		...state,
		currentSong: song,
		isPlaying: true,
	}));
};

export const togglePlay = () => {
	musicStore.setState((state) => ({ ...state, isPlaying: !state.isPlaying }));
};

export const updateCurrentTime = (time: number) => {
	musicStore.setState((state) => ({ ...state, currentTime: time }));
};

export const setSearchQuery = (query: string) => {
	musicStore.setState((s) => ({ ...s, searchQuery: query }));
};

export const setFilter = (filter: "All" | "Playlists" | "Artists") => {
	musicStore.setState((s) => ({ ...s, activeFilter: filter }));
};

export const addLibraryItem = (item: LibraryItem) => {
	musicStore.setState((s) => ({ ...s, library: [item, ...s.library] }));
};
