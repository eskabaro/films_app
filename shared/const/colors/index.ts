export const COLORS = {
    gray: 'gray',
    red: 'red'
} as const

export type ColorsType = keyof typeof COLORS
