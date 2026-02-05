import type React from "react";
import type { ValidLink } from "@/components/ui/link.tsx";

export type LibraryNav = {
	icon: React.ElementType;
	label: string;
	href: ValidLink;
};
