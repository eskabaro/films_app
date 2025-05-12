import { useFilmStore } from '@/shared/state'
import NoData from '@/widgets/NoData'
import ScreenLoader from '@/widgets/ScreenLoader'
import { useGlobalSearchParams } from 'expo-router'
import { useEffect, useState, type FC } from 'react'
import Details from './ui/Details'
import Parallax from './ui/Parallax'

const FilmScreen: FC = () => {
    const [isLoading, setIsLoading] = useState(true)
    const { filmId } = useGlobalSearchParams<{ filmId: string }>()
    const getFilm = useFilmStore((state) => state.getFilm)
    const film = useFilmStore((state) => state.film)

    useEffect(() => {
        getFilm(filmId.toString(), setIsLoading)
    }, [filmId])

    if (isLoading) return <ScreenLoader />

    if (!film) return <NoData />

    return (
        <Parallax imageUrl={film.backdrop_path}>
            <Details {...film} />
        </Parallax>
    )
}

export default FilmScreen
