import { getImageUrl } from '@/shared/lib/utils'
import { type FC, type PropsWithChildren, useRef } from 'react'
import { Animated, StyleSheet, View } from 'react-native'
import { PARALLAX_HEIGHT, THROTTLE } from '../../const'

interface Props extends PropsWithChildren {
    imageUrl: string
}

const Parallax: FC<Props> = ({ imageUrl, children }) => {
    const scrollY = useRef(new Animated.Value(0)).current
    const translateY = scrollY.interpolate({
        inputRange: [-PARALLAX_HEIGHT, 0, PARALLAX_HEIGHT * 2],
        outputRange: [PARALLAX_HEIGHT / 2, 0, -PARALLAX_HEIGHT / 2],
        extrapolate: 'clamp'
    })

    return (
        <View style={{ flex: 1 }}>
            <Animated.Image
                source={{ uri: getImageUrl(imageUrl) }}
                style={[
                    styles.image,
                    {
                        transform: [{ translateY }]
                    }
                ]}
            />
            <Animated.ScrollView
                style={styles.main}
                contentContainerStyle={{ paddingTop: PARALLAX_HEIGHT }}
                scrollEventThrottle={THROTTLE}
                onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: false })}
            >
                {children}
            </Animated.ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    main: {
        flex: 1
    },
    image: {
        top: 0,
        position: 'absolute',
        width: '100%',
        height: PARALLAX_HEIGHT
    }
})

export default Parallax
