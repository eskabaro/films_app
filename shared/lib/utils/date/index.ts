import { MONTHS } from '@/shared/const/dates'
import type { LocalType } from '@/shared/types'

export const formatDate = (dateString: string, locale: LocalType = 'en') => {
    const [year, month, day] = dateString.split('-')
    const monthName = MONTHS[locale][parseInt(month) - 1]

    return `${parseInt(day)} ${monthName} ${year}`
}
