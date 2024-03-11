import { useCallback, useMemo, useState } from "react"

import { useNavigate } from "react-router-dom"

import { useApp, useAuth } from "../../contexts"
import { Event, User, getEventsByVacationId, getVacationByUserId } from "../../services"
import { DateRange } from "../../util"

export default function useHome() {
    const navigate = useNavigate()

    const { isLoggedIn, onLoad } = useApp()

    const [range, setRange] = useState<DateRange>(null)
    const [events, setEvents] = useState<Event[]>([])

    const disableCalendar = useMemo(() => !isLoggedIn || range === null, [isLoggedIn, range])

    const handleRangePickerOpen = useCallback(() => {
        if (isLoggedIn) return

        navigate("/login")
    }, [isLoggedIn, navigate])

    const handleRangeChange = useCallback((range: DateRange) => {
        setRange(range)
    }, [])

    const handleAfterAuth = useCallback(
        async (res?: User) => {
            if (!res) return

            onLoad(true)
            const vacation = await getVacationByUserId(res.id)
            if (!vacation) return onLoad(false)

            const events = await getEventsByVacationId(vacation.id)

            const { start, finish } = vacation

            setRange([new Date(start), new Date(finish)])
            setEvents([
                ...events.map(({ start, ...rest }) => ({
                    start: new Date(start),
                    ...rest,
                })),
            ])

            onLoad(false)
        },
        [onLoad],
    )

    useAuth(handleAfterAuth)

    return { disableCalendar, events, isLoggedIn, range, handleRangeChange, handleRangePickerOpen }
}
