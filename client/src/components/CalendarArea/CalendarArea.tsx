import { Button, Calendar } from "rsuite"

import { EventModal } from ".."
import useCalendarArea from "./CalendarArea.hook"
import { Overlay, Wrapper } from "./CalendarArea.style"
import { Event } from "../../services"
import { DateRange } from "../../util"

export type CalendarAreaProps = {
    range: DateRange
    events: Event[]
    disabled?: boolean
}

function CalendarArea(props: CalendarAreaProps) {
    const { disabled, events, range } = props

    const {
        selected,
        showModal,
        publicUsers,
        getCellClassName,
        handleCloseModal,
        handleSave,
        handleDateSelection,
        handleNewEvent,
        renderCell,
    } = useCalendarArea(range, events)

    return (
        <Wrapper>
            <Overlay $disabled={disabled} />

            <Calendar
                cellClassName={getCellClassName}
                onSelect={handleDateSelection}
                renderCell={renderCell}
                bordered
            />
            <Button onClick={handleSave}>Save</Button>

            {selected && (
                <EventModal
                    date={selected}
                    open={showModal}
                    onClose={handleCloseModal}
                    onSubmit={handleNewEvent}
                    publicUsers={publicUsers}
                />
            )}
        </Wrapper>
    )
}

export default CalendarArea
