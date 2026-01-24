import { Store } from "@tanstack/react-store";

export const playerStore = new Store({
	volume: 70,
	isMuted: false,
	isShuffle: false,
	repeatMode: "off" as "off" | "all" | "one",
	likedSongIds: new Set<number>(),
});

// Actions
export const setVolume = (volume: number) =>
	playerStore.setState((s) => ({
		...s,
		volume: Math.max(0, Math.min(100, volume)),
	}));

export const toggleMute = () =>
	playerStore.setState((s) => ({ ...s, isMuted: !s.isMuted }));

export const toggleShuffle = () =>
	playerStore.setState((s) => ({ ...s, isShuffle: !s.isShuffle }));

export const toggleLike = (songId: number) => {
	playerStore.setState((s) => {
		const next = new Set(s.likedSongIds);
		next.has(songId) ? next.delete(songId) : next.add(songId);
		return { ...s, likedSongIds: next };
	});
};
