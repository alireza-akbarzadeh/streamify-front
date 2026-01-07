export interface Review {
	id: number;
	username: string;
	avatar: string;
	rating: number;
	title: string;
	content: string;
	date: string;
	helpful: number;
}

export interface StatsBarProps {
	rating: number;
	votes: number;
	metascore: number;
	popularity: number;
	popularityChange: number;
	revenue: string;
}

export interface MovieImage {
	url: string;
	type: "still" | "behind" | "poster";
	description: string;
}
