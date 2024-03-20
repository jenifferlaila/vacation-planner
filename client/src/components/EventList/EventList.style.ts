import styled from "styled-components"

export const EventList = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;

    gap: 4px;
    width: 100%;
    height: 100%;
    display: flex;
    overflow: hidden;
    align-items: start;
    flex-direction: column;

    [data-last="true"] {
        margin: 0 auto;
    }
`

export const EventItem = styled.li`
    gap: 2px;
    display: flex;
    max-width: 100%;
    overflow: hidden;
    align-items: center;

    svg {
        color: red;
        font-size: 16px;
    }

    b {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
`

export const PopoverList = styled.ul`
    margin: 0;
    padding: 8px;
    margin-left: 12px;
`
