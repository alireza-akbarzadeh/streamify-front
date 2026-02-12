import { createFileRoute } from "@tanstack/react-router";
import { RegisterDomain } from "@/domains/auth/register.domain";


export const Route = createFileRoute("/(auth)/register")({

	component: Register,
});

function Register() {
	return (
		<RegisterDomain />
	);
}
