import { texts } from "../../util"
import { DateRangePicker, Panel, Stack } from "rsuite"
import { DescriptionImage, DescriptionInsertDays, DescriptionText, PanelCalendar, Subtitle } from "./home.style"
import useHome from "./Home.hook"
import { CalendarArea, Navbar } from "../../components"

function Home() {
    const { disableCalendar, events, range, handleRangeChange, handleRangePickerOpen } = useHome()

    return (
        <>
            <Navbar />
            <Panel
                header={
                    <Stack justifyContent="space-between">
                        <Subtitle>{texts["home.panel.subtitle"]}</Subtitle>
                    </Stack>
                }
            >
                <Stack>
                    <DescriptionImage src="/images/pensando_ferias.jpg" alt="viajar" />
                    <DescriptionText>{texts["home.panel.description"]}</DescriptionText>
                </Stack>
            </Panel>
            <PanelCalendar>
                <DescriptionInsertDays>{texts["home.insert.days"]}</DescriptionInsertDays>
                <DateRangePicker onOpen={handleRangePickerOpen} onChange={handleRangeChange} value={range} />
                <CalendarArea disabled={disableCalendar} range={range} events={events} />
            </PanelCalendar>
        </>
    )
}

export default Home
