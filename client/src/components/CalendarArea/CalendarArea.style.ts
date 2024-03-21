import styled from "styled-components"

export type OverlayProps = {
    $disabled?: boolean
}

export const Wrapper = styled.div`
    gap: 24px;
    width: 100%;
    height: 100%;
    display: flex;
    position: relative;
    align-items: center;
    flex-direction: column;

    .rs-calendar {
        width: 70vw;
    }

    .vacation-day {
        background-color: beige;
    }
`

export const Overlay = styled.span<OverlayProps>`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1;
    height: 100%;
    cursor: not-allowed;
    border-radius: 10px;

    display: ${({ $disabled }) => ($disabled ? "block" : "none")};

    background-color: #00000008;
`
