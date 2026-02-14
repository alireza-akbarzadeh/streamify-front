import { createFileRoute, Link } from "@tanstack/react-router"
import { AlertCircle, ArrowRight, Check, CheckCircle2, CreditCard, Crown, ExternalLink, type LucideIcon, Sparkles, XCircle, Zap } from 'lucide-react'
import { CancelSubscriptionButton } from "@/components/cancel-subscription-button"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { PLANS, type PlanSlug } from "@/domains/plans/plans.constants"
import { useSubscription } from "@/hooks/useSubscription"
import { cn } from "@/lib/utils"

export const Route = createFileRoute('/(library)/library/subscription')({
    component: SubscriptionPage,
})

function SubscriptionPage() {
    const { subscription, isLoading, isActive, isPending, isFree } = useSubscription();

    if (isLoading) {
        return <SubscriptionPageSkeleton />;
    }

    // Get plan details
    const planDetails = getPlanDetails(subscription?.currentPlan || "Free");

    return (
        <div className="min-h-screen bg-linear-to-br from-zinc-950 via-black to-zinc-950 text-white">
            <div className="max-w-6xl mx-auto px-6 py-12 md:px-8 md:py-16">

                {/* Header */}
                <header className="mb-12">
                    <h1 className="text-5xl md:text-6xl font-bold mb-3 bg-linear-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                        Subscription
                    </h1>
                    <p className="text-gray-400 text-lg">
                        Manage your plan, billing, and subscription settings
                    </p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Main Content - Left */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* Current Plan Card */}
                        <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-8">
                            <div className="flex items-start justify-between mb-6">
                                <div className="flex items-center gap-4">
                                    <div className={cn(
                                        "p-3 rounded-2xl",
                                        planDetails.gradient
                                    )}>
                                        <planDetails.icon className="w-8 h-8 text-white" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-white">
                                            {planDetails.name}
                                        </h2>
                                        <p className="text-sm text-gray-400">
                                            {subscription?.currentPlan || "Free Plan"}
                                        </p>
                                    </div>
                                </div>

                                {/* Status Badge */}
                                <StatusBadge
                                    isActive={isActive}
                                    isPending={isPending}
                                    isFree={isFree}
                                    status={subscription?.status || "FREE"}
                                />
                            </div>

                            {/* Plan Description */}
                            <p className="text-gray-300 mb-6">
                                {planDetails.description}
                            </p>

                            <Separator className="bg-white/10 mb-6" />

                            {/* Features */}
                            <div className="mb-6">
                                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-4">
                                    Included Features
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {planDetails.features.map((feature: string, idx: number) => (
                                        <div key={idx + feature} className="flex items-start gap-2">
                                            <div className={cn(
                                                "p-1 rounded-full mt-0.5",
                                                planDetails.gradient
                                            )}>
                                                <Check className="w-3 h-3 text-white" />
                                            </div>
                                            <span className="text-sm text-gray-300">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-wrap gap-3">
                                {!isFree && (
                                    <>
                                        <Button
                                            asChild
                                            variant="outline"
                                            className="border-white/20 hover:bg-white/5"
                                        >
                                            <a href="/api/portal" target="_blank" rel="noopener noreferrer">
                                                <CreditCard className="w-4 h-4 mr-2" />
                                                Manage Billing
                                                <ExternalLink className="w-3 h-3 ml-2" />
                                            </a>
                                        </Button>
                                        {isActive && <CancelSubscriptionButton />}
                                    </>
                                )}

                                <Button
                                    asChild
                                    className={cn(
                                        isFree
                                            ? "bg-linear-to-r from-purple-600 to-pink-600 hover:opacity-90"
                                            : "bg-white/10 hover:bg-white/15"
                                    )}
                                >
                                    <Link to="/pricing">
                                        {isFree ? "Upgrade Plan" : "Change Plan"}
                                        <ArrowRight className="w-4 h-4 ml-2" />
                                    </Link>
                                </Button>
                            </div>
                        </Card>

                        {/* Cancellation Notice */}
                        {isPending && (
                            <Card className="bg-amber-500/10 border-amber-500/30 backdrop-blur-xl p-6">
                                <div className="flex items-start gap-4">
                                    <AlertCircle className="w-6 h-6 text-amber-400 shrink-0 mt-0.5" />
                                    <div>
                                        <h3 className="font-semibold text-amber-300 mb-2">
                                            Subscription Cancellation Scheduled
                                        </h3>
                                        <p className="text-sm text-amber-200/80">
                                            Your subscription will remain active until the end of your current billing period.
                                            You'll continue to have access to all premium features until then.
                                        </p>
                                    </div>
                                </div>
                            </Card>
                        )}
                    </div>

                    {/* Sidebar - Right */}
                    <div className="space-y-6">

                        {/* Quick Stats */}
                        <Card className="bg-linear-to-br from-purple-900/20 via-transparent to-pink-900/20 border-purple-500/20 backdrop-blur-xl p-6">
                            <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wide mb-4">
                                Plan Benefits
                            </h3>
                            <div className="space-y-4">
                                <BenefitItem
                                    label="Video Quality"
                                    value={isFree ? "SD" : "HD/4K"}
                                    active={!isFree}
                                />
                                <BenefitItem
                                    label="Ads"
                                    value={isFree ? "Yes" : "None"}
                                    active={!isFree}
                                />
                                <BenefitItem
                                    label="Downloads"
                                    value={isFree ? "Limited" : "Unlimited"}
                                    active={!isFree}
                                />
                                <BenefitItem
                                    label="Devices"
                                    value={isFree ? "1" : subscription?.currentPlan?.includes("Family") ? "6" : "3"}
                                    active={!isFree}
                                />
                            </div>
                        </Card>

                        {/* Upgrade CTA (for free users) */}
                        {isFree && (
                            <Card className="bg-linear-to-br from-purple-600/20 to-pink-600/20 border-purple-500/30 backdrop-blur-xl p-6">
                                <Crown className="w-10 h-10 text-purple-400 mb-4" />
                                <h3 className="font-bold text-white text-lg mb-2">
                                    Upgrade to Premium
                                </h3>
                                <p className="text-sm text-gray-300 mb-4">
                                    Get unlimited access, ad-free streaming, and HD quality content.
                                </p>
                                <Button
                                    asChild
                                    className="w-full bg-linear-to-r from-purple-600 to-pink-600 hover:opacity-90"
                                >
                                    <Link to="/pricing">
                                        See Plans
                                        <ArrowRight className="w-4 h-4 ml-2" />
                                    </Link>
                                </Button>
                            </Card>
                        )}

                        {/* Help Card */}
                        <Card className="bg-white/5 border-white/10 backdrop-blur-xl p-6">
                            <h3 className="font-semibold text-white mb-3">
                                Need Help?
                            </h3>
                            <p className="text-sm text-gray-400 mb-4">
                                Check our FAQ or contact support for assistance with your subscription.
                            </p>
                            <Button
                                variant="outline"
                                className="w-full border-white/20 hover:bg-white/5"
                                asChild
                            >
                                <Link to="/help-center">
                                    Visit Help Center
                                    <ExternalLink className="w-3 h-3 ml-2" />
                                </Link>
                            </Button>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}

/**
 * Helper Components
 */

function StatusBadge({
    isActive,
    isPending,
    isFree,
    status
}: {
    isActive: boolean;
    isPending: boolean;
    isFree: boolean;
    status: string;
}) {
    if (isFree) {
        return (
            <Badge className="bg-slate-500/20 text-slate-300 border-slate-500/30">
                <Sparkles className="w-3 h-3 mr-1" />
                Free
            </Badge>
        );
    }

    if (isPending) {
        return (
            <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/30">
                <AlertCircle className="w-3 h-3 mr-1" />
                Cancelling
            </Badge>
        );
    }

    if (isActive) {
        return (
            <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                <CheckCircle2 className="w-3 h-3 mr-1" />
                Active
            </Badge>
        );
    }

    return (
        <Badge className="bg-red-500/20 text-red-300 border-red-500/30">
            <XCircle className="w-3 h-3 mr-1" />
            {status}
        </Badge>
    );
}

function BenefitItem({ label, value, active }: { label: string; value: string; active: boolean }) {
    return (
        <div className="flex items-center justify-between">
            <span className="text-sm text-gray-400">{label}</span>
            <span className={cn(
                "text-sm font-semibold",
                active ? "text-purple-300" : "text-gray-500"
            )}>
                {value}
            </span>
        </div>
    );
}

function SubscriptionPageSkeleton() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-black to-zinc-950 text-white">
            <div className="max-w-6xl mx-auto px-6 py-12 md:px-8 md:py-16">
                <div className="mb-12">
                    <Skeleton className="h-12 w-64 mb-3" />
                    <Skeleton className="h-6 w-96" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <Skeleton className="h-96 w-full" />
                    </div>
                    <div className="space-y-6">
                        <Skeleton className="h-64 w-full" />
                        <Skeleton className="h-48 w-full" />
                    </div>
                </div>
            </div>
        </div>
    );
}

/**
 * Helper Functions
 */

// Icon mapping from string to component
const iconMap: Record<string, LucideIcon> = {
    Sparkles,
    Zap,
    Crown,
};

function getPlanDetails(planSlug: string | null) {
    const slug = (planSlug || "Free") as PlanSlug;
    const plan = PLANS.find(p => p.slug === slug) || PLANS[0]; // Default to Free plan

    const IconComponent = iconMap[plan.icon] || Sparkles;

    return {
        name: plan.name,
        icon: IconComponent,
        gradient: `bg-linear-to-br ${plan.gradient}`,
        description: plan.description,
        features: plan.features,
    };
}