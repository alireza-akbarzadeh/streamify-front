import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { RootHeader } from "@/components/root-header";
import Footer from "@/domains/home/footer";
import { PLANS } from "@/domains/plans/plans.constants";
import { Plans } from "@/domains/plans/plans.domains";
import { useCreateCheckout } from "@/hooks/usePolar";
import { logger } from "@/lib/logger";
import { Route as RootRoute } from "@/routes/__root";
import type { CheckoutInputScheme } from "@/types/subscription";

interface PricingSearch {
  redirectUrl?: string;
}

export const Route = createFileRoute("/(home)/pricing")({
  validateSearch: (search: Record<string, unknown>): PricingSearch => ({
    redirectUrl: typeof search.redirectUrl === 'string' ? search.redirectUrl : undefined
  }),
  component: RouteComponent,
});

function RouteComponent() {
  const { redirectUrl } = Route.useSearch();
  const { auth } = RootRoute.useRouteContext();
  const user = auth?.user;
  const createCheckout = useCreateCheckout();

  // Debug logging (can remove later)
  if (import.meta.env.DEV) {
    console.log('[Pricing Page] User Data:', {
      userId: user?.id,
      email: user?.email,
      subscriptionStatus: user?.subscriptionStatus,
      currentPlan: user?.currentPlan,
    });
  }

  const handleCheckout = async (plan: CheckoutInputScheme) => {
    try {
      // Skip checkout for free plan
      if (plan.slug === "Free") {
        toast.info("You're already on the free plan");
        return;
      }

      // Ensure plan has priceId
      if (!plan.priceId) {
        toast.error("Invalid plan", {
          description: "Plan is missing pricing information"
        });
        return;
      }

      // Create Polar checkout session
      const result = await createCheckout.mutateAsync({
        productPriceId: plan.priceId,
        successUrl: redirectUrl || `${window.location.origin}/library/subscription`,
      });

      // Redirect to Polar checkout
      if (result.url) {
        toast.success("Redirecting to checkout...");
        window.location.href = result.url;
      } else {
        throw new Error("No checkout URL received");
      }
    } catch (err: unknown) {
      logger.error('Checkout error:', err);
      toast.error("Error", {
        description: "Failed to create checkout session"
      });
    }
  }

  return (
    <>
      <RootHeader />
      <Plans
        plans={PLANS}
        onCheckout={handleCheckout}
        userSubscription={{
          status: user?.subscriptionStatus || "FREE",
          currentPlan: user?.currentPlan || null,
        }}
      />
      <Footer />
    </>
  );
}
