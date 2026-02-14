import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { RootHeader } from "@/components/root-header";
import Footer from "@/domains/home/footer";
import { Plans } from "@/domains/plans/plans.domains";
import { type CheckoutInputScheme, checkoutSubscription } from "../api/subscription";

export const Route = createFileRoute("/(home)/pricing")({
  component: RouteComponent,
});

function RouteComponent() {
  const checkoutFn = useServerFn(checkoutSubscription);


  const handleCheckout = async (plan: CheckoutInputScheme) => {
    try {
      const result = await checkoutFn({ data: plan });

      if (result?.url) {
        toast.success("Redirecting to checkout...");
        window.location.href = result.url;
      } else {
        toast.error("Unable to start checkout. Please try again.");
      }
    } catch (err: any) {
      const msg =
        err?.message?.includes("Unauthorized")
          ? "You need an account first. Please sign up or log in."
          : err?.message || "Something went wrong. Please try again.";
      toast.error("Checkout failed", { description: msg });
    }
  };

  return (
    <>
      <RootHeader />
      <Plans onCheckout={handleCheckout} />
      <Footer />
    </>
  );
}
