import { isWithinRange, differenceInDays, isFuture, isPast } from 'date-fns'
export function getEventMessage(startDate: Date, endDate: Date) {
    const currentDate = new Date()

    if (isWithinRange(currentDate, startDate, endDate)) {
        return `Event is nog ${differenceInDays(
            currentDate,
            endDate
        )} dagen`
    }

    if (isPast(endDate)) {
        return `evenement is beeindigd`
    }

    if (isFuture(startDate)) {
        return `Event begint over ${differenceInDays(
            currentDate,
            endDate
        )} dagen`
    }

    return `No data about this event`
}

export function getMillisecondsInMinutes(milliseconds: number) {

    const min = Math.floor((milliseconds / 1000 / 60) << 0)
    const sec = Math.floor((milliseconds / 1000) % 60)

    return `${min}:${sec}`
}