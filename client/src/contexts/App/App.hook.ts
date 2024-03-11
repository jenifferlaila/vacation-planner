import { useState, useCallback, useEffect } from "react"

import { User, login, authUser } from "../../services"

export default function useAppProvider() {
    const [user, setUser] = useState<User>()
    const [loading, setLoading] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const handleLogin = useCallback(async (username: string, password: string) => {
        setLoading(true)

        const user = await login(username, password)
        setUser(user ? { ...user, password } : undefined)

        setLoading(false)
        return user
    }, [])

    const handleAuth = useCallback(async () => {
        const data = localStorage.getItem("user")

        if (!data) {
            setIsLoggedIn(false)
            return undefined
        }

        setLoading(true)
        const user = JSON.parse(data) as User

        const actualUser = await authUser(user.username, user.password)

        setIsLoggedIn(!!actualUser)
        setUser(actualUser)

        setLoading(false)
        return actualUser
    }, [])

    useEffect(() => {
        const action = async () => await handleAuth()

        action()
    }, [])

    return { isLoggedIn, loading, user, handleAuth, handleLogin, setLoading }
}
