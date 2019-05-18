import { isWithinRange, differenceInDays, isFuture } from 'date-fns'
export function getEventMessage(startDate: Date, endDate: Date) {
    const currentDate = new Date()

    if (isWithinRange(currentDate, startDate, endDate)) {
        const numbDays = differenceInDays(
            endDate,
            currentDate
        )
        if (numbDays === 0) {
            return 'Evenement stopt morgen'
        }
        return `Evenement is nog ${numbDays} dag${numbDays !== 1 ? 'en' : ''}`
    }

    if (isFuture(startDate)) {
        const numbDays = differenceInDays(
            startDate,
            currentDate
        )
        if (numbDays === 0) {
            return 'Evenement start morgen'
        }
        return `Evenement begint over ${numbDays} dag${numbDays !== 1 ? 'en' : ''}`
    }

    return `Evenement is beeindigd`
}

export function getMillisecondsInMinutes(milliseconds: number) {

    const min = Math.floor((milliseconds / 1000 / 60) << 0)
    const sec = Math.floor((milliseconds / 1000) % 60)

    return `${min}:${sec}`
}