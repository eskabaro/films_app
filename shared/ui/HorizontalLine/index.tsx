import { COLORS, type ColorsType } from '@/shared/const/colors'
import type { FC } from 'react'
import { StyleSheet, View } from 'react-native'

interface Props {
    color?: ColorsType
}

const HorizontalLine: FC<Props> = ({ color }) => {
    return <View style={[styles.main, { backgroundColor: COLORS[color || 'gray'] }]} />
}

const styles = StyleSheet.create({
    main: {
        height: 1
    }
})

export default HorizontalLine
