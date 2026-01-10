import { AppWindowMac, Settings, Settings2 } from 'lucide-react'
import { Button } from '../ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu'


export function SettingVideoOptions() {
    return (
        <div>
            <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                    <Button variant='text'>
                        <Settings />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='center'>
                    <DropdownMenuItem >
                        <AppWindowMac className='' />
                        Full size
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}
