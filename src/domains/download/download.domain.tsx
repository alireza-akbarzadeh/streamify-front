import { AnimatePresence, motion } from "framer-motion";
import {
    Apple, Check,
    ChevronRight,
    Cloud,
    Download, ExternalLink, Globe, Laptop, Laptop2, Monitor, Smartphone as PhoneIcon, Play, QrCode, Shield, Smartphone, Star, Tablet, Users,
    Zap
} from "lucide-react";
import { useState } from "react";

const PLATFORMS = [
    {
        name: "iOS",
        icon: Apple,
        link: "#",
        version: "15.0+",
        size: "247 MB",
        color: "from-gray-900 to-black",
        badge: "Best Experience",
        features: ["Face ID Login", "Offline Mode", "Siri Integration"]
    },
    {
        name: "Android",
        icon: Smartphone,
        link: "#",
        version: "8.0+",
        size: "89 MB",
        color: "from-green-900/30 to-emerald-900/20",
        badge: "Editor's Choice",
        features: ["Picture-in-Picture", "Chromecast", "Material You"]
    },
    {
        name: "Windows",
        icon: Laptop,
        link: "#",
        version: "10/11",
        size: "512 MB",
        color: "from-blue-900/30 to-cyan-900/20",
        badge: "4K Support",
        features: ["HDR Playback", "Dolby Atmos", "Game Mode"]
    },
    {
        name: "macOS",
        icon: Laptop2,
        link: "#",
        version: "12.0+",
        size: "387 MB",
        color: "from-purple-900/30 to-pink-900/20",
        badge: "Apple Silicon",
        features: ["Continuity", "Touch Bar", "Sidecar"]
    },
    {
        name: "Web",
        icon: Globe,
        link: "#",
        version: "Latest",
        size: "Instant",
        color: "from-orange-900/30 to-amber-900/20",
        badge: "No Install",
        features: ["Progressive Web App", "Cross-Platform", "Auto Updates"]
    },
];

const DEVICE_MOCKUPS = [
    {
        type: "desktop",
        name: "Ultra 4K Desktop",
        dimensions: "w-96 h-64",
        content: {
            title: "Interstellar",
            subtitle: "Now Playing • 4K HDR",
            progress: 65,
            time: "1:48:32 / 2:49:00",
            quality: "4K • Dolby Vision"
        }
    },
    {
        type: "tablet",
        name: "StreamPad Pro",
        dimensions: "w-64 h-80",
        content: {
            title: "Trending Now",
            subtitle: "Personalized For You",
            items: [
                { title: "Stranger Things", progress: 30 },
                { title: "The Crown", progress: 45 },
                { title: "Breaking Bad", progress: 90 }
            ]
        }
    },
    {
        type: "mobile",
        name: "Streamify Mobile",
        dimensions: "w-48 h-80",
        content: {
            title: "Continue Watching",
            subtitle: "Tap to resume",
            item: "Dune: Part Two",
            progress: 40
        }
    }
];

const STATS = [
    { label: "Active Users", value: "10M+", icon: Users, color: "text-blue-400" },
    { label: "Countries", value: "180+", icon: Globe, color: "text-green-400" },
    { label: "Avg. Rating", value: "4.8", icon: Star, color: "text-yellow-400" },
    { label: "Downloads", value: "500M+", icon: Download, color: "text-purple-400" }
];

