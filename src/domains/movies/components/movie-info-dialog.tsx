import { Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { CastCarousel } from "./cast-carousel";
import MovieInfo from "./movie-info";
import { ReactNode } from 'react';
import { movieData } from '../data';
import { StatsBar } from './stats-bar';
import { Synopsis } from './synopsis';
import { ReviewsSection } from './reviews-section';
import { ImagesGallery } from './image-gallery';
import { SimilarMovies } from './similar-movies';

interface MovieInfoProps {
    triggerButton?: ReactNode
}


export function MovieInfoDialog(props: MovieInfoProps) {
    const { triggerButton } = props

    return (
        <Dialog >
            <DialogTrigger asChild>
                {triggerButton || (
                    <Button
                        size="sm"
                        variant="ghost"
                        className="w-10 h-10 p-0 bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/20 rounded-lg group"
                    >
                        <Info className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className='max-h-full  max-w-full! overflow-auto'>
                <MovieInfo component="dialog" showBreadCrumb={false} movie={movieData} />
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
            </DialogContent>
        </Dialog>
    );
};