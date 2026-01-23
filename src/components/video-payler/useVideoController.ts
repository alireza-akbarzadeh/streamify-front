import { useCallback, useEffect, useState } from "react";
import { useVideoState } from "./useVIdeoState";

export function useVideoController(
	videoRef: React.RefObject<HTMLVideoElement | null>,
) {
	const state = useVideoState(videoRef);
	const { isPlaying, setIsPlaying } = state;
	const [isWaiting, setIsWaiting] = useState(false);

	// BUFFERING LOGIC
	useEffect(() => {
		const video = videoRef.current;
		if (!video) return;

		const onWaiting = () => setIsWaiting(true);
		const onPlaying = () => setIsWaiting(false);

		video.addEventListener("waiting", onWaiting);
		video.addEventListener("playing", onPlaying);
		video.addEventListener("canplay", onPlaying);

		return () => {
			video.removeEventListener("waiting", onWaiting);
			video.removeEventListener("playing", onPlaying);
			video.removeEventListener("canplay", onPlaying);
		};
	}, [videoRef]);

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

	// Inside useVideoController.ts

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			const video = videoRef.current;
			if (
				!video ||
				e.target instanceof HTMLInputElement ||
				e.target instanceof HTMLTextAreaElement
			)
				return;

			// Use e.key for characters and e.code for physical locations
			const key = e.key.toLowerCase();

			switch (e.code) {
				case "Space":
				case "KeyK":
					e.preventDefault();
					togglePlay();
					break;
				case "ArrowRight":
				case "KeyL":
					skip(10);
					break;
				case "ArrowLeft":
				case "KeyJ":
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
				case "KeyM":
					video.muted = !video.muted;
					break;
				case "KeyF":
					if (!document.fullscreenElement) {
						video.parentElement?.requestFullscreen();
					} else {
						document.exitFullscreen();
					}
					break;
				case "Digit0":
				case "Numpad0":
					video.currentTime = 0;
					break;

				// SPEED CONTROLS (Handling both Key and Code for reliability)
				case "Period":
					if (e.shiftKey || e.key === ">") {
						video.playbackRate = Math.min(video.playbackRate + 0.25, 2);
					}
					break;
				case "Comma":
					if (e.shiftKey || e.key === "<") {
						video.playbackRate = Math.max(video.playbackRate - 0.25, 0.25);
					}
					break;
			}

			// Additional shortcuts using e.key
			if (key === "i") {
				// Picture-in-Picture
				if (document.pictureInPictureElement) {
					document.exitPictureInPicture();
				} else if (video.requestPictureInPicture) {
					video.requestPictureInPicture();
				}
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [togglePlay, skip, videoRef]);

	return { ...state, togglePlay, skip, isWaiting, isPlaying };
}
