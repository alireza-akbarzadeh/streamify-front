import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface SubscriptionStatus {
	status: "FREE" | "PREMIUM" | "FAMILY" | "CANCELLED" | "NONE";
	currentPlan: string | null;
	customerId: string | null;
}

interface CancelResponse {
	success: boolean;
	message: string;
	pendingCancellation?: boolean;
	alreadyCancelled?: boolean;
	error?: string;
}

export function useSubscription() {
	const queryClient = useQueryClient();

	// Get subscription status
	const {
		data: subscription,
		isLoading,
		error,
	} = useQuery<SubscriptionStatus>({
		queryKey: ["subscription", "status"],
		queryFn: async () => {
			const response = await fetch("/api/subscription/status");
			if (!response.ok) {
				throw new Error("Failed to fetch subscription status");
			}
			return response.json();
		},
		staleTime: 1000 * 60 * 5, // 5 minutes
	});

	// Cancel subscription mutation
	const cancelMutation = useMutation({
		mutationFn: async () => {
			const response = await fetch("/api/subscription/cancel", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
			});

			const data: CancelResponse = await response.json();

			if (!response.ok) {
				throw new Error(data.error || "Failed to cancel subscription");
			}

			return data;
		},
		onSuccess: (data) => {
			// Invalidate and refetch subscription status
			queryClient.invalidateQueries({ queryKey: ["subscription", "status"] });

			// Show success message
			if (data.alreadyCancelled) {
				toast.info("Subscription already cancelled");
			} else if (data.pendingCancellation) {
				toast.success(
					data.message ||
						"Subscription will end at the end of your billing period",
				);
			} else {
				toast.success(data.message || "Subscription cancelled");
			}
		},
		onError: (error: Error) => {
			toast.error("Failed to cancel subscription", {
				description: error.message,
			});
		},
	});

	return {
		subscription,
		isLoading,
		error,
		isActive:
			subscription?.status === "PREMIUM" || subscription?.status === "FAMILY",
		isPending: subscription?.status === "CANCELLED",
		isFree: subscription?.status === "FREE" || subscription?.status === "NONE",
		cancelSubscription: cancelMutation.mutate,
		isCancelling: cancelMutation.isPending,
	};
}
