import { createFileRoute } from "@tanstack/react-router";
import { LoginDomain } from "@/domains/auth/login.domain";

export const Route = createFileRoute("/(auth)/login")({
	component: LoginPage,
});

function LoginPage() {
	return <LoginDomain />;
}
