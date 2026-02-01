import { Link, useLocation } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import {
	BookText,
	ChevronRight,
	Clapperboard,
	CreditCard,
	LogIn,
	Music,
	PlaySquare,
	Sparkles
} from "lucide-react";
import { useState } from "react";
import { MSG } from "@/constants/constants";
import { cn } from "@/lib/utils";
import { MobileHeader } from "./mobile-header";

export const navLinks = [
	{ label: "Music", href: "/music", icon: Music },
	{ label: "Movies", href: "/movies", icon: Clapperboard },
	{ label: "Reels", href: "/reels", icon: PlaySquare },
	{ label: "Weblog", href: "/blog", icon: BookText },
	{ label: "Pricing", href: "/pricing", icon: CreditCard },
];

export function RootHeader() {
	const [isOpen, setIsOpen] = useState(false);
	const { scrollY } = useScroll();
	const location = useLocation();

	// --- PREMIUM ANIMATIONS ---
	const headerWidth = useTransform(scrollY, [0, 80], ["100%", "92%"]);
	const headerY = useTransform(scrollY, [0, 80], [0, 12]);
	const headerBorder = useTransform(scrollY, [0, 80], ["rgba(255,255,255,0)", "rgba(255,255,255,0.08)"]);
	const headerShadow = useTransform(scrollY, [0, 80], ["0px 0px 0px rgba(0,0,0,0)", "0px 25px 50px -12px rgba(0,0,0,0.5)"]);
	const bgOpacity = useTransform(scrollY, [0, 80], [0, 0.4]);

	return (
		<motion.header
			style={{
				width: headerWidth,
				boxShadow: headerShadow,
				borderColor: headerBorder,
				y: headerY
			}}
			className={cn(
				"fixed left-1/2 -translate-x-1/2 z-[100] transition-all duration-700 ease-out",
				"backdrop-blur-xl md:rounded-[2.5rem] border",
				"md:max-w-7xl mx-auto top-0 overflow-visible"
			)}
		>
			{/* Glossy Gradient Overlay */}
			<motion.div
				style={{ opacity: bgOpacity }}
				className="absolute inset-0 bg-gradient-to-b from-white/[0.08] to-transparent md:rounded-[2.5rem] -z-10"
			/>
			{/* Solid Dark Base */}
			<div className="absolute inset-0 bg-[#0a0a0b]/80 md:rounded-[2.5rem] -z-20" />

			<nav className="px-5 py-2.5 relative">
				<div className="flex items-center justify-between gap-4">

					{/* 1. LOGO SECTION */}
					<Link to="/" className="flex items-center gap-3 group shrink-0">
						<div className="relative">
							<div className="absolute inset-0 bg-indigo-500 blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-500" />
							<div className="relative w-11 h-11 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-xl group-hover:scale-105 group-hover:rotate-3 transition-all duration-300">
								<Music className="w-6 h-6 text-white" />
							</div>
						</div>
						<div className="flex flex-col">
							<span className="text-base font-black tracking-tighter text-white leading-none">
								{MSG.APP_NAME}
							</span>
							<div className="flex items-center gap-1.5 mt-1">
								<span className="text-[9px] text-purple-400 font-bold uppercase tracking-[0.2em]">
									Premium
								</span>
								<div className="h-1 w-1 rounded-full bg-purple-500 animate-pulse" />
							</div>
						</div>
					</Link>

					{/* 2. DESKTOP NAV PILL (Improved) */}
					<div className="hidden lg:flex items-center bg-white/[0.03] hover:bg-white/[0.05] border border-white/[0.05] backdrop-blur-2xl rounded-full p-1.5 gap-0.5 transition-colors duration-300">
						{navLinks.map((link) => {
							const isActive = location.pathname === link.href;
							const Icon = link.icon;
							return (
								<Link
									key={link.label}
									to={link.href}
									className={cn(
										"relative px-4 py-2 text-[13px] font-bold transition-all rounded-full group flex items-center gap-2",
										isActive ? "text-white" : "text-slate-400 hover:text-slate-200"
									)}
								>
									{isActive && (
										<motion.div
											layoutId="nav-pill-active"
											className="absolute inset-0 bg-white/[0.08] border border-white/[0.1] rounded-full"
											transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
										/>
									)}
									<Icon className={cn(
										"size-4 transition-transform duration-300 group-hover:scale-110",
										isActive ? "text-purple-400" : "text-slate-500 group-hover:text-slate-300"
									)} />
									<span className="relative z-10">{link.label}</span>
									{link.label === "Pricing" && <Sparkles className="size-3 text-yellow-500 animate-bounce" />}
								</Link>
							);
						})}
					</div>

					{/* 3. DESKTOP ACTIONS */}
					<div className="hidden md:flex items-center gap-2 shrink-0">
						<Link
							to="/login"
							className="px-5 py-2 text-xs font-bold text-slate-400 hover:text-white transition-colors flex items-center gap-2"
						>
							<LogIn className="size-4" />
							Login
						</Link>

						<Link
							to="/register"
							className="relative flex items-center gap-2 px-6 py-2.5 bg-white text-black rounded-full font-black text-xs uppercase tracking-tight hover:bg-indigo-50 transition-all active:scale-95 group overflow-hidden"
						>
							<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-shimmer" />
							Join Now
							<ChevronRight className="size-4 group-hover:translate-x-0.5 transition-transform" />
						</Link>
					</div>

					{/* 4. MOBILE TRIGGER */}
					<div className="lg:hidden flex items-center">
						<MobileHeader open={isOpen} onOpenChange={setIsOpen} />
					</div>
				</div>
			</nav>
		</motion.header>
	);
}