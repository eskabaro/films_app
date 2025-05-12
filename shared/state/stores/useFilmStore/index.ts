import { instance } from '@/shared/config/axios'
import { API_ROUTES } from '@/shared/const/routes'
import type { DetailsType, FilmType, GenreType, WithResType } from '@/shared/types'
import type { Dispatch, SetStateAction } from 'react'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

type HomeMoviesType = 'popular' | 'wishlist'

interface UseFilmStoreType {
    films: Array<FilmType>
    film: DetailsType | null
    wishlist: Array<FilmType>
    genres: Array<GenreType>
    searchValue: string
    homeMoviesType: HomeMoviesType
    getFilms: (setIsLoading: Dispatch<SetStateAction<boolean>>) => void
    getFilm: (id: string, setIsLoading: Dispatch<SetStateAction<boolean>>) => void
    getWishlist: (setIsLoading: Dispatch<SetStateAction<boolean>>, stateKey?: 'wishlist' | 'films') => void
    toggleFromWishList: (variables: { type: 'add' | 'remove'; id: number }, setIsLoading: Dispatch<SetStateAction<boolean>>) => void
}

export const useFilmStore = create<UseFilmStoreType>()(
    devtools(
        (set) => ({
            films: [],
            film: null,
            wishlist: [],
            genres: [],
            searchValue: '',
            homeMoviesType: 'popular',
            getFilms: async (setIsLoading) => {
                setIsLoading(true)

                Promise.all([
                    instance.get<WithResType<FilmType>>(API_ROUTES.movies).then(({ data }) => {
                        if (!data) {
                            throw new Error('Failed to fetch films')
                        }

                        const sortedFilms = data.results.sort((a, b) => a.original_title.localeCompare(b.original_title))

                        set({ films: sortedFilms })
                    }),
                    instance.get<{ genres: Array<GenreType> }>(API_ROUTES.genre).then(({ data }) => {
                        if (!data) {
                            throw new Error('failed to fetch genres')
                        }

                        set({ genres: data.genres })
                    })
                ])
                    .catch((error) => {
                        console.error(error)
                    })
                    .finally(() => setIsLoading(false))
            },
            getFilm: (id, setIsLoading) => {
                setIsLoading(true)

                instance
                    .get<DetailsType>(`${API_ROUTES.movieDetails}/${id}`)
                    .then(({ data }) => {
                        if (!data) {
                            throw new Error('Failed to fetch film')
                        }

                        set({ film: data })
                    })
                    .catch((error) => {
                        console.error(error)
                    })
                    .finally(() => setIsLoading(false))
            },
            getWishlist: (setIsLoading, stateKey) => {
                setIsLoading(true)

                instance
                    .get<WithResType<FilmType>>(API_ROUTES.favorites)
                    .then(({ data }) => {
                        if (!data) {
                            throw new Error('Failed to fetch wishlist')
                        }

                        set({ [stateKey || 'wishlist']: data.results })
                    })
                    .catch((error) => {
                        console.error(error)
                    })
                    .finally(() => setIsLoading(false))
            },
            toggleFromWishList: ({ type, id }, setIsLoading) => {
                setIsLoading(true)

                instance
                    .post(API_ROUTES.addFavorites, {
                        media_type: 'movie',
                        media_id: id,
                        favorite: type === 'add'
                    })
                    .then(({ data }) => {
                        if (!data) {
                            throw new Error('Failed add to favorites')
                        }

                        set((state) => {
                            if (type === 'remove') {
                                return {
                                    ...state,
                                    wishlist: state.wishlist.filter((film) => film.id !== id)
                                }
                            } else {
                                const filmToAdd = state.films.find((film) => film.id === id)
                                if (!filmToAdd) return state

                                return {
                                    ...state,
                                    wishlist: [...state.wishlist, filmToAdd]
                                }
                            }
                        })
                    })
                    .catch((error) => {
                        console.error(error)
                    })
                    .finally(() => setIsLoading(false))
            }
        }),
        { name: 'useFilmStore' }
    )
)

export const setSearchValue = (searchValue: string) => useFilmStore.setState({ searchValue })
export const toggleMoviesType = (homeMoviesType: HomeMoviesType) => useFilmStore.setState({ homeMoviesType })
