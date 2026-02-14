import { createFileRoute } from "@tanstack/react-router";
import { LoginDomain } from "@/domains/auth/login.domain";

interface LoginSearchParams {
	redirectUrl?: string;
}

export const Route = createFileRoute("/(auth)/login")({
	component: LoginPage,
	validateSearch: (search: Record<string, unknown>): LoginSearchParams => ({
		redirectUrl: typeof search.redirectUrl === 'string' ? search.redirectUrl : undefined
	})
});

function LoginPage() {
	const { redirectUrl } = Route.useSearch()
	return <LoginDomain redirectUrl={redirectUrl} />;
}
