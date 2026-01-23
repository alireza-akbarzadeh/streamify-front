import { Store } from "@tanstack/react-store";

export interface Song {
	id: number;
	title: string;
	artist: string;
	album: string;
	albumArt: string;
	duration: number;
}

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
