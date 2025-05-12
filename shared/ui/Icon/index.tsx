import { COLORS, type ColorsType } from '@/shared/const/colors'
import ICONS, { IconType } from '@/shared/const/icons'
import type { FC } from 'react'
import type { SvgProps } from 'react-native-svg'

export interface Props extends Omit<SvgProps, 'color'> {
    name: IconType
    color?: ColorsType
}

export const Icon: FC<Props> = ({ name, color, ...restProps }) => {
    const Svg = ICONS[name]

    return <Svg color={COLORS[color ?? 'gray']} {...restProps} />
}

export default Icon
