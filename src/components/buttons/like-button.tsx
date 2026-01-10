import { Heart } from 'lucide-react'
import { Button } from '../ui/button'

//TODO: animation effect 
export function LikeButton() {
    return (
        <Button
            size="lg"
            variant="ghost"
            className="bg-white/5 hover:bg-white/10 text-white rounded-full"
        >
            <Heart className="w-5 h-5" />
        </Button>
    )
}
