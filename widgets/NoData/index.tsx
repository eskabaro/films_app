import { toPoint } from '@/shared/const/point'
import type { FC } from 'react'
import { StyleSheet, Text, View } from 'react-native'

interface Props {
    title?: string
    subtitle?: string
}

const NoData: FC<Props> = ({ title = 'No Data', subtitle = 'There is no data' }) => {
    return (
        <View style={styles.main}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: 'center',
        gap: toPoint(1)
    },
    title: {
        fontSize: 16,
        fontWeight: 500,
        textAlign: 'center'
    },
    subtitle: {
        textAlign: 'center'
    }
})

export default NoData
