import { createFileRoute } from '@tanstack/react-router'
import { ArrowUpRight, Bell, CreditCard, Loader2, LogOut, Palette, Shield, User, Zap } from 'lucide-react'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Label } from '@/components/ui/label'
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Typography } from "@/components/ui/typography"
import { cn } from "@/lib/utils"

export const Route = createFileRoute('/(library)/library/setting')({
  component: RouteComponent,
})

function RouteComponent() {
  const [profile, setProfile] = useState({ username: 'ALEX_RIVERA', email: 'alex@streamflow.app' })
  const [isSaving, setIsSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)

  const handleProfileSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsSaving(false)
    setSaveSuccess(true)
    setTimeout(() => setSaveSuccess(false), 2000)
  }

  return (
    <div className="min-h-screen bg-black text-white selection:bg-primary selection:text-black">
      <div className="max-w-[1600px] mx-auto px-6 py-12 md:px-20 md:py-24">

        {/* MASSIVE TITLES - Consistent with your Saved/History pages */}
        <header className="mb-20 md:mb-32">
          <div className="flex items-center gap-3 text-zinc-600 mb-6">
            <Zap size={18} fill="currentColor" />
            <Typography.S className="font-black uppercase tracking-[0.4em] text-[10px]">System Preferences</Typography.S>
          </div>
          <Typography.H1 className="text-8xl md:text-[140px] font-black tracking-[-0.06em] leading-[0.75] uppercase italic">
            Config<span className="text-zinc-800 not-italic">ure</span>
          </Typography.H1>
        </header>

        <Tabs defaultValue="profile" className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12 lg:gap-32">

          {/* NAV - Floating Style */}
          <aside className="space-y-12">
            <TabsList className="flex flex-col w-full h-auto bg-transparent gap-2 p-0">
              <SidebarTrigger value="profile" label="Identity" icon={<User size={14} />} />
              <SidebarTrigger value="security" label="Protection" icon={<Shield size={14} />} />
              <SidebarTrigger value="alerts" label="Broadcasts" icon={<Bell size={14} />} />
              <SidebarTrigger value="theme" label="Interface" icon={<Palette size={14} />} />
              <SidebarTrigger value="plans" label="Membership" icon={<CreditCard size={14} />} />
            </TabsList>

            <div className="pt-12 border-t border-white/5">
              <Typography.S className="text-[9px] font-black text-zinc-700 uppercase tracking-[0.3em] mb-6 block">Account Status</Typography.S>
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-zinc-950 border border-white/5">
                <div className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                <Typography.S className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Authenticated</Typography.S>
              </div>
              <Button
                variant="ghost"
                className="w-full justify-start gap-4 mt-4 text-zinc-600 hover:text-red-500 hover:bg-red-500/5 rounded-xl font-black uppercase tracking-widest text-[9px]"
              >
                <LogOut size={14} /> Terminate
              </Button>
            </div>
          </aside>

          {/* CONTENT */}
          <main className="max-w-3xl">

            {/* PROFILE CONTENT */}
            <TabsContent value="profile" className="m-0 space-y-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <section className="space-y-12">
                <ContentHeader title="Identity Registry" subtitle="Core identification parameters" />

                <form onSubmit={handleProfileSave} className="space-y-16">
                  <div className="grid gap-10">
                    <InputGroup
                      label="User Alias"
                      value={profile.username}
                      onChange={(v) => setProfile({ ...profile, username: v })}
                    />
                    <InputGroup
                      label="Registry Email"
                      value={profile.email}
                      onChange={(v) => setProfile({ ...profile, email: v })}
                    />
                  </div>

                  <Button
                    type="submit"
                    className={cn(
                      "h-14 px-12 rounded-full font-black uppercase tracking-[0.2em] text-[10px] transition-all",
                      saveSuccess ? "bg-emerald-500 text-white" : "bg-white text-black hover:bg-primary"
                    )}
                  >
                    {isSaving ? <Loader2 className="animate-spin" /> : saveSuccess ? "Registry Updated" : "Sync Changes"}
                  </Button>
                </form>
              </section>

              <section className="pt-20 border-t border-white/5 space-y-8">
                <Typography.S className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-700">Danger Zone</Typography.S>
                <div className="flex flex-wrap gap-4">
                  <Button variant="outline" className="border-white/5 rounded-xl text-[10px] font-black uppercase tracking-widest px-8 h-12 hover:bg-zinc-900">
                    Download Archive
                  </Button>
                  <Button variant="outline" className="border-red-900/20 text-red-900 rounded-xl text-[10px] font-black uppercase tracking-widest px-8 h-12 hover:bg-red-500 hover:text-white">
                    Deactivate Account
                  </Button>
                </div>
              </section>
            </TabsContent>

            {/* PLANS / MEMBERSHIP CONTENT */}
            <TabsContent value="plans" className="m-0 space-y-12 animate-in fade-in duration-700">
              <ContentHeader title="Membership" subtitle="Tier level and billing cycle" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-8 rounded-[2.5rem] bg-white text-black flex flex-col justify-between aspect-square md:aspect-auto md:h-80">
                  <div>
                    <Typography.S className="font-black uppercase tracking-widest text-[10px] opacity-60 mb-2 block">Active Plan</Typography.S>
                    <Typography.H2 className="text-6xl font-black uppercase tracking-tighter italic">Pro<span className="text-primary">.</span></Typography.H2>
                  </div>
                  <div className="space-y-4">
                    <p className="text-xs font-bold leading-relaxed">Full access to the core registry, high-fidelity audio, and unlimited cinematic streaming.</p>
                    <Button className="w-full bg-black text-white rounded-2xl h-12 font-black uppercase tracking-widest text-[10px]">Manage Billing</Button>
                  </div>
                </div>

                <div className="p-8 rounded-[2.5rem] bg-zinc-900 border border-white/5 flex flex-col justify-between aspect-square md:aspect-auto md:h-80 group hover:border-primary/50 transition-all cursor-pointer">
                  <div className="flex justify-between items-start">
                    <Typography.S className="font-black uppercase tracking-widest text-[10px] text-zinc-500 block">Available Upgrade</Typography.S>
                    <ArrowUpRight className="text-zinc-700 group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                  </div>
                  <div>
                    <Typography.H2 className="text-4xl font-black uppercase tracking-tighter">Enterprise</Typography.H2>
                    <Typography.P className="text-zinc-500 text-xs mt-2 uppercase font-black tracking-widest">Team access + API</Typography.P>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* THEME CONTENT */}
            <TabsContent value="theme" className="m-0 space-y-12 animate-in fade-in duration-700">
              <ContentHeader title="Interface" subtitle="Operating environment aesthetics" />
              <div className="grid grid-cols-2 gap-8">
                <ThemeCard label="Onyx Dark" active />
                <ThemeCard label="Pure Light" />
              </div>

              <div className="space-y-4 pt-12">
                <SettingRow title="High Contrast Mode" desc="Increase visibility of UI nodes" checked={false} />
                <SettingRow title="Reduced Motion" desc="Disable core animations" checked={true} />
              </div>
            </TabsContent>

          </main>
        </Tabs>
      </div>
    </div>
  )
}

