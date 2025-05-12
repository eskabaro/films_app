import { toPoint } from '@/shared/const/point'
import { ROUTES } from '@/shared/const/routes'
import { toggleMoviesType, useFilmStore } from '@/shared/state'
import HorizontalLine from '@/shared/ui/HorizontalLine'
import Icon from '@/shared/ui/Icon'
import { useRouter } from 'expo-router'
import { useRef, type FC } from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import Popover from 'react-native-popover-view'

const WishlistButton: FC = () => {
    const { push } = useRouter()
    const ref = useRef<Popover>(null)
    const homeMoviesType = useFilmStore((state) => state.homeMoviesType)
    const isPopular = homeMoviesType === 'popular'

    return (
        <Popover
            ref={ref}
            arrowSize={{ width: 0, height: 0 }}
            from={
                <TouchableOpacity>
                    <Icon width={18} height={18} name='wishlist' />
                </TouchableOpacity>
            }
        >
            <TouchableOpacity
                style={styles.option}
                onPress={() => {
                    ref.current?.requestClose()
                    push(ROUTES.wishlist)
                }}
            >
                <Text style={{ fontSize: toPoint(4) }}>Go to wishlist</Text>
            </TouchableOpacity>
            <HorizontalLine />
            <TouchableOpacity
                style={styles.option}
                onPress={() => {
                    ref.current?.requestClose()
                    toggleMoviesType(isPopular ? 'wishlist' : 'popular')
                }}
            >
                <Text style={{ fontSize: toPoint(4) }}>{isPopular ? 'Select wishlist' : 'Select popular'}</Text>
            </TouchableOpacity>
        </Popover>
    )
}

const styles = StyleSheet.create({
    option: {
        paddingBlock: toPoint(2),
        paddingInline: toPoint(3)
    }
})

export default WishlistButton
