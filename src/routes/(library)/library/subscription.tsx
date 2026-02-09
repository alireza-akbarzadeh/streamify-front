import { createFileRoute } from '@tanstack/react-router'
import { Check, Zap, Shield, Globe, CreditCard, ArrowUpRight, History } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Typography } from "@/components/ui/typography"
import { cn } from "@/lib/utils"

export const Route = createFileRoute('/(library)/library/subscription')({
    component: SubscriptionPage,
})

function SubscriptionPage() {
    return (
        <div className="min-h-screen bg-black text-white selection:bg-primary selection:text-black">
            <div className="max-w-[1200px] mx-auto px-6 py-12 md:px-16 md:py-24">

                {/* Header */}
                <header className="mb-20">
                    <Typography.H1 className="text-7xl md:text-9xl font-black tracking-tighter uppercase italic leading-none">
                        Billing<span className="text-zinc-800">.</span>
                    </Typography.H1>
                    <div className="mt-6 flex items-center gap-4">
                        <div className="h-[2px] w-12 bg-primary" />
                        <Typography.P className="text-zinc-500 tracking-[0.4em] text-[10px] uppercase font-black">
                            Membership & Resource Allocation
                        </Typography.P>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

                    {/* Left Column: Current Plan & Usage */}
                    <div className="lg:col-span-7 space-y-12">

                        <section className="bg-zinc-950 border border-white/5 rounded-[2.5rem] p-10 relative overflow-hidden group">
                            <div className="relative z-10">
                                <div className="flex justify-between items-start mb-12">
                                    <div>
                                        <Typography.S className="text-primary font-black uppercase tracking-[0.3em] text-[10px]">Active Protocol</Typography.S>
                                        <Typography.H2 className="text-6xl font-black uppercase tracking-tighter mt-2 border-none">Enterprise</Typography.H2>
                                    </div>
                                    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 text-center">
                                        <Typography.S className="block text-[10px] font-black uppercase text-zinc-500">Monthly</Typography.S>
                                        <Typography.S className="block text-xl font-black">$149</Typography.S>
                                    </div>
                                </div>

                                {/* Usage Meters */}
                                <div className="space-y-8">
                                    <UsageMeter label="API Requests" current={84000} total={100000} />
                                    <UsageMeter label="Storage Capacity" current={1.2} total={5} unit="TB" />
                                    <UsageMeter label="Catalog Seats" current={8} total={10} />
                                </div>

                                <div className="mt-12 flex gap-4">
                                    <Button className="h-14 px-10 rounded-full font-black uppercase tracking-widest text-[10px] bg-white text-black hover:bg-primary transition-all">
                                        Upgrade Tier
                                    </Button>
                                    <Button variant="outline" className="h-14 px-10 rounded-full font-black uppercase tracking-widest text-[10px] border-white/10">
                                        Update Payment
                                    </Button>
                                </div>
                            </div>

                            {/* Abstract decorative element */}
                            <div className="absolute -right-20 -top-20 size-80 bg-primary/5 rounded-full blur-[100px] group-hover:bg-primary/10 transition-all duration-1000" />
                        </section>

                        {/* Billing History */}
                        <section className="space-y-6">
                            <div className="flex items-center gap-4">
                                <History size={16} className="text-zinc-500" />
                                <Typography.H3 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500">Transaction Registry</Typography.H3>
                            </div>
                            <div className="border border-white/5 rounded-3xl overflow-hidden bg-zinc-900/20">
                                <HistoryItem date="Feb 01, 2026" amount="$149.00" status="Cleared" />
                                <HistoryItem date="Jan 01, 2026" amount="$149.00" status="Cleared" />
                                <HistoryItem date="Dec 01, 2025" amount="$149.00" status="Cleared" />
                            </div>
                        </section>
                    </div>

                    {/* Right Column: Perks & Support */}
                    <div className="lg:col-span-5 space-y-8">
                        <aside className="bg-zinc-900/30 border border-white/5 rounded-[2rem] p-8 space-y-8">
                            <Typography.H3 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Included Features</Typography.H3>
                            <ul className="space-y-6">
                                <PerkItem icon={<Zap />} title="Real-time Telemetry" desc="Sub-millisecond data synchronization." />
                                <PerkItem icon={<Shield />} title="Advanced Encryption" desc="AES-256 hardware-level security." />
                                <PerkItem icon={<Globe />} title="Global Edge" desc="Priority routing on 40+ nodes." />
                            </ul>
                            <Separator className="bg-white/5" />
                            <div className="pt-4">
                                <Typography.P className="text-[10px] text-zinc-500 uppercase font-black tracking-widest leading-relaxed">
                                    Need a custom arrangement? <br />
                                    <span className="text-white cursor-pointer hover:text-primary transition-colors">Contact Engineering Support</span>
                                </Typography.P>
                            </div>
                        </aside>

                        <div className="p-8 border border-red-500/10 rounded-[2rem] bg-red-500/5 group hover:bg-red-500/10 transition-all cursor-pointer">
                            <Typography.S className="block font-black uppercase tracking-widest text-[10px] text-red-500">Danger Zone</Typography.S>
                            <div className="flex items-center justify-between mt-2">
                                <Typography.P className="text-zinc-500 text-[10px] font-black uppercase tracking-widest">Terminate Membership</Typography.P>
                                <ArrowUpRight size={16} className="text-zinc-500 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

/**
 * UI SUB-COMPONENTS
 */

function UsageMeter({ label, current, total, unit = "" }: { label: string, current: number, total: number, unit?: string }) {
    const percentage = (current / total) * 100
    return (
        <div className="space-y-3">
            <div className="flex justify-between items-end">
                <Typography.S className="text-[10px] font-black uppercase tracking-widest text-zinc-400">{label}</Typography.S>
                <Typography.S className="text-[10px] font-black uppercase tracking-widest">
                    {current}{unit} <span className="text-zinc-600">/ {total}{unit}</span>
                </Typography.S>
            </div>
            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <div
                    className="h-full bg-primary transition-all duration-1000 ease-out"
                    style={{ width: `${percentage}%` }}
                />
            </div>
        </div>
    )
}

function HistoryItem({ date, amount, status }: { date: string, amount: string, status: string }) {
    return (
        <div className="flex items-center justify-between p-6 border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
            <Typography.S className="text-[11px] font-black uppercase tracking-widest">{date}</Typography.S>
            <div className="flex items-center gap-8">
                <Typography.S className="text-[11px] font-black tracking-widest">{amount}</Typography.S>
                <div className="flex items-center gap-2">
                    <div className="size-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(var(--primary),0.6)]" />
                    <Typography.S className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-500">{status}</Typography.S>
                </div>
            </div>
        </div>
    )
}

function PerkItem({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
    return (
        <li className="flex gap-5">
            <div className="size-10 shrink-0 bg-white/5 rounded-xl flex items-center justify-center text-primary border border-white/5">
                {icon}
            </div>
            <div className="space-y-1">
                <Typography.S className="block text-xs font-black uppercase tracking-widest text-white">{title}</Typography.S>
                <Typography.P className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold leading-tight">{desc}</Typography.P>
            </div>
        </li>
    )
}

function Span({ children, className }: { children: React.ReactNode, className?: string }) {
    return <span className={className}>{children}</span>
}