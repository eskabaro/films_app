import type { FC } from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'

const ScreenLoader: FC = () => {
    return (
        <View style={styles.main}>
            <ActivityIndicator color={'red'} size='large' />
        </View>
    )
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default ScreenLoader
