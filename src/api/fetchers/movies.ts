import { client } from "../client";

type TMovie = {
    id: string;
    description: string;
    name: string;
    releaseDate: string;
    created_at: string;
}

export async function list(page: number) {
    const { data } = await client.get<{ movies: TMovie[] }>(`/movies/search?page=${page}`);
    return data;
}
