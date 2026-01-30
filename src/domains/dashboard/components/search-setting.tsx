import { useNavigate } from "@tanstack/react-router";
import { CreditCard, LogOut, Search, User } from "lucide-react";
import { useEffect, useMemo } from "react";
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from "@/components/ui/command";
import { ICON_MAP, type SidebarGroup } from "@/config/admin-sidebar";

interface CommandSettingProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    data: SidebarGroup[];
}

export function SearchSide({ open, setOpen, data }: CommandSettingProps) {
    const navigate = useNavigate();

    // Flatten the sidebar data for easy searching
    const flatItems = useMemo(() => {
        return data.flatMap((group) =>
            group.items.map((item) => ({
                ...item,
                groupName: group.group,
            }))
        );
    }, [data]);

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((open) => !open);
            }
        };
        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, [setOpen]);

    const onSelect = (href: string) => {
        setOpen(false);
        navigate({ to: href });
    };

    return (
        <CommandDialog open={open} onOpenChange={setOpen}>
            <CommandInput placeholder="Search pages, tools, or settings..." />
            <CommandList className="custom-scrollbar">
                <CommandEmpty>No results found.</CommandEmpty>

                <CommandGroup heading="Navigation">
                    {flatItems.map((item) => {
                        const Icon = item.icon ? (ICON_MAP as any)[item.icon] : Search;
                        return (
                            <CommandItem
                                key={item.href || item.label}
                                onSelect={() => item.href && onSelect(item.href)}
                                className="flex items-center gap-3 py-3 cursor-pointer"
                            >
                                <div className="flex h-8 w-8 items-center justify-center rounded-md border bg-muted">
                                    <Icon className="h-4 w-4 text-muted-foreground" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-medium">{item.label}</span>
                                    <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
                                        {item.groupName}
                                    </span>
                                </div>
                            </CommandItem>
                        );
                    })}
                </CommandGroup>

                <CommandSeparator />

                <CommandGroup heading="Account Quick Actions">
                    <CommandItem onSelect={() => onSelect('/dashboard/settings/general')}>
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile Settings</span>
                    </CommandItem>
                    <CommandItem onSelect={() => onSelect('/dashboard/payments')}>
                        <CreditCard className="mr-2 h-4 w-4" />
                        <span>Billing</span>
                    </CommandItem>
                    <CommandItem className="text-red-500">
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Sign Out</span>
                    </CommandItem>
                </CommandGroup>
            </CommandList>
        </CommandDialog>
    );
}