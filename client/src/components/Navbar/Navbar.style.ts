import { Navbar } from "rsuite"
import styled from "styled-components"

export const NavBar = styled(Navbar)`
    background-color: #156ab033;
`

export const Title = styled(Navbar.Brand)`
    cursor: pointer;
    font-size: 1rem;

    svg {
        font-size: 1.5rem;
    }

    &:hover {
        color: unset;
    }
`
