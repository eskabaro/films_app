import { useFilmStore } from '@/shared/state'
import Icon from '@/shared/ui/Icon'
import { useState, type FC } from 'react'
import { ActivityIndicator, TouchableOpacity } from 'react-native'

const AddWishlistButton: FC = () => {
    const [isLoading, setIsLoading] = useState(false)
    const toggleFromWishList = useFilmStore((state) => state.toggleFromWishList)
    const filmId = useFilmStore((state) => state.film?.id)

    return (
        <TouchableOpacity onPress={() => filmId && toggleFromWishList({ id: filmId, type: 'add' }, setIsLoading)} disabled={isLoading}>
            {isLoading ? <ActivityIndicator size='small' /> : <Icon width={18} height={18} name='plus' color='gray' />}
        </TouchableOpacity>
    )
}

export default AddWishlistButton
