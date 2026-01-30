import { Store } from "@tanstack/store";
import { getUsers, type UserAccount } from "./server/users.functions";

export interface UserFilters {
	plan: string;
	status: string[];
	search: string;
}

export const userUIStore = new Store({
	users: [] as UserAccount[],
	isLoading: false,
	error: null as string | null,
	filters: {
		plan: "All",
		status: [],
		search: "",
	} as UserFilters,
});

// Action: Fetch data and update store directly
export const fetchUsersAction = async () => {
	userUIStore.setState((s) => ({ ...s, isLoading: true }));
	try {
		const data = await getUsers();
		userUIStore.setState((s) => ({ ...s, users: data, isLoading: false }));
	} catch {
		userUIStore.setState((s) => ({
			...s,
			error: "Sync Failed",
			isLoading: false,
		}));
	}
};

export const setPlanFilter = (plan: string) => {
	userUIStore.setState((s) => ({
		...s,
		filters: { ...s.filters, plan },
	}));
};
