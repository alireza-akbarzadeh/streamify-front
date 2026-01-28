import { Store } from "@tanstack/store";

export interface BlogState {
	activeCategory: string;
	isSidebarOpen: boolean;
}

// Initialize the store
export const blogStore = new Store<BlogState>({
	activeCategory: "all",
	isSidebarOpen: true,
});

export const actions = {
	setActiveCategory: (id: string) =>
		blogStore.setState((s) => ({ ...s, activeCategory: id })),
	toggleSidebar: () =>
		blogStore.setState((s) => ({ ...s, isSidebarOpen: !s.isSidebarOpen })),
};
