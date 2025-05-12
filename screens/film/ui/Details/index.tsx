import { toPoint } from '@/shared/const/point'
import { formatCurrency } from '@/shared/lib'
import { getImageUrl } from '@/shared/lib/utils'
import type { DetailsType } from '@/shared/types'
import type { FC } from 'react'
import { FlatList, Image, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

interface Props extends DetailsType {}

export const Details: FC<Props> = ({ overview, genres, original_language, origin_country, homepage, budget, production_companies }) => {
    return (
        <View style={styles.main}>
            <ScrollView
                horizontal
                style={styles.genres}
                contentContainerStyle={{ paddingInline: toPoint(4) }}
                showsHorizontalScrollIndicator={false}
            >
                {genres.map(({ id, name }, idx, arr) => {
                    return (
                        <Text key={id} style={[styles.genresItem, idx + 1 !== arr.length && { marginRight: toPoint(3) }]}>
                            {name}
                        </Text>
                    )
                })}
            </ScrollView>
            <Text style={{ fontSize: toPoint(4) }}>{overview}</Text>
            <View style={styles.info}>
                <View style={{ gap: toPoint(5) }}>
                    <View>
                        <Text style={{ fontSize: toPoint(3) }}>ORIGINAL LANGUAGE</Text>
                        <Text style={{ fontSize: toPoint(4) }}>{original_language}</Text>
                    </View>
                    <View>
                        <Text style={{ fontSize: toPoint(3) }}>BUDGET</Text>
                        <Text style={{ fontSize: toPoint(4) }}>{formatCurrency(budget)}</Text>
                    </View>
                </View>
                <View style={{ gap: toPoint(5) }}>
                    <View>
                        <Text style={{ fontSize: toPoint(3) }}>COUNTRY OF REGION</Text>
                        <Text style={{ fontSize: toPoint(4) }}>{origin_country.join(' ')}</Text>
                    </View>
                    <View>
                        <Text style={{ fontSize: toPoint(3) }}>HOME PAGE</Text>
                        <TouchableOpacity onPress={() => Linking.openURL(homepage)}>
                            <Text style={{ fontSize: toPoint(4) }}>Link</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <FlatList
                numColumns={2}
                style={{ margin: 'auto' }}
                scrollEnabled={false}
                data={production_companies.filter((item) => item.logo_path && item)}
                keyExtractor={({ id }) => `${id}`}
                renderItem={({ item }) => (
                    <View style={styles.company}>
                        <Image width={100} height={100} source={{ uri: getImageUrl(item.logo_path) }} resizeMode='contain' />
                    </View>
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        padding: toPoint(4),
        gap: toPoint(4),
        backgroundColor: 'white'
    },
    genres: {
        gap: toPoint(2),
        marginInline: toPoint(-4)
    },
    genresItem: {
        fontSize: toPoint(6),
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 10
    },
    info: {
        gap: toPoint(5),
        flexDirection: 'row'
    },
    company: {
        padding: toPoint(2),
        borderRadius: toPoint(2),
        margin: toPoint(2),
        backgroundColor: 'gray'
    }
})

export default Details
