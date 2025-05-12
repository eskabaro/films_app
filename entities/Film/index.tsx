import { COLORS } from '@/shared/const/colors'
import { toPoint } from '@/shared/const/point'
import { ROUTES } from '@/shared/const/routes'
import { formatDate } from '@/shared/lib/utils'
import { useFilmStore } from '@/shared/state'
import { FilmType } from '@/shared/types'
import { useRouter } from 'expo-router'
import { type Dispatch, type FC, type ReactNode, type SetStateAction, useState } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

interface Props extends FilmType {
    isLast: boolean
    deleteBtn?: (isLoading: boolean, setIsLoading: Dispatch<SetStateAction<boolean>>) => ReactNode
}

const Film: FC<Props> = ({ isLast, id, poster_path, release_date, original_title, genre_ids, deleteBtn }) => {
    const { push } = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const genres = useFilmStore((state) => state.genres)

    const getGenreNames = (ids: Array<number>) => {
        return ids
            .map((id) => genres.find((genre) => genre.id === id)?.name)
            .filter(Boolean)
            .join(', ')
    }

    return (
        <TouchableOpacity
            style={[styles.main, !isLast && { marginBottom: toPoint(4) }]}
            onPress={() =>
                push({
                    pathname: ROUTES.film,
                    params: { filmId: id }
                })
            }
        >
            {deleteBtn?.(isLoading, setIsLoading)}
            <Image style={styles.image} source={{ uri: `${process.env.EXPO_PUBLIC_API_IMAGE_URL}${poster_path}` }} resizeMode='contain' />
            <View>
                <Text style={styles.title}>{original_title}</Text>
                <Text style={styles.date}>{formatDate(release_date)}</Text>
            </View>
            <Text style={styles.date}>{getGenreNames(genre_ids)}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        gap: toPoint(2),
        padding: toPoint(2),
        borderRadius: toPoint(3),
        backgroundColor: COLORS.gray,
        position: 'relative',
        maxWidth: toPoint(50)
    },
    image: {
        borderRadius: toPoint(2),
        aspectRatio: 2 / 3
    },
    title: {
        fontSize: toPoint(4),
        fontWeight: 600
    },
    date: {
        fontSize: toPoint(3)
    }
})

export default Film
