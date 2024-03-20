import dayjs from "dayjs"
import { Whisper, Popover } from "rsuite"
import { ReadyRound } from "@rsuite/icons"

import { EventItem, EventList as List, PopoverList } from "./EventList.style"
import { texts } from "../../util"
import { Event } from "../../services"
import { useMemo } from "react"

export type EventListProps = {
    events: Omit<Event, "id">[]
}

function EventList(props: EventListProps) {
    const { events } = props

    const visible = useMemo(() => events.slice(0, 2), [events])

    return (
        <List>
            {visible.map(({ start, title }) => (
                <EventItem key={title}>
                    <ReadyRound />
                    <b>
                        {dayjs(start).format("HH:mm")} - {title}
                    </b>
                </EventItem>
            ))}

            <li data-last="true">
                <Whisper
                    placement="top"
                    trigger="hover"
                    speaker={
                        <Popover>
                            <PopoverList>
                                {events.map(({ start, title }) => (
                                    <li key={title}>
                                        <b>
                                            {dayjs(start).format("HH:mm")} -{" "}
                                            {title}
                                        </b>
                                    </li>
                                ))}
                            </PopoverList>
                        </Popover>
                    }
                >
                    <a>
                        {texts["home.calendar.events.count"].replace(
                            "{{}}",
                            String(events.length),
                        )}
                    </a>
                </Whisper>
            </li>
        </List>
    )
}

export default EventList
