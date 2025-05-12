import AddWishlistButton from '@/screens/film/ui/AddWishlistButton'
import WishlistButton from '@/screens/home/ui/WishlistButton'
import { debounce } from '@/shared/lib/utils'
import { setSearchValue, useFilmStore } from '@/shared/state'
import { Stack } from 'expo-router'
import { useMemo } from 'react'

export default () => {
    const film = useFilmStore((state) => state.film)
    const debouncedSetValue = useMemo(() => debounce((text) => setSearchValue(text), 400), [setSearchValue])

    return (
        <Stack>
            <Stack.Screen
                name='index'
                options={{
                    headerTitle: 'Home',
                    headerRight: () => <WishlistButton />,
                    headerSearchBarOptions: {
                        hideWhenScrolling: true,
                        placeholder: 'Search...',
                        onChangeText: ({ nativeEvent }) => debouncedSetValue(nativeEvent.text)
                    }
                }}
            />
            <Stack.Screen name='wishlist' options={{ title: 'Wishlist' }} />
            <Stack.Screen
                name='[filmId]'
                options={{
                    headerTitle: film?.original_title,
                    headerRight: () => <AddWishlistButton />
                }}
            />
        </Stack>
    )
}
