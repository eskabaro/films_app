import Film from '@/entities/Film'
import { COLORS } from '@/shared/const/colors'
import { toPoint } from '@/shared/const/point'
import { useFilmStore } from '@/shared/state'
import Icon from '@/shared/ui/Icon'
import NoData from '@/widgets/NoData'
import ScreenLoader from '@/widgets/ScreenLoader'
import { useFocusEffect } from 'expo-router'
import { useCallback, useState, type FC } from 'react'
import { ActivityIndicator, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import { initialWindowMetrics } from 'react-native-safe-area-context'

const WishlistScreen: FC = () => {
    const [isLoading, setIsLoading] = useState(true)
    const getWishlist = useFilmStore((state) => state.getWishlist)
    const toggleFromWishList = useFilmStore((state) => state.toggleFromWishList)
    const wishlist = useFilmStore((state) => state.wishlist)

    useFocusEffect(
        useCallback(() => {
            getWishlist(setIsLoading)
        }, [])
    )

    if (isLoading) return <ScreenLoader />

    if (wishlist.length <= 0) return <NoData />

    return (
        <FlatList
            data={wishlist}
            numColumns={2}
            style={styles.main}
            contentContainerStyle={styles.wrapper}
            columnWrapperStyle={styles.row}
            keyExtractor={({ id }) => `${id}`}
            renderItem={({ item, index }) => {
                const isLastRow = Math.ceil((index + 1) / 2) === Math.ceil(wishlist.length / 2)

                return (
                    <Film
                        isLast={isLastRow}
                        deleteBtn={(loading, setLoading) => (
                            <TouchableOpacity
                                style={styles.trash}
                                onPress={() => toggleFromWishList({ id: item.id, type: 'remove' }, setLoading)}
                                disabled={loading}
                            >
                                {loading ? <ActivityIndicator size='small' /> : <Icon width={18} height={18} color='red' name='trash' />}
                            </TouchableOpacity>
                        )}
                        {...item}
                    />
                )
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
    },
    trash: {
        position: 'absolute',
        zIndex: 1,
        top: toPoint(4),
        right: toPoint(4),
        backgroundColor: COLORS.gray,
        padding: toPoint(2),
        borderRadius: '50%'
    }
})

export default WishlistScreen
