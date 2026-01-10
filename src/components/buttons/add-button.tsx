
import { Check, Plus } from 'lucide-react'
import { Button } from '../ui/button'
import { useState } from 'react'
import { cn } from '@/lib/utils'

//TODO: animation effect 
interface AddButtonProps {
    className?: string
}
export function AddButton(props: AddButtonProps) {
    const { className } = props
    const [isChecked, setIsChecked] = useState<boolean>(false)
    return (
        <Button
            onClick={() => setIsChecked((prev) => !prev)}
            size="sm"
            variant="ghost"
            className={cn("w-10 h-10 p-0 bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/20 rounded-lg group",
                isChecked && "bg-green-400/10  hover:bg-green-400/20 border border-green-400/20", className)}
        >
            {isChecked ? (
                <Check className={cn("w-5 h-5 text-white  transition-all", isChecked && "text-green-400")} />
            ) : (
                <Plus className="w-5 h-5 text-white group-hover:rotate-90 transition-transform" />
            )}
        </Button>
    )
}
