import { useQuery } from '@tanstack/react-query';
import { movies } from '../../api';

const Movies = () => {
    const page = 1;
    const { data, isLoading, isError } = useQuery({ queryKey: ['movies', page], queryFn: () => movies.list(page) });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error fetching movies</div>;
    }

    return (
        <div className="container mx-auto h-screen">
            <h1 className="text-2xl font-bold mb-4">Movies</h1>
            <ul className="grid grid-cols-2 gap-4">
                {data?.movies.map((movie) => (
                    <li key={movie.id} className="p-4 bg-white shadow">
                        <h2 className="text-lg font-bold">{movie.name}</h2>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Movies;
