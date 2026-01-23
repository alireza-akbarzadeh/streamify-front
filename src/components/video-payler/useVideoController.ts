import { useCallback, useEffect } from "react";
import { useVideoState } from "./useVIdeoState";

export function useVideoController(
	videoRef: React.RefObject<HTMLVideoElement | null>,
) {
	const state = useVideoState(videoRef);
	const { isPlaying, setIsPlaying } = state;

	const togglePlay = useCallback(() => {
		if (!videoRef.current) return;
		if (videoRef.current.paused) {
			videoRef.current.play();
			setIsPlaying(true);
		} else {
			videoRef.current.pause();
			setIsPlaying(false);
		}
	}, [setIsPlaying, videoRef]);

	const skip = useCallback(
		(amount: number) => {
			if (videoRef.current) videoRef.current.currentTime += amount;
		},
		[videoRef],
	);

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			const video = videoRef.current;
			if (!video) return;

			switch (e.code) {
				case "Space":
					e.preventDefault();
					togglePlay();
					break;
				case "ArrowRight":
					skip(10);
					break;
				case "ArrowLeft":
					skip(-10);
					break;
				case "ArrowUp":
					e.preventDefault();
					video.volume = Math.min(video.volume + 0.1, 1);
					break;
				case "ArrowDown":
					e.preventDefault();
					video.volume = Math.max(video.volume - 0.1, 0);
					break;
				case "KeyF":
					if (!document.fullscreenElement) video.requestFullscreen();
					else document.exitFullscreen();
					break;
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [togglePlay, skip, videoRef]);

	return { ...state, togglePlay, skip };
}
