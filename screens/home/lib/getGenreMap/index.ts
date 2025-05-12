import type { GenreType } from '@/shared/types'

export const getGenreMap = (genres: Array<GenreType>) =>
    genres.reduce((acc, genre) => {
        acc[genre.id] = genre.name.toLowerCase()

        return acc
    }, {} as Record<number, string>)
