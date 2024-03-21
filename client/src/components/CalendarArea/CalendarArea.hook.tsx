import { useCallback, useEffect, useMemo, useState } from "react"

import { Notification, useToaster } from "rsuite"

import dayjs from "dayjs"
import isBetween from "dayjs/plugin/isBetween"

import { EventList } from "../EventList"
import { Event, PublicUser, pickUsers, saveVacation } from "../../services"
import { DateRange, texts } from "../../util"
import { useApp } from "../../contexts"

dayjs.extend(isBetween)

export default function useCalendarArea(
    range: DateRange,
    events: Omit<Event, "id">[],
) {
    const { user } = useApp()

    const toaster = useToaster()

    const { onLoad } = useApp()

    const [showModal, setShowModal] = useState(false)
    const [selected, setSelected] = useState<Date>()
    const [publicUsers, setPublicUsers] = useState<PublicUser[]>([])
    const [savedEvents, setSavedEvents] = useState<Omit<Event, "id">[]>([])

    const allEvents: Omit<Event, "id">[] = useMemo(
        () => [...events, ...savedEvents],
        [events, savedEvents],
    )

    const generateMessage = useCallback(
        (date: Date) => (
            <Notification type="warning" closable>
                <p>
                    {texts["home.calendar.invalid.date.selection"].replace(
                        "{{}}",
                        dayjs(date).format("DD/MM/YYYY"),
                    )}
                </p>
            </Notification>
        ),
        [],
    )

    const isVacationDay = useCallback(
        (date: Date) =>
            range && dayjs(date).isBetween(range[0], range[1], "day", "[]"),
        [range],
    )

    const getEventsByDay = useCallback(
        (date: Date) => {
            const day = dayjs(date)

            return allEvents.filter(({ start }) => day.isSame(start, "day"))
        },
        [allEvents],
    )

    const getCellClassName = useCallback(
        (date: Date) => {
            if (isVacationDay(date)) return "vacation-day"

            return undefined
        },
        [events, isVacationDay],
    )

    const renderCell = useCallback(
        (date: Date) => {
            const events = getEventsByDay(date)

            return events.length ? <EventList events={events} /> : null
        },
        [getEventsByDay],
    )

    const handleDateSelection = useCallback(
        (date: Date) => {
            setSelected(date)

            if (isVacationDay(date)) {
                setShowModal(true)
            } else {
                toaster.push(generateMessage(date), { placement: "topStart" })
            }
        },
        [generateMessage, isVacationDay],
    )

    const handleCloseModal = useCallback(() => {
        setShowModal(false)
    }, [])

    const handleNewEvent = useCallback((event: Omit<Event, "id">) => {
        setSavedEvents((current) => [...current, event])
    }, [])

    const handleSave = useCallback(async () => {
        if (!user) return

        onLoad(true)

        console.log(allEvents)
        await saveVacation(user, range, allEvents, [])

        onLoad(false)
    }, [allEvents, range, onLoad, user])

    useEffect(() => {
        const action = async () => {
            setPublicUsers(await pickUsers())
        }

        action()
    }, [])

    return {
        isVacationDay,
        selected,
        showModal,
        publicUsers,
        getCellClassName,
        handleCloseModal,
        handleDateSelection,
        handleNewEvent,
        handleSave,
        renderCell,
    }
}
