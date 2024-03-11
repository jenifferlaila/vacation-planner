import { Panel } from "rsuite"
import styled from "styled-components"

export const Subtitle = styled.span`
    font-size: 1.5rem;
    font-weight: 700;
    line-height: 4rem;
`

export const DescriptionImage = styled.img`
    width: 100%;
`

export const DescriptionText = styled.span`
    text-align: justify;
    font-weight: 700;
    font-size: 1rem;
    line-height: 2rem;
`
export const PanelCalendar = styled(Panel)`
    .rs-panel-body {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        width: 100%;
    }
    .rs-panel-body > .rs-picker {
        width: fit-content;
    }
`

export const DescriptionInsertDays = styled.span`
    padding: 0.5rem;
    font-weight: 700;
    font-size: 1rem;
    line-height: 2rem;
`