export function DownloadPage() {
    const [activeDevice, setActiveDevice] = useState("desktop");
    const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
    const [showQR, setShowQR] = useState(false);
    const [downloadProgress, setDownloadProgress] = useState<{ [key: string]: number }>({});

    const handleDownload = (platformName: string) => {
        setSelectedPlatform(platformName);
        setDownloadProgress(prev => ({ ...prev, [platformName]: 0 }));

        const interval = setInterval(() => {
            setDownloadProgress(prev => {
                const newProgress = (prev[platformName] || 0) + 10;
                if (newProgress >= 100) {
                    clearInterval(interval);
                    setTimeout(() => {
                        setSelectedPlatform(null);
                    }, 1000);
                    return { ...prev, [platformName]: 100 };
                }
                return { ...prev, [platformName]: newProgress };
            });
        }, 200);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-950 to-black text-white overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-96 bg-gradient-to-r from-transparent via-purple-500/5 to-transparent" />

                {/* Grid Pattern */}
                <div
                    className="absolute inset-0 opacity-5"
                    style={{
                        backgroundImage: `linear-gradient(to right, #8882 1px, transparent 1px),
                             linear-gradient(to bottom, #8882 1px, transparent 1px)`,
                        backgroundSize: '50px 50px'
                    }}
                />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 mb-6">
                        <Zap className="w-4 h-4 text-purple-400" />
                        <span className="text-sm text-gray-300">
                            Version 4.2 Released • New Features Available
                        </span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-purple-100 to-blue-100 bg-clip-text text-transparent">
                        Experience Streamify
                        <br />
                        <span className="text-4xl md:text-6xl">Everywhere</span>
                    </h1>

                    <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-10">
                        Download the ultimate streaming experience. Sync across all devices,
                        download for offline viewing, and enjoy 4K HDR quality anywhere.
                    </p>

                    {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mb-12">
                        {STATS.map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="text-center p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10"
                            >
                                <stat.icon className={`w-8 h-8 mx-auto mb-2 ${stat.color}`} />
                                <div className="text-2xl font-bold">{stat.value}</div>
                                <div className="text-sm text-gray-400">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Device Showcase */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    className="mb-20"
                >
                    <div className="flex items-center justify-center gap-4 mb-8">
                        {DEVICE_MOCKUPS.map((device) => (
                            <button
                                key={device.type}
                                onClick={() => setActiveDevice(device.type)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${activeDevice === device.type
                                    ? 'bg-gradient-to-r from-purple-600 to-blue-600'
                                    : 'bg-white/5 hover:bg-white/10'
                                    }`}
                            >
                                {device.type === 'desktop' && <Monitor className="w-4 h-4" />}
                                {device.type === 'tablet' && <Tablet className="w-4 h-4" />}
                                {device.type === 'mobile' && <PhoneIcon className="w-4 h-4" />}
                                <span>{device.name}</span>
                            </button>
                        ))}
                    </div>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeDevice}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                            className="flex justify-center"
                        >
                            {activeDevice === 'desktop' && (
                                <div className="relative">
                                    {/* Monitor */}
                                    <div className={`relative ${DEVICE_MOCKUPS[0].dimensions} mx-auto`}>
                                        {/* Screen */}
                                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gray-900 to-black p-2">
                                            <div className="relative h-full rounded-xl overflow-hidden bg-black">
                                                {/* Screen Content */}
                                                <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-blue-900/20" />

                                                {/* UI Elements */}
                                                <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
                                                            <Play className="w-5 h-5" />
                                                        </div>
                                                        <div>
                                                            <div className="text-sm text-gray-400">Now Playing</div>
                                                            <div className="text-lg font-bold">{DEVICE_MOCKUPS[0].content.title}</div>
                                                        </div>
                                                    </div>
                                                    <div className="text-xs px-3 py-1 rounded-full bg-green-500/20 text-green-300">
                                                        {DEVICE_MOCKUPS[0].content.quality}
                                                    </div>
                                                </div>

                                                {/* Progress Bar */}
                                                <div className="absolute bottom-8 left-8 right-8">
                                                    <div className="h-1 bg-gray-700 rounded-full overflow-hidden mb-2">
                                                        <motion.div
                                                            initial={{ width: 0 }}
                                                            animate={{ width: `${DEVICE_MOCKUPS[0].content.progress}%` }}
                                                            transition={{ duration: 1, delay: 0.5 }}
                                                            className="h-full bg-gradient-to-r from-purple-500 to-blue-500"
                                                        />
                                                    </div>
                                                    <div className="flex justify-between text-sm">
                                                        <span>{DEVICE_MOCKUPS[0].content.time.split(' / ')[0]}</span>
                                                        <span>{DEVICE_MOCKUPS[0].content.time.split(' / ')[1]}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Bezel */}
                                        <div className="absolute inset-0 rounded-2xl border-2 border-gray-800 pointer-events-none" />
                                    </div>

                                    {/* Stand */}
                                    <div className="mx-auto w-40 h-6 bg-gradient-to-b from-gray-800 to-gray-900 rounded-b-lg" />
                                    <div className="mx-auto w-60 h-2 bg-gray-900 rounded-full mt-1" />
                                </div>
                            )}

                            {activeDevice === 'tablet' && (
                                <div className={`relative ${DEVICE_MOCKUPS[1].dimensions}`}>
                                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-gray-800 to-gray-900 p-4">
                                        <div className="relative h-full rounded-2xl overflow-hidden bg-gradient-to-br from-gray-900 to-black">
                                            {/* Tablet Content */}
                                            <div className="p-6">
                                                <div className="flex items-center justify-between mb-6">
                                                    <div>
                                                        <div className="text-sm text-gray-400">{DEVICE_MOCKUPS[1].content.subtitle}</div>
                                                        <div className="text-xl font-bold">For You</div>
                                                    </div>
                                                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                                                        <Users className="w-5 h-5" />
                                                    </div>
                                                </div>

                                                {DEVICE_MOCKUPS[1].content.items.map((item, index) => (
                                                    <div key={index} className="mb-4">
                                                        <div className="flex justify-between mb-1">
                                                            <span className="text-sm">{item.title}</span>
                                                            <span className="text-xs text-gray-400">{item.progress}%</span>
                                                        </div>
                                                        <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
                                                            <motion.div
                                                                initial={{ width: 0 }}
                                                                animate={{ width: `${item.progress}%` }}
                                                                transition={{ duration: 1, delay: index * 0.2 }}
                                                                className="h-full bg-gradient-to-r from-blue-500 to-cyan-500"
                                                            />
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="absolute inset-0 rounded-3xl border-2 border-gray-700 pointer-events-none" />
                                </div>
                            )}

                            {activeDevice === 'mobile' && (
                                <div className={`relative ${DEVICE_MOCKUPS[2].dimensions}`}>
                                    <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-gray-800 to-gray-900 p-3">
                                        <div className="relative h-full rounded-[1.5rem] overflow-hidden bg-gradient-to-b from-gray-900 to-black">
                                            {/* Mobile Content */}
                                            <div className="p-6">
                                                <div className="text-center mb-6">
                                                    <div className="text-sm text-gray-400 mb-1">{DEVICE_MOCKUPS[2].content.subtitle}</div>
                                                    <div className="text-lg font-bold">{DEVICE_MOCKUPS[2].content.item}</div>
                                                </div>

                                                {/* Progress Circle */}
                                                <div className="relative w-32 h-32 mx-auto mb-6">
                                                    <svg className="w-full h-full" viewBox="0 0 100 100">
                                                        <circle
                                                            cx="50"
                                                            cy="50"
                                                            r="45"
                                                            fill="none"
                                                            stroke="#374151"
                                                            strokeWidth="8"
                                                        />
                                                        <motion.circle
                                                            cx="50"
                                                            cy="50"
                                                            r="45"
                                                            fill="none"
                                                            stroke="url(#gradient)"
                                                            strokeWidth="8"
                                                            strokeLinecap="round"
                                                            initial={{ strokeDasharray: "0 283" }}
                                                            animate={{ strokeDasharray: `${(DEVICE_MOCKUPS[2].content.progress * 2.83)} 283` }}
                                                            transition={{ duration: 1.5 }}
                                                            transform="rotate(-90 50 50)"
                                                        />
                                                        <defs>
                                                            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                                                <stop offset="0%" stopColor="#8B5CF6" />
                                                                <stop offset="100%" stopColor="#3B82F6" />
                                                            </linearGradient>
                                                        </defs>
                                                    </svg>
                                                    <div className="absolute inset-0 flex items-center justify-center">
                                                        <div className="text-2xl font-bold">{DEVICE_MOCKUPS[2].content.progress}%</div>
                                                    </div>
                                                </div>

                                                <button className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center gap-2">
                                                    <Play className="w-5 h-5" />
                                                    Resume Playing
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="absolute inset-0 rounded-[2rem] border-2 border-gray-700 pointer-events-none" />

                                    {/* Notch */}
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-900 rounded-b-xl" />
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </motion.div>

                {/* Download Platforms */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="mb-20"
                >
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold mb-4">
                            Download for Your <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Platform</span>
                        </h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">
                            Get the best experience on your device. All versions include free updates
                            and seamless sync across your devices.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
                        {PLATFORMS.map((platform) => {
                            const Icon = platform.icon;
                            const isDownloading = selectedPlatform === platform.name;
                            const progress = downloadProgress[platform.name] || 0;

                            return (
                                <motion.div
                                    key={platform.name}
                                    whileHover={{ y: -8, transition: { duration: 0.2 } }}
                                    className={`relative rounded-2xl bg-gradient-to-br ${platform.color} p-6 border border-white/10 overflow-hidden`}
                                >
                                    {/* Shine Effect */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 hover:opacity-100 transition-opacity" />

                                    {/* Badge */}
                                    {platform.badge && (
                                        <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-white/10 text-xs backdrop-blur-sm">
                                            {platform.badge}
                                        </div>
                                    )}

                                    <div className="relative z-10">
                                        <div className="flex items-center gap-4 mb-6">
                                            <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center">
                                                <Icon className="w-8 h-8" />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold">{platform.name}</h3>
                                                <div className="text-sm text-gray-400">
                                                    v{platform.version} • {platform.size}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Features */}
                                        <ul className="space-y-2 mb-6">
                                            {platform.features.map((feature, idx) => (
                                                <li key={idx} className="flex items-center gap-2 text-sm">
                                                    <Check className="w-4 h-4 text-green-400" />
                                                    <span>{feature}</span>
                                                </li>
                                            ))}
                                        </ul>

                                        {/* Download Button */}
                                        <button
                                            onClick={() => handleDownload(platform.name)}
                                            disabled={isDownloading}
                                            className={`w-full py-3 rounded-xl flex items-center justify-center gap-2 transition-all ${isDownloading
                                                ? 'bg-gradient-to-r from-gray-700 to-gray-800'
                                                : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500'
                                                }`}
                                        >
                                            {isDownloading ? (
                                                <>
                                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                                    <span>{progress}%</span>
                                                </>
                                            ) : progress === 100 ? (
                                                <>
                                                    <Check className="w-5 h-5" />
                                                    <span>Installed</span>
                                                </>
                                            ) : (
                                                <>
                                                    <Download className="w-5 h-5" />
                                                    <span>Download</span>
                                                </>
                                            )}
                                        </button>

                                        {/* Progress Bar */}
                                        {isDownloading && (
                                            <div className="mt-4 h-1 bg-gray-700 rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${progress}%` }}
                                                    className="h-full bg-gradient-to-r from-green-400 to-cyan-400"
                                                />
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* QR Code for Mobile */}
                    <div className="text-center">
                        <button
                            onClick={() => setShowQR(!showQR)}
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                        >
                            <QrCode className="w-5 h-5" />
                            Scan for Mobile Download
                            <ChevronRight className={`w-4 h-4 transition-transform ${showQR ? 'rotate-90' : ''}`} />
                        </button>

                        <AnimatePresence>
                            {showQR && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="mt-6"
                                >
                                    <div className="inline-block p-6 rounded-2xl bg-white/5 backdrop-blur-sm">
                                        <div className="w-48 h-48 bg-white rounded-lg flex items-center justify-center">
                                            {/* Mock QR Code */}
                                            <div className="grid grid-cols-5 gap-1">
                                                {Array.from({ length: 25 }).map((_, i) => (
                                                    <div
                                                        key={i}
                                                        className={`w-8 h-8 ${Math.random() > 0.5 ? 'bg-black' : 'bg-white'} border`}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                        <p className="mt-4 text-sm text-gray-400">
                                            Scan with your phone's camera
                                        </p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>

                {/* Features & Benefits */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="grid md:grid-cols-3 gap-8 mb-20"
                >
                    <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-900/20 to-transparent border border-purple-500/20">
                        <Cloud className="w-12 h-12 text-purple-400 mb-4" />
                        <h3 className="text-xl font-bold mb-2">Cloud Sync</h3>
                        <p className="text-gray-400">
                            Pick up where you left off. Your watch history syncs instantly across all devices.
                        </p>
                    </div>

                    <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-900/20 to-transparent border border-blue-500/20">
                        <Shield className="w-12 h-12 text-blue-400 mb-4" />
                        <h3 className="text-xl font-bold mb-2">Secure & Private</h3>
                        <p className="text-gray-400">
                            End-to-end encryption for downloads. Your data stays private and secure.
                        </p>
                    </div>

                    <div className="p-6 rounded-2xl bg-gradient-to-br from-green-900/20 to-transparent border border-green-500/20">
                        <Zap className="w-12 h-12 text-green-400 mb-4" />
                        <h3 className="text-xl font-bold mb-2">Lightning Fast</h3>
                        <p className="text-gray-400">
                            Optimized downloads with resume capability. No waiting, even on slow connections.
                        </p>
                    </div>
                </motion.div>

                {/* CTA Section */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center rounded-3xl bg-gradient-to-r from-purple-900/30 via-gray-900/50 to-blue-900/30 p-12 border border-white/10"
                >
                    <h2 className="text-4xl font-bold mb-4">
                        Ready to Stream Everything?
                    </h2>
                    <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                        Join millions of users enjoying premium streaming across all their devices.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 transition-all flex items-center justify-center gap-3">
                            <Download className="w-5 h-5" />
                            Download All Platforms
                        </button>

                        <button className="px-8 py-4 rounded-xl bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center gap-3">
                            <ExternalLink className="w-5 h-5" />
                            View All Features
                        </button>
                    </div>

                    <p className="mt-6 text-sm text-gray-400">
                        30-day free trial • No credit card required • Cancel anytime
                    </p>
                </motion.div>

                {/* Footer Note */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mt-20 text-center text-gray-500 text-sm"
                >
                    <p className="mb-2">© 2024 Streamify. All rights reserved.</p>
                    <p>
                        Available on Smart TVs, Gaming Consoles, VR Headsets, and all modern browsers.
                    </p>
                </motion.div>
            </div>
        </div>
    );
}