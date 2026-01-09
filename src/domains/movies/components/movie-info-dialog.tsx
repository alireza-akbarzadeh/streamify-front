import { Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import type { MovieTypes } from '@/types/app';
import { CastCarousel } from "./cast-carousel";
import MovieInfo from "./movie-info";

interface MovieInfoProps {
    movie: MovieTypes
}


export function MovieInfoDialog(props: MovieInfoProps) {
    const { movie } = props
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    size="sm"
                    variant="ghost"
                    className="w-10 h-10 p-0 bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/20 rounded-lg group"
                >
                    <Info className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
                </Button>
            </DialogTrigger>
            <DialogContent className='h-auto overflow-scroll! max-w-250!'>
                <MovieInfo component="dialog" showBreadCrumb={false} movie={movie} />
                <CastCarousel movieId={movie.id} />
            </DialogContent>
        </Dialog>
    );
};