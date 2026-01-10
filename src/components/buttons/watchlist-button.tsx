import { Plus } from 'lucide-react'
import { Button } from '../ui/button'


//TODO: animation effect 

export function WatchListButton() {
    return (
        <Button
            size="lg"
            variant="outline"
            className="bg-white/5 border-white/20 text-white hover:bg-white/10 hover:border-white/30 rounded-full px-8"
        >
            <Plus className="w-5 h-5 mr-2" />
            Watchlist
        </Button>
    )
}
