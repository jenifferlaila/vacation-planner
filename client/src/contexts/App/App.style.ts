import styled from "styled-components"

export type LoadingWrapperProps = {
    $visible?: boolean
}

export const LoadingWrapper = styled.div<LoadingWrapperProps>`
    top: 0;
    left: 0;
    z-index: 999;
    width: 100vw;
    height: 100vh;
    position: fixed;

    display: ${({ $visible }) => ($visible ? "flex" : "none")};
    align-items: center;
    flex-direction: column;
    justify-content: center;

    backdrop-filter: 4px;
    background-color: rgba(255, 255, 255, 0.95);
`
