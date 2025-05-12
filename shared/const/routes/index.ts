export const ROUTES = {
    home: '/index',
    wishlist: '/wishlist',
    film: '/[filmId]'
} as const
export type RoutesType = keyof typeof ROUTES

export const API_ROUTES = {
    movies: 'movie/popular',
    movieDetails: 'movie',
    addFavorites: 'account/22001495/favorite',
    favorites: 'account/22001495/favorite/movies',
    genre: 'genre/movie/list'
} as const
export type ApiRoutesType = keyof typeof API_ROUTES
