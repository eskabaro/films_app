import plus from './assets/plus.svg'
import trash from './assets/trash.svg'
import wishlist from './assets/wishlist.svg'

const ICONS = {
    wishlist,
    plus,
    trash
} as const

export type IconType = keyof typeof ICONS
export default ICONS