/** * ATOMIC UI COMPONENTS 
 */

function SidebarTrigger({ value, label, icon }: { value: string; label: string; icon: React.ReactNode }) {
  return (
    <TabsTrigger
      value={value}
      className={cn(
        "justify-start gap-4 py-4 px-6 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all border border-transparent",
        "data-[state=active]:bg-zinc-900 data-[state=active]:text-primary data-[state=active]:border-white/5 text-zinc-500 hover:text-white"
      )}
    >
      {icon} {label}
    </TabsTrigger>
  )
}

function ContentHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="space-y-4 mb-12">
      <Typography.H2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter border-none italic">{title}</Typography.H2>
      <div className="flex items-center gap-4">
        <div className="h-px w-8 bg-primary" />
        <Typography.P className="text-zinc-600 text-[9px] uppercase tracking-[0.3em] font-black">{subtitle}</Typography.P>
      </div>
    </div>
  )
}

function InputGroup({ label, value, onChange }: { label: string, value: string, onChange: (v: string) => void }) {
  return (
    <div className="group relative">
      <Label className="text-[9px] font-black uppercase tracking-[0.4em] text-zinc-700 group-focus-within:text-primary transition-colors block mb-2">
        {label}
      </Label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-transparent border-b-2 border-zinc-900 py-4 text-2xl font-bold tracking-tight focus:outline-none focus:border-primary transition-all placeholder:text-zinc-800"
      />
    </div>
  )
}

function SettingRow({ title, desc, checked }: { title: string, desc: string, checked: boolean }) {
  return (
    <div className="flex items-center justify-between py-8 border-b border-white/5 group">
      <div className="space-y-1">
        <Typography.S className="text-xs font-black uppercase tracking-widest text-zinc-400 group-hover:text-white transition-colors">{title}</Typography.S>
        <Typography.P className="text-[10px] text-zinc-700 uppercase font-black tracking-widest">{desc}</Typography.P>
      </div>
      <Switch className="data-[state=checked]:bg-primary" checked={checked} />
    </div>
  )
}

function ThemeCard({ label, active = false }: { label: string, active?: boolean }) {
  return (
    <div className={cn(
      "aspect-[4/3] rounded-[2.5rem] border-2 flex flex-col items-center justify-center gap-4 cursor-pointer transition-all hover:scale-[1.02]",
      active ? "bg-zinc-900 border-primary" : "bg-black border-white/5 grayscale opacity-40 hover:opacity-100 hover:grayscale-0"
    )}>
      <div className={cn("size-12 rounded-full", active ? "bg-primary" : "bg-zinc-800")} />
      <Typography.S className="text-[10px] font-black uppercase tracking-widest">{label}</Typography.S>
    </div>
  )
}