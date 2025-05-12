import { toPoint } from '@/shared/const/point'
import { useFilmStore } from '@/shared/state'
import ScreenLoader from '@/widgets/ScreenLoader'
import { useEffect, useMemo, useState, type FC } from 'react'
import { FlatList, StyleSheet } from 'react-native'
import { initialWindowMetrics } from 'react-native-safe-area-context'
import Film from '../../entities/Film'
import { getGenreMap } from './lib'

const HomeScreen: FC = () => {
    const [isLoading, setIsLoading] = useState(true)
    const getFilms = useFilmStore((state) => state.getFilms)
    const getWishlist = useFilmStore((state) => state.getWishlist)
    const films = useFilmStore((state) => state.films)
    const homeMoviesType = useFilmStore((state) => state.homeMoviesType)
    const searchValue = useFilmStore((state) => state.searchValue)
    const genres = useFilmStore((state) => state.genres)
    const genreMap = useMemo(() => getGenreMap(genres), [genres])
    const filteredFilms = useMemo(() => {
        const search = searchValue.trim().toLowerCase()

        return films.filter((film) => {
            const matchesTitle = film.title.toLowerCase().includes(search)
            const matchesGenre = film.genre_ids.some((id) => genreMap[id] && genreMap[id].includes(search))

            return matchesTitle || matchesGenre
        })
    }, [films, searchValue, genreMap])

    useEffect(() => {
        ;(homeMoviesType === 'popular' ? getFilms : getWishlist)(setIsLoading, 'films')
    }, [homeMoviesType])

    if (isLoading) return <ScreenLoader />

    return (
        <FlatList
            data={filteredFilms}
            numColumns={2}
            style={styles.main}
            contentContainerStyle={styles.wrapper}
            columnWrapperStyle={styles.row}
            keyExtractor={({ id }) => `${id}`}
            renderItem={({ item, index }) => {
                const isLastRow = Math.ceil((index + 1) / 2) === Math.ceil(films.length / 2)

                return <Film isLast={isLastRow} {...item} />
            }}
        />
    )
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        padding: toPoint(4)
    },
    wrapper: {
        paddingBottom: initialWindowMetrics?.insets.bottom! + toPoint(3)
    },
    row: {
        gap: toPoint(4)
    }
})

export default HomeScreen
