import { Crown, type LucideProps, Sparkles, Zap } from "lucide-react";

type Price = {
	monthly: number;
	annual: number;
};

export interface PlanType {
	name: "Free" | "Premium" | "Family";
	icon: React.ForwardRefExoticComponent<
		Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
	>;
	price: Price;
	description: string;
	features: string[];
	cta: string;
	popular: boolean;
	gradient: string;
	glowColor: string;
}

export const plans: PlanType[] = [
	{
		name: "Free",
		icon: Sparkles,
		price: { monthly: 0, annual: 0 },
		description: "Perfect for casual listeners",
		features: [
			"Limited music streaming",
			"Ad-supported movies",
			"Standard quality",
			"1 device",
			"Basic recommendations",
		],
		cta: "Get Started",
		popular: false,
		gradient: "from-gray-600 to-gray-700",
		glowColor: "gray-500",
	},
	{
		name: "Premium",
		icon: Zap,
		price: { monthly: 9.99, annual: 99 },
		description: "Best for individuals",
		features: [
			"Unlimited music streaming",
			"Ad-free movies & shows",
			"HD quality",
			"Up to 3 devices",
			"Offline downloads",
			"AI-powered recommendations",
			"Early access to new releases",
		],
		cta: "Start Free Trial",
		popular: true,
		gradient: "from-purple-600 to-pink-600",
		glowColor: "purple-500",
	},
	{
		name: "Family",
		icon: Crown,
		price: { monthly: 14.99, annual: 149 },
		description: "Perfect for the whole family",
		features: [
			"Everything in Premium",
			"Up to 6 family members",
			"Individual profiles",
			"4K Ultra HD quality",
			"Unlimited devices",
			"Parental controls",
			"Priority customer support",
			"Exclusive family playlists",
		],
		cta: "Start Free Trial",
		popular: false,
		gradient: "from-cyan-600 to-blue-600",
		glowColor: "cyan-500",
	},
];
