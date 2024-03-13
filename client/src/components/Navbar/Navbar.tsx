import { Avatar, Nav } from "rsuite"
import { Peoples, Calendar as Planner } from "@rsuite/icons"

import { NavBar, Title } from "./Navbar.style"
import { texts } from "../../util"
import { useApp } from "../../contexts"
import { useCallback, useMemo } from "react"
import { useNavigate } from "react-router-dom"

function Navbar() {
    const navigate = useNavigate()
    const { isLoggedIn, user } = useApp()

    const ready = useMemo(() => isLoggedIn && user, [isLoggedIn, user])

    const handleRedirect = useCallback(() => {
        if (ready) return

        navigate("/login")
    }, [ready, navigate])

    return (
        <NavBar>
            <Title>
                <Planner /> {texts["home.navbar.title"]}
            </Title>
            <Nav pullRight>
                <Nav.Item
                    icon={
                        ready ? (
                            <Avatar circle style={{ background: "#000" }}>
                                {user?.username.charAt(0).toUpperCase()}
                            </Avatar>
                        ) : (
                            <Peoples />
                        )
                    }
                    onClick={handleRedirect}
                >
                    {ready ? null : texts["home.navbar.login"]}
                </Nav.Item>
            </Nav>
        </NavBar>
    )
}

export default Navbar
