import {
	CastCarousel,
	ImagesGallery,
	MovieHero,
	ReviewsSection,
	SimilarMovies,
	StatsBar,
	Synopsis,
	TrailerPlayer,
} from "./components";

export interface MovieTypes {
	id: number;
	title: string;
	year: number;
	poster: string;
	backdrop: string;
	rating: number;
	votes: number;
	duration: string;
	releaseDate: string;
	rating_label: string;
	genres: string[];
	synopsis: string;
	director: string;
	writers: string[];
	stars: string[];
	productionCo: string;
	budget: string;
	revenue: string;
	trailerUrl: string;
	metascore: number;
	popularity: number;
	popularityChange: number;
}

export default function MovieDetails() {
	const movieData: MovieTypes = {
		id: 1,
		title: "Dune: Part Two",
		year: 2024,
		poster:
			"https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&h=600&fit=crop",
		backdrop:
			"https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1920&h=1080&fit=crop",
		rating: 8.8,
		votes: 2400000,
		duration: "2h 46m",
		releaseDate: "March 1, 2024",
		rating_label: "PG-13",
		genres: ["Sci-Fi", "Adventure", "Drama"],
		synopsis:
			"Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the universe, he must prevent a terrible future only he can foresee.",
		director: "Denis Villeneuve",
		writers: ["Jon Spaihts", "Denis Villeneuve", "Frank Herbert"],
		stars: ["Timothée Chalamet", "Zendaya", "Rebecca Ferguson"],
		productionCo: "Legendary Pictures",
		budget: "$190M",
		revenue: "$2.8B",
		trailerUrl: "https://www.youtube.com/embed/Way9Dexny3w",
		metascore: 87,
		popularity: 12,
		popularityChange: 2,
	};

	return (
		<div className="bg-[#0a0a0a] min-h-screen">
			<MovieHero movie={movieData} />
			<TrailerPlayer trailerUrl={movieData.trailerUrl} />
			<StatsBar
				rating={movieData.rating}
				votes={movieData.votes}
				metascore={movieData.metascore}
				popularity={movieData.popularity}
				popularityChange={movieData.popularityChange}
				revenue={movieData.revenue}
			/>
			<Synopsis movie={movieData} />
			<CastCarousel movieId={movieData.id} />
			<ReviewsSection movieId={movieData.id} />
			<ImagesGallery movieId={movieData.id} />
			<SimilarMovies movieId={movieData.id} />
		</div>
	);
}
