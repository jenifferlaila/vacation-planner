import { PropsWithChildren } from "react"
import { User } from "../../services"

export type AppContextData = {
    user?: User
    loading?: boolean
    isLoggedIn: boolean
    onLoad: (value: boolean) => void
    onAuth: () => Promise<User | undefined>
    onLogin: (username: string, password: string) => Promise<User | undefined>
}

export type AppContextProviderProps = PropsWithChildren & AppContextData
