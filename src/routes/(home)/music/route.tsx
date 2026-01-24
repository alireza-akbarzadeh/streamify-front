import { createFileRoute, Outlet } from '@tanstack/react-router'
import { useStore } from '@tanstack/react-store'
import { BottomPlayer } from '@/domains/music/components/bottom-player'
import { Sidebar } from '@/domains/music/container/sidebar'
import { musicStore, togglePlay, updateCurrentTime } from '@/domains/music/music.store'


export const Route = createFileRoute('/(home)/music')({
    component: MusicLayout,
})

function MusicLayout() {
    const currentSong = useStore(musicStore, (state) => state.currentSong)
    const isPlaying = useStore(musicStore, (state) => state.isPlaying)
    const currentTime = useStore(musicStore, (state) => state.currentTime)

    return (
        <div className="h-screen bg-black flex flex-col overflow-hidden">
            <div className="flex-1 flex overflow-hidden">
                <div className="z-20 shrink-0">
                    <Sidebar />
                </div>
                <main className="flex-1 overflow-y-auto relative bg-[#0a0a0a]">
                    <Outlet />
                </main>
            </div>
            {currentSong && (
                <div className="z-30">
                    <BottomPlayer
                        currentSong={currentSong}
                        isPlaying={isPlaying}
                        onPlayPause={togglePlay}
                        currentTime={currentTime}
                        onTimeChange={updateCurrentTime}
                    />
                </div>
            )}
        </div>
    );
}