import styled from "styled-components"

export const Page = styled.div`
    gap: 8px;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;

    width: 100%;
    height: 100%;
    min-height: 100vh;

    div {
        gap: 16px;
        display: flex;
        align-items: center;

        font-size: 1.75rem;
        line-height: 2.25rem;

        svg {
            font-size: 48px;
        }
    }

    a,
    a:hover,
    a:active,
    a:focus {
        color: inherit;
        text-decoration: none;
    }

    a:hover {
        text-decoration: underline;
    }
`
