export type LocalType = 'en'

export interface UserType {}

export interface WithResType<T> {
    page: number
    results: Array<T>
    total_pages: number
    total_results: number
}

export interface GenreType {
    id: number
    name: string
}

export interface FilmType {
    id: number
    title: string
    adult: boolean
    backdrop_path: string
    genre_ids: Array<number>
    original_language: string
    original_title: string
    overview: string
    popularity: number
    poster_path: string
    release_date: string
    video: boolean
    vote_average: number
    vote_count: number
}

export interface DetailsType {
    id: number
    adult: boolean
    backdrop_path: string
    budget: number
    homepage: string
    imdb_id: string
    origin_country: Array<string>
    original_language: string
    original_title: string
    overview: string
    popularity: number
    poster_path: string
    belongs_to_collection: {
        id: number
        name: string
        poster_path: string
        backdrop_path: string
    }
    genres: Array<{
        id: number
        name: string
    }>
    production_companies: Array<{
        id: number
        logo_path: string
        name: string
        origin_country: string
    }>
}
